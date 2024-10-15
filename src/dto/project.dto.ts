import { ProjectModel } from '../models/project.model';

export interface ProjectDto extends Omit<ProjectModel, '_id'> { }