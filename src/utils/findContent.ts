import { Content, ContentModel } from '../models/content.model';

export function findContent(content: Array<ContentModel>, fromValue: string): Content | undefined {
    const keys: Array<string> = fromValue.replace(/\s+/g, '').split('|');
    const contentByType: ContentModel | undefined = content.find((c) => c.type === keys[0]);

    if (contentByType && keys.length) {
        const contentByLang: Content = keys[1] === 'eng' ? contentByType.eng : contentByType.ua;
        return contentByLang;
    }
}