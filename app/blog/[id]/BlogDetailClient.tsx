"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

interface Blog {
  title: string;
  description: string;
  content?: string;
  category?: string;
  tags?: string[];
  createdAt?: any;
}

function readingTime(content?: string) {
  if (!content) return 2;
  return Math.max(1, Math.ceil(content.split(/\s+/).length / 200));
}

export default function BlogDetailClient({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [blog, setBlog]       = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const docSnap = await getDoc(doc(db, "blogs", id));
        if (docSnap.exists()) setBlog(docSnap.data() as Blog);
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    };
    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-10 h-10 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-gray-400">Loading article...</p>
        </div>
      </main>
    );
  }

  if (!blog) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-6xl mb-4">📭</p>
          <h1 className="text-2xl font-bold mb-4">Article not found</h1>
          <Link href="/blog" className="text-cyan-400 hover:text-cyan-300 transition">← Back to Blog</Link>
        </div>
      </main>
    );
  }

  const mins = readingTime(blog.content);
  const date = blog.createdAt
    ? new Date(blog.createdAt.seconds * 1000).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })
    : null;

  return (
    <main className="min-h-screen bg-black text-white px-6 py-24">
      <div className="max-w-3xl mx-auto">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-cyan-400 transition">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-cyan-400 transition">Blog</Link>
          <span>/</span>
          <span className="text-gray-400 truncate max-w-[200px]">{blog.title}</span>
        </div>

        {/* Category + meta */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 px-4 py-1.5 rounded-full text-sm">
            {blog.category || "Cyber Security"}
          </span>
          {date && <span className="text-gray-500 text-sm">📅 {date}</span>}
          <span className="text-gray-500 text-sm">⏱ {mins} min read</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 text-white">
          {blog.title}
        </h1>

        {/* Description / Overview */}
        <div className="bg-gradient-to-r from-cyan-500/10 to-transparent border-l-2 border-cyan-500 pl-5 py-4 rounded-r-xl mb-10">
          <p className="text-lg text-gray-300 leading-relaxed">{blog.description}</p>
        </div>

        {/* Content */}
        {blog.content && (
          <div className="bg-black/50 backdrop-blur-sm border border-zinc-700/60 rounded-2xl p-8 mb-8">
            <div className="prose-custom text-gray-300 leading-8 whitespace-pre-wrap text-base">
              {blog.content}
            </div>
          </div>
        )}

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-10">
            {blog.tags.map((tag) => (
              <span key={tag} className="text-sm bg-zinc-800 border border-zinc-700 text-gray-400 px-3 py-1 rounded-full">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Bottom nav */}
        <div className="border-t border-zinc-800 pt-8 flex items-center justify-between">
          <Link href="/blog"
            className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition font-medium">
            ← All Articles
          </Link>
          <Link href="/contact"
            className="bg-cyan-500 hover:bg-cyan-400 text-black px-6 py-3 rounded-xl font-semibold transition text-sm">
            Need IT Help?
          </Link>
        </div>

      </div>
    </main>
  );
}
