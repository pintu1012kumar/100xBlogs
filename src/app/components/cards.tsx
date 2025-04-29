"use client";

import { useEffect, useState } from "react";
import { HoverEffect } from "../components/ui/card-hover-effect";
import { NewPostForm } from "./NewPostForm";

type Project = {
  title: string;
  description: string;
  link: string;
};

export function CardHoverEffectDemo() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

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

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleOpenForm = () => {
    setShowForm(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-8 py-10">
      <button
        onClick={handleOpenForm}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
      >
        New Post
      </button>

      {showForm && <NewPostForm onClose={handleCloseForm} />}

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
