import {
  Cloud,
  Database,
  LayoutTemplate,
  Monitor,
  Sparkles,
} from 'lucide-react';

// The cards beside the About Me text. Every number comes from the resume.
const highlights = [
  {
    icon: Database,
    title: 'Backend & Data Systems',
    text: 'Node.js and TypeScript APIs, event-driven services and ingestion pipelines: millions of security events a day at Expel, billions of ad events a month at The Media Trust. Query tuning across PostgreSQL and BigQuery that cut slow queries by 60%.',
  },
  {
    icon: Cloud,
    title: 'Cloud & Infrastructure',
    text: 'AWS Certified Solutions Architect – Associate. Lambda, Kinesis, SQS, SNS and Athena in production, plus GCP Pub/Sub. AI Security Triage runs on AWS entirely in Terraform, deployed by GitHub Actions, for about $1 a month when idle.',
  },
  {
    icon: Monitor,
    title: 'Observability & Reliability',
    text: 'Kept detection pipelines at 99.9%+ availability at Expel, and redesigned CloudWatch-to-Slack alerting for a 24/7 malware operations desk, cutting triage response from hours to minutes. CloudWatch, Datadog and GCP Logging.',
  },
  {
    icon: LayoutTemplate,
    title: 'Full-Stack Delivery',
    text: 'I own features end to end. At Expel: the API, hunt query engine and React investigation UI for the Emerging Threat feature, replacing a manual process that took days to weeks. At Gallaudet: WCAG 2.1 AA accessibility across web interfaces for about 2,500 students and staff.',
  },
  {
    icon: Sparkles,
    title: 'AI & LLM Engineering',
    text: 'Claude and OpenAI APIs in projects I measure, not just demo: structured output, retrieval (RAG), hand-labeled evals, cost tracking and prompt-injection tests. AI Security Triage gets 80% of 40 labeled cases exactly right at about $3 per 1,000 alerts.',
  },
];

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
              I get genuinely interested in hard problems,
              especially the kind involving high-throughput
              data, unreliable systems, and workflows that
              matter to real people.
            </p>

            <p className='text-muted-foreground'>
              Since April 2026 I've been building
              independent projects with LLMs and earned the
              AWS Certified Solutions Architect – Associate
              certification. AI Security Triage, live on
              AWS, uses Claude to rate CloudTrail events by
              severity for analyst review, and the chatbot
              on this site answers questions about my work,
              measured by its own evals.
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
            {highlights.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className='gradient-border p-6 card-hover'
                >
                  <div className='flex items-start gap-4'>
                    <div className='p-3 rounded-full bg-primary/10'>
                      <Icon className='h-6 w-6 text-primary' />
                    </div>
                    <div className='text-left'>
                      <h4 className='font-semibold text-lg'>
                        {item.title}
                      </h4>
                      <p className='text-muted-foreground'>
                        {item.text}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
