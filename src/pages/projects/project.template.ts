import { ProjectModel } from '@alexey-kuzmenko/ok-apps-sdk';

export const projectTemplate: Omit<ProjectModel, '_id'> = {
    name: '',
    tags: [],
    description: '',
    link: '',
    repoLink: '',
    image: '',
    body: '',
    technologies: []
};
