import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import Layout from "../components/Layout";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [skillsRes, sessionsRes] = await Promise.all([
          axios.get("/skills"),
          axios.get("/sessions")
        ]);

        const totalMatches = skillsRes.data.length;
        const totalSessions = sessionsRes.data.length;
        const completedSessions = sessionsRes.data.filter(
          (s) => s.status === "completed"
        ).length;

        setStats({
          totalMatches,
          totalSessions,
          completedSessions
        });
      } catch (error) {
        console.error("Dashboard error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse text-xl">
            Loading Dashboard...
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <h2 className="text-3xl font-bold mb-8">Dashboard Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-slate-800 p-6 rounded-xl shadow-lg">
          <h3 className="text-lg opacity-70">Marketplace Cards</h3>
          <p className="text-3xl font-bold mt-2">
            {stats?.totalMatches || 0}
          </p>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl shadow-lg">
          <h3 className="text-lg opacity-70">Total Sessions</h3>
          <p className="text-3xl font-bold mt-2">
            {stats?.totalSessions || 0}
          </p>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl shadow-lg">
          <h3 className="text-lg opacity-70">Completed Sessions</h3>
          <p className="text-3xl font-bold mt-2">
            {stats?.completedSessions || 0}
          </p>
        </div>
      </div>

      <button
        onClick={() => navigate("/create-skill")}
        className="bg-blue-600 px-4 py-2 rounded"
      >
        Create Skill Card
      </button>
    </Layout>
  );
}