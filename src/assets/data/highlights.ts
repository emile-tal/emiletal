import type { Highlight } from '../../types'

const highlights: Highlight[] = [
    {
        company: 'SAM Labs',
        title: 'Rebuilding SAM Studio from the ground up',
        status: 'In development',
        paragraphs: [
            'SAM Studio is where students code SAM Labs’ hardware using blocks, flow diagrams, or real Python. The previous app had hit limits we couldn’t patch, so we’re rebuilding it from scratch, starting with the database.',
            'I’m one of three engineers on the rebuild, and I work across all of it: designing interfaces, building front-end features, and shaping the backend and schema as features land. I brought Python into the browser with Pyodide, so students can run real Python inside the app while everything else stays responsive, and I built the block-based coding interface on Blockly.',
            'The new platform is in development, designed around years of feedback from students, teachers, and school admins on the previous app.',
        ],
        tools: ['React', 'Zustand', 'NestJS', 'MySQL', 'Pyodide', 'Blockly'],
    },
    {
        company: 'SAM Labs',
        title: 'Future Ready Skills Tracker: one dashboard, scoped to every role',
        status: 'Launched 2026',
        paragraphs: [
            'Schools wanted to track students’ soft skills, scored by teachers in tracking sessions, and see progress at every level: class, school, and district.',
            'I focused on the data layer behind the dashboards. Every request is scoped in the query itself, so teachers, school admins, and district admins see the same kinds of graphs, but the database only ever returns their own data. NestJS guards decide who can create sessions, edit school goals, or manage users. To keep dashboards fast as data grows, I pushed aggregation into SQL instead of computing it in the app, fetched related data with joins and parallel queries, selected only the columns each view needed, and built a reusable cursor-based pagination service the rest of the API can use. Multi-step writes, like saving a tracking session with all its scores, run in transactions so data never ends up half-saved.',
        ],
        tools: ['React', 'NestJS', 'MySQL', 'Drizzle'],
    },
    {
        company: 'SAM Labs',
        title: 'In-house lesson and assessment editor (Lexical)',
        stats: [
            { value: '400,000+', label: 'students' },
            { value: '500+', label: 'schools' },
        ],
        paragraphs: [
            'SAM Labs was paying for a third-party SaaS tool to build lessons, and it didn’t fit our product. Engineers had to do significant custom work just to bend it to our needs.',
            'I worked with our lead developer from ideation to implementation to replace it with a custom editor built on Meta’s Lexical. We built custom nodes for each question type (multiple choice, essay, fill-in-the-blank, and more), so teachers can build full assessments with automatic grading built in. Lessons are saved to S3 through a debounced autosave layer on a Zustand store, which batches edits so the backend isn’t hit on every keystroke.',
            'The editor now powers lesson authoring for 400,000+ students across 500+ schools, eliminated the licensing cost, and has been reused elsewhere in the app, such as rich text commenting.',
        ],
        tools: ['Lexical', 'Zustand', 'AWS S3'],
    },
    {
        company: 'SAM Labs',
        title: 'Automating WCAG accessibility for 1,000+ resources',
        stats: [
            { value: '1,000+', label: 'Docs and Slides' },
            { value: '~3 months', label: 'of manual work saved' },
        ],
        paragraphs: [
            'Our clients required WCAG compliance, and the problem wasn’t the website. It was more than 1,000 Google Docs and Slides of lesson material.',
            'Over a weekend, I wrote a Node script that walked every element of every document through the Google APIs. For text, it computed the contrast ratio against the background and swapped in a compliant color from the content team’s palette. For images, it generated alt text with the OpenAI API, comparing each image against cached copies of our frequently reused banners and logos first so the same alt text was never regenerated. Batched edits and spaced-out API calls kept it within rate limits.',
            'It ran for several days and saved an estimated three months of manual work.',
        ],
        tools: ['Node.js', 'Google Docs & Slides APIs', 'OpenAI API'],
    },
]

export default highlights
