import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserModel } from '../models/user.model';
import { v4 as uuidv4 } from 'uuid';

interface UserState {
    users: Array<UserModel>
}

// * temporary data
export const initialState: UserState = {
    users: [
        {
            _id: '0192296c-c49d-71af-8770-bd9842122f56',
            email: 'example@gmail.com',
            password: 'DYjj/qg+!cR)ibINTvN1'
        },
        {
            _id: '0192296c-c49d-763d-8a8d-19e3c5d0ad47',
            email: 'example2@gmail.com',
            password: 'heUFXTL)).+WuR?ZU.kF'
        },
        {
            _id: '0192296c-c49d-7fb3-a08e-f653452999a4',
            email: 'example3@gmail.com',
            password: 'vADVj/)+(0wnbmTuT.fB'
        }
    ]
};

const userSlice = createSlice({
    name: 'users',
    initialState,
    selectors: {
        selectUsers: (state) => state.users
    },
    reducers: (create) => ({
        addUser: create.reducer((state, { payload }: PayloadAction<Omit<UserModel, '_id'>>) => {
            const newUser: UserModel = {
                _id: uuidv4(),
                ...payload
            };

            state.users.push(newUser);
        }),
        deleteUser: create.reducer((state, { payload }: PayloadAction<string>) => {
            state.users = state.users.filter((u) => u._id !== payload);
        })
    })
});

export const { selectUsers } = userSlice.selectors;

export const { addUser, deleteUser } = userSlice.actions;

export default userSlice.reducer;