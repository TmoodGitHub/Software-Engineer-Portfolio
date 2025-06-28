import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { ArrowRight, ExternalLink, Github } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Project 1 Name",
    description: "a pretty looking website using what and what",
    image: "/projects/project_placeholder.png",
    tags: ["react", "tailwind", "supabase", "etc"],
    demoUurl: "#",
    github: "http://www.github.com/tmoodgithub/",
  },
  {
    id: 2,
    title: "Project 2 Name",
    description: "a pretty looking website using what and what",
    image: "/projects/project_placeholder.png",
    tags: ["react", "tailwind", "supabase", "etc"],
    demoUurl: "#",
    github: "http://www.github.com/tmoodgithub/",
  },
  {
    id: 3,
    title: "Project 3 Name",
    description: "a pretty looking website using what and what",
    image: "/projects/project_placeholder.png",
    tags: ["react", "tailwind", "supabase", "etc"],
    demoUurl: "#",
    github: "http://www.github.com/tmoodgithub/",
  },
];

export const ProjectsSection = () => {
  return (
    <section id="projects" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Featured <span className="text-primary"> Projects</span>
        </h2>

        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Here are some projects I created from the ground up to showcase my
          skills and expertise.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, key) => (
            <div
              key={key}
              className="group bg-card rounded-lg overflow-hidden shadow-xs card-hover"
            >
              <div className="h-48 overflow-hidden">
                <img
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-130"
                  src={project.image}
                  alt={project.title}
                />
              </div>

              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs font-medium border rounded-full bg-secondary text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl font-semibold mb-1">{project.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {project.description}
                </p>

                <div className="flex justify-between items-center">
                  <div className="flex space-x-3">
                    <a
                      href={project.demoUurl}
                      target="_blank"
                      className="text-foreground/80 hover:text-primary transition-colors duration-300"
                    >
                      <ExternalLink size={20} />
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      className="text-foreground/80 hover:text-primary transition-colors duration-300"
                    >
                      <GitHubLogoIcon className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            target="_blank"
            href="https://www.github.com/tmoodgithub"
            className="cosmic-button w-fit flex items-center mx-auto gap-2"
          >
            Checkout My Github <ArrowRight size={16} />{" "}
          </a>
        </div>
      </div>
    </section>
  );
};
