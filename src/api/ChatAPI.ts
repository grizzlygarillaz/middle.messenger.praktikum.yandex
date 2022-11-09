import {
  BaseAPI, CreateApiMethod, DeleteApiMethod, ReadApiMethod,
} from 'api/BaseAPI';

export interface ChatReadData {
  offset?: number,
  limit?: number,
  title?: string,
}

export interface ChatCreateData {
  title: string,
}

export interface ChatToggleUserData {
  usersIds: number[],
  chatId: number,
}

export interface ChatAddUserData {
  login: string,
  chatId: number,
}

interface DeletedChat {
  userId: number,
  result: {
    id: number,
    title: string,
    avatar: string
  }
}

interface ChatTokenResponse {
  token: string,
}

class ChatAPI extends BaseAPI implements
    CreateApiMethod, ReadApiMethod, DeleteApiMethod {
  constructor() {
    super('/chats');
  }

  public create(data: ChatCreateData): Promise<Response> {
    return this.http.post('', { body: JSON.stringify(data) });
  }

  public read(data?: ChatReadData): Promise<Chat> {
    return this.http.get('', { body: data });
  }

  public delete(chatId: number): Promise<DeletedChat> {
    return this.http.delete('', { body: JSON.stringify({ chatId }) });
  }

  public getUsers(chatId: number): Promise<User[]> {
    return this.http.get(`/${chatId}/users`);
  }

  public addUser(data: ChatToggleUserData) {
    return this.http.put('/users', { body: JSON.stringify({ chatId: data.chatId, users: data.usersIds }) });
  }

  public deleteUser(data: ChatToggleUserData) {
    return this.http.delete('/users', { body: JSON.stringify({ chatId: data.chatId, users: data.usersIds }) });
  }

  public token(chatId: number): Promise<ChatTokenResponse> {
    return this.http.post(`/token/${chatId}`);
  }
}

export default new ChatAPI();
