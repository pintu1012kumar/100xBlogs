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

type Post = {
  id: string;
  title: string;
  content: string;
};

export function CardHoverEffectDemo() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Sidebar State
  const [isOpen, setIsOpen] = useState(false);
  const [topic, setTopic] = useState("");
  const [ideas, setIdeas] = useState<string | null>(null);
  const [loadingIdeas, setLoadingIdeas] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/auth/post");
        const data = await response.json();

        const posts: Post[] = data.posts || [];

        const parsedProjects: Project[] = posts.map((post) => ({
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

  const getIdeas = async () => {
    setLoadingIdeas(true);
    const res = await fetch("/api/auth/ai", {
      method: "POST",
      body: JSON.stringify({ topic }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    setIdeas(data.ideas);
    setLoadingIdeas(false);
  };

  return (
    <div className="relative min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      {/* Top Navbar */}
      <div className="max-w-5xl mx-auto px-8 py-10">
        <div className="flex justify-between items-center mb-4">
          <Link href="/">
            <div className="text-3xl font-bold text-blue-600 cursor-pointer hover:opacity-80">
              100xBlogs
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={handleOpenForm}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Publish
            </button>

            <button
              onClick={() => setIsOpen(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-md"
            >
              💡 Get Blog Ideas
            </button>

            <div className="rounded-2xl">
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

      {/* Sidebar Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close Button */}
        <div className="flex justify-between items-center p-4 border-b border-gray-300 dark:border-gray-700">
          <h2 className="text-xl font-bold text-black dark:text-white">
            AI Blog Idea Generator
          </h2>
          <button onClick={() => setIsOpen(false)} className="text-red-500 text-2xl">
            &times;
          </button>
        </div>

        {/* Sidebar Content */}
        <div className="p-4 flex flex-col gap-4">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter a topic (e.g., JavaScript)"
            className="p-2 border rounded dark:bg-gray-700 dark:text-white"
          />

          <button
            onClick={getIdeas}
            disabled={loadingIdeas}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {loadingIdeas ? "Generating..." : "Generate Ideas"}
          </button>

          {ideas && (
            <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded overflow-y-auto max-h-[300px]">
              <pre className="whitespace-pre-wrap text-black dark:text-white">{ideas}</pre>
            </div>
          )}
        </div>
      </div>

      {/* Overlay for Sidebar */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black opacity-30 z-40"
        />
      )}
    </div>
  );
}
