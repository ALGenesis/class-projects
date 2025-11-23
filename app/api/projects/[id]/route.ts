import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

// GET /api/projects/[id]
export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const id = (await params).id

  try {
    const project = await prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      return new NextResponse("Not Found", { status: 404 });
    }

    const serialized = {
      ...project,
      createdAt: project.createdAt instanceof Date
        ? project.createdAt.toISOString()
        : project.createdAt,
    };

    return NextResponse.json(serialized);
  } catch (error) {
    console.error("GET /api/projects/[id] error", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// PATCH /api/projects/[id] - update a project (only creator)
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { userId } = await auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const  id = (await params).id

  try {
    const existing = await prisma.project.findUnique({ where: { id } });

    if (!existing) {
      return new NextResponse("Not Found", { status: 404 });
    }

    if (existing.creatorId !== userId) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    const body = await req.json();

    const {
      title,
      description,
      longDescription,
      category,
      teamSize,
      timeline,
      tags,
      goals,
      requirements,
      lookingFor,
      images,
      socialLinks,
    } = body;

    const updated = await prisma.project.update({
      where: { id },
      data: {
        title,
        description,
        longDescription,
        category,
        teamSize: teamSize !== undefined ? Number(teamSize) : undefined,
        timeline,
        tags,
        goals,
        requirements,
        lookingFor,
        images,
        socialLinks,
      },
    });

    const serialized = {
      ...updated,
      createdAt: updated.createdAt instanceof Date
        ? updated.createdAt.toISOString()
        : updated.createdAt,
    };

    return NextResponse.json(serialized);
  } catch (error) {
    console.error("PATCH /api/projects/[id] error", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// DELETE /api/projects/[id] - delete a project (only creator)
export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const { userId } = await auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const id = (await params).id

  try {
    const existing = await prisma.project.findUnique({ where: { id } });

    if (!existing) {
      return new NextResponse("Not Found", { status: 404 });
    }

    if (existing.creatorId !== userId) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    await prisma.project.delete({ where: { id } });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("DELETE /api/projects/[id] error", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
