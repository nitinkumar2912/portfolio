import mingleTexture from '~/assets/portfolio/mingle-preview.png';
import jobTrackrTexture from '~/assets/portfolio/jobtrackr-preview.png';
import topTodoTexture from '~/assets/portfolio/toptodo-preview.png';
import { Footer } from '~/components/footer';
import { baseMeta } from '~/utils/meta';
import { Intro } from './intro';
import { Profile } from './profile';
import { ProjectSummary } from './project-summary';
import { TechStack } from './tech-stack';
import { useEffect, useRef, useState } from 'react';
import config from '~/config.json';
import styles from './home.module.css';

// Prefetch draco decoader wasm
export const links = () => {
  return [
    {
      rel: 'prefetch',
      href: '/draco/draco_wasm_wrapper.js',
      as: 'script',
      type: 'text/javascript',
      importance: 'low',
    },
    {
      rel: 'prefetch',
      href: '/draco/draco_decoder.wasm',
      as: 'fetch',
      type: 'application/wasm',
      importance: 'low',
    },
  ];
};

export const meta = () => {
  return baseMeta({
    title: config.role,
    description: `${config.name} is a Computer Science student at Delhi Technological University and a MERN stack developer building full-stack web applications.`,
  });
};

export const Home = () => {
  const [visibleSections, setVisibleSections] = useState([]);
  const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false);
  const intro = useRef();
  const details = useRef();
  const projectOne = useRef();
  const projectTwo = useRef();
  const projectThree = useRef();

  useEffect(() => {
    const sections = [intro, details, projectOne, projectTwo, projectThree];

    const sectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const section = entry.target;
            observer.unobserve(section);
            if (visibleSections.includes(section)) return;
            setVisibleSections(prevSections => [...prevSections, section]);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );

    const indicatorObserver = new IntersectionObserver(
      ([entry]) => {
        setScrollIndicatorHidden(!entry.isIntersecting);
      },
      { rootMargin: '-100% 0px 0px 0px' }
    );

    sections.forEach(section => {
      sectionObserver.observe(section.current);
    });

    indicatorObserver.observe(intro.current);

    return () => {
      sectionObserver.disconnect();
      indicatorObserver.disconnect();
    };
  }, [visibleSections]);

  return (
    <div className={styles.home}>
      <Intro
        id="intro"
        sectionRef={intro}
        scrollIndicatorHidden={scrollIndicatorHidden}
      />
      <Profile
        sectionRef={details}
        visible={visibleSections.includes(details.current)}
        id="about"
      />
      <ProjectSummary
        id="project-1"
        projectName="Mingle"
        sectionRef={projectOne}
        visible={visibleSections.includes(projectOne.current)}
        index={1}
        title="Mingle — real-time conversations"
        description="A full-stack chat app with custom authentication, live presence, and image sharing."
        buttonText="View project"
        buttonLink="/projects/mingle"
        model={{
          type: 'laptop',
          alt: 'Mingle real-time chat application',
          textures: [
            {
              srcSet: `${mingleTexture} 1280w`,
              placeholder: mingleTexture,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-2"
        projectName="JobTrackr"
        alternate
        sectionRef={projectTwo}
        visible={visibleSections.includes(projectTwo.current)}
        index={2}
        title="JobTrackr — job search command center"
        description="A MERN job application tracker with a Kanban pipeline, analytics, notes, and follow-up reminders."
        buttonText="View project"
        buttonLink="/projects/jobtrackr"
        model={{
          type: 'laptop',
          alt: 'JobTrackr application dashboard',
          textures: [
            {
              srcSet: `${jobTrackrTexture} 1280w`,
              placeholder: jobTrackrTexture,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-3"
        projectName="TopTodo"
        sectionRef={projectThree}
        visible={visibleSections.includes(projectThree.current)}
        index={3}
        title="TopTodo — a focused task manager"
        description="A JavaScript productivity app for projects, due dates, reusable modules, and persistent tasks."
        buttonText="View project"
        buttonLink="/projects/toptodo"
        model={{
          type: 'laptop',
          alt: 'TopTodo task manager interface',
          textures: [
            {
              srcSet: `${topTodoTexture} 1280w`,
              placeholder: topTodoTexture,
            },
          ],
        }}
      />
      <TechStack id="tech-stack" />
      <Footer />
    </div>
  );
};
