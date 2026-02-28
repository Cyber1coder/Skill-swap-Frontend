import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Code, Brush, BookOpen, Music } from "lucide-react";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-900 via-black to-purple-900 text-white">

      {/* Animated Background Glow */}
      <div className="absolute w-105 h-105 bg-purple-600 rounded-full blur-4xl opacity-50 top-10 left-10 animate-pulse"></div>
      <div className="absolute w-105 h-105 bg-blue-600 rounded-full blur-4xl opacity-50 bottom-10 right-10 animate-pulse"></div>

      {/* Hero Section */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">

        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-6xl font-extrabold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
        >
          SkillSwap
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="text-lg opacity-80 max-w-xl mb-10"
        >
          Exchange skills with passionate learners around the world.
          Teach what you know. Learn what you love.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="flex gap-6"
        >
          <button
            onClick={() => navigate("/login")}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl transition duration-300 shadow-lg"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/register")}
            className="px-8 py-3 bg-white text-black hover:bg-gray-200 rounded-xl transition duration-300 shadow-lg"
          >
            Sign Up
          </button>
        </motion.div>

        {/* Floating Skill Icons */}
        <div className="mt-20 grid grid-cols-4 gap-10 opacity-80">
          {[Code, Brush, BookOpen, Music].map((Icon, index) => (
            <motion.div
              key={index}
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 3 + index }}
              className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl"
            >
              <Icon size={40} />
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}