"use client";

import { use, useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

interface Blog {
  title: string;
  description: string;
  content?: string;
  createdAt?: any;
}

export default function BlogDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const docRef = doc(db, "blogs", id);

        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setBlog(docSnap.data() as Blog);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </main>
    );
  }

  if (!blog) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        Blog not found
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 py-24">

      <div className="max-w-4xl mx-auto">

        <div className="mb-6">
          <span className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 px-4 py-2 rounded-full text-sm">
            Cyber Security Blog
          </span>
        </div>

        <h1 className="text-5xl font-bold text-cyan-400 mb-6">
          {blog.title}
        </h1>

        {blog.createdAt && (
          <p className="text-gray-500 mb-8">
            Published:
            {" "}
            {new Date(
              blog.createdAt.seconds * 1000
            ).toLocaleDateString()}
          </p>
        )}

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 mb-8">

          <h2 className="text-2xl font-semibold text-white mb-4">
            Overview
          </h2>

          <p className="text-lg text-gray-300 leading-relaxed">
            {blog.description}
          </p>

        </div>

        {blog.content && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">

            <h2 className="text-2xl font-semibold text-cyan-400 mb-6">
              Full Article
            </h2>

            <div className="text-gray-300 leading-8 whitespace-pre-wrap">
              {blog.content}
            </div>

          </div>
        )}

      </div>

    </main>
  );
}