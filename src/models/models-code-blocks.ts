export const modelsCodeBlocks = {
    contacts: `
    type ContactIconType = 'telegram' | 'email' | 'linkedIn' | 'instagram';

    interface ContactDto {
        label: string
        body: string
        href: string
        iconType: ContactIconType
        atl?: string
    }
`,
    content: `
    type ContentType = 'about' | 'contacts' | 'services' | 'projects';
    
    type ContentLang = 'ua' | 'eng';

    interface Link {
        label: string;
        href: string;
    }

    interface ContentDto {
        title: string;
        body?: string;
        image?: string;
        links?: Array<Link>;
    }
    
    interface CreateContentDto {
        type: ContentType;
        eng: Content;
        ua: Content;
    }
`,
    skills: `
    interface SkillDto {
        slug: string
        label: string
        iconClass: string
    }
`,
    projects: `
    interface ProjectTechnology {
        iconClass: string
        label: string
    }

    type ProjectTags = 'TypeScript' | 'React' | 'Next.js' | 'JavaScript' | 'SCSS';

    interface ProjectDto {
        name: string
        tags: Array<string>
        description: string
        link: string
        repoLink: string
        image: string
        body: string
        technologies: Array<ProjectTechnology>
    }
`
};