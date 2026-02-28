import { useEffect, useState } from "react";
import axios from "../api/axios";
import Layout from "../components/Layout";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const res = await axios.get("/profile");
      setProfile(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const updateProfile = async () => {
    try {
      await axios.put("/profile", {
        bio: profile.bio,
        interests: profile.interests
      });
      alert("Profile updated successfully!");
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <Layout>Loading...</Layout>;

  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-6">Profile</h2>

      <div className="bg-slate-800 p-6 rounded max-w-xl">

        <p className="mb-3">
          <strong>Name:</strong> {profile.name}
        </p>

        <p className="mb-3">
          <strong>Email:</strong> {profile.email}
        </p>

        <textarea
          className="w-full p-3 mb-3 bg-slate-700 rounded"
          value={profile.bio || ""}
          onChange={e =>
            setProfile({ ...profile, bio: e.target.value })
          }
          placeholder="Bio"
        />

        <input
          className="w-full p-3 mb-3 bg-slate-700 rounded"
          value={profile.interests || ""}
          onChange={e =>
            setProfile({ ...profile, interests: e.target.value })
          }
          placeholder="Interests (comma separated)"
        />

        <button
          onClick={updateProfile}
          className="bg-blue-500 px-4 py-2 rounded"
        >
          Save Changes
        </button>

      </div>
    </Layout>
  );
}