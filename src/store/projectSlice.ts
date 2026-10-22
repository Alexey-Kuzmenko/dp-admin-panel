import { asyncThunkCreator, buildCreateSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';

import { ProjectModel } from '@alexey-kuzmenko/ok-apps-sdk';
import { ProjectDto } from '@alexey-kuzmenko/ok-apps-sdk';
import { ResponseError } from '../types';
import { ENV_VAR_IS_NOT_DEFINED, ERROR_MSG_TEMPLATE } from '../constants';
import excludeObjectValues from '../utils/excludeObjectValues';
import { RootState } from './types';

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

if (!API_URL) throw new Error(`API_URL ${ENV_VAR_IS_NOT_DEFINED} contactSlice`);
if (!API_KEY) throw new Error(`API_KEY ${ENV_VAR_IS_NOT_DEFINED} contactSlice`);

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
                    state.projects = data;
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
        addProject: create.asyncThunk(async (dto: ProjectDto, thunkApi) => {
            const state = thunkApi.getState() as RootState;
            const token = state.authentication.token;

            const response: AxiosResponse<ProjectModel> = await axios.post(`${API_URL}/projects`, dto, {
                headers: {
                    'Authorization': `Bearer ${token}`
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
            const state = thunkApi.getState() as RootState;
            const token = state.authentication.token;

            await axios.delete(`${API_URL}/projects/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
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
        editProject: create.asyncThunk(async (project: ProjectModel, thunkApi) => {
            const state = thunkApi.getState() as RootState;
            const token = state.authentication.token;

            const response: AxiosResponse<ProjectModel> = await axios.patch(
                `${API_URL}/projects/${project._id}`,
                project,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
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
