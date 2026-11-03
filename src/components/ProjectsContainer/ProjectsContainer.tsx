import { Project } from '../Project/Project'
import projects from '../../assets/data/projects'

export function ProjectsContainer() {
    return (
        <div className='page-container flex flex-col gap-8'>
            {projects.map((project) => (
                <Project
                    key={project.name}
                    projectName={project.name}
                    projectOneliner={project.oneLiner}
                    projectDescription={project.description}
                    projectSrc={project.src}
                    projectLink={project.link}
                    githubFrontEnd={project.githubFront}
                    githubBackEnd={project.githubBack}
                    blog={project.blog}
                    github={project.github}
                />
            ))}
        </div>
    )
}
