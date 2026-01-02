import { Hero } from "../components/HeroSection";
import { StatsSection } from "../components/StatsSection";
import { EventSchedule } from "../components/EventSchedule";

function Home() {
  return (
    <div>
      <Hero/>
      <StatsSection/>
      <EventSchedule/>
    </div>
  );
}

export default Home;
