export interface ProjectTechnology {
    iconClass: string
    label: string
}

export type ProjectTags = 'TypeScript' | 'React' | 'Next.js' | 'JavaScript' | 'SCSS';

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