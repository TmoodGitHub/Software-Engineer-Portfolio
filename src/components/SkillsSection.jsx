import { useState } from 'react';
import { cn } from '../lib/utils';

const skills = [
  { name: 'HTML', level: 95, category: 'frontend' },
  { name: 'CSS', level: 95, category: 'frontend' },
  { name: 'JavaScript', level: 90, category: 'frontend' },
  { name: 'React', level: 80, category: 'frontend' },
  { name: 'Ember.js', level: 80, category: 'frontend' },
  { name: 'Angular', level: 60, category: 'frontend' },
  { name: 'TypeScript', level: 70, category: 'frontend' },
  { name: 'Vite', level: 70, category: 'frontend' },
  { name: 'Tailwind CSS', level: 60, category: 'frontend' },
  { name: 'Next.js', level: 60, category: 'frontend' },
  { name: 'Radix UI', level: 60, category: 'frontend' },

  { name: 'Node.js', level: 80, category: 'backend' },
  { name: 'Express', level: 80, category: 'backend' },
  { name: 'Python', level: 70, category: 'backend' },
  { name: 'Go', level: 60, category: 'backend' },
  { name: 'PHP', level: 60, category: 'backend' },
  { name: 'REST APIs', level: 90, category: 'backend' },
  { name: 'GraphQL', level: 65, category: 'backend' },

  { name: 'PostgreSQL', level: 75, category: 'data' },
  { name: 'MySQL', level: 75, category: 'data' },
  { name: 'MongoDB', level: 70, category: 'data' },
  { name: 'Sequelize ORM', level: 70, category: 'data' },
  { name: 'Prisma ORM', level: 60, category: 'data' },
  { name: 'SQL', level: 90, category: 'data' },
  { name: 'Data Pipelines', level: 70, category: 'data' },
  { name: 'Amazon Athena', level: 70, category: 'data' },
  { name: 'BigQuery', level: 60, category: 'data' },

  {
    name: 'Amazon Web Services',
    level: 70,
    category: 'cloud',
  },
  {
    name: 'Google Cloud Platform',
    level: 60,
    category: 'cloud',
  },
  { name: 'AWS Lambda', level: 70, category: 'cloud' },
  { name: 'Amazon S3', level: 70, category: 'cloud' },
  {
    name: 'Amazon Kinesis Firehose',
    level: 70,
    category: 'cloud',
  },
  {
    name: 'Amazon CloudWatch',
    level: 70,
    category: 'cloud',
  },
  {
    name: 'Google Cloud Storage',
    level: 60,
    category: 'cloud',
  },
  {
    name: 'Serverless Framework',
    level: 70,
    category: 'cloud',
  },

  { name: 'Git', level: 80, category: 'tools' },
  { name: 'GitHub', level: 70, category: 'tools' },
  { name: 'GitLab', level: 70, category: 'tools' },
  { name: 'GitBucket', level: 70, category: 'tools' },
  { name: 'CircleCI', level: 70, category: 'tools' },
  { name: 'Jira', level: 70, category: 'tools' },
  { name: 'Docker', level: 70, category: 'tools' },
  { name: 'AWS CLI', level: 70, category: 'tools' },
  {
    name: 'Bash and Command Line Interfaces',
    level: 80,
    category: 'tools',
  },
  { name: 'Datadog', level: 60, category: 'tools' },
  { name: 'Figma', level: 60, category: 'tools' },

  { name: 'OpenAI API', level: 60, category: 'ai' },
  { name: 'Embeddings', level: 60, category: 'ai' },
  {
    name: 'Retrieval Augmented Generation',
    level: 60,
    category: 'ai',
  },
  { name: 'ChatGPT', level: 60, category: 'ai' },
  { name: 'GitHub Copilot', level: 60, category: 'ai' },
  { name: 'Cursor', level: 60, category: 'ai' },
  { name: 'Tabnine', level: 60, category: 'ai' },
];

const categories = [
  'all',
  'frontend',
  'backend',
  'data',
  'cloud',
  'tools',
  'ai',
];

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] =
    useState('all');
  const filteredSkills = skills.filter(
    (skill) =>
      activeCategory === 'all' ||
      skill.category === activeCategory
  );

  return (
    <section
      id='skills'
      className='py-24 px-4 relative bg-secondary/30'
    >
      <div className='container mx-auto max-w-5xl'>
        <h2 className='text-3xl md:text-4xl font-bold mb-12 text-center'>
          My <span className='text-primary'> Skills</span>
        </h2>

        <div className='flex flex-wrap justify-center gap-4 mb-12'>
          {categories.map((category, key) => (
            <button
              key={key}
              onClick={() => setActiveCategory(category)}
              className={cn(
                'px-5 py-2 rounded-full transition-colors duration-300 capitalize',
                activeCategory === category
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary/70 text-foreground hover:bd-secondary'
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols3 gap-6'>
          {filteredSkills.map((skill, key) => (
            <div
              key={key}
              className='bg-card p-6 rounded-lg shadow-xs card-hover'
            >
              <div className='text-left mb-4'>
                <h3 className='font-semibold text-lg'>
                  {skill.name}
                </h3>
              </div>
              <div className='w-full bg-secondary/50 h-2 rounded-full overflow-hidden'>
                <div
                  className='bg-primary h-2 rounded-full origin-left animate-[grow_1.5s_ease-out'
                  style={{ width: skill.level + '%' }}
                />
              </div>
              <div className='text-right mt-1'>
                <span className='text-sm text-muted-foreground'>
                  {skill.level}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
