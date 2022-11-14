import { Dispatch } from 'core/Store/Store';
import { ChatAddUserData, ChatCreateData, ChatReadData, ChatToggleUserData } from 'api/ChatAPI';
export declare const getChats: (dispatch: Dispatch<AppState>, _state: AppState, data?: ChatReadData) => Promise<void>;
export declare const addChat: (dispatch: Dispatch<AppState>, _state: AppState, data: ChatCreateData) => Promise<void>;
export declare const deleteChat: (dispatch: Dispatch<AppState>, _state: AppState, chatId: number) => Promise<void>;
export declare const addUserToChat: (dispatch: Dispatch<AppState>, _state: AppState, data: ChatAddUserData) => Promise<void>;
export declare const chatUserDelete: (dispatch: Dispatch<AppState>, _state: AppState, data: ChatToggleUserData) => Promise<void>;
export declare const changeChat: (dispatch: Dispatch<AppState>, _state: AppState, chatId: number) => Promise<void>;
