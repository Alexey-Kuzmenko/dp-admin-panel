import { asyncThunkCreator, buildCreateSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';

import { SkillModel } from '../models/skill.model';
import { SkillDto } from '@alexey-kuzmenko/ok-apps-sdk';
import { ResponseError } from '../types';
import { ERROR_MSG_TEMPLATE } from '../constants';
import excludeObjectValues from '../utils/excludeObjectValues';

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;
const JWT_TOKEN = import.meta.env.VITE_JWT_TOKEN;

const createSkillSlice = buildCreateSlice({
    creators: { asyncThunk: asyncThunkCreator }
});

interface SkillState {
    skills: Array<SkillModel>
    loading: boolean | null,
    error: ResponseError
}

export const initialState: SkillState = {
    skills: [],
    loading: null,
    error: {
        exists: null,
        message: null
    }
};

export const skillSlice = createSkillSlice({
    name: 'skills',
    initialState,
    selectors: {
        selectSkills: (state) => state.skills,
        selectLoading: (state) => state.loading,
        selectError: (state) => state.error,
    },
    reducers: (create) => ({
        deleteSkillLocally: create.reducer((state, { payload }: PayloadAction<string>) => {
            state.skills = state.skills.filter((s) => s._id !== payload);
        }),
        fetchSkills: create.asyncThunk(async () => {
            const response: AxiosResponse<SkillModel[]> = await axios.get(`${API_URL}/skills`, {
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
                    const data = excludeObjectValues<SkillModel>(['createdAt', 'updatedAt', '__v'], payload);
                    state.skills.push(...data);
                },
                rejected: (state, { error }) => {
                    state.error.exists = true;
                    state.error.message = error.message ? error.message : `${ERROR_MSG_TEMPLATE} Skills slice`;
                },
                settled: (state) => {
                    state.loading = false;
                }
            }
        ),
        addSkill: create.asyncThunk(async (dto: SkillDto) => {
            const response: AxiosResponse<SkillModel> = await axios.post(`${API_URL}/skills`, dto, {
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
                    const data = excludeObjectValues<SkillModel>(['createdAt', 'updatedAt', '__v'], [payload]);
                    state.skills.push(...data);
                },
                rejected: (state, { error }) => {
                    state.error.exists = true;
                    state.error.message = error.message ? error.message : `${ERROR_MSG_TEMPLATE} Skills slice`;
                },
                settled: (state) => {
                    state.loading = false;
                }
            }
        ),
        deleteSkill: create.asyncThunk(async (id: string, thunkApi) => {
            await axios.delete(`${API_URL}/skills/${id}`, {
                headers: {
                    'Authorization': `Bearer ${JWT_TOKEN}`
                }
            });

            thunkApi.dispatch(deleteSkillLocally(id));
        },
            {
                pending: (state) => {
                    state.loading = true;
                },
                rejected: (state, { error }) => {
                    state.error.exists = true;
                    state.error.message = error.message ? error.message : `${ERROR_MSG_TEMPLATE} Skills slice`;
                },
                settled: (state) => {
                    state.loading = false;
                }
            }
        ),
        editSkill: create.asyncThunk(async (skill: SkillModel) => {
            const response: AxiosResponse<SkillModel> = await axios.patch(`${API_URL}/skills/${skill._id}`, skill, {
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
                    const skill = state.skills.find((s) => s._id === payload._id);
                    const [data] = excludeObjectValues<SkillModel>(['createdAt', 'updatedAt', '__v'], [payload]);

                    if (skill) {
                        const skillIndex = state.skills.indexOf(skill);
                        const skillsCopy = [...state.skills];
                        skillsCopy[skillIndex] = data;
                        state.skills = skillsCopy;
                    }
                },
                rejected: (state, { error }) => {
                    state.error.exists = true;
                    state.error.message = error.message ? error.message : `${ERROR_MSG_TEMPLATE} Skills slice`;
                },
                settled: (state) => {
                    state.loading = false;
                }
            }
        )
    })
});

export const { selectSkills, selectLoading, selectError } = skillSlice.selectors;

export const { deleteSkillLocally, fetchSkills, addSkill, deleteSkill, editSkill } = skillSlice.actions;

export default skillSlice.reducer;
