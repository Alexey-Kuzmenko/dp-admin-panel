import { SkillModel } from '../../models/skill.model';
import { SkillDto } from '../../dto/skill.dto';
import skillReducer, {
    addSkill,
    editSkill,
    deleteSkill,
    initialState
} from '../skillSlice';

describe('SkillSlice', () => {
    it('should return initial state when passed an empty action', () => {
        const result = skillReducer(undefined, { type: '' });

        expect(result).toEqual(initialState);
    });

    it('should added new skill item with "addSkill" action', () => {
        const newSkill: SkillDto = {
            slug: 'test',
            label: 'Test',
            iconClass: 'icon-class-test'
        };

        const action = { type: addSkill.type, payload: newSkill };
        const result = skillReducer(initialState, action);
        const index = result.skills.length - 1;

        expect(result.skills[index].slug).toBe<string>(newSkill.slug);
        expect(result.skills[index].label).toBe<string>(newSkill.label);
        expect(result.skills[index].iconClass).toBe<string>(newSkill.iconClass);
    });

    it('should edit skill item with "editSkill" action', () => {
        const editedSkill: SkillModel = {
            ...initialState.skills[0],
            slug: 'edited value'
        };

        const action = { type: editSkill.type, payload: editedSkill };
        const result = skillReducer(initialState, action);

        expect(result.skills[0].slug).toBe<string>(editedSkill.slug);
    });

    it('should delete skill item with "deleteSkill" action', () => {
        const deletedSkillId = initialState.skills[0]._id;
        const action = { type: deleteSkill.type, payload: deletedSkillId };
        const result = skillReducer(initialState, action);
        const updatedState = initialState.skills.filter((s) => s._id !== deletedSkillId);

        expect(result.skills).toEqual(updatedState);
    });
});