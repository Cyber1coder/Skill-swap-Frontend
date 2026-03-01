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

  const leaveRating = async (session) => {
    const rating = prompt("Rate from 1 to 5:");
    const feedback = prompt("Leave feedback:");

    if (!rating) return;

    try {
      await axios.post("/ratings", {
        session_id: session.id,
        reviewee_id:
          String(session.requester_id) === String(user?.id)
            ? session.partner_id
            : session.requester_id,
        rating: Number(rating),
        feedback
      });

      fetchSessions();
    } catch (err) {
      alert(err.response?.data?.message || "Error submitting rating");
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
          const isPartner =
            String(s.partner_id) === String(user?.id);

          const isRequester =
            String(s.requester_id) === String(user?.id);

          return (
            <div key={s.id} className="bg-slate-800 p-4 mb-4 rounded">
              <p><strong>Skill:</strong> {s.skill_topic}</p>
              <p><strong>Date:</strong> {new Date(s.session_date).toLocaleString()}</p>
              <p><strong>Status:</strong> {s.status}</p>

              {/* Show Rating */}
              {s.ratings && s.ratings.length > 0 && (
                <div className="mt-3 bg-slate-700 p-3 rounded">
                  <p className="font-semibold text-yellow-400">
                    ⭐ Rating: {s.ratings[0].rating} / 5
                  </p>
                  {s.ratings[0].feedback && (
                    <p className="text-gray-300 mt-1">
                      "{s.ratings[0].feedback}"
                    </p>
                  )}
                </div>
              )}

              <div className="flex gap-3 mt-3 flex-wrap">

                {s.status === "pending" && isPartner && (
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

                {s.status === "pending" && isRequester && (
                  <button
                    onClick={() => updateStatus(s.id, "cancelled")}
                    className="bg-yellow-600 px-3 py-1 rounded"
                  >
                    Cancel
                  </button>
                )}

                {s.status === "accepted" && (
                  <button
                    onClick={() => updateStatus(s.id, "completed")}
                    className="bg-blue-600 px-3 py-1 rounded"
                  >
                    Mark Completed
                  </button>
                )}

                {s.status === "completed" &&
                  (!s.ratings || s.ratings.length === 0) && (
                    <button
                      onClick={() => leaveRating(s)}
                      className="bg-purple-600 px-3 py-1 rounded"
                    >
                      Leave Rating
                    </button>
                  )}

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