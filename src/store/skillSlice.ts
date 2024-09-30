import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SkillModel } from '../models/skill.model';
import { v4 as uuidv4 } from 'uuid';
import { SkillDto } from '../dto/skill.dto';

interface SkillState {
    skills: Array<SkillModel>
}

// * temporary data
export const initialState: SkillState = {
    skills: [
        {
            _id: '65eb2cb67060abb0080a5797',
            slug: 'html5',
            label: 'HTML',
            iconClass: 'devicon-html5-plain',
        },
        {
            _id: '65eb2ce97060abb0080a579a',
            slug: 'sass',
            label: 'SASS(SCSS)',
            iconClass: 'devicon-sass-original',
        },
        {
            _id: '65eb2d057060abb0080a579d',
            slug: 'javascript',
            label: 'JavaScript',
            iconClass: 'devicon-javascript-plain',
        },
        {
            _id: '65eb2d227060abb0080a57a0',
            slug: 'typescript',
            label: 'TypeScript',
            iconClass: 'devicon-typescript-plain',

        },
        {
            _id: '65eb2d367060abb0080a57a3',
            slug: 'react',
            label: 'React',
            iconClass: 'devicon-react-original',
        }
    ]
};

export const skillSlice = createSlice({
    name: 'skills',
    initialState,
    selectors: {
        selectSkills: (state) => state.skills
    },
    reducers: (create) => ({
        addSkill: create.reducer((state, { payload }: PayloadAction<SkillDto>) => {
            const newSkill: SkillModel = {
                _id: uuidv4(),
                ...payload
            };

            state.skills.push(newSkill);
        }),

        deleteSkill: create.reducer((state, { payload }: PayloadAction<string>) => {
            state.skills = state.skills.filter((s) => s._id !== payload);
        }),

        editSkill: create.reducer((state, { payload }: PayloadAction<SkillModel>) => {
            const skill = state.skills.find((s) => s._id === payload._id);

            if (skill) {
                const skillIndex = state.skills.indexOf(skill);
                const skillsCopy = [...state.skills];
                skillsCopy[skillIndex] = payload;
                state.skills = skillsCopy;
            }
        })
    })
});

export const { selectSkills } = skillSlice.selectors;

export const { addSkill, deleteSkill, editSkill } = skillSlice.actions;

export default skillSlice.reducer;