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
          <div className="animate-pulse text-xl opacity-70">
            Loading Dashboard...
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="animate-fadeInUp">
        <h2 className="text-3xl font-bold mb-8 tracking-tight">
          Dashboard Overview
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
          {/* Card 1 */}
          <div className="bg-slate-800 p-6 rounded-xl shadow-lg 
                          transition-all duration-300 
                          hover:-translate-y-2 hover:shadow-2xl 
                          hover:bg-slate-700">
            <h3 className="text-lg opacity-60">Marketplace Cards</h3>
            <p className="text-3xl font-bold mt-3">
              {stats?.totalMatches || 0}
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-slate-800 p-6 rounded-xl shadow-lg 
                          transition-all duration-300 
                          hover:-translate-y-2 hover:shadow-2xl 
                          hover:bg-slate-700">
            <h3 className="text-lg opacity-60">Total Sessions</h3>
            <p className="text-3xl font-bold mt-3">
              {stats?.totalSessions || 0}
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-slate-800 p-6 rounded-xl shadow-lg 
                          transition-all duration-300 
                          hover:-translate-y-2 hover:shadow-2xl 
                          hover:bg-slate-700">
            <h3 className="text-lg opacity-60">Completed Sessions</h3>
            <p className="text-3xl font-bold mt-3">
              {stats?.completedSessions || 0}
            </p>
          </div>

        </div>

        <button
          onClick={() => navigate("/create-skill")}
          className="bg-blue-600 px-6 py-2 rounded-lg font-medium
                     transition-all duration-300
                     hover:bg-blue-700 hover:-translate-y-1
                     active:scale-95 shadow-md hover:shadow-xl"
        >
          Create Skill Card
        </button>
      </div>
    </Layout>
  );
}