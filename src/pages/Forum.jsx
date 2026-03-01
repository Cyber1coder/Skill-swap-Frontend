import { useEffect, useState } from "react";
import axios from "../api/axios";
import Layout from "../components/Layout";

export default function Forum() {
  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    content: ""
  });

  const fetchPosts = async () => {
    try {
      const res = await axios.get("/forum");
      setPosts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const createPost = async () => {
    try {
      if (!formData.title || !formData.content) {
        alert("Please fill all fields");
        return;
      }

      await axios.post("/forum", formData);

      setFormData({ title: "", content: "" });
      fetchPosts();

    } catch (err) {
      alert("Error creating post");
    }
  };

  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-6">Community Forum</h2>

      {/* Create Post Form */}
      <div className="bg-slate-800 p-4 rounded mb-6">
        <input
          placeholder="Post title"
          className="w-full p-2 mb-3 bg-slate-700 rounded"
          value={formData.title}
          onChange={(e) =>
            setFormData({ ...formData, title: e.target.value })
          }
        />

        <textarea
          placeholder="Write your question or experience..."
          className="w-full p-2 mb-3 bg-slate-700 rounded"
          rows="4"
          value={formData.content}
          onChange={(e) =>
            setFormData({ ...formData, content: e.target.value })
          }
        />

        <button
          onClick={createPost}
          className="bg-blue-600 px-4 py-2 rounded"
        >
          Post
        </button>
      </div>

      {/* Posts List */}
      {posts.map((post) => (
        <div key={post.id} className="bg-slate-800 p-4 mb-4 rounded">
          <h3 className="text-lg font-semibold">{post.title}</h3>
          <p className="text-gray-300 mt-2">{post.content}</p>

          <p className="text-sm text-gray-400 mt-3">
            Posted by {post.users?.name || "Unknown"} •{" "}
            {new Date(post.created_at).toLocaleString()}
          </p>
        </div>
      ))}

    </Layout>
  );
}