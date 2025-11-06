import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import {
  UserPlus,
  Video,
  ShieldCheck,
  MousePointerClick,
  Trophy,
} from "lucide-react";

interface FeatureItem {
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  mockup: React.ReactNode;
  span?: string;
}

const features: FeatureItem[] = [
    // ──────────────────────────────────────────────────────────────
    // 1v1 Mode – Two avatars typing + blinking cursors + sync wave
    // ──────────────────────────────────────────────────────────────
    {
      title: "1v1 Mode",
      subtitle: "Collaborate & Solve Together",
      description:
        "Invite a friend and solve coding problems together in real-time — code sync, chat, and learn just like real pair interviews.",
      icon: <UserPlus className="w-5 h-5 text-primary" />,
      mockup: (
        <motion.svg
          viewBox="0 0 220 110"
          className="w-full h-28"
          initial="rest"
          whileHover="hover"
          animate="rest"
        >
          {/* Background card */}
          <rect
            x="10"
            y="15"
            width="200"
            height="80"
            rx="8"
            className="fill-card stroke-border"
            strokeWidth="1.5"
          />
  
          {/* Left coder */}
          <motion.circle
            cx="45"
            cy="40"
            r="10"
            className="fill-primary/70"
            variants={{ hover: { scale: 1.2 } }}
          />
          <text x="45" y="75" className="fill-primary text-xs font-bold text-center">
            You
          </text>
  
          {/* Right coder */}
          <motion.circle
            cx="175"
            cy="40"
            r="10"
            className="fill-primary/50"
            variants={{ hover: { scale: 1.2 } }}
          />
          <text x="175" y="75" className="fill-primary text-xs font-bold text-center">
            Friend
          </text>
  
          {/* Code lines */}
          <motion.g variants={{ hover: { y: -2 } }}>
            <rect x="30" y="28" width="65" height="4" rx="2" className="fill-primary/30" />
            <rect x="30" y="36" width="55" height="4" rx="2" className="fill-primary/20" />
            <rect x="30" y="44" width="70" height="4" rx="2" className="fill-primary/30" />
          </motion.g>
  
          <motion.g variants={{ hover: { y: -2 } }}>
            <rect x="125" y="28" width="60" height="4" rx="2" className="fill-primary/30" />
            <rect x="125" y="36" width="70" height="4" rx="2" className="fill-primary/20" />
            <rect x="125" y="44" width="50" height="4" rx="2" className="fill-primary/30" />
          </motion.g>
  
          {/* Blinking cursors */}
          <motion.rect
            x="95"
            y="28"
            width="2"
            height="10"
            className="fill-primary"
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 1 }}
          />
          <motion.rect
            x="95"
            y="44"
            width="2"
            height="10"
            className="fill-primary"
            animate={{ opacity: [0, 1] }}
            transition={{ repeat: Infinity, duration: 1, delay: 0.5 }}
          />
  
          {/* Sync wave */}
          <motion.path
            d="M 55 55 Q 110 45, 165 55"
            fill="none"
            stroke="url(#wave)"
            strokeWidth="3"
            initial={{ pathLength: 0 }}
            variants={{ hover: { pathLength: 1 } }}
            transition={{ duration: 0.8 }}
          />
          <defs>
            <linearGradient id="wave" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
        </motion.svg>
      ),
      span: "lg:col-span-2",
    },
  
    // ──────────────────────────────────────────────────────────────
    // Solo Mode – Single coder + timer + progress ring
    // ──────────────────────────────────────────────────────────────
    {
      title: "Solo Mode",
      subtitle: "Focus on Speed & Growth",
      description:
        "Sharpen your problem-solving speed and accuracy with timed solo challenges that adapt to your skill level.",
      icon: <MousePointerClick className="w-5 h-5 text-primary" />,
      mockup: (
        <motion.svg
          viewBox="0 0 200 100"
          className="w-full h-24"
          initial="rest"
          whileHover="hover"
        >
          <rect
            x="20"
            y="20"
            width="160"
            height="60"
            rx="8"
            className="fill-card stroke-border"
            strokeWidth="1.5"
          />
  
          {/* Avatar */}
          <motion.circle
            cx="100"
            cy="35"
            r="9"
            className="fill-primary"
            variants={{ hover: { scale: 1.3 } }}
          />
  
          {/* Code */}
          <g>
            <rect x="40" y="48" width="50" height="4" rx="2" className="fill-primary/30" />
            <rect x="40" y="56" width="70" height="4" rx="2" className="fill-primary/20" />
            <rect x="40" y="64" width="45" height="4" rx="2" className="fill-primary/30" />
          </g>
  
          {/* Timer ring */}
          <circle cx="150" cy="50" r="14" className="stroke-border fill-none" strokeWidth="3" />
          <motion.circle
            cx="150"
            cy="50"
            r="14"
            className="stroke-primary fill-none"
            strokeWidth="3"
            strokeDasharray="88"
            initial={{ strokeDashoffset: 88 }}
            animate={{ strokeDashoffset: 20 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            transform="rotate(-90 150 50)"
          />
          <text x="150" y="54" className="fill-primary text-xs font-bold">23s</text>
        </motion.svg>
      ),
    },
  
    // ──────────────────────────────────────────────────────────────
    // Live Video & Chat – Video feed + speech bubbles
    // ──────────────────────────────────────────────────────────────
    {
      title: "Live Video & Chat",
      subtitle: "Real-time Collaboration",
      description:
        "Built-in video calling and chat allow you to connect and communicate seamlessly while solving problems together.",
      icon: <Video className="w-5 h-5 text-primary" />,
      mockup: (
        <motion.svg
          viewBox="0 0 200 100"
          className="w-full h-24"
          initial="rest"
          whileHover="hover"
        >
          <rect
            x="15"
            y="20"
            width="130"
            height="60"
            rx="8"
            className="fill-card stroke-border"
            strokeWidth="1.5"
          />
  
          {/* Video feed */}
          <rect x="25" y="30" width="50" height="35" rx="4" className="fill-primary/20" />
          <rect x="85" y="30" width="50" height="35" rx="4" className="fill-primary/30" />
          <circle cx="50" cy="48" r="7" className="fill-primary/70" />
          <circle cx="110" cy="48" r="7" className="fill-primary/50" />
  
          {/* Play icon */}
          <motion.path
            d="M 95 45 L 105 50 L 95 55 Z"
            className="fill-primary"
            variants={{ hover: { scale: 1.2 } }}
          />
  
          {/* Chat bubbles */}
          <motion.g variants={{ hover: { y: -5 } }}>
            <path
              d="M 135 35 Q 145 30, 155 35 L 160 40 L 155 45 Q 145 40, 135 35 Z"
              className="fill-primary/60"
            />
            <text x="148" y="43" className="fill-white text-[10px] font-bold">Hi!</text>
          </motion.g>
  
          <motion.g variants={{ hover: { y: 5 } }}>
            <path
              d="M 135 60 Q 145 65, 155 60 L 160 55 L 155 50 Q 145 55, 135 60 Z"
              className="fill-primary/40"
            />
            <text x="142" y="58" className="fill-white text-[9px]">Got it!</text>
          </motion.g>
        </motion.svg>
      ),
    },
  
    // ──────────────────────────────────────────────────────────────
    // Cheating Detection – Eye scanner + alert pulse
    // ──────────────────────────────────────────────────────────────
    {
      title: "Cheating Detection",
      subtitle: "AI Proctor System",
      description:
        "Monitors tab switching, detects pasted AI-generated content, and ensures fair and authentic practice sessions.",
      icon: <ShieldCheck className="w-5 h-5 text-primary" />,
      mockup: (
        <motion.svg
          viewBox="0 0 200 100"
          className="w-full h-24"
          initial="rest"
          whileHover="hover"
        >
          <rect
            x="20"
            y="20"
            width="160"
            height="60"
            rx="8"
            className="fill-card stroke-border"
            strokeWidth="1.5"
          />
  
          {/* Scanning eye */}
          <g>
            <circle cx="100" cy="45" r="18" className="fill-primary/20" />
            <circle cx="100" cy="45" r="10" className="fill-primary/60" />
            <circle cx="103" cy="42" r="4" className="fill-primary" />
            <motion.circle
              cx="100"
              cy="45"
              r="22"
              fill="none"
              stroke="url(#scan)"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </g>
  
          {/* Alert pulse */}
          <motion.circle
            cx="150"
            cy="35"
            r="6"
            className="fill-red-500"
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
  
          <defs>
            <linearGradient id="scan" x1="0%" y1="0%" x2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
        </motion.svg>
      ),
    },
  
    // ──────────────────────────────────────────────────────────────
    // Leaderboard – Podium + animated confetti
    // ──────────────────────────────────────────────────────────────
    {
      title: "Leaderboard & Rank",
      subtitle: "Track Your Progress",
      description:
        "Compete with peers and climb the leaderboard based on your accuracy, speed, and consistency across challenges.",
      icon: <Trophy className="w-5 h-5 text-primary" />,
      mockup: (
        <motion.svg
          viewBox="0 0 200 100"
          className="w-full h-24"
          initial="rest"
          whileHover="hover"
        >
          <rect
            x="30"
            y="30"
            width="140"
            height="50"
            rx="8"
            className="fill-card stroke-border"
            strokeWidth="1.5"
          />
  
          {/* Podium */}
          <rect x="55" y="45" width="25" height="25" rx="4" className="fill-primary/70" />
          <rect x="90" y="35" width="25" height="35" rx="4" className="fill-primary/90" />
          <rect x="125" y="50" width="25" height="20" rx="4" className="fill-primary/50" />
  
          <text x="67" y="64" className="fill-white text-xs font-bold">2</text>
          <text x="102" y="54" className="fill-white text-xs font-bold">1</text>
          <text x="137" y="64" className="fill-white text-xs font-bold">3</text>
  
          {/* Trophy */}
          <motion.g
            variants={{ hover: { y: -8, rotate: [0, -5, 5, 0] } }}
            transition={{ duration: 0.4 }}
          >
            <path
              d="M 170 45 L 165 55 L 175 55 Z M 170 55 L 170 60"
              className="stroke-amber-400 fill-amber-400"
              strokeWidth="2"
            />
            <text x="170" y="40" className="fill-amber-400 text-2xl" textAnchor="middle">
              🏆
            </text>
          </motion.g>
  
          {/* Confetti */}
          {[...Array(6)].map((_, i) => (
            <motion.circle
              key={i}
              cx={40 + i * 20}
              cy="20"
              r="3"
              className="fill-primary"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 80, opacity: [0, 1, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.svg>
      ),
    },
  ];

export const FeaturesBento: React.FC = () => {
  return (
    <section
      id="features"
      className="py-20 px-6 bg-background text-foreground overflow-hidden"
    >
      <motion.div
        className="max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="text-4xl font-bold text-center mb-16">
        Practice. Pair. Perform.
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[1fr]">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              className={cn(
                "relative bg-card border border-border rounded-2xl p-8 flex flex-col justify-between hover:border-primary/50 hover:shadow-lg transition-all duration-200 group",
                feature.span
              )}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={{
                delay: i * 0.1,
                duration: 0.6,
                ease: "easeOut",
              }}
            >
              {/* Hover glow */}
              <motion.div
                className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 group-hover:opacity-100 blur-xl transition-opacity"
                aria-hidden="true"
              />

              {/* Header */}
              <div className="relative z-10 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  {feature.icon}
                  <span className="uppercase text-xs font-semibold text-muted-foreground tracking-wider">
                    {feature.subtitle}
                  </span>
                </div>
                <h3 className="text-xl font-bold">{feature.title}</h3>
              </div>

              {/* Mockup */}
              <motion.div
                className="relative z-10 mb-6"
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {feature.mockup}
              </motion.div>

              {/* Description */}
              <p className="relative z-10 text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
