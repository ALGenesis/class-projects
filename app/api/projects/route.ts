import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";

// GET /api/projects - liste tous les projets
export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
    });

    const serialized = projects.map((p: (typeof projects)[number]) => ({
      ...p,
      createdAt: p.createdAt instanceof Date ? p.createdAt.toISOString() : p.createdAt,
    }));

    return NextResponse.json(serialized);
  } catch (error) {
    console.error("GET /api/projects error", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// POST /api/projects - crée un projet (protégé par Clerk côté handler)
export async function POST(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
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

    if (!title || !description || !category) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const user = await currentUser();
    const creatorName =
      user?.fullName ||
      user?.username ||
      user?.emailAddresses?.[0]?.emailAddress ||
      "Unknown user";

    const project = await prisma.project.create({
      data: {
        title,
        description,
        longDescription: longDescription || null,
        category,
        teamSize: Number(teamSize) || 1,
        currentMembers: 1,
        creator: creatorName,
        creatorId: userId,
        timeline: timeline || null,
        tags,
        goals,
        requirements,
        lookingFor,
        images,
        memberIds: [userId],
        socialLinks: socialLinks ?? null,
      },
    });

    const serialized = {
      ...project,
      createdAt: project.createdAt instanceof Date
        ? project.createdAt.toISOString()
        : project.createdAt,
    };

    return NextResponse.json(serialized, { status: 201 });
  } catch (error) {
    console.error("POST /api/projects error", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
