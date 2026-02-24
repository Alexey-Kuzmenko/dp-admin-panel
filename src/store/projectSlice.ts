import { asyncThunkCreator, buildCreateSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';

import { ProjectModel } from '../models/project.model';
import { ProjectDto } from '../dto/project.dto';
import { ResponseError } from '../types';
import { ERROR_MSG_TEMPLATE } from '../constants';
import excludeObjectValues from '../utils/excludeObjectValues';

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;
const JWT_TOKEN = import.meta.env.VITE_JWT_TOKEN;

const createProjectSlice = buildCreateSlice({
    creators: { asyncThunk: asyncThunkCreator }
});

interface ProjectState {
    projects: Array<ProjectModel>,
    loading: boolean | null,
    error: ResponseError
}

export const initialState: ProjectState = {
    projects: [],
    loading: null,
    error: {
        message: null,
        exists: null
    }
};

const projectSlice = createProjectSlice({
    name: 'projects',
    initialState,
    selectors: {
        selectProjects: (state) => state.projects,
        selectLoading: (state) => state.loading,
        selectError: (state) => state.error
    },
    reducers: (create) => ({
        deleteProjectLocally: create.reducer((state, { payload }: PayloadAction<string>) => {
            state.projects = state.projects.filter((p) => p._id !== payload);
        }),
        fetchProjects: create.asyncThunk(async () => {
            const response: AxiosResponse<ProjectModel[]> = await axios.get(`${API_URL}/projects`, {
                headers: {
                    'Api-key': API_KEY
                }
            });

            return response.data;
        },
            {
                pending: (state) => {
                    state.loading = true;
                },
                fulfilled: (state, { payload }) => {
                    const data = excludeObjectValues<ProjectModel>(['createdAt', 'updatedAt', '__v'], payload);
                    state.projects.push(...data);
                },
                rejected: (state, { error }) => {
                    state.error.exists = true;
                    state.error.message = error.message ? error.message : `${ERROR_MSG_TEMPLATE} Project slice`;
                },
                settled: (state) => {
                    state.loading = false;
                }
            }
        ),
        addProject: create.asyncThunk(async (dto: ProjectDto) => {
            const response: AxiosResponse<ProjectModel> = await axios.post(`${API_URL}/projects`, dto, {
                headers: {
                    'Authorization': `Bearer ${JWT_TOKEN}`
                }
            });

            return response.data;
        },
            {
                pending: (state) => {
                    state.loading = true;
                },
                fulfilled: (state, { payload }) => {
                    const data = excludeObjectValues<ProjectModel>(['createdAt', 'updatedAt', '__v'], [payload]);
                    state.projects.push(...data);
                },
                rejected: (state, { error }) => {
                    state.error.exists = true;
                    state.error.message = error.message ? error.message : `${ERROR_MSG_TEMPLATE} Project slice`;
                },
                settled: (state) => {
                    state.loading = false;
                }
            }
        ),
        deleteProject: create.asyncThunk(async (id: string, thunkApi) => {
            await axios.delete(`${API_URL}/projects/${id}`, {
                headers: {
                    'Authorization': `Bearer ${JWT_TOKEN}`
                }
            });

            thunkApi.dispatch(deleteProjectLocally(id));
        },
            {
                pending: (state) => {
                    state.loading = true;
                },
                rejected: (state, { error }) => {
                    state.error.exists = true;
                    state.error.message = error.message ? error.message : `${ERROR_MSG_TEMPLATE} Project slice`;
                },
                settled: (state) => {
                    state.loading = false;
                }
            }
        ),
        editProject: create.asyncThunk(async (project: ProjectModel) => {
            const response: AxiosResponse<ProjectModel> = await axios.patch(
                `${API_URL}/projects/${project._id}`,
                project,
                {
                    headers: {
                        'Authorization': `Bearer ${JWT_TOKEN}`
                    }
                }
            );

            return response.data;
        },
            {
                pending: (state) => {
                    state.loading = true;
                },
                fulfilled: (state, { payload }) => {
                    const project = state.projects.find((p) => p._id === payload._id);
                    const [data] = excludeObjectValues<ProjectModel>(['createdAt', 'updatedAt', '__v'], [payload]);

                    if (project) {
                        const projectIndex = state.projects.indexOf(project);
                        const projectsCopy = [...state.projects];
                        projectsCopy[projectIndex] = data;
                        state.projects = projectsCopy;
                    }
                },
                rejected: (state, { error }) => {
                    state.error.exists = true;
                    state.error.message = error.message ? error.message : `${ERROR_MSG_TEMPLATE} Project slice`;
                },
                settled: (state) => {
                    state.loading = false;
                }
            }
        )
    })
});

export const { selectProjects, selectLoading, selectError } = projectSlice.selectors;

export const { deleteProjectLocally, fetchProjects, addProject, deleteProject, editProject } = projectSlice.actions;

export default projectSlice.reducer;
