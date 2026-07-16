import Hero from "@/components/home/Hero";
import Marquee from "@/components/Marquee";
import Stats from "@/components/home/Stats";
import Coverage from "@/components/home/Coverage";
import Compare from "@/components/home/Compare";
import FleetShowcase from "@/components/home/FleetShowcase";
import Journey from "@/components/home/Journey";
import Solutions from "@/components/home/Solutions";
import Campaigns from "@/components/home/Campaigns";
import Dashboard from "@/components/home/Dashboard";
import Franchise from "@/components/home/Franchise";
import FinalCTA from "@/components/home/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Stats />
      <Coverage />
      <Compare />
      <FleetShowcase />
      <Journey />
      <Solutions />
      <Campaigns />
      <Dashboard />
      <Franchise />
      <FinalCTA />
    </>
  );
}
