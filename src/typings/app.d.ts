import CoreRouter from 'core/Router/CoreRouter';
import Store from 'core/Store/Store';
import { Views } from 'router';

declare global {
  export type Nullable<T> = T | null;

  export type KeyOf<T extends Record<string, unknown>> = keyof T;
  export type ValueOf<T extends Record<string, unknown>> = T[KeyOf<T>];

  export type AnyRecord = Record<string, any>;

  interface Window {
    store: Store<AppState>,
    router: CoreRouter,
  }

  export type AppError = {
    code: number;
    message: string;
  };
  export type AppState = {
    appIsInit: boolean,
    screen: Views | null,
    error: AppError | null,
    user: User | null,
    chats: Chat[],
    currentChat: Chat | null,
    token: string | null,
    messages: Message[]
  };

  export type User = {
    id: number;
    login: string;
    firstName: string;
    secondName: string;
    displayName: string;
    avatar: string;
    phone: string;
    email: string;
  };

  export type Chat = {
    id: number,
    title: string,
    avatar: string,
    unreadCount: number,
    createdBy: number,
    lastMessage: {
      user: User,
      time: string,
      content: string
    },
    users: User[]
  };

  export type Message = {
    chatId: number,
    time: string,
    type: string,
    userId: number,
    content: string,
    file?: {
      id: number,
      userId: number,
      path: string,
      filename: string,
      contentType: string,
      contentSize: number,
      uploadDate: string,
    }
    own: boolean
    date?: string
    user?: User,
    senderName?: string
  };
}

export {};
