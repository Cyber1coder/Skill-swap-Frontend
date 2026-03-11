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
          axios.get("/sessions"),
        ]);

        const totalMatches = skillsRes.data.length;
        const totalSessions = sessionsRes.data.length;
        const completedSessions = sessionsRes.data.filter(
          (s) => s.status === "completed"
        ).length;

        setStats({
          totalMatches,
          totalSessions,
          completedSessions,
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
      <div
        className="
        min-h-screen
        p-4 sm:p-6 lg:p-8
        relative
        overflow-hidden
        bg-gray-50
        dark:bg-gradient-to-br
        dark:from-slate-900
        dark:via-slate-800
        dark:to-slate-900
        "
      >
        <FloatingBlobs />

        <div className="relative z-10 animate-fadeInUp">
          
          {/* Welcome Section */}

          <div className="mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              Welcome back 👋
            </h2>

            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Here's your activity summary for today.
            </p>
          </div>

          {/* Stats Cards */}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">

            <StatsCard
              title="Marketplace Cards"
              value={stats?.totalMatches || 0}
              delay="0"
            />

            <StatsCard
              title="Total Sessions"
              value={stats?.totalSessions || 0}
              delay="200"
            />

            <StatsCard
              title="Completed Sessions"
              value={stats?.completedSessions || 0}
              delay="400"
            />

          </div>

          {/* Create Button */}

          <button
            onClick={() => navigate("/create-skill")}
            className="
            mt-4
            px-6
            py-3
            rounded-lg
            font-medium
            text-white
            bg-blue-500
            hover:bg-blue-600
            transition
            shadow-md
            w-full sm:w-auto
            "
          >
            Create Skill Card
          </button>

        </div>
      </div>
    </Layout>
  );
}

/* ---------- Stats Card ---------- */

function StatsCard({ title, value, delay }) {
  return (
    <div
      style={{ animationDelay: `${delay}ms` }}
      className="
      opacity-0
      animate-cardEnter
      p-6
      rounded-xl
      shadow-md
      bg-white
      dark:bg-slate-800
      transition
      "
    >
      <h3 className="text-gray-600 dark:text-gray-400 text-lg">
        {title}
      </h3>

      <CountUp value={value} />
    </div>
  );
}

/* ---------- Count Up Animation ---------- */

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
    <p className="text-4xl font-bold mt-4 text-gray-900 dark:text-white">
      {count}
    </p>
  );
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