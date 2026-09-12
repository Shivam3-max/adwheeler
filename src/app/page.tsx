import Hero from "@/components/home/Hero";
import VideoBlock from "@/components/home/VideoBlock";
import Marquee from "@/components/Marquee";
import BookingSystems from "@/components/BookingSystems";
import Journey from "@/components/home/Journey";
import Coverage from "@/components/home/Coverage";
import Compare from "@/components/home/Compare";
import Solutions from "@/components/home/Solutions";
import Campaigns from "@/components/home/Campaigns";
import Stats from "@/components/home/Stats";
import Dashboard from "@/components/home/Dashboard";
import FinalCTA from "@/components/home/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <VideoBlock />
      <Marquee />
      <BookingSystems />
      <Journey />
      <Coverage />
      <Compare />
      <Solutions />
      <Campaigns />
      <Stats />
      <Dashboard />
      <FinalCTA />
    </>
  );
}
