import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProjectModel } from '../models/project.model';
import { v4 as uuidv4 } from 'uuid';
import { ProjectDto } from '../dto/project.dto';

interface ProjectState {
    projects: Array<ProjectModel>
}

// * temporary data 
export const initialState: ProjectState = {
    projects: [
        {
            _id: '65e9ed917060abb0080a5768',
            name: 'Budget app',
            tags: [
                'React',
                'TypeScript',
                'SCSS'
            ],
            description: 'Budget App is a personal budgeting app that helps you track your income, expenses and profits. The app also allows you to convert currencies in real time.',
            link: 'https://budget-app-ng0j.onrender.com/',
            repoLink: 'https://github.com/Alexey-Kuzmenko/budget-app',
            image: 'https://api.ok-dev.pp.ua/static/budget-app/budget-app_img.svg',
            body: 'The Budget App is a personal budgeting tool that can assist you in controlling your finances. You can easily add expenses and income to the app, and it will automatically update your budget accordingly. The app also provides support for currency conversion, so you can keep track of your preferred currency effortlessly.',
            technologies: [
                {
                    iconClass: 'devicon-react-original',
                    label: 'React'
                },
                {
                    iconClass: 'devicon-typescript-plain',
                    label: 'TypeScript'
                },
                {
                    iconClass: 'devicon-redux-original',
                    label: 'Redux toolkit'
                },
                {
                    iconClass: 'devicon-reactrouter-plain',
                    label: 'React router'
                },
                {
                    iconClass: 'devicon-materialui-plain',
                    label: 'Material UI'
                },
                {
                    iconClass: 'devicon-sass-original',
                    label: 'SCSS'
                },
                {
                    iconClass: 'devicon-firebase-plain',
                    label: 'Firebase'
                }
            ]
        },
        {
            _id: '65e9eeed7060abb0080a576b',
            name: 'Quiz App',
            tags: [
                'React',
                'JavaScript',
                'SCSS'
            ],
            description: 'Quiz App allows you to create your custom quizzes or play pre-made quizzes.',
            link: 'https://quiz-game-n2q7.onrender.com/',
            repoLink: 'https://github.com/Alexey-Kuzmenko/react-quiz',
            image: 'https://api.ok-dev.pp.ua/static/quiz-app/quiz-app_img.svg',
            body: 'Quiz App this an app which allow users to create quizzes that cater to your specific needs or interests. Alternatively, you can choose from a wide range of pre-made quizzes to test your knowledge on various topics',
            technologies: [
                {
                    iconClass: 'devicon-react-original',
                    label: 'React'
                },
                {
                    iconClass: 'devicon-javascript-plain',
                    label: 'JavaScript'
                },
                {
                    iconClass: 'devicon-redux-original',
                    label: 'Redux toolkit'
                },
                {
                    iconClass: 'devicon-reactrouter-plain',
                    label: 'React router'
                },
                {
                    iconClass: 'devicon-sass-original',
                    label: 'SCSS'
                },
                {
                    iconClass: 'devicon-firebase-plain',
                    label: 'Firebase'
                }
            ]
        },
        {
            _id: '65e9fd407060abb0080a576e',
            name: 'Note App',
            tags: [
                'React',
                'TypeScript',
                'SCSS'
            ],
            description: 'Note App is a digital workspace that makes it easy to capture, categorize and manage your tasks, thoughts and ideas.',
            link: 'https://radency-task-2.onrender.com/',
            repoLink: 'https://github.com/Alexey-Kuzmenko/radency-notes-app-task-2',
            image: 'https://api.ok-dev.pp.ua/static/note-app/note-app_img.svg',
            body: 'The Note app enables users to create notes, which can be categorised into Task, Random Thought, and Idea. Additionally, notes can be edited and archived. App tracks notes that are active and archived by category. ',
            technologies: [
                {
                    iconClass: 'devicon-react-original',
                    label: 'React'
                },
                {
                    iconClass: 'devicon-typescript-plain ',
                    label: 'TypeScript'
                },
                {
                    iconClass: 'devicon-redux-original',
                    label: 'Redux toolkit'
                },
                {
                    iconClass: 'devicon-reactrouter-plain',
                    label: 'React router'
                },
                {
                    iconClass: 'devicon-sass-original',
                    label: 'SCSS'
                }
            ],
        },
        {
            _id: '65ea03597060abb0080a5777',
            name: 'Grovemade',
            tags: [
                'JavaScript',
                'SCSS'
            ],
            description: 'This project is a page of Grovemade company.',
            link: 'https://alexey-kuzmenko.github.io/grovemade-shop-page/',
            repoLink: 'https://github.com/Alexey-Kuzmenko/grovemade-shop-page',
            image: 'https://api.ok-dev.pp.ua/static/grovemade/grovemade_img.svg',
            body: 'I have created this project as an example to showcase my skills and knowledge as a Front-end developer. The project is a webpage for a company that produces gadgets and workspace accessories. Its purpose is to demonstrate my abilities and help me find a job in this field.',
            technologies: [
                {
                    iconClass: 'devicon-html5-plain',
                    label: 'HTML5'
                },
                {
                    iconClass: 'devicon-sass-original',
                    label: 'SCSS'
                },
                {
                    iconClass: 'devicon-javascript-plain',
                    label: 'JavaScript'
                }
            ],
        }
    ]
};

const projectSlice = createSlice({
    name: 'projects',
    initialState,
    selectors: {
        selectProjects: (state) => state.projects
    },
    reducers: (create) => ({
        addProject: create.reducer((state, { payload }: PayloadAction<ProjectDto>) => {
            const newProject: ProjectModel = {
                _id: uuidv4(),
                ...payload
            };

            state.projects.push(newProject);
        }),
        deleteProject: create.reducer((state, { payload }: PayloadAction<string>) => {
            state.projects = state.projects.filter((p) => p._id !== payload);
        }),
        editProject: create.reducer((state, { payload }: PayloadAction<ProjectModel>) => {
            const project = state.projects.find((p) => p._id === payload._id);

            if (project) {
                const projectIndex = state.projects.indexOf(project);
                const projectsCopy = [...state.projects];
                projectsCopy[projectIndex] = payload;
                state.projects = projectsCopy;
            }
        })
    })
});

export const { selectProjects } = projectSlice.selectors;

export const { addProject, deleteProject, editProject } = projectSlice.actions;

export default projectSlice.reducer;