interface ProjectProps {
    projectName: string
    projectOneliner: string
    projectDescription: string
    projectSrc: string
    projectLink: string
    githubFrontEnd?: string
    githubBackEnd?: string
    blog?: string
    github?: string
}

const textSize = 'text-[0.8rem] tablet:text-[1rem] desktop:text-[1.2rem]'

// Underline grows in from the left on hover (tablet and up)
const linkClasses = `relative no-underline text-bronze hover:text-navy ${textSize} tablet:after:absolute tablet:after:bottom-0 tablet:after:left-0 tablet:after:w-full tablet:after:h-[2px] tablet:after:bg-navy tablet:after:scale-x-0 tablet:after:transition-transform tablet:after:duration-300 tablet:after:ease-[ease] tablet:hover:after:scale-x-100`

export function Project({ projectName, projectOneliner, projectDescription, projectSrc, projectLink, githubFrontEnd, githubBackEnd, blog, github }: ProjectProps) {
    return (
        <article className='w-full tablet:flex tablet:gap-6'>
            <a href={projectLink}>
                <img
                    className='w-full min-w-[300px] h-[300px] object-cover border-2 border-bronze shadow-[rgba(50,50,93,0.25)_0px_50px_100px_-20px,rgba(0,0,0,0.3)_0px_30px_60px_-30px,rgba(10,37,64,0.35)_0px_-2px_6px_0px_inset] desktop:w-[400px]'
                    alt={`${projectName} descriptive image of website`}
                    src={projectSrc}
                />
            </a>
            <div className='py-8 font-poppins text-bronze tablet:p-0 tablet:min-w-1/2'>
                <a className='no-underline' href={projectLink}>
                    <h2 className='section-title'>{projectName}</h2>
                </a>
                <p className={`py-1 italic ${textSize}`}>{projectOneliner}</p>
                <p className={`py-1 ${textSize}`}>{projectDescription}</p>
                <div className='flex flex-col gap-[0.2rem] py-1 tablet:flex-row tablet:justify-between'>
                    <a className={linkClasses} href={projectLink}>Live Site</a>
                    {githubFrontEnd && <a className={linkClasses} href={githubFrontEnd}>Front-End Repo</a>}
                    {githubBackEnd && <a className={linkClasses} href={githubBackEnd}>Back-End Repo</a>}
                    {blog && <a className={linkClasses} href={blog}>Medium Blog</a>}
                    {github && <a className={linkClasses} href={github}>Github Repo</a>}
                </div>
            </div>
        </article>
    )
}
