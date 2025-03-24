import checkIn from '../images/check-in-image.png'
import vibeBnb from '../images/vibebnb-image.png'

const projects = [{
    name: 'Check-In',
    oneLiner: 'Strategic turn-based hotel building game',
    description: 'Check-In is a strategic turn based game which can be played both as singleplayer and multiplayer. Each turn players draw "room" tiles and place them on the board scoring points based on how they have arranged their tiles. The game was created from scratch with React, Typescript and SCSS, deployed with Netlify, and the server is hosted on Heroku.',
    src: checkIn,
    link: 'https://emile-check-in.netlify.app/',
    githubFront: 'https://github.com/emile-tal/check-in',
    githubBack: 'https://github.com/emile-tal/check-in-backend'
},
{
    name: 'VibeBNB',
    oneLiner: 'Airbnb clone',
    description: 'VibeBNB is a clone of Airbnb that I coded using cursor and claude. I vibecoded the whole project (meaning I used prompts to generate the code and then I used claude to fix the bugs), all within 3 days. The project is a fullstack app that allows users to list spaces and borrow them for a certain period of time. The project was created with Next.js, TailwindCSS, and PostgreSQL, and deployed with Vercel.',
    src: vibeBnb,
    link: 'https://airbnb-frontend-drab.vercel.app/',
    githubFront: 'https://github.com/emile-tal/airbnb-frontend',
    blog: 'https://medium.com/@emiletal/my-first-vibecoding-project-rebuilding-airbnb-bc2daa3df8fc'
}
]

export default projects