import { useState } from 'react';
import { cn } from '../lib/utils';

const skills = [
  { name: 'HTML', category: 'frontend' },
  { name: 'CSS', category: 'frontend' },
  { name: 'JavaScript', category: 'frontend' },
  { name: 'TypeScript', category: 'frontend' },
  { name: 'React', category: 'frontend' },
  { name: 'Next.js', category: 'frontend' },
  { name: 'Ember.js', category: 'frontend' },
  { name: 'Angular', category: 'frontend' },
  { name: 'Tailwind CSS', category: 'frontend' },
  { name: 'Vite', category: 'frontend' },
  { name: 'Radix UI', category: 'frontend' },
  { name: 'WebRTC', category: 'frontend' },

  { name: 'Node.js', category: 'backend' },
  { name: 'Express', category: 'backend' },
  { name: 'Python', category: 'backend' },
  { name: 'Go', category: 'backend' },
  { name: 'PHP', category: 'backend' },
  { name: 'REST APIs', category: 'backend' },
  { name: 'GraphQL', category: 'backend' },
  { name: 'Sequelize ORM', category: 'backend' },
  {
    name: 'Event-Driven Architecture',
    category: 'backend',
  },

  { name: 'PostgreSQL', category: 'data' },
  { name: 'MySQL', category: 'data' },
  { name: 'MSSQL', category: 'data' },
  { name: 'MongoDB', category: 'data' },
  { name: 'SQL', category: 'data' },
  { name: 'Amazon Athena', category: 'data' },
  { name: 'BigQuery', category: 'data' },
  { name: 'Data Pipelines', category: 'data' },

  { name: 'AWS', category: 'cloud' },
  { name: 'GCP', category: 'cloud' },
  { name: 'AWS Lambda', category: 'cloud' },
  { name: 'Amazon S3', category: 'cloud' },
  { name: 'Amazon Kinesis', category: 'cloud' },
  { name: 'Amazon CloudWatch', category: 'cloud' },
  { name: 'GCP Pub/Sub', category: 'cloud' },
  { name: 'Serverless Framework', category: 'cloud' },
  { name: 'CloudFormation', category: 'cloud' },
  { name: 'Docker', category: 'cloud' },

  { name: 'Git', category: 'tools' },
  { name: 'GitHub', category: 'tools' },
  { name: 'GitLab', category: 'tools' },
  { name: 'Bitbucket', category: 'tools' },
  { name: 'CircleCI', category: 'tools' },
  { name: 'Datadog', category: 'tools' },
  { name: 'GCP Logging', category: 'tools' },
  { name: 'LaunchDarkly', category: 'tools' },
  { name: 'Jira', category: 'tools' },
  { name: 'AWS CLI', category: 'tools' },
  { name: 'Bash', category: 'tools' },

  { name: 'OpenAI API', category: 'ai' },
  { name: 'Embeddings', category: 'ai' },
  {
    name: 'Retrieval Augmented Generation',
    category: 'ai',
  },
  { name: 'GitHub Copilot', category: 'ai' },
  { name: 'Cursor', category: 'ai' },
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
      skill.category === activeCategory,
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
                  : 'bg-secondary/70 text-foreground hover:bg-secondary',
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <div className='flex flex-wrap gap-3 justify-center'>
          {filteredSkills.map((skill, key) => (
            <span
              key={key}
              className='px-4 py-2 rounded-full text-sm font-medium bg-card border border-border text-foreground shadow-xs card-hover transition-colors duration-300 hover:border-primary hover:text-primary'
            >
              {skill.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
