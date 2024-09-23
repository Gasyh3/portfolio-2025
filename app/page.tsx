import { AppleCardsCarousel } from "@/components/Carrousel";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { TimelineSchool } from "@/components/Timeline";
import { FloatingSocial } from "@/components/FloatingSocial";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";


export default function Home() {
  return (
    <div className="p-0 m-0">
      <TracingBeam className="px-1">
        {/* Hero */}
        <h1 className="text-4xl font-bold text-center text-neutral-800 dark:text-neutral-200">
          Welcome to the Apple Club.
        </h1>
        {/* Projets */}
        <AppleCardsCarousel />
        {/* Etudes */}

        <TimelineSchool />


      </TracingBeam>
      {/* <Footer /> */}
      <BackgroundGradientAnimation>
        <div className="grid justify-items-center ">
          <FloatingSocial />
          <p className="text-purple-50">Rakotoniaina Kevin © 2024</p>
        </div>
      </BackgroundGradientAnimation>
    </div>
  );
}
