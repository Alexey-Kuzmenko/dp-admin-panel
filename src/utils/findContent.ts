import { Content, ContentModel } from '@alexey-kuzmenko/ok-apps-sdk';

export default function findContent(content: Array<ContentModel>, fromValue: string): Content | undefined {
    const [type, lang]: Array<string> = fromValue.replace(/\s+/g, '').split('|');
    const contentByType: ContentModel | undefined = content.find((c) => c.type === type);

    if (contentByType && lang) {
        const contentByLang: Content = lang === 'eng' ? contentByType.eng : contentByType.ua;
        return contentByLang;
    }
}
