import './Project.scss'

export function Project({ projectName, projectOneliner, projectDescription, projectSrc, projectLink, githubFrontEnd, githubBackEnd }) {
    return (
        <div className='project'>
            <a className='project__image-link' href={projectLink}>
                <img className='project__image' alt={`${projectName} descriptive image of website`} src={projectSrc} />
            </a>
            <div className='project__text-container'>
                <a className='project__header-link' href={projectLink}>
                    <h2 className='project__header'>{projectName}</h2>
                </a>
                <p className='project__content project__content--emphasize'>{projectOneliner}</p>
                <p className='project__content'>{projectDescription}</p>
                <div className='project__link-container'>
                    <a className='project__link' href={projectLink}>Live Site</a>
                    <a className='project__link' href={githubFrontEnd}>Front-End Repo</a>
                    <a className='project__link' href={githubBackEnd}>Back-End Repo</a>
                </div>
            </div>
        </div>
    )
}