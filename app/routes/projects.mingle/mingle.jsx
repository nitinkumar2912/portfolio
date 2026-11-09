import mingleScreenshot from '~/assets/portfolio/mingle.png';
import { Footer } from '~/components/footer';
import { ProjectBackground, ProjectContainer, ProjectHeader, ProjectImage, ProjectSection, ProjectSectionContent, ProjectSectionHeading, ProjectSectionText, ProjectTextRow } from '~/layouts/project';
import { baseMeta } from '~/utils/meta';

const title = 'Mingle';
const description =
  'A JavaScript and MERN real-time chat application with custom JWT authentication, online presence, image sharing, and a polished React interface.';
const roles = [
  'JavaScript', 'React', 'Node.js', 'Express.js', 'MongoDB', 'Socket.IO',
  'Tailwind CSS', 'DaisyUI', 'Zustand', 'JWT', 'Cloudinary', 'Resend', 'Arcjet', 'Sevalla',
];

export const meta = () => baseMeta({ title, description, prefix: 'Projects' });

export function Mingle() {
  return (
    <>
      <ProjectContainer>
        <ProjectBackground
          src={mingleScreenshot}
          srcSet={`${mingleScreenshot} 3406w`}
          width={3406}
          height={1904}
          placeholder={mingleScreenshot}
          opacity={0.86}
        />
        <ProjectHeader
          title={title}
          description={description}
          linkLabel="Open live app"
          url="https://ghub-chatify-app.onrender.com"
          githubUrl="https://github.com/nitinkumar2912/Ghub-chatify-app"
          roles={roles}
        />
        <ProjectSection padding="top">
          <ProjectSectionContent>
            <ProjectImage
              srcSet={`${mingleScreenshot} 3406w`}
              width={3406}
              height={1904}
              placeholder={mingleScreenshot}
              alt="Mingle chat application showing the conversation home screen."
              sizes="100vw"
            />
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>Conversations that feel live</ProjectSectionHeading>
              <ProjectSectionText>
                Mingle brings messaging, online and offline presence, and image sharing
                together in one chat experience. Socket.io keeps messages and presence in
                sync, while typing and notification sounds make new activity easier to
                notice.
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection light>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>Built end to end</ProjectSectionHeading>
              <ProjectSectionText>
                The app uses custom JWT authentication, an Express REST API, and MongoDB
                persistence. Cloudinary handles image uploads, Resend sends welcome
                emails, and Arcjet adds API rate limiting. The React frontend uses
                Tailwind CSS, DaisyUI, and Zustand for its interface and state.
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
      </ProjectContainer>
      <Footer />
    </>
  );
}
