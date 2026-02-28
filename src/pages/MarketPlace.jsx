import { useEffect, useState } from "react";
import axios from "../api/axios";
import Layout from "../components/Layout";

export default function Marketplace() {
  const [skills, setSkills] = useState([]);

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

  const requestSession = async (card) => {
  try {
    const session_date = prompt("Enter session date (YYYY-MM-DD HH:MM)");
    const duration_minutes = prompt("Enter duration in minutes:");
    const mode = prompt("Mode? (virtual / in-person)");

    let meeting_link = null;
    let location = null;

    if (mode === "virtual") {
      meeting_link = prompt("Enter meeting link:");
    }

    if (mode === "in-person") {
      location = prompt("Enter location:");
    }

    await axios.post("/sessions", {
      partner_id: card.user_id,
      skill_topic: card.skill_title,
      session_date,
      duration_minutes: Number(duration_minutes),
      session_type: "one-on-one",
      mode,
      meeting_link,
      location
    });

    alert("Session scheduled successfully!");
  } catch (err) {
    console.error(err);
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
            onClick={() => requestSession(card)}
            className="bg-blue-600 px-3 py-1 rounded mt-3"
          >
            Request Session
          </button>
        </div>
      ))}
    </Layout>
  );
}