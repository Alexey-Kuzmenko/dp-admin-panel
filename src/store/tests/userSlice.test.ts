import { UserModel } from '../../models/user.model';
import userReducer, {
    addUser,
    deleteUser,
    initialState
} from '../userSlice';

describe('userSlice', () => {
    it('should return initial state when passed empty action', () => {
        const result = userReducer(undefined, { type: '' });

        expect(result).toEqual(initialState);
    });

    it('should add new user with "addUser" action', () => {
        const newUser: Omit<UserModel, '_id'> = {
            email: 'test@gmail.com',
            password: 'Qwerty0987'
        };
        const action = { type: addUser.type, payload: newUser };
        const result = userReducer(initialState, action);
        const index = result.users.length - 1;

        expect(result.users[index]).toBeDefined();
        expect(result.users[index].email).toBe<string>(newUser.email);
    });

    it('should delete user with "deleteUser" action', () => {
        const deletedUserId: string = initialState.users[0]._id;
        const action = { type: deleteUser.type, payload: deletedUserId };
        const result = userReducer(initialState, action);
        const updatedState = initialState.users.filter((u) => u._id !== deletedUserId);

        expect(result.users).toEqual(updatedState);
    });
});