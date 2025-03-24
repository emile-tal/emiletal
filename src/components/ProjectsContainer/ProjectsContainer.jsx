import './ProjectsContainer.scss'

import { Project } from '../Project/Project'
import projects from '../../assets/data/projects'

export function ProjectsContainer() {
    return (
        <div className='projects-container'>
            {projects.map((project, index) => (
                <Project
                    key={index}
                    projectName={project.name}
                    projectOneliner={project.oneLiner}
                    projectDescription={project.description}
                    projectSrc={project.src}
                    projectLink={project.link}
                    githubFrontEnd={project.githubFront}
                    githubBackEnd={project.githubBack}
                    blog={project.blog}
                />
            ))}
        </div>
    )
}