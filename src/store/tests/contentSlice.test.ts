import { Content, ContentModel } from '../../models/content.model';
import contentReducer,
{
    addPageContent,
    editContent,
    deletePageContent,
    initialState
} from '../contentSlice';


describe('contentSlice', () => {
    it('should return initial state when passed empty value', () => {
        const result = contentReducer(undefined, { type: '' });

        expect(result).toEqual(initialState);
    });

    it('should add new page content item with "addPageContent"', () => {
        const newContent: Omit<ContentModel, '_id'> = {
            type: 'about',
            eng: {
                title: 'Test',
                body: 'Lorem ipsum dolor',
                image: 'https://api.ok-dev.pp.ua/img_1',
            },
            ua: {
                title: 'Тест'
            }
        };

        const action = { type: addPageContent.type, payload: newContent };
        const result = contentReducer(initialState, action);
        const index = initialState.content.length;

        expect(result.content[index]._id).toBeDefined();
        expect(result.content[index].eng).toBeDefined();
        expect(result.content[index].eng.title).toBe<string>(newContent.eng.title);
        expect(result.content[index].ua).toBeDefined();
        expect(result.content[index].ua.title).toBe<string>(newContent.ua.title);
    });

    it('should edit content item with "editContent"', () => {
        const formValue = 'about | ua';
        const editedContent: Content = {
            title: 'Тест'
        };

        const action = { type: editContent.type, payload: { content: editedContent, formValue } };
        const result = contentReducer(initialState, action);

        expect(result.content[0].ua.title).toBe<string>(editedContent.title);
    });

    it('should delete page content item with "deletePageContent"', () => {
        const id = 'cebd3e7b-a075-4765-b9f6-8d1ba1559a98';
        const action = { type: deletePageContent.type, payload: id };
        const result = contentReducer(initialState, action);
        const updatedState = initialState.content.filter((c) => c._id !== id);

        expect(result.content).toEqual(updatedState);
    });
});

