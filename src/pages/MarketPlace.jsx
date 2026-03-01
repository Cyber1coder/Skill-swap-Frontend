import { useEffect, useState } from "react";
import axios from "../api/axios";
import Layout from "../components/Layout";

export default function Marketplace() {
  const [skills, setSkills] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [formData, setFormData] = useState({
    session_date: "",
    duration_minutes: "",
    mode: "virtual",
    meeting_link: "",
    location: ""
  });

  const fetchSkills = async () => {
    try {
      const res = await axios.get("/skills");
      setSkills(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleSchedule = async () => {
    try {
      if (!formData.session_date || !formData.duration_minutes) {
        alert("Please fill required fields");
        return;
      }

      const session_date = new Date(formData.session_date).toISOString();

      const res = await axios.post("/sessions", {
        partner_id: selectedCard.user_id,
        skill_topic: selectedCard.skill_title,
        session_date,
        duration_minutes: Number(formData.duration_minutes),
        session_type: "one-on-one",
        mode: formData.mode,
        meeting_link:
          formData.mode === "virtual" ? formData.meeting_link : null,
        location:
          formData.mode === "in-person" ? formData.location : null
      });

      console.log("Session created:", res.data);

      alert("Session scheduled successfully!");
      setSelectedCard(null);

      // Reset form
      setFormData({
        session_date: "",
        duration_minutes: "",
        mode: "virtual",
        meeting_link: "",
        location: ""
      });

    } catch (err) {
      console.error("Session error:", err.response?.data || err);
      alert("Error creating session");
    }
  };

  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-6">Skill Marketplace</h2>

      {skills.length === 0 && <p>No skill cards available.</p>}

      {skills.map((card) => (
        <div key={card.id} className="bg-slate-800 p-4 mb-4 rounded">
          <h3 className="text-lg font-semibold">{card.skill_title}</h3>
          <p>{card.description}</p>
          <p><strong>Type:</strong> {card.skill_type}</p>
          <p><strong>Level:</strong> {card.skill_level}</p>
          <p><strong>Availability:</strong> {card.availability}</p>

          <button
            onClick={() => setSelectedCard(card)}
            className="bg-blue-600 px-3 py-1 rounded mt-3"
          >
            Request Session
          </button>
        </div>
      ))}

      {/* MODAL */}
      {selectedCard && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center">
          <div className="bg-slate-900 p-6 rounded w-96">
            <h3 className="text-lg font-bold mb-4">
              Schedule Session for {selectedCard.skill_title}
            </h3>

            <input
              type="datetime-local"
              className="w-full p-2 mb-3 bg-slate-700 rounded"
              value={formData.session_date}
              onChange={(e) =>
                setFormData({ ...formData, session_date: e.target.value })
              }
            />

            <input
              type="number"
              placeholder="Duration (minutes)"
              className="w-full p-2 mb-3 bg-slate-700 rounded"
              value={formData.duration_minutes}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  duration_minutes: e.target.value
                })
              }
            />

            <select
              className="w-full p-2 mb-3 bg-slate-700 rounded"
              value={formData.mode}
              onChange={(e) =>
                setFormData({ ...formData, mode: e.target.value })
              }
            >
              <option value="virtual">Virtual</option>
              <option value="in-person">In-Person</option>
            </select>

            {formData.mode === "virtual" && (
              <input
                placeholder="Meeting link"
                className="w-full p-2 mb-3 bg-slate-700 rounded"
                value={formData.meeting_link}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    meeting_link: e.target.value
                  })
                }
              />
            )}

            {formData.mode === "in-person" && (
              <input
                placeholder="Location"
                className="w-full p-2 mb-3 bg-slate-700 rounded"
                value={formData.location}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    location: e.target.value
                  })
                }
              />
            )}

            <div className="flex justify-between mt-4">
              <button
                onClick={handleSchedule}
                className="bg-green-600 px-4 py-2 rounded"
              >
                Confirm
              </button>

              <button
                onClick={() => setSelectedCard(null)}
                className="bg-gray-600 px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>

          </div>
        </div>
      )}
    </Layout>
  );
}