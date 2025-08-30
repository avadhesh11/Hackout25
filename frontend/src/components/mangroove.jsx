import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle,
  Shield,
  MapPin,
  Radio,
  Bell,
  Send,
  X,
} from "lucide-react";

// Fake AI response generator
const getAIResponse = (input) => {
  if (input.toLowerCase().includes("flood"))
    return "🚨 Heavy flood alert in your region. Evacuate low areas immediately.";
  if (input.toLowerCase().includes("earthquake"))
    return "⚠️ Earthquake detected. Drop, cover, and hold on.";
  return "✅ Situation stable. Stay prepared and monitor official alerts.";
};

// Floating particles background
const ParticleField = () => {
  const [bubbles, setBubbles] = useState([]);
  useEffect(() => {
    setBubbles(
      Array.from({ length: 30 }, () => ({
        size: Math.random() * 12 + 4,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 4,
        duration: Math.random() * 6 + 4,
        bg: Math.random() > 0.5 ? "bg-emerald-400" : "bg-cyan-400",
      }))
    );
  }, []);
  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      {bubbles.map(({ size, left, top, delay, duration, bg }, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: [0.1, 0.6, 0.1], y: [0, -8, 0] }}
          transition={{ duration, repeat: Infinity, delay }}
          className={`rounded-full ${bg} absolute`}
          style={{
            left: `${left}%`,
            top: `${top}%`,
            width: size,
            height: size,
            filter: "blur(6px)",
          }}
        />
      ))}
    </div>
  );
};

// Map with animated alerts
const CrisisMap = ({ reports }) => (
  <div className="relative h-96 w-full rounded-xl overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 shadow-lg">
    <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/World_map_-_low_resolution.svg/1200px-World_map_-_low_resolution.svg.png')] bg-cover bg-center opacity-20" />
    {reports.map((r, i) => {
      const top = 20 + i * 15;
      const left = 30 + i * 20;
      return (
        <motion.div
          key={r.id}
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.25, 1], opacity: 1 }}
          transition={{ delay: i * 0.12, type: "spring", stiffness: 120 }}
          style={{ top: `${top}%`, left: `${left}%` }}
          className={`absolute p-3 rounded-full shadow-2xl cursor-pointer transform -translate-x-1/2 -translate-y-1/2 ${
            r.status === "urgent"
              ? "bg-red-500"
              : r.status === "high"
              ? "bg-orange-500"
              : "bg-yellow-400"
          }`}
          title={`${r.location} — ${r.threat}`}
        >
          <AlertTriangle className="w-5 h-5 text-white" />
        </motion.div>
      );
    })}
  </div>
);

// Emergency form
const EmergencyForm = ({ onSubmit }) => {
  const [form, setForm] = useState({ location: "", threat: "", urgency: "low" });
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(form);
        setForm({ location: "", threat: "", urgency: "low" });
      }}
      className="bg-white p-6 rounded-xl shadow-xl space-y-4"
    >
      <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
        <Radio className="w-5 h-5 text-emerald-500" /> Report Emergency
      </h3>
      <input
        value={form.location}
        onChange={(e) => setForm({ ...form, location: e.target.value })}
        placeholder="Location"
        className="w-full border rounded-lg p-2"
        required
      />
      <input
        value={form.threat}
        onChange={(e) => setForm({ ...form, threat: e.target.value })}
        placeholder="Threat type (e.g. Flood, Fire)"
        className="w-full border rounded-lg p-2"
        required
      />
      <div className="flex gap-2">
        {["low", "high", "urgent"].map((lvl) => (
          <button
            type="button"
            key={lvl}
            onClick={() => setForm({ ...form, urgency: lvl })}
            className={`px-3 py-2 rounded-full border ${
              form.urgency === lvl
                ? "bg-emerald-500 text-white"
                : "bg-white text-slate-700"
            }`}
          >
            {lvl.charAt(0).toUpperCase() + lvl.slice(1)}
          </button>
        ))}
      </div>
      <button
        type="submit"
        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2"
      >
        <Send className="w-4 h-4" /> Submit
      </button>
    </form>
  );
};

// AI Assistant
const AIAssistant = ({ query }) => {
  const [response, setResponse] = useState("");
  useEffect(() => {
    if (query) setResponse(getAIResponse(query));
  }, [query]);
  return (
    <div className="bg-slate-900 text-slate-100 rounded-xl p-4 shadow-xl space-y-2">
      <h3 className="flex items-center gap-2 font-semibold">
        <Shield className="w-5 h-5 text-cyan-400" /> AI Assistant
      </h3>
      {response ? (
        <p className="text-emerald-300">{response}</p>
      ) : (
        <p className="text-slate-400">Ask about threats to get advice...</p>
      )}
    </div>
  );
};

// Main App
export default function DisasterResponseApp() {
  const [reports, setReports] = useState([]);
  const [query, setQuery] = useState("");
  const [aiInput, setAiInput] = useState("");

  const handleSubmit = (r) =>
    setReports((prev) => [
      ...prev,
      { id: Date.now(), location: r.location, threat: r.threat, status: r.urgency },
    ]);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-cyan-50 to-emerald-100 p-6">
      <ParticleField />
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-emerald-700 flex items-center justify-center gap-2">
          <Bell className="w-7 h-7 text-emerald-600" /> CrisisConnect
        </h1>
        <p className="text-slate-600">AI-driven emergency response dashboard</p>
      </header>

      <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        <CrisisMap reports={reports} />
        <div className="space-y-6">
          <EmergencyForm onSubmit={handleSubmit} />
          <div className="bg-white rounded-xl p-4 shadow-xl space-y-3">
            <h3 className="font-semibold text-slate-700">Active Alerts</h3>
            <AnimatePresence>
              {reports.map((r) => (
                <motion.div
                  key={r.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-between p-3 rounded-lg border"
                >
                  <span className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-emerald-500" /> {r.location} —{" "}
                    {r.threat}
                  </span>
                  <div
                    className={`px-3 py-2 rounded-full font-semibold ${
                      r.status === "urgent"
                        ? "bg-red-100 text-red-700"
                        : r.status === "high"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {r.status.toUpperCase()}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-xl">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setQuery(aiInput);
              }}
              className="flex gap-2"
            >
              <input
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                placeholder="Ask AI about threats..."
                className="flex-1 border rounded-lg p-2"
              />
              <button className="bg-cyan-600 text-white px-4 py-2 rounded-lg">
                Ask
              </button>
            </form>
            <div className="mt-3">
              <AIAssistant query={query} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
