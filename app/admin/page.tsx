"use client";
import { useRouter } from "next/navigation";

import {
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import { auth } from "@/lib/firebase";

import { useEffect, useState } from "react";

import { db } from "@/lib/firebase";

import {
  collection,
  getDocs,
  orderBy,
  query,
  deleteDoc,
  doc,
  updateDoc,
  addDoc,
serverTimestamp,
} from "firebase/firestore";

interface SupportRequest {
  id: string;
  name: string;
  email: string;
  mobile: string;
  message: string;
  status?: string;
  createdAt?: any;
}
interface Blog {
  id: string;
  title: string;
  description: string;
  content?: string;
  createdAt?: any;
}
export default function AdminPage() {
    const router = useRouter();
    const handleLogout = async () => {
  try {

    await signOut(auth);

    router.push("/admin-login");

  } catch (error) {

    console.error(error);

    alert("Logout failed");

  }
};
  const [requests, setRequests] = useState<SupportRequest[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [blogTitle, setBlogTitle] = useState("");
  const [blogDescription, setBlogDescription] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [blogCategory, setBlogCategory] = useState("Cyber Security");
  const [blogTags, setBlogTags] = useState("");
  useEffect(() => {

  const unsubscribe = onAuthStateChanged(
    auth,
    (user) => {

      if (!user) {
        router.push("/admin-login");
      } else {
        fetchRequests();
        fetchBlogs();
      }

    }
  );

  return () => unsubscribe();

}, []);

  const fetchRequests = async () => {
    try {
      const q = query(
        collection(db, "support_requests"),
        orderBy("createdAt", "desc")
      );

      const querySnapshot = await getDocs(q);

      const data: SupportRequest[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as SupportRequest[];

      setRequests(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const fetchBlogs = async () => {
  try {

    const q = query(
      collection(db, "blogs"),
      orderBy("createdAt", "desc")
    );

    const querySnapshot = await getDocs(q);

    const data: Blog[] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Blog[];

    setBlogs(data);

  } catch (error) {

    console.error(error);

  }
};
const handleDelete = async (id: string) => {
  const confirmDelete = confirm(
    "Are you sure you want to delete this request?"
  );

  if (!confirmDelete) return;

  try {
    await deleteDoc(doc(db, "support_requests", id));

    setRequests((prev) =>
      prev.filter((request) => request.id !== id)
    );

    alert("Request deleted successfully");
  } catch (error) {
    console.error(error);

    alert("Failed to delete request");
  }
};
const handleStatusChange = async (
  id: string,
  status: string
) => {
  try {
    await updateDoc(doc(db, "support_requests", id), {
      status,
    });

    setRequests((prev) =>
      prev.map((request) =>
        request.id === id
          ? { ...request, status }
          : request
      )
    );
  } catch (error) {
    console.error(error);

    alert("Failed to update status");
  }
};
const handleCreateBlog = async () => {
  try {

    if (!blogTitle || !blogDescription || !blogContent) {
      alert("Please fill all fields");
      return;
    }

    const tagsArray = blogTags.split(",").map((t) => t.trim()).filter(Boolean);
    await addDoc(collection(db, "blogs"), {
      title: blogTitle,
      description: blogDescription,
      content: blogContent,
      category: blogCategory,
      tags: tagsArray,
      createdAt: serverTimestamp(),
    });
    setBlogTitle("");
    setBlogDescription("");
    setBlogContent("");
    setBlogCategory("Cyber Security");
    setBlogTags("");

    alert("Blog created successfully");
    fetchBlogs();

  } catch (error) {

    console.error(error);

    alert("Failed to create blog");

  }
};
  return (
    <main className="min-h-screen bg-black text-white px-6 py-32">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}

        <div className="mb-10">
          <div className="inline-block px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-sm mb-5">
            Admin Dashboard
          </div>

          <h1 className="text-5xl font-bold mb-4">
            Support Requests
            <div className="mt-10">
  <h2 className="text-2xl font-bold mb-6 text-cyan-400">
    Blog Posts
  </h2>

  <div className="space-y-4">

    {blogs.map((blog) => (

      <div
        key={blog.id}
        className="bg-zinc-900 border border-zinc-800 rounded-xl p-4"
      >

        <h3 className="text-lg font-semibold text-white">
          {blog.title}
        </h3>

        <p className="text-gray-400 mt-2">
          {blog.description}
        </p>

        <button
          onClick={async () => {

            const confirmDelete = confirm(
              "Delete this blog?"
            );

            if (!confirmDelete) return;

            await deleteDoc(doc(db, "blogs", blog.id));

            fetchBlogs();

          }}
          className="mt-4 bg-red-600 hover:bg-red-500 px-4 py-2 rounded-lg"
        >
          Delete Blog
        </button>

      </div>

    ))}

  </div>
</div>
          </h1>
          <div className="mt-4">

  <button
    onClick={handleLogout}
    className="bg-red-500 hover:bg-red-400 text-white px-5 py-3 rounded-xl transition"
  >
    Logout
  </button>

</div>

          <p className="text-gray-400">
            All customer support submissions from the website.
          </p>
        </div>
<div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-10">

  <h2 className="text-2xl font-semibold text-cyan-400 mb-6">
    Create Blog Post
  </h2>

  <div className="grid gap-4">

    <input
      type="text"
      placeholder="Blog Title"
      value={blogTitle}
      onChange={(e) => setBlogTitle(e.target.value)}
      className="bg-black border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-cyan-400"
    />

    <textarea
      placeholder="Blog Description"
      value={blogDescription}
      onChange={(e) => setBlogDescription(e.target.value)}
      rows={5}
      className="bg-black border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-cyan-400"
    />
<textarea
  placeholder="Full Blog Content"
  value={blogContent}
  onChange={(e) => setBlogContent(e.target.value)}
  rows={10}
  className="bg-black border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-cyan-400"
/>
    <select
      value={blogCategory}
      onChange={(e) => setBlogCategory(e.target.value)}
      className="bg-black border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-cyan-400 text-white"
    >
      <option>Cyber Security</option>
      <option>Networking</option>
      <option>CCTV</option>
      <option>Windows</option>
      <option>Firewall</option>
      <option>AI & Automation</option>
    </select>
    <input
      type="text"
      placeholder="Tags (comma separated): firewall, vpn, security"
      value={blogTags}
      onChange={(e) => setBlogTags(e.target.value)}
      className="bg-black border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-cyan-400"
    />
    <button
      onClick={handleCreateBlog}
      className="bg-cyan-500 hover:bg-cyan-400 text-black px-6 py-3 rounded-xl font-semibold transition"
    >
      Publish Blog Post
    </button>

  </div>

</div>
        {/* Stats */}

        <div className="grid md:grid-cols-3 gap-6 mb-10">

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h3 className="text-gray-400 mb-2">Total Requests</h3>

            <p className="text-4xl font-bold text-cyan-400">
              {requests.length}
            </p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h3 className="text-gray-400 mb-2">Database</h3>

            <p className="text-2xl font-semibold">
              Firebase Firestore
            </p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h3 className="text-gray-400 mb-2">Status</h3>

            <p className="text-2xl font-semibold text-green-400">
              Live Connected
            </p>
          </div>

        </div>

        {/* Loading */}

        {loading ? (
          <div className="text-center py-20 text-gray-400">
            Loading requests...
          </div>
        ) : requests.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            No support requests found.
          </div>
        ) : (

          <div className="grid gap-6">

            {requests.map((request) => (

              <div
                key={request.id}
                className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-cyan-500/40 transition"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">

                  <div>
                    <h2 className="text-2xl font-semibold text-cyan-400">
                      {request.name}
                    </h2>

                    <p className="text-gray-400">
                      {request.email}
                    </p>
                  </div>

                  <div className="text-sm text-gray-500">
                    {request.mobile}
                  </div>
                  <select
  value={request.status || "Pending"}
  onChange={(e) =>
    handleStatusChange(request.id, e.target.value)
  }
  className={`px-4 py-2 rounded-xl text-sm font-medium border bg-black ${
    request.status === "Completed"
      ? "text-green-400 border-green-500/30"
      : request.status === "In Progress"
      ? "text-yellow-400 border-yellow-500/30"
      : "text-red-400 border-red-500/30"
  }`}
>
  <option value="Pending">Pending</option>

  <option value="In Progress">
    In Progress
  </option>

  <option value="Completed">
    Completed
  </option>
</select>
                  <button
                 onClick={() => handleDelete(request.id)}
                className="bg-red-500/20 border border-red-500/30 hover:bg-red-500 hover:text-white text-red-400 px-4 py-2 rounded-xl text-sm transition"
>
                 Delete
                </button>
                </div>

                <div className="bg-black/40 border border-zinc-800 rounded-xl p-4 text-gray-300 leading-relaxed">
                  {request.message}
                </div>

              </div>

            ))}

          </div>

        )}

      </div>
    </main>
  );
}