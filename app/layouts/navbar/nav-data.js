import config from '~/config.json';

export const navLinks = [
  {
    label: 'About me',
    pathname: '/#about',
  },
  {
    label: 'Projects',
    pathname: '/#project-1',
  },
  {
    label: 'Tech Stack',
    pathname: '/#tech-stack',
  },
  {
    label: 'Contact',
    pathname: '/contact',
  },
];

export const socialLinks = [
  {
    label: 'GitHub',
    url: `https://github.com/${config.github}`,
    icon: 'github',
  },
  {
    label: 'LinkedIn',
    url: `https://www.linkedin.com/in/${config.linkedin}/`,
    icon: 'linkedin',
  },
];
