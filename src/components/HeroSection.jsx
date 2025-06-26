import { ArrowDown } from "lucide-react";

export const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4"
    >
      <div className="container max-w-4xl mx-auto text-center z-10">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            <span className="opacity-0 animate-fade-in">Hi. I'm</span>
            <span className="text-primary opacity-0 animate-fade-in-delay-1">
              {" "}
              Tamer
            </span>
            <span className="text-gradient ml-2 opacity-0 animate-fade-in-delay-2">
              {" "}
              Mahmoud
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-2-2xl mx-auto opacity-0 animate-fade-in-delay-3">
            I’ve spent the last 10+ years building systems that scale, evolve,
            and solve real problems. From startups to established tech teams,
            I’ve worked across industries (education, cybersecurity, fintech)
            helping companies turn complex technical challenges into
            streamlined, performant solutions. What started as a curiosity for
            how things work became a career focused on crafting full-stack
            architectures, automating workflows, and designing software that’s
            not just functional, but dependable, efficient, and built to last.
          </p>
          <p className="text-lg md:text-xl text-muted-foreground max-2-2xl mx-auto opacity-0 animate-fade-in-delay-4">
            Along the way, I’ve contributed to migrations from monoliths to
            microservices, improved deployment pipelines, and mentored
            developers toward stronger, cleaner code. I’m at home working across
            the stack, whether building frontend interfaces that enhance user
            experience or shaping backend systems that drive business-critical
            operations. I care deeply about performance, collaboration, and
            writing code that teams can trust and build on. Let’s connect!
          </p>

          <div className="pt-4 opacity-0 animate-fade-in-delay-5">
            <a href="#projects" className="cosmic-button">
              View My Works
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
        <span className="text-sm text-muted-foreground mb-2">Scroll</span>
        <ArrowDown className="h-5 w-5 text-primary" />
      </div>
    </section>
  );
};
