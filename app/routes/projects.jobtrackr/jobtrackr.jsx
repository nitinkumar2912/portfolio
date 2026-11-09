import jobTrackrScreenshot from '~/assets/portfolio/jobtrackr.png';
import { Footer } from '~/components/footer';
import { ProjectBackground, ProjectContainer, ProjectHeader, ProjectImage, ProjectSection, ProjectSectionContent, ProjectSectionHeading, ProjectSectionText, ProjectTextRow } from '~/layouts/project';
import { baseMeta } from '~/utils/meta';

const title = 'JobTrackr';
const description =
  'A JavaScript MERN job application tracker for managing internship and placement pipelines, recruiter details, interview notes, analytics, and follow-ups.';
const roles = [
  'JavaScript', 'React', 'Node.js', 'Express.js', 'MongoDB Atlas', 'JWT', 'Render', 'Vercel',
];

export const meta = () => baseMeta({ title, description, prefix: 'Projects' });

export function JobTrackr() {
  return (
    <>
      <ProjectContainer>
        <ProjectBackground
          src={jobTrackrScreenshot}
          srcSet={`${jobTrackrScreenshot} 3398w`}
          width={3398}
          height={1872}
          placeholder={jobTrackrScreenshot}
          opacity={0.86}
        />
        <ProjectHeader
          title={title}
          description={description}
          linkLabel="Open live app"
          url="https://job-tracker-client-murex.vercel.app"
          githubUrl="https://github.com/nitinkumar2912/JobTracker"
          roles={roles}
        />
        <ProjectSection padding="top">
          <ProjectSectionContent>
            <ProjectImage
              srcSet={`${jobTrackrScreenshot} 3398w`}
              width={3398}
              height={1872}
              placeholder={jobTrackrScreenshot}
              alt="JobTrackr dashboard with application pipeline and analytics."
              sizes="100vw"
            />
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>One place for the job search</ProjectSectionHeading>
              <ProjectSectionText>
                Applications often end up spread across spreadsheets, inboxes, and saved
                links. JobTrackr brings them into a Kanban pipeline, with recruiter
                tracking, interview notes, activity history, and reminders for the next
                follow-up.
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection light>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>From application to analytics</ProjectSectionHeading>
              <ProjectSectionText>
                JWT authentication protects each account. MongoDB Atlas stores the
                application data, while an Express API serves the React client. A
                dashboard summarizes the pipeline so users can review progress alongside
                their active applications.
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
      </ProjectContainer>
      <Footer />
    </>
  );
}
