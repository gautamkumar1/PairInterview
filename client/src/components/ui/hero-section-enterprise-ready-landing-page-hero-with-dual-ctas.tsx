import React from 'react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight, Zap } from 'lucide-react';
import { motion } from "motion/react";

// Define the type for the CTA buttons
export interface CTAButton {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export interface HeroSectionProps {
  title: React.ReactNode;
  subtitle: React.ReactNode;
  primaryCta: CTAButton;
  secondaryCta: CTAButton;
  className?: string;
}

/**
 * Enhanced Hero Section with Motion Animations and Micro Interactions.
 */
export const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  className,
}) => {
  return (
    <motion.section
      className={cn(
        "flex flex-col items-center justify-center min-h-[50vh] text-center p-4 sm:p-8 md:p-16 bg-background text-foreground border-0 overflow-hidden",
        className
      )}
      role="region"
      aria-label="Product Hero Section"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="max-w-4xl mx-auto">
        {/* --- Feature Badge with hover motion --- */}
        <motion.div
          className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider mb-6 text-muted-foreground bg-muted"
          whileHover={{
            scale: 1.05,
            backgroundColor: "var(--color-accent)",
            color: "var(--color-accent-foreground)",
          }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          <motion.span
            initial={{ rotate: 0 }}
            whileHover={{ rotate: 15 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            <Zap className="h-3 w-3 mr-1.5 text-primary" aria-hidden="true" />
          </motion.span>
          Your Virtual DSA Partner
        </motion.div>

        {/* --- Title with fade + slide animation --- */}
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tighter mb-4 text-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
        >
          {title}
        </motion.h1>

        {/* --- Subtitle with staggered fade --- */}
        <motion.p
          className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 font-normal"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7, ease: "easeOut" }}
        >
          {subtitle}
        </motion.p>

        {/* --- CTA Buttons with hover + press micro-interactions --- */}
        <motion.div
          className="flex justify-center gap-3 sm:gap-4 flex-wrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <Button
              size="lg"
              onClick={primaryCta.onClick}
              disabled={primaryCta.disabled}
              className="text-base font-semibold transition-shadow duration-200 shadow-md hover:shadow-lg focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              aria-label={primaryCta.label}
            >
              {primaryCta.label}
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <Button
              size="lg"
              variant="outline"
              onClick={secondaryCta.onClick}
              disabled={secondaryCta.disabled}
              className="text-base font-semibold transition-colors duration-150 hover:bg-accent hover:text-accent-foreground border-border focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              aria-label={secondaryCta.label}
            >
              {secondaryCta.label}
            </Button>
          </motion.div>
        </motion.div>
      </div>

      
    </motion.section>
  );
};
