import { GitHubLogoIcon } from '@radix-ui/react-icons';
import { ArrowRight, ExternalLink } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'AI Security Triage',
    description:
      'Live on AWS. Claude rates each AWS CloudTrail event by severity, using structured output and related activity from the same user or IP, and analysts review every finding in a React dashboard. Event-driven pipeline on S3, SQS and Lambda, with Aurora Serverless and Cognito sign-in, all in Terraform and deployed by GitHub Actions. Evals on 40 hand-labeled cases: 80% exact, 95% within one level, about $3 per 1,000 alerts; 16/16 prompt injections held.',
    image: '/projects/ai-security-triage.jpg',
    tags: [
      'TypeScript',
      'Python',
      'Claude API',
      'AWS',
      'Terraform',
      'Evals',
    ],
    demoUrl: 'https://d27ph3vqvw136n.cloudfront.net',
    github:
      'https://github.com/TmoodGitHub/ai-security-triage',
  },
  {
    id: 2,
    title: 'AI-Powered Portfolio',
    description:
      'This site, with TmoodBot, a chatbot that answers questions about my work from my resume and GitHub profile. A Node.js serverless API searches the knowledge base by meaning and keywords and answers only from the best matches, with follow-up handling, rate limiting and prompt-injection defenses. Measured by its own evals: 26/26 retrieval checks and 27/27 answer checks.',
    image: '/projects/ai-portfolio.jpg',
    tags: [
      'React',
      'Node.js',
      'OpenAI API',
      'RAG',
      'Evals',
      'Upstash Redis',
    ],
    demoUrl:
      'https://vite-react-portfolio-lime.vercel.app/',
    github:
      'https://github.com/TmoodGitHub/Software-Engineer-Portfolio',
  },
  {
    id: 3,
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
    id: 4,
    title: 'Plant Health Predictor',
    description:
      "Upload 2 to 10 photos of a plant taken over time and get a health report: plant identification, a health score per photo, trends across the set, and a 7 to 14 day prediction with recommended actions. The model's output is checked field by field before use, uploads are checked by file signature, requests are rate limited per IP, and reports export as PDF.",
    image: '/projects/project_placeholder.png',
    tags: ['Node.js', 'Express', 'Claude API', 'Vision AI'],
    demoUrl: null,
    github:
      'https://github.com/TmoodGitHub/plant-health-predictor',
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
          Things I built outside of work, from AI tools
          running on AWS to systems-level tooling.
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
