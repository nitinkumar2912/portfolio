import profileImg from '~/assets/profile-nitin.jpg';
import { Button } from '~/components/button';
import { DecoderText } from '~/components/decoder-text';
import { Divider } from '~/components/divider';
import { Heading } from '~/components/heading';
import { Image } from '~/components/image';
import { Link } from '~/components/link';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import { Transition } from '~/components/transition';
import { GithubContributions } from '~/components/github-contributions';
import { Fragment, useState } from 'react';
import { media } from '~/utils/style';
import styles from './profile.module.css';

const ProfileText = ({ visible, titleId }) => (
  <Fragment>
    <Heading className={styles.title} data-visible={visible} level={3} id={titleId}>
      <DecoderText text="About me" start={visible} delay={500} />
    </Heading>
    <Text className={styles.description} data-visible={visible} size="l" as="p">
      I’m Nitin Kumar, a Computer Science student at Delhi Technological University and a
      MERN stack developer. I enjoy building clean, useful web applications with React,
      Node.js, Express, and MongoDB. My recent projects include{' '}
      <Link href="/projects/mingle">Mingle</Link>,{' '}
      <Link href="/projects/jobtrackr">JobTrackr</Link>, and{' '}
      <Link href="/projects/toptodo"> TopTodo</Link>.
    </Text>
    <Text className={styles.description} data-visible={visible} size="l" as="p">
      I’m currently focused on building full-stack projects, practicing data structures
      and algorithms, and preparing for software engineering internships. Scroll on to
      see the tools I use, or <Link href="/contact">get in touch</Link> about a project.
    </Text>
  </Fragment>
);

export const Profile = ({ id, visible, sectionRef }) => {
  const [focused, setFocused] = useState(false);
  const titleId = `${id}-title`;

  return (
    <Section
      className={styles.profile}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      as="section"
      id={id}
      ref={sectionRef}
      aria-labelledby={titleId}
      tabIndex={-1}
    >
      <Transition in={visible || focused} timeout={0}>
        {({ visible, nodeRef }) => (
          <div className={styles.content} ref={nodeRef}>
            <div className={styles.column}>
              <ProfileText visible={visible} titleId={titleId} />
              <Button
                secondary
                className={styles.button}
                data-visible={visible}
                href="/contact"
                icon="send"
              >
                Send me a message
              </Button>
            </div>
            <div className={styles.column}>
              <div className={styles.image}>
                <Image
                  reveal
                  delay={100}
                  srcSet={`${profileImg} 1080w`}
                  placeholder={profileImg}
                  width={1080}
                  height={1080}
                  sizes={`(max-width: ${media.mobile}px) 100vw, 480px`}
                  alt="Nitin Kumar’s profile picture"
                />
              </div>
            </div>
            <div className={styles.contributions}>
              <div className={styles.contributionsHeading}>
                <Divider notchWidth="64px" notchHeight="8px" collapsed={!visible} />
                <div className={styles.tagText} data-visible={visible}>
                  GitHub activity
                </div>
              </div>
              <GithubContributions />
            </div>
          </div>
        )}
      </Transition>
    </Section>
  );
};
