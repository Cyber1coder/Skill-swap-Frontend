import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import Layout from "../components/Layout";

/* ================= Dashboard ================= */

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalMatches: 0,
    totalSessions: 0,
    completedSessions: 0
  });

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const [skillsRes, sessionsRes] = await Promise.all([
        axios.get("/skills"),
        axios.get("/sessions")
      ]);

      const sessions = sessionsRes.data;

      setStats({
        totalMatches: skillsRes.data.length,
        totalSessions: sessions.length,
        completedSessions: sessions.filter(
          (s) => s.status === "completed"
        ).length
      });

    } catch (error) {
      console.error("Failed to fetch dashboard stats:", error);
    } finally {
      setLoading(false);
    }
  };

  /* ---------- Loading State ---------- */

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="loading-shimmer w-48 h-6 rounded-md"></div>
        </div>
      </Layout>
    );
  }

  /* ---------- UI ---------- */

  return (
    <Layout>
      <div className="dashboard-bg min-h-screen p-6 relative overflow-hidden">

        <FloatingBlobs />

        <div className="relative z-10 animate-fadeInUp">

          {/* Welcome Section */}

          <div className="mb-10">
            <h2 className="text-3xl font-bold tracking-tight">
              Welcome back 👋
            </h2>

            <p className="opacity-60 mt-2">
              Here's your activity summary for today.
            </p>
          </div>

          {/* Stats */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">

            <StatsCard
              title="Marketplace Cards"
              value={stats.totalMatches}
              delay={0}
            />

            <StatsCard
              title="Total Sessions"
              value={stats.totalSessions}
              delay={200}
            />

            <StatsCard
              title="Completed Sessions"
              value={stats.completedSessions}
              delay={400}
            />

          </div>

          {/* Action */}

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

/* ================= Stats Card ================= */

function StatsCard({ title, value, delay }) {
  return (
    <div
      style={{ animationDelay: `${delay}ms` }}
      className="glass-card opacity-0 animate-cardEnter"
    >
      <h3 className="text-lg opacity-60">{title}</h3>

      <CountUp value={value} />
    </div>
  );
}

/* ================= Count Up Animation ================= */

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

  return (
    <p className="text-4xl font-bold mt-4">
      {count}
    </p>
  );
}

/* ================= Floating Background ================= */

function FloatingBlobs() {
  return (
    <>
      <div className="blob blob1"></div>
      <div className="blob blob2"></div>
      <div className="blob blob3"></div>
    </>
  );
}