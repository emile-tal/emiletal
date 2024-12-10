import './ProjectsContainer.scss'

import { Project } from '../Project/Project'
import checkIn from '../../assets/images/check-in-image.png'
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
                    projectSrc={checkIn}
                    projectLink={project.link}
                    githubFrontEnd={project.githubFront}
                    githubBackEnd={project.githubBack}
                />
            ))}
        </div>
    )
}