"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface Blog {
  id: string;
  title: string;
  description: string;
  content?: string;
  category?: string;
  tags?: string[];
  createdAt?: any;
}

function readingTime(content?: string): number {
  if (!content) return 2;
  return Math.max(1, Math.ceil(content.split(/\s+/).length / 200));
}

const CATEGORIES = ["All", "Cyber Security", "Networking", "CCTV", "Windows", "Firewall", "AI & Automation"];

export default function BlogClient() {
  const [blogs, setBlogs]         = useState<Blog[]>([]);
  const [loading, setLoading]     = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery]       = useState("");

  useEffect(() => { fetchBlogs(); }, []);

  const fetchBlogs = async () => {
    try {
      const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
      const snap = await getDocs(q);
      const data: Blog[] = snap.docs.map((doc) => ({ id: doc.id, ...(doc.data() as Omit<Blog, "id">) }));
      setBlogs(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filtered = blogs.filter((b) => {
    const matchCat = activeCategory === "All" || b.category === activeCategory;
    const matchSearch = !searchQuery ||
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <main className="min-h-screen text-white px-6 py-12 relative z-10">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 px-4 py-2 rounded-full text-sm mb-6">
            Cyber Security & IT Knowledge Base
          </div>
          <h1 className="text-5xl font-bold mb-6">
            Latest <span className="text-cyan-400">Articles</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Practical cyber security tips, IT infrastructure guides, firewall setup,
            surveillance systems and automation — written for real-world use.
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-xl mx-auto block bg-zinc-900 border border-zinc-700 rounded-2xl px-5 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition"
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition duration-200 ${
                activeCategory === cat
                  ? "bg-cyan-500/20 border-cyan-500/60 text-cyan-400"
                  : "bg-zinc-900 border-zinc-700 text-gray-400 hover:border-cyan-500/40 hover:text-cyan-400"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-20 text-gray-400">
            <div className="inline-block w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin mb-4" />
            <p>Loading articles...</p>
          </div>
        )}

        {/* Empty state */}
        {!loading && filtered.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            <p className="text-5xl mb-4">📭</p>
            <p className="text-xl">{searchQuery ? "No articles match your search." : "No articles yet. Check back soon!"}</p>
          </div>
        )}

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((blog) => (
            <Link href={`/blog/${blog.id}`} key={blog.id} className="group">
              <div className="bg-black/50 backdrop-blur-sm border border-zinc-700/60 rounded-2xl p-6 hover:border-cyan-400 hover:-translate-y-2 transition duration-300 cursor-pointer h-full flex flex-col">

                {/* Top meta */}
                <div className="flex items-center justify-between mb-4">
                  {blog.category ? (
                    <span className="text-xs bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full">
                      {blog.category}
                    </span>
                  ) : (
                    <span className="text-xs bg-zinc-800 text-gray-500 px-3 py-1 rounded-full">
                      Cyber Security
                    </span>
                  )}
                  <span className="text-xs text-gray-600">{readingTime(blog.content)} min read</span>
                </div>

                <h2 className="text-xl font-semibold mb-3 text-white group-hover:text-cyan-400 transition leading-snug">
                  {blog.title}
                </h2>

                <p className="text-gray-400 text-sm leading-relaxed mb-5 flex-1">
                  {blog.description.length > 120 ? blog.description.slice(0, 120) + "..." : blog.description}
                </p>

                {/* Tags */}
                {blog.tags && blog.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {blog.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-xs bg-zinc-800 text-gray-500 px-2 py-0.5 rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Bottom row */}
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-zinc-800">
                  {blog.createdAt && (
                    <span className="text-xs text-gray-600">
                      {new Date(blog.createdAt.seconds * 1000).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </span>
                  )}
                  <span className="text-cyan-400 text-sm font-medium group-hover:gap-2 transition">
                    Read More →
                  </span>
                </div>

              </div>
            </Link>
          ))}
        </div>

      </div>
    </main>
  );
}
