import {
  Cloud,
  Database,
  LayoutTemplate,
  Monitor,
} from 'lucide-react';

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
              I've spent 10+ years building and operating
              production systems across cybersecurity, ad
              tech, and enterprise platforms. Most of my
              work lives in the backend and data layer:
              APIs, event-driven pipelines, and ingestion
              and reporting workflows running on AWS and
              GCP.
            </p>
            <p className='text-muted-foreground'>
              At Expel I owned ingestion and detection
              pipelines processing millions of security
              events per day, cut slow queries by 60%, and
              shipped a solo schema migration across 140+
              files with zero downtime. At The Media Trust I
              built reconciliation pipelines processing
              billions of ad events monthly and redesigned
              alerting for a 24/7 malware operations desk. I
              get genuinely interested in hard problems,
              especially the kind involving high-throughput
              data, unreliable systems, and workflows that
              matter to real people.
            </p>

            <div className='flex flex-col sm:flex-row gap-4 pt-4 justify-center'>
              <a href='#contact' className='cosmic-button'>
                Get In Touch
              </a>

              <a
                href='/Tamer_Mahmoud_Resume.pdf'
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
                  <Database className='h-6 w-6 text-primary' />
                </div>
                <div className='text-left'>
                  <h4 className='font-semibold text-lg'>
                    Backend & Data Systems
                  </h4>
                  <p className='text-muted-foreground'>
                    Production APIs, async and event-driven
                    services, ingestion and reporting
                    pipelines, schema design and query
                    optimization across SQL and NoSQL at
                    scale
                  </p>
                </div>
              </div>
            </div>

            <div className='gradient-border p-6 card-hover'>
              <div className='flex items-start gap-4'>
                <div className='p-3 rounded-full bg-primary/10'>
                  <Cloud className='h-6 w-6 text-primary' />
                </div>
                <div className='text-left'>
                  <h4 className='font-semibold text-lg'>
                    Cloud & Infrastructure
                  </h4>
                  <p className='text-muted-foreground'>
                    AWS and GCP workloads including Lambda,
                    Kinesis, Pub/Sub, Athena, and BigQuery.
                    Infrastructure as code, environment
                    isolation, and access control
                  </p>
                </div>
              </div>
            </div>

            <div className='gradient-border p-6 card-hover'>
              <div className='flex items-start gap-4'>
                <div className='p-3 rounded-full bg-primary/10'>
                  <Monitor className='h-6 w-6 text-primary' />
                </div>
                <div className='text-left'>
                  <h4 className='font-semibold text-lg'>
                    Observability & Reliability
                  </h4>
                  <p className='text-muted-foreground'>
                    CloudWatch, Datadog, GCP Logging.
                    Alerting design, incident response, and
                    debugging complex distributed workflows
                    under production pressure
                  </p>
                </div>
              </div>
            </div>

            <div className='gradient-border p-6 card-hover'>
              <div className='flex items-start gap-4'>
                <div className='p-3 rounded-full bg-primary/10'>
                  <LayoutTemplate className='h-6 w-6 text-primary' />
                </div>
                <div className='text-left'>
                  <h4 className='font-semibold text-lg'>
                    Full-Stack Delivery
                  </h4>
                  <p className='text-muted-foreground'>
                    React, Next.js, TypeScript. I can own a
                    feature end-to-end when the role calls
                    for it, and I care about what ships, not
                    just my layer of it
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
