import { Bot, Briefcase, Code, User } from 'lucide-react';

export const AboutMe = () => {
  return (
    <section id='about' className='py-24 px-4 relative'>
      <div className='container mx-auto max-w-5xl'>
        <h2 className='text-3xl md:text-4xl font-bold mb-12 text-center'>
          About <span className='text-primary'> Me</span>
        </h2>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-center'>
          <div className='space-y-6'>
            <h3 className='text-xl md:text-2xl font-semibold'>
              Senior Software Engineer
            </h3>
            <p className='text-muted-foreground'>
              I have spent over a decade building and
              operating software systems that scale, adapt,
              and solve real business problems across
              education, cybersecurity, and financial
              services software. My work spans full-stack
              development backed by cloud infrastructure,
              database design, and command-line tooling,
              with a focus on systems that are reliable,
              observable, and practical to operate in
              production. What began as curiosity about how
              software works evolved into a career centered
              on building systems teams can understand,
              maintain, and trust.
            </p>
            <p className='text-muted-foreground'>
              I have designed and worked with relational and
              non-relational databases, built and maintained
              cloud-based services using managed
              infrastructure, and developed internal CLI
              tools to support development workflows,
              automation, and operational tasks. I have
              contributed to migrations away from tightly
              coupled systems toward more maintainable
              service-oriented architectures, improved
              deployment and monitoring pipelines, and
              supported teams by reinforcing clean, readable
              code. I am comfortable working across the
              stack, from user-facing interfaces to backend
              services and data layers that support
              business-critical operations. I value
              performance, collaboration, and engineering
              decisions that make systems easier to run,
              debug, and extend.
            </p>

            <div className='flex flex-col sm:flex-row gap-4 pt-4 justify-center'>
              <a href='#contact' className='cosmic-button'>
                {' '}
                Get In Touch
              </a>

              <a
                href='/TamerInTech.pdf'
                target='_blank'
                rel='noopener noreferrer'
                className='px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300'
              >
                View Resume
              </a>
            </div>
          </div>
          <div className='grid grid-cols-1 gap-6'>
            <div className='gradient-border p-6 card-hover'>
              <div className='flex items-start gap-4'>
                <div className='p-3 rounded-full bg-primary/10'>
                  <Code className='h-6 w-6 text-primary' />
                </div>
                <div className='text-left'>
                  <h4 className='font-semibold text-lg'>
                    Full-Stack Engineering
                  </h4>
                  <p className='text-muted-foreground'>
                    Cloud-based services, database-backed
                    systems, frontend and backend delivery
                    from design to production
                  </p>
                </div>
              </div>
            </div>

            <div className='gradient-border p-6 card-hover'>
              <div className='flex items-start gap-4'>
                <div className='p-3 rounded-full bg-primary/10'>
                  <User className='h-6 w-6 text-primary' />
                </div>
                <div className='text-left'>
                  <h4 className='font-semibold text-lg'>
                    Product-Driven Development
                  </h4>
                  <p className='text-muted-foreground'>
                    User-centered features, real-time
                    interfaces, and practical user
                    experience decisions
                  </p>
                </div>
              </div>
            </div>

            <div className='gradient-border p-6 card-hover'>
              <div className='flex items-start gap-4'>
                <div className='p-3 rounded-full bg-primary/10'>
                  <Briefcase className='h-6 w-6 text-primary' />
                </div>
                <div className='text-left'>
                  <h4 className='font-semibold text-lg'>
                    Technical Leadership
                  </h4>
                  <p className='text-muted-foreground'>
                    Code quality standards, system design
                    guidance, and mentoring engineers
                    through complex changes
                  </p>
                </div>
              </div>
            </div>

            <div className='gradient-border p-6 card-hover'>
              <div className='flex items-start gap-4'>
                <div className='p-3 rounded-full bg-primary/10'>
                  <Bot className='h-6 w-6 text-primary' />
                </div>
                <div className='text-left'>
                  <h4 className='font-semibold text-lg'>
                    Artificial Intelligence Engineering
                  </h4>
                  <p className='text-muted-foreground'>
                    Building and integrating systems using
                    large language models, embeddings, and
                    generative artificial intelligence
                    applications
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
