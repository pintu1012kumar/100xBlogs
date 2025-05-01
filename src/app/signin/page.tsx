"use client";
import React, { useState } from "react";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { cn } from "@/app/lib/utils";
import { useRouter } from 'next/navigation';
import AuthRoute from "../components/AuthRoute";

const SignupFormDemo = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      if (res.ok) {
        const data = await res.json();
        const token = data.token;

        if (token) {
          localStorage.setItem("token", token);
          console.log("Signin successful");
          router.push("/dashboard");
        } else {
          alert("Signin failed: Token not found.");
        }
      } else {
        const errorData = await res.json();
        console.error("Signin failed:", errorData.message || "Unknown error");
        alert("Signin failed: " + (errorData.message || "Invalid credentials"));
      }
    } catch (error) {
      console.error("Error signing in:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <AuthRoute>
      <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black mt-30">
        <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
          Welcome to 100xBlogs
        </h2>
        <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
          Sign in to 100xBlogs if you can because we don&apos;t have a login flow yet
        </p>

        <form className="my-8" onSubmit={handleSubmit}>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address:</Label>
            <Input
              id="email"
              placeholder="Pintu@gmail.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password:</Label>
            <Input
              id="password"
              placeholder="••••••••"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </LabelInputContainer>

          <button
            className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
            type="submit"
          >
            Sign in &rarr;
            <BottomGradient />
          </button>

          <div className="text-center mt-4">
            <p className="mt-2 text-sm text-gray-600">
              Already don&apos;t have an account?{" "}
              <span
                onClick={() => router.push("/signup")}
                className="text-blue-600 hover:underline cursor-pointer"
              >
                Click here to Signup
              </span>
            </p>
          </div>

          <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />
        </form>
      </div>
    </AuthRoute>
  );
};

export default SignupFormDemo;

// Bottom gradient effect
const BottomGradient = () => (
  <>
    <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
    <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
  </>
);

// Wrapper for label and input
const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={cn("flex w-full flex-col space-y-2", className)}>
    {children}
  </div>
);
