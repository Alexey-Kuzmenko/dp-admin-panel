import { ContentModel } from '../models/content.model';

export default function generateContentFormValues(content: Array<ContentModel>): Array<string> {
    const formValues: Array<string> = [];

    for (let i = 0; i < content.length; i++) {
        const c = content[i];
        formValues.push(`${c.type} | eng`);
        formValues.push(`${c.type} | ua`);
    }

    return formValues;
}