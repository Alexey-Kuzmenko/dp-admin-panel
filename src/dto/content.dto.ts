import { ContentModel, Content } from '../models/content.model';

export interface ContentDto extends Omit<Content, '_id'> { }
export interface CreateContentDto extends Omit<ContentModel, '_id'> { }