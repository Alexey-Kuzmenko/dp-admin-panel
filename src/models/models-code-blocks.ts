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
};