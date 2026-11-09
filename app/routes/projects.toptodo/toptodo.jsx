import topTodoScreenshot from '~/assets/portfolio/toptodo.png';
import { Footer } from '~/components/footer';
import { ProjectBackground, ProjectContainer, ProjectHeader, ProjectImage, ProjectSection, ProjectSectionContent, ProjectSectionHeading, ProjectSectionText, ProjectTextRow } from '~/layouts/project';
import { baseMeta } from '~/utils/meta';

const title = 'TopTodo';
const description =
  'A lightweight JavaScript task manager for organizing projects, due dates, and upcoming work, with tasks saved locally in the browser.';
const roles = ['JavaScript', 'HTML', 'CSS', 'Webpack', 'date-fns', 'localStorage'];

export const meta = () => baseMeta({ title, description, prefix: 'Projects' });

export function TopTodo() {
  return (
    <>
      <ProjectContainer>
        <ProjectBackground
          src={topTodoScreenshot}
          srcSet={`${topTodoScreenshot} 3376w`}
          width={3376}
          height={1836}
          placeholder={topTodoScreenshot}
          opacity={0.86}
        />
        <ProjectHeader
          title={title}
          description={description}
          linkLabel="Open live app"
          url="https://nitinkumar2912.github.io/TopTodo/"
          githubUrl="https://github.com/nitinkumar2912/TopTodo"
          roles={roles}
        />
        <ProjectSection padding="top">
          <ProjectSectionContent>
            <ProjectImage
              srcSet={`${topTodoScreenshot} 3376w`}
              width={3376}
              height={1836}
              placeholder={topTodoScreenshot}
              alt="TopTodo task manager showing its inbox and project navigation."
              sizes="100vw"
            />
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>A clear place to start</ProjectSectionHeading>
              <ProjectSectionText>
                TopTodo keeps the task list focused while still making room for projects
                and due dates. Tasks stay in local storage, so the app can be used without
                creating an account.
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection light>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>Small, reusable pieces</ProjectSectionHeading>
              <ProjectSectionText>
                The app is built with vanilla JavaScript and Webpack. Reusable modules
                organize the interface, date-fns supports due date scheduling, and browser
                storage keeps task data available between visits.
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
      </ProjectContainer>
      <Footer />
    </>
  );
}
