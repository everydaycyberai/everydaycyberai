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
  createdAt?: any;
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const q = query(
        collection(db, "blogs"),
        orderBy("createdAt", "desc")
      );

      const querySnapshot = await getDocs(q);

      const blogData: Blog[] = [];

      querySnapshot.forEach((doc) => {
        blogData.push({
          id: doc.id,
          ...(doc.data() as Omit<Blog, "id">),
        });
      });

      setBlogs(blogData);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white px-6 py-32">

      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-20">

          <div className="inline-block bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 px-4 py-2 rounded-full text-sm mb-6">
            Cyber Security & IT Blogs
          </div>

          <h1 className="text-5xl font-bold mb-6">
            Latest
            <span className="text-cyan-400"> Articles</span>
          </h1>

          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Learn about cyber security, IT infrastructure,
            surveillance systems and automation.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {blogs.map((blog) => (

  <Link
    href={`/blog/${blog.id}`}
    key={blog.id}
  >

    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-cyan-400 hover:-translate-y-2 transition duration-300 cursor-pointer h-full">

      {blog.createdAt && (
        <p className="text-sm text-gray-500 mb-3">
          {new Date(
            blog.createdAt.seconds * 1000
          ).toLocaleDateString()}
        </p>
      )}

      <h2 className="text-2xl font-semibold mb-4 text-cyan-400">
        {blog.title}
      </h2>

      <p className="text-gray-400 leading-relaxed mb-6">
        {blog.description}
      </p>

      <div className="inline-flex items-center text-cyan-400 font-medium">
        Read More →
      </div>

    </div>

  </Link>

))}

        </div>

      </div>

    </main>
  );
}