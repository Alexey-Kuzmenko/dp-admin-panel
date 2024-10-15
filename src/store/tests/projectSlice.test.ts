import { ProjectModel } from '../../models/project.model';
import { ProjectDto } from '../../dto/project.dto';

import projectReducer, {
    addProject,
    deleteProject,
    editProject,
    initialState
} from '../projectSlice';

describe('projectSlice', () => {
    it('should return initial state when when passed an empty action', () => {
        const result = projectReducer(undefined, { type: '' });

        expect(result).toEqual(initialState);
    });

    it('should add new project item with "addProject" action', () => {
        const newProject: ProjectDto = {
            name: 'Test',
            description: 'Test',
            tags: ['React', 'TypeScript'],
            link: 'test',
            repoLink: 'test',
            image: 'test.svg',
            body: 'Test',
            technologies: [{ iconClass: 'test', label: 'test' }]
        };

        const action = { type: addProject.type, payload: newProject };
        const result = projectReducer(initialState, action);
        const index = result.projects.length - 1;

        expect(result.projects[index].name).toBe<string>(newProject.name);
        expect(result.projects[index].body).toBe<string>(newProject.body);
        expect(result.projects[index].tags).toBeDefined();
        expect(result.projects[index].technologies).toBeDefined();
    });

    it('should edit project item with "editProject" action', () => {
        const editedProject: ProjectModel = {
            ...initialState.projects[0],
            name: 'Updated project name'
        };

        const action = { type: editProject.type, payload: editedProject };
        const result = projectReducer(initialState, action);

        expect(result.projects[0]).toBe<ProjectModel>(editedProject);
    });

    it('should remove project item with "deleteProject" action', () => {
        const deletedProjectId = initialState.projects[0]._id;
        const action = { type: deleteProject.type, payload: deletedProjectId };
        const result = projectReducer(initialState, action);
        const updatedState = initialState.projects.filter((p) => p._id !== deletedProjectId);

        expect(result.projects).toEqual(updatedState);
    });
});