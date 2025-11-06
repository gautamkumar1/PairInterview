import { HeroSection } from "./hero-section-enterprise-ready-landing-page-hero-with-dual-ctas";

const PairInterviewHero = () => {
    const handlePrimaryClick = () => console.log("Primary CTA clicked: Start Free Trial");
    const handleSecondaryClick = () => console.log("Secondary CTA clicked: View Documentation");
  
    return (
      <HeroSection
        title={
          <>
            No More Boring {" "}
            <span className="text-primary/90 dark:text-primary">
            Practice Sessions
            </span>
          </>
        }
        subtitle="Real-time pair coding, AI cheating detection, video call & smart chat. 
        Solo or 1v1 — level up 3× faster."
        primaryCta={{
          label: "Start Practicing Now",
          onClick: handlePrimaryClick,
        }}
        secondaryCta={{
          label: "View Leaderboard",
          onClick: handleSecondaryClick,
        }}
      />
    );
  };
  
  export default PairInterviewHero;