import { BaseAPI, ReadApiMethod } from 'api/BaseAPI';
export interface UserSearchData {
    login: string;
}
export interface UserUpdateProfileData {
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
}
export interface UserUpdateAvatarData {
    avatar: FormData;
}
export interface UserUpdatePasswordData {
    oldPassword: string;
    newPassword: string;
}
declare class UserAPI extends BaseAPI implements ReadApiMethod {
    constructor();
    read(id: string): Promise<User>;
    search(data: UserSearchData): Promise<User[]>;
    updateProfile(data: UserUpdateProfileData): Promise<User>;
    updateAvatar(data: FormData): Promise<User>;
    updatePassword(data: UserUpdatePasswordData): Promise<User>;
}
declare const _default: UserAPI;
export default _default;
