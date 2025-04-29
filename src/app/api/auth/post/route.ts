import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { verifyToken } from "@/app/lib/auth"; // your JWT helper

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);

    if (!decoded || !decoded.id) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const userId = decoded.id;

    // Get body
    const body = await req.json();
    const { title, content } = body;

    if (!title || !content) {
      return NextResponse.json({ error: "Title and content are required" }, { status: 400 });
    }

    //  Create blog post
    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorId: userId,
      },
    });

    return NextResponse.json({ id: post.id }, { status: 201 });

  } catch (error) {
    console.error("Error in blog POST:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
