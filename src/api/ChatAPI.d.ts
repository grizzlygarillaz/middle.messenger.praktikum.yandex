import { BaseAPI, CreateApiMethod, DeleteApiMethod, ReadApiMethod } from 'api/BaseAPI';
export interface ChatReadData {
    offset?: number;
    limit?: number;
    title?: string;
}
export interface ChatCreateData {
    title: string;
}
export interface ChatToggleUserData {
    users: number[];
    chatId: number;
}
export interface ChatAddUserData {
    login: string;
    chatId: number;
}
interface ChatTokenResponse {
    token: string;
}
declare class ChatAPI extends BaseAPI implements CreateApiMethod, ReadApiMethod, DeleteApiMethod {
    constructor();
    create(data: ChatCreateData): Promise<unknown>;
    read(data?: ChatReadData): Promise<Chat>;
    delete(chatId: number): Promise<unknown>;
    getUsers(chatId: number): Promise<User[]>;
    addUser(data: ChatToggleUserData): Promise<unknown>;
    deleteUser(data: ChatToggleUserData): Promise<unknown>;
    token(chatId: number): Promise<ChatTokenResponse>;
}
declare const _default: ChatAPI;
export default _default;
