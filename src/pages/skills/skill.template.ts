import { SkillModel } from '../../models/skill.model';

export const skillTemplate: Omit<SkillModel, '_id'> = {
    slug: '',
    label: '',
    iconClass: ''
};
