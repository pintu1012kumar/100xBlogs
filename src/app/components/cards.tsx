"use client";

import { useEffect, useState } from "react";
import { HoverEffect } from "../components/ui/card-hover-effect";
import { useRouter } from "next/navigation";
import LogoutButton from "./logout";
import Link from "next/link";

type Project = {
  title: string;
  description: string;
  link: string;
};

export function CardHoverEffectDemo() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/auth/post");
        const data = await response.json();

        const posts = data.posts || [];

        const parsedProjects = posts.map((post: any) => ({
          title: post.title,
          description: post.content,
          link: `/blog/${post.id}`,
        }));

        setProjects(parsedProjects);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleOpenForm = () => {
    router.push("/publish");
  };

  return (
    <div className="max-w-5xl mx-auto px-8 py-10">
      <div className="flex justify-between items-center mb-4">
        <Link href="/">
          <div className="text-3xl font-bold text-blue-600 cursor-pointer hover:opacity-80">
            100xBlogs
          </div>
        </Link>

        <div className="flex items-center">
          <button
            onClick={handleOpenForm}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Publish
          </button>
          <div className="ml-4 rounded-2xl">
            <LogoutButton />
          </div>
        </div>
      </div>

      {loading ? (
        <p className="text-center text-zinc-400 text-lg">Loading projects...</p>
      ) : (
        <div>
          <HoverEffect items={projects} />
        </div>
      )}
    </div>
  );
}
