import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import {
  Users2,
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
  {
    title: "1v1 Mode",
    subtitle: "Collaborate & Solve Together",
    description:
      "Invite a friend and solve coding problems together in real-time — code sync, chat, and learn just like real pair interviews.",
    icon: <UserPlus className="w-5 h-5 text-primary" />,
    mockup: (
      <svg
        viewBox="0 0 200 100"
        className="w-full h-24 mx-auto text-muted-foreground"
      >
        <rect
          x="10"
          y="20"
          width="80"
          height="60"
          rx="6"
          className="fill-card stroke-border"
          strokeWidth="1.5"
        />
        <rect
          x="110"
          y="20"
          width="80"
          height="60"
          rx="6"
          className="fill-card stroke-border"
          strokeWidth="1.5"
        />
        <circle cx="50" cy="50" r="8" className="fill-primary/40" />
        <circle cx="150" cy="50" r="8" className="fill-primary/60" />
        <line
          x1="58"
          y1="50"
          x2="142"
          y2="50"
          className="stroke-primary/40"
          strokeWidth="2"
        />
      </svg>
    ),
    span: "lg:col-span-2",
  },
  {
    title: "Solo Mode",
    subtitle: "Focus on Speed & Growth",
    description:
      "Sharpen your problem-solving speed and accuracy with timed solo challenges that adapt to your skill level.",
    icon: <MousePointerClick className="w-5 h-5 text-primary" />,
    mockup: (
      <svg
        viewBox="0 0 200 100"
        className="w-full h-24 mx-auto text-muted-foreground"
      >
        <rect
          x="30"
          y="30"
          width="140"
          height="40"
          rx="6"
          className="fill-card stroke-border"
          strokeWidth="1.5"
        />
        <rect
          x="40"
          y="40"
          width="40"
          height="20"
          rx="4"
          className="fill-primary/30"
        />
        <rect
          x="90"
          y="40"
          width="70"
          height="20"
          rx="4"
          className="fill-muted"
        />
      </svg>
    ),
  },
  {
    title: "Live Video & Chat",
    subtitle: "Real-time Collaboration",
    description:
      "Built-in video calling and chat allow you to connect and communicate seamlessly while solving problems together.",
    icon: <Video className="w-5 h-5 text-primary" />,
    mockup: (
      <svg
        viewBox="0 0 200 100"
        className="w-full h-24 mx-auto text-muted-foreground"
      >
        <rect
          x="15"
          y="25"
          width="120"
          height="50"
          rx="6"
          className="fill-card stroke-border"
          strokeWidth="1.5"
        />
        <polygon points="145,40 180,50 145,60" className="fill-primary/40" />
        <circle cx="45" cy="50" r="6" className="fill-primary/60" />
        <circle cx="65" cy="50" r="6" className="fill-muted-foreground/40" />
        <rect
          x="25"
          y="70"
          width="80"
          height="8"
          rx="4"
          className="fill-muted"
        />
      </svg>
    ),
  },
  {
    title: "Cheating Detection",
    subtitle: "AI Proctor System",
    description:
      "Monitors tab switching, detects pasted AI-generated content, and ensures fair and authentic practice sessions.",
    icon: <ShieldCheck className="w-5 h-5 text-primary" />,
    mockup: (
      <svg
        viewBox="0 0 200 100"
        className="w-full h-24 mx-auto text-muted-foreground"
      >
        <rect
          x="20"
          y="25"
          width="160"
          height="50"
          rx="6"
          className="fill-card stroke-border"
          strokeWidth="1.5"
        />
        <circle cx="100" cy="50" r="16" className="fill-primary/30" />
        <path
          d="M93 50l5 5 9-9"
          stroke="currentColor"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Leaderboard & Rank",
    subtitle: "Track Your Progress",
    description:
      "Compete with peers and climb the leaderboard based on your accuracy, speed, and consistency across challenges.",
    icon: <Trophy className="w-5 h-5 text-primary" />,
    mockup: (
      <svg
        viewBox="0 0 200 100"
        className="w-full h-24 mx-auto text-muted-foreground"
      >
        <rect
          x="30"
          y="30"
          width="140"
          height="40"
          rx="6"
          className="fill-card stroke-border"
          strokeWidth="1.5"
        />
        <rect
          x="40"
          y="40"
          width="20"
          height="20"
          rx="3"
          className="fill-primary/40"
        />
        <rect
          x="70"
          y="35"
          width="20"
          height="25"
          rx="3"
          className="fill-primary/60"
        />
        <rect
          x="100"
          y="45"
          width="20"
          height="15"
          rx="3"
          className="fill-muted"
        />
        <text
          x="140"
          y="52"
          className="fill-primary text-[10px]"
          fontWeight="bold"
        >
          🏆
        </text>
      </svg>
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
