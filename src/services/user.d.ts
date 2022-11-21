import { Dispatch } from 'core/Store/Store';
export interface UpdateUserData {
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
    avatar: FormData | null;
    oldPassword: string | null;
    newPassword: string | null;
}
export declare const updateUser: (dispatch: Dispatch<AppState>, _state: AppState, data: UpdateUserData) => Promise<void>;
