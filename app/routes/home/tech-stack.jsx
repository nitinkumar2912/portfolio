import { useState } from 'react';
import { Heading } from '~/components/heading';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import styles from './tech-stack.module.css';

const skillGroups = [
  {
    title: 'Languages',
    skills: ['C', 'C++', 'JavaScript', 'Python', 'SQL', 'HTML', 'CSS'],
  },
  {
    title: 'Frontend development',
    skills: ['React', 'Tailwind CSS', 'DaisyUI', 'Zustand'],
  },
  {
    title: 'Backend & APIs',
    skills: ['Node.js', 'Express.js', 'Django', 'REST APIs', 'JWT', 'Socket.IO'],
  },
  {
    title: 'Databases & storage',
    skills: ['MongoDB', 'MongoDB Atlas', 'SQL', 'localStorage'],
  },
  {
    title: 'Tools & integrations',
    skills: [
      'Git', 'GitHub', 'Postman', 'VS Code', 'Vite', 'Webpack', 'date-fns',
      'Cloudinary', 'Resend', 'Arcjet',
    ],
  },
  {
    title: 'Deployment',
    skills: ['Render', 'Vercel', 'Sevalla'],
  },
  {
    title: 'Computer science foundations',
    skills: [
      'Data structures & algorithms', 'OOP', 'DBMS', 'Operating systems',
      'Computer networks',
    ],
  },
];

const logoBySkill = {
  C: 'c/c-original.svg',
  'C++': 'cplusplus/cplusplus-original.svg',
  JavaScript: 'javascript/javascript-original.svg',
  Python: 'python/python-original.svg',
  SQL: 'azuresqldatabase/azuresqldatabase-original.svg',
  HTML: 'html5/html5-original.svg',
  CSS: 'css3/css3-original.svg',
  React: 'react/react-original.svg',
  'Tailwind CSS': 'tailwindcss/tailwindcss-original.svg',
  DaisyUI: 'daisyui/daisyui-original.svg',
  Zustand: null,
  'Node.js': 'nodejs/nodejs-original.svg',
  'Express.js': 'express/express-original.svg',
  Django: 'django/django-plain.svg',
  'REST APIs': null,
  JWT: null,
  'Socket.IO': 'socketio/socketio-original.svg',
  MongoDB: 'mongodb/mongodb-original.svg',
  'MongoDB Atlas': 'mongodb/mongodb-original.svg',
  localStorage: null,
  Git: 'git/git-original.svg',
  GitHub: 'github/github-original.svg',
  Postman: 'postman/postman-original.svg',
  'VS Code': 'vscode/vscode-original.svg',
  Vite: 'vitejs/vitejs-original.svg',
  Webpack: 'webpack/webpack-original.svg',
  'date-fns': null,
  Cloudinary: 'cloudinary/cloudinary-original.svg',
  Resend: null,
  Arcjet: null,
  Render: null,
  Vercel: 'vercel/vercel-original.svg',
  Sevalla: null,
  'Data structures & algorithms': null,
  OOP: null,
  DBMS: null,
  'Operating systems': null,
  'Computer networks': null,
};

const technologies = [...new Set(skillGroups.flatMap(group => group.skills))].map(name => ({
  name,
  logo: logoBySkill[name] || null,
}));

function TechLogo({ technology }) {
  const [imageFailed, setImageFailed] = useState(!technology.logo);

  return (
    <div className={styles.logoCard} title={technology.name}>
      <span className={styles.logoImage}>
        {imageFailed ? (
          <span className={styles.logoFallback} aria-hidden="true">
            {technology.name.slice(0, 2)}
          </span>
        ) : (
          <img
            src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${technology.logo}`}
            alt=""
            loading="lazy"
            onError={() => setImageFailed(true)}
          />
        )}
      </span>
      <span>{technology.name}</span>
    </div>
  );
}

export function TechStack({ id }) {
  return (
    <Section className={styles.techStack} as="section" id={id}>
      <div className={styles.content}>
        <div className={styles.orbitScene} aria-hidden="true">
          <span className={styles.orbitRing} />
          <span className={styles.orbitRingSecondary} />
          <span className={styles.orb} />
        </div>
        <div className={styles.intro}>
          <span className={styles.eyebrow}>What I work with</span>
          <Heading level={2} as="h2" className={styles.title}>
            Skills & technology
          </Heading>
          <Text size="l" as="p" className={styles.description}>
            The languages, frameworks, tools, and computer science foundations I use across
            my projects.
          </Text>
        </div>
        <div
          className={styles.marquee}
          role="region"
          aria-label="Technology logos scrolling from left to right"
        >
          <div className={styles.track}>
            {[0, 1].map(copy => (
              <div className={styles.group} key={copy} aria-hidden={copy === 1}>
                {technologies.map(technology => (
                  <TechLogo technology={technology} key={technology.name} />
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className={styles.groups}>
          {skillGroups.map((group, index) => (
            <section
              className={styles.skillGroup}
              key={group.title}
              style={{ '--card-delay': `${index * 90}ms` }}
            >
              <Heading level={3} as="h3" className={styles.groupTitle}>
                {group.title}
              </Heading>
              <ul className={styles.skills}>
                {group.skills.map(skill => <li key={skill}>{skill}</li>)}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </Section>
  );
}
