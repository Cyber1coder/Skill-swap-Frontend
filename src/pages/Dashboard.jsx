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
          <div className="loading-shimmer w-48 h-6 rounded-md"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="dashboard-bg min-h-screen p-6 relative overflow-hidden">

        <FloatingBlobs />

        <div className="relative z-10 animate-fadeInUp">

          {/* ✅ Simple Welcome Section */}
          <div className="mb-10">
            <h2 className="text-3xl font-bold tracking-tight">
              Welcome back 👋
            </h2>
            <p className="opacity-60 mt-2">
              Here’s your activity summary for today.
            </p>
          </div>

        
          <button
            onClick={() => navigate("/create-skill")}
            className="premium-btn"
          >
            Create Skill Card
          </button>

        </div>

      </div>
    </Layout>
  );
}

/* ---------- Animated Card ---------- */

function AnimatedCard({ children, delay }) {
  return (
    <div
      style={{ animationDelay: `${delay}ms` }}
      className="glass-card opacity-0 animate-cardEnter"
    >
      {children}
    </div>
  );
}

/* ---------- Count Up ---------- */

function CountUp({ value }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1000;
    const increment = value / (duration / 16);

    const counter = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(counter);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(counter);
  }, [value]);

  return <p className="text-4xl font-bold mt-4">{count}</p>;
}

/* ---------- Floating Background ---------- */

function FloatingBlobs() {
  return (
    <>
      <div className="blob blob1"></div>
      <div className="blob blob2"></div>
      <div className="blob blob3"></div>
    </>
  );
}