import { SkillModel } from '../models/skill.model';

export interface SkillDto extends Omit<SkillModel, '_id'> { }