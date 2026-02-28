import { useEffect, useState, useContext } from "react";
import axios from "../api/axios";
import Layout from "../components/Layout";
import { AuthContext } from "../context/AuthContext";

export default function Sessions() {
  const { user } = useContext(AuthContext);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSessions = async () => {
    try {
      const res = await axios.get("/sessions");
      setSessions(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await axios.patch(`/sessions/${id}`, { status });
      fetchSessions();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteSession = async (id) => {
    try {
      await axios.delete(`/sessions/${id}`);
      fetchSessions();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-6">Sessions</h2>

      {loading && <p>Loading...</p>}

      {!loading && sessions.length === 0 && (
        <p className="text-gray-400">No sessions found.</p>
      )}

      {!loading &&
        sessions.map((s) => {
          const now = new Date();
          const sessionTime = new Date(s.session_date);
          const diffMinutes = (sessionTime - now) / (1000 * 60);

          return (
            <div key={s.id} className="bg-slate-800 p-4 mb-4 rounded">
              <p><strong>Skill:</strong> {s.skill_topic}</p>
              <p><strong>Date:</strong> {sessionTime.toLocaleString()}</p>
              <p><strong>Duration:</strong> {s.duration_minutes} mins</p>
              <p><strong>Mode:</strong> {s.mode}</p>

              {s.mode === "virtual" && s.meeting_link && (
                <p>
                  <strong>Meeting Link:</strong>{" "}
                  <a
                    href={s.meeting_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 underline"
                  >
                    Join
                  </a>
                </p>
              )}

              {s.mode === "in-person" && s.location && (
                <p><strong>Location:</strong> {s.location}</p>
              )}

              <p>
                <strong>Status:</strong>{" "}
                <span className="capitalize">{s.status}</span>
              </p>

              {/* Reminder Indicator */}
              {s.status === "accepted" && diffMinutes <= 15 && diffMinutes > 0 && (
                <p className="text-yellow-400 font-semibold mt-2">
                  🔔 Session starting soon!
                </p>
              )}

              <div className="flex gap-3 mt-3 flex-wrap">

                {/* Accept / Reject (Partner Only) */}
                {s.partner_id === user.id && s.status === "pending" && (
                  <>
                    <button
                      onClick={() => updateStatus(s.id, "accepted")}
                      className="bg-green-600 px-3 py-1 rounded"
                    >
                      Accept
                    </button>

                    <button
                      onClick={() => updateStatus(s.id, "rejected")}
                      className="bg-red-600 px-3 py-1 rounded"
                    >
                      Reject
                    </button>
                  </>
                )}

                {/* Cancel (Requester Only) */}
                {s.requester_id === user.id && s.status === "pending" && (
                  <button
                    onClick={() => updateStatus(s.id, "cancelled")}
                    className="bg-yellow-600 px-3 py-1 rounded"
                  >
                    Cancel
                  </button>
                )}

                {/* Complete */}
                {s.status === "accepted" && (
                  <button
                    onClick={() => updateStatus(s.id, "completed")}
                    className="bg-blue-600 px-3 py-1 rounded"
                  >
                    Mark Completed
                  </button>
                )}

                {/* Delete */}
                <button
                  onClick={() => deleteSession(s.id)}
                  className="bg-gray-600 px-3 py-1 rounded"
                >
                  Delete
                </button>

              </div>
            </div>
          );
        })}
    </Layout>
  );
}