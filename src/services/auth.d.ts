import { Dispatch } from 'core/Store/Store';
import { SignInData, SignUpData } from 'api/AuthAPI';
export declare const logout: (dispatch: Dispatch<AppState>) => Promise<void>;
export declare const register: (dispatch: Dispatch<AppState>, _state: AppState, data: SignUpData) => Promise<void>;
export declare const login: (dispatch: Dispatch<AppState>, _state: AppState, data: SignInData) => Promise<void>;
