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
  const [loading, setLoading] = useState(true);

  useEffect(() => {

  const unsubscribe = onAuthStateChanged(
    auth,
    (user) => {

      if (!user) {
        router.push("/admin-login");
      } else {
        fetchRequests();
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