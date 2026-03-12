import HeroSection from "@/components/home/HeroSection";
import FeaturedTikTok from "@/components/home/FeaturedTikTok";
import PortfolioPreview from "@/components/home/PortfolioPreview";
import MusicSection from "@/components/home/MusicSection";
import AffiliatePreview from "@/components/home/AffiliatePreview";
import CollaborationCTA from "@/components/home/CollaborationCTA";
import TikTokBanner from "@/components/home/TikTokBanner";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedTikTok />
      <PortfolioPreview />
      <MusicSection />
      <AffiliatePreview />
      <CollaborationCTA />
      <TikTokBanner />
    </>
  );
}
