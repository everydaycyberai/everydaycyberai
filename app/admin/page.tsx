"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

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
  const [leads, setLeads] = useState<{id:string;name:string;phone:string;page:string;createdAt:any}[]>([]);
  const [activeTab, setActiveTab] = useState<"requests"|"blogs"|"leads"|"subscribers">("requests");
  const [blogDescription, setBlogDescription] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [blogCategory, setBlogCategory] = useState("Cyber Security");
  const [blogTags, setBlogTags] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  useEffect(() => {

  const unsubscribe = onAuthStateChanged(
    auth,
    (user) => {

      if (!user) {
        router.push("/admin-login");
      } else {
        fetchRequests();
        fetchBlogs();
        fetchLeads();
        fetchSubscribers();
        fetchToolUsage();
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
  const fetchLeads = async () => {
    try {
      const { collection: col, getDocs: gd, query: q, orderBy: ob } = await import("firebase/firestore");
      const snap = await gd(q(col(db, "leads"), ob("createdAt","desc")));
      setLeads(snap.docs.map(d => ({id:d.id,...d.data()} as any)));
    } catch(e){console.error(e);}
  };

  const [subscribers, setSubscribers] = useState<{id:string;name:string;email:string;createdAt:any}[]>([]);
  const [toolUsage, setToolUsage] = useState<{id:string;path:string;views:number;lastViewed:any}[]>([]);
  const [newsletterSubject, setNewsletterSubject] = useState("");
  const [newsletterBody, setNewsletterBody] = useState("");
  const [sendingNewsletter, setSendingNewsletter] = useState(false);
  const [newsletterSent, setNewsletterSent] = useState(0);

  const fetchSubscribers = async () => {
    try {
      const { collection: col, getDocs: gd, query: q, orderBy: ob } = await import("firebase/firestore");
      const snap = await gd(q(col(db, "subscribers"), ob("createdAt","desc")));
      setSubscribers(snap.docs.map(d => ({id:d.id,...d.data()} as any)));
    } catch(e){console.error(e);}
  };

  const fetchToolUsage = async () => {
    try {
      const { collection: col, getDocs: gd, query: q, orderBy: ob } = await import("firebase/firestore");
      const snap = await gd(q(col(db, "tool_usage"), ob("views","desc")));
      setToolUsage(snap.docs.map(d => ({id:d.id,...d.data()} as any)));
    } catch(e){console.error(e);}
  };

  const sendNewsletterToAll = async () => {
    if (!newsletterSubject || !newsletterBody) return;
    setSendingNewsletter(true);
    let sent = 0;
    for (const sub of subscribers) {
      try {
        await import("@emailjs/browser").then(async (emailjs) => {
          await emailjs.send(
            "service_nlc4m47",
            "template_u4ejosm",
            {
              to_name:  sub.name,
              to_email: sub.email,
              name:     sub.name,
              email:    sub.email,
              mobile:   "Newsletter",
              message:  newsletterBody,
              serviceType: newsletterSubject,
            },
            "2nt6KxxekpR_yNTb_"
          );
        });
        sent++;
      } catch(e) { console.error("Failed to send to", sub.email); }
    }
    setNewsletterSent(sent);
    setSendingNewsletter(false);
    alert(`Newsletter sent to ${sent} subscribers!`);
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
<div className="bg-black/40 border border-cyan-500/20 rounded-xl px-4 py-3 text-xs text-gray-400 space-y-1">
  <p className="text-cyan-400 font-semibold mb-1">✍️ Formatting Guide (copy-paste style karo):</p>
  <p><code className="text-cyan-300"># Heading</code> — bada heading &nbsp;|&nbsp; <code className="text-cyan-300">## Heading</code> — chhota heading</p>
  <p><code className="text-cyan-300">**bold text**</code> — <b>bold</b> banega &nbsp;|&nbsp; <code className="text-cyan-300">*italic*</code> — <i>italic</i> banega</p>
  <p><code className="text-cyan-300">- point one</code> — bullet list (har line pe <code className="text-cyan-300">-</code> laga do)</p>
  <p><code className="text-cyan-300">![description](image-url)</code> — image lagane ke liye (koi bhi image link paste karo)</p>
  <p><code className="text-cyan-300">[link text](https://...)</code> — clickable link</p>
</div>
<textarea
  placeholder="Full Blog Content — Markdown formatting supported, see guide above"
  value={blogContent}
  onChange={(e) => setBlogContent(e.target.value)}
  rows={14}
  className="bg-black border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-cyan-400 font-mono text-sm"
/>
<button
  type="button"
  onClick={() => setShowPreview((p) => !p)}
  className="bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-cyan-400 px-4 py-2.5 rounded-xl text-sm font-medium transition w-fit"
>
  {showPreview ? "🙈 Hide Preview" : "👁️ Show Preview"}
</button>
{showPreview && (
  <div className="bg-black/60 border border-zinc-700 rounded-xl p-6">
    <p className="text-xs text-gray-500 mb-3 uppercase tracking-wide">Preview — is tarah dikhega blog page pe</p>
    <div className="prose-custom text-gray-300 leading-8 text-base">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{blogContent || "*Content yahan preview hoga...*"}</ReactMarkdown>
    </div>
  </div>
)}
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

        {/* ── Leads (from consultation popup) ── */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-4">📞 Consultation Leads ({leads.length})</h2>
          {leads.length === 0 ? (
            <p className="text-gray-500 bg-zinc-900 border border-zinc-800 rounded-2xl p-6">No leads yet.</p>
          ) : (
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-zinc-800 text-gray-400 text-left">
                    <th className="p-3">Name</th>
                    <th className="p-3">Phone</th>
                    <th className="p-3">Page</th>
                    <th className="p-3">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((l) => (
                    <tr key={l.id} className="border-t border-zinc-800">
                      <td className="p-3">{l.name}</td>
                      <td className="p-3">
                        <a href={`https://wa.me/91${l.phone.replace(/\D/g,"").slice(-10)}`} target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline">
                          {l.phone}
                        </a>
                      </td>
                      <td className="p-3 text-gray-500">{l.page}</td>
                      <td className="p-3 text-gray-500">{l.createdAt?.toDate?.().toLocaleDateString?.("en-IN") ?? "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* ── Newsletter Subscribers ── */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-4">📧 Newsletter Subscribers ({subscribers.length})</h2>
          {subscribers.length === 0 ? (
            <p className="text-gray-500 bg-zinc-900 border border-zinc-800 rounded-2xl p-6">No subscribers yet.</p>
          ) : (
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden max-h-96 overflow-y-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-zinc-800 text-gray-400 text-left">
                    <th className="p-3">Name</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Source</th>
                    <th className="p-3">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {subscribers.map((s) => (
                    <tr key={s.id} className="border-t border-zinc-800">
                      <td className="p-3">{s.name}</td>
                      <td className="p-3 text-cyan-400">{s.email}</td>
                      <td className="p-3 text-gray-500">{(s as any).source ?? "website"}</td>
                      <td className="p-3 text-gray-500">{s.createdAt?.toDate?.().toLocaleDateString?.("en-IN") ?? "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* ── Tool Usage ── */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-4">🛠️ Tool Usage — Most Popular First</h2>
          {toolUsage.length === 0 ? (
            <p className="text-gray-500 bg-zinc-900 border border-zinc-800 rounded-2xl p-6">No tool usage data yet — this fills up as visitors use your tools.</p>
          ) : (
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-zinc-800 text-gray-400 text-left">
                    <th className="p-3">Tool</th>
                    <th className="p-3">Views</th>
                    <th className="p-3">Last Viewed</th>
                  </tr>
                </thead>
                <tbody>
                  {toolUsage.map((t) => (
                    <tr key={t.id} className="border-t border-zinc-800">
                      <td className="p-3">
                        <Link href={t.path} target="_blank" className="text-cyan-400 hover:underline">{t.id}</Link>
                      </td>
                      <td className="p-3 font-bold">{t.views}</td>
                      <td className="p-3 text-gray-500">{t.lastViewed?.toDate?.().toLocaleDateString?.("en-IN") ?? "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
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