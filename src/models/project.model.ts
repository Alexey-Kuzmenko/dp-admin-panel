export interface ProjectTechnology {
    iconClass: string
    label: string
}

export type ProjectTags = 'TypeScript' | 'React' | 'Next.js' | 'JavaScript' | 'SCSS';

export const projectModelKeys: Array<string> = [
    '_id',
    'name',
    'tags',
    'description',
    'link',
    'repoLink',
    'image',
    'body',
    'technologies',
    'iconClass',
    'label'
];

export interface ProjectModel {
    _id: string
    name: string
    tags: Array<ProjectTags | string>
    description: string
    link: string
    repoLink: string
    image: string
    body: string
    technologies: Array<ProjectTechnology>
}