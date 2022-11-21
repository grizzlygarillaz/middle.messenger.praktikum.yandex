import { BaseAPI, CreateApiMethod, DeleteApiMethod, ReadApiMethod, StoreApiMethod } from './BaseAPI';
export interface SignInData {
    login: string;
    password: string;
}
export interface SignUpData {
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    password: string;
    phone: string;
}
declare class AuthAPI extends BaseAPI implements CreateApiMethod, ReadApiMethod, DeleteApiMethod, StoreApiMethod {
    constructor();
    create(data: SignUpData): Promise<unknown>;
    store(data: SignInData): Promise<unknown>;
    read(): Promise<User>;
    delete(): Promise<unknown>;
}
declare const _default: AuthAPI;
export default _default;
