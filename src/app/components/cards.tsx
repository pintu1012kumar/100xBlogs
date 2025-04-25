"use client";

import { useEffect, useState } from "react";
import { HoverEffect } from "../components/ui/card-hover-effect";

type Project = {
  title: string;
  description: string;
  link: string;
};

export function CardHoverEffectDemo() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/auth/post");
        const data = await response.json();
        console.log("API response:", data);

        const posts = data.posts || [];

        // Convert API response to Project[] format
        const parsedProjects = posts.map((post: any) => ({
          title: post.title,
          description: post.content,
          link: `/blog/${post.id}` // You can change this as needed
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

  return (
    <div className="max-w-5xl mx-auto px-8 py-10">
      {loading ? (
        <p className="text-center text-zinc-400 text-lg">Loading projects...</p>
      ) : (
        <HoverEffect items={projects} />
      )}
    </div>
  );
}
