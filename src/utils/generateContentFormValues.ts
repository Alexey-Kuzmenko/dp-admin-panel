import { ContentModel } from '../models/content.model';

export default function generateContentFormValues(content: Array<ContentModel>): Array<string> {
    const formValues: Array<string> = [];

    if (!content.length) {
        throw new Error('Array with content values cannot be empty.');
    }

    for (let i = 0; i < content.length; i++) {
        const c = content[i];
        formValues.push(`${c.type} | eng`);
        formValues.push(`${c.type} | ua`);
    }

    return formValues;
}