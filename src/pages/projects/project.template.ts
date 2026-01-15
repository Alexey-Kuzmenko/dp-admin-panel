import { ProjectModel } from '../../models/project.model';

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
