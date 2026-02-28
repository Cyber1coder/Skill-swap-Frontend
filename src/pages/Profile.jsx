import { useEffect, useState } from "react";
import axios from "../api/axios";
import Layout from "../components/Layout";

export default function Profile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    axios.get("/profile").then(res => setProfile(res.data));
  }, []);

  const updateProfile = async () => {
    await axios.put("/profile", {
      bio: profile.bio,
      interests: profile.interests
    });
    alert("Updated");
  };

  if (!profile) return <Layout>Loading...</Layout>;

  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-6">Profile</h2>

      <input
        className="w-full p-3 mb-3 bg-slate-700 rounded"
        value={profile.bio || ""}
        onChange={e => setProfile({...profile, bio: e.target.value})}
        placeholder="Bio"
      />

      <input
        className="w-full p-3 mb-3 bg-slate-700 rounded"
        value={profile.interests || ""}
        onChange={e => setProfile({...profile, interests: e.target.value})}
        placeholder="Interests"
      />

      <button
        onClick={updateProfile}
        className="bg-blue-500 px-4 py-2 rounded"
      >
        Save
      </button>
    </Layout>
  );
}