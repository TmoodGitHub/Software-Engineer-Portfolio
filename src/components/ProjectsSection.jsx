import { GitHubLogoIcon } from '@radix-ui/react-icons';
import { ArrowRight, ExternalLink } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'tmoodgit',
    description:
      'A fully functional Git implementation built from scratch in Node.js. Implements the actual internals: content-addressable object storage, SHA-1 hashing, a JSON-backed staging index, branch refs, HEAD resolution, and working tree restoration. Includes a complete CLI and a line-level LCS diff engine.',
    image: '/projects/project_placeholder.png',
    tags: [
      'Node.js',
      'Git internals',
      'SHA-1',
      'LCS diff',
      'CLI',
    ],
    demoUrl: null,
    github: 'https://github.com/TmoodGitHub/tmoodgit',
  },
  {
    id: 2,
    title: 'AI-Powered Portfolio',
    description:
      'Personal portfolio with a custom AI chatbot. Python backend using the OpenAI API with embeddings over structured resume, GitHub, and LinkedIn content to answer recruiter and developer questions in real time.',
    image: '/projects/project_placeholder.png',
    tags: [
      'React',
      'Vite',
      'Tailwind CSS',
      'Python',
      'OpenAI API',
      'Embeddings',
    ],
    demoUrl:
      'https://vite-react-portfolio-lime.vercel.app/',
    github:
      'https://github.com/TmoodGitHub/vite-react-portfolio',
  },
  {
    id: 3,
    title: 'Currency Exchange App',
    description:
      'Full-stack currency exchange app built end-to-end. React frontend, Node.js/Express backend, PostgreSQL with Sequelize ORM, and external exchange rate API integration.',
    image: '/projects/project_placeholder.png',
    tags: [
      'React',
      'Node.js',
      'Express',
      'PostgreSQL',
      'Sequelize',
    ],
    demoUrl:
      'https://basic-currency-exchange-client.onrender.com/',
    github:
      'https://github.com/TmoodGitHub/basic-currency-exchange',
  },
];

export const ProjectsSection = () => {
  return (
    <section id='projects' className='py-24 px-4 relative'>
      <div className='container mx-auto max-w-5xl'>
        <h2 className='text-3xl md:text-4xl font-bold mb-4 text-center'>
          Featured{' '}
          <span className='text-primary'> Projects</span>
        </h2>

        <p className='text-center text-muted-foreground mb-12 max-w-2xl mx-auto'>
          A few things I built outside of work, ranging from
          systems-level tooling to full-stack applications.
        </p>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {projects.map((project, key) => (
            <div
              key={key}
              className='group bg-card rounded-lg overflow-hidden shadow-xs card-hover'
            >
              <div className='h-48 overflow-hidden'>
                <img
                  className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
                  src={project.image}
                  alt={project.title}
                />
              </div>

              <div className='p-6'>
                <div className='flex flex-wrap gap-2 mb-4'>
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className='px-2 py-1 text-xs font-medium border rounded-full bg-secondary text-secondary-foreground'
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className='text-xl font-semibold mb-1'>
                  {project.title}
                </h3>
                <p className='text-muted-foreground text-sm mb-4'>
                  {project.description}
                </p>

                <div className='flex justify-between items-center'>
                  <div className='flex space-x-3'>
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-foreground/80 hover:text-primary transition-colors duration-300'
                      >
                        <ExternalLink size={20} />
                      </a>
                    )}
                    <a
                      href={project.github}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-foreground/80 hover:text-primary transition-colors duration-300'
                    >
                      <GitHubLogoIcon className='w-5 h-5' />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className='text-center mt-12'>
          <a
            target='_blank'
            rel='noopener noreferrer'
            href='https://github.com/TmoodGitHub'
            className='cosmic-button w-fit flex items-center mx-auto gap-2'
          >
            Check out my GitHub <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};
