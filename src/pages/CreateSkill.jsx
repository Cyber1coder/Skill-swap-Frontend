import { useState } from "react";
import axios from "../api/axios";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";

export default function CreateSkill() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    skill_title: "",
    description: "",
    skill_type: "offer",
    skill_level: "",
    availability: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/skills", form);
      navigate("/marketplace");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-6">Create Skill Card</h2>

      <form onSubmit={handleSubmit} className="bg-slate-800 p-6 rounded space-y-4">
        <input
          type="text"
          placeholder="Skill Title"
          className="w-full p-2 bg-slate-700 rounded"
          value={form.skill_title}
          onChange={(e) => setForm({ ...form, skill_title: e.target.value })}
          required
        />

        <textarea
          placeholder="Description"
          className="w-full p-2 bg-slate-700 rounded"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <select
          className="w-full p-2 bg-slate-700 rounded"
          value={form.skill_type}
          onChange={(e) => setForm({ ...form, skill_type: e.target.value })}
        >
          <option value="offer">Offer Skill</option>
          <option value="learn">Want to Learn</option>
        </select>

        <input
          type="text"
          placeholder="Skill Level"
          className="w-full p-2 bg-slate-700 rounded"
          value={form.skill_level}
          onChange={(e) => setForm({ ...form, skill_level: e.target.value })}
        />

        <input
          type="text"
          placeholder="Availability"
          className="w-full p-2 bg-slate-700 rounded"
          value={form.availability}
          onChange={(e) => setForm({ ...form, availability: e.target.value })}
        />

        <button className="bg-blue-600 px-4 py-2 rounded">
          Create Skill
        </button>
      </form>
    </Layout>
  );
}