import { Briefcase, Code, User } from "lucide-react";

export const AboutMe = () => {
  return (
    <section id="about" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          About <span className="text-primary"> Me</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-xl md:text-2xl font-semibold">
              Software Engineer
            </h3>
            <p className="text-muted-foreground">
              I’ve spent the last 10+ years building systems that scale, evolve,
              and solve real problems. From startups to established tech teams,
              I’ve worked across industries (education, cybersecurity, fintech)
              helping companies turn complex technical challenges into
              streamlined, performant solutions. What started as a curiosity for
              how things work became a career focused on crafting full-stack
              architectures, automating workflows, and designing software that’s
              not just functional, but dependable, efficient, and built to last.
            </p>
            <p className="text-muted-foreground">
              Along the way, I’ve contributed to migrations from monoliths to
              microservices, improved deployment pipelines, and mentored
              developers toward stronger, cleaner code. I’m at home working
              across the stack, whether building frontend interfaces that
              enhance user experience or shaping backend systems that drive
              business-critical operations. I care deeply about performance,
              collaboration, and writing code that teams can trust and build on.
              Let’s connect!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
              <a href="#contact" className="cosmic-button">
                {" "}
                Get In Touch
              </a>

              <a
                href="/Tamer_Mahmoud_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300"
              >
                View Resume
              </a>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6">
            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">
                    Full-Stack Engineering
                  </h4>
                  <p className="text-muted-foreground">
                    Scalable systems, clean architecture, end-to-end delivery
                  </p>
                </div>
              </div>
            </div>

            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">
                    Product-Driven Development
                  </h4>
                  <p className="text-muted-foreground">
                    User-focused features, real-time interfaces, thoughtful UX
                  </p>
                </div>
              </div>
            </div>

            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">
                    Technical Leadership
                  </h4>
                  <p className="text-muted-foreground">
                    Mentorship, code quality, architectural influences
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
