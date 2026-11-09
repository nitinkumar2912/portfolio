import { Heading } from '~/components/heading';
import { Text } from '~/components/text';
import { classes } from '~/utils/style';
import config from '~/config.json';
import styles from './footer.module.css';

const footerLinks = [
  { label: 'About', href: '/#about' },
  { label: 'Projects', href: '/#project-1' },
  { label: 'Tech stack', href: '/#tech-stack' },
  { label: 'Contact', href: '/contact' },
];

export const Footer = ({ className }) => (
  <footer id="contact" className={classes(styles.footer, className)}>
    <div className={styles.glow} aria-hidden="true" />
    <div className={styles.content}>
      <div className={styles.callout}>
        <span className={styles.eyebrow}>Have an idea in mind?</span>
        <Heading level={3} as="h2" className={styles.heading}>
          Let’s build something useful.
        </Heading>
        <Text secondary as="p" className={styles.message}>
          I’m open to interesting projects, internships, and good conversations.
        </Text>
        <div className={styles.actions}>
          <a className={styles.primaryLink} href="/contact">Send me a message <span aria-hidden="true">↗</span></a>
          <a className={styles.secondaryLink} href={config.cal} target="_blank" rel="noreferrer">Book a quick chat</a>
        </div>
      </div>

      <div className={styles.navigation}>
        <div className={styles.linkColumn}>
          <span className={styles.label}>Explore</span>
          {footerLinks.map(link => <a href={link.href} key={link.label}>{link.label}</a>)}
        </div>
        <div className={styles.linkColumn}>
          <span className={styles.label}>Connect</span>
          <a href={config.repo} target="_blank" rel="noreferrer">GitHub</a>
          <a href={`https://www.linkedin.com/in/${config.linkedin}`} target="_blank" rel="noreferrer">LinkedIn</a>
          <a href={`mailto:${config.email}`}>Email</a>
          <a href={config.resume} target="_blank" rel="noreferrer">Resume</a>
        </div>
      </div>

      <div className={styles.bottom}>
        <span>© {new Date().getFullYear()} {config.name}</span>
        <span className={styles.bottomNote}>Thanks for taking a look.</span>
        <a href="/#intro">Back to top ↑</a>
      </div>
    </div>
  </footer>
);
