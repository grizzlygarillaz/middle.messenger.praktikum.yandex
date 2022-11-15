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
  users: number[],
  chatId: number,
}

export interface ChatAddUserData {
  login: string,
  chatId: number,
}

interface ChatTokenResponse {
  token: string,
}

interface ChatDeletedResponse {
  userId: number,
  result: {
    id: number,
    title: string,
    avatar: string
  }
}

class ChatAPI extends BaseAPI implements
    CreateApiMethod, ReadApiMethod, DeleteApiMethod {
  constructor() {
    super('/chats');
  }

  public create(data: ChatCreateData): Promise<Response> {
    console.log(data);
    return this.http.post('', { body: JSON.stringify(data) });
  }

  public read(data?: ChatReadData): Promise<Chat> {
    return this.http.get('', { body: data });
  }

  public delete(chatId: number): Promise<ChatDeletedResponse> {
    return this.http.delete('', { body: JSON.stringify({ chatId }) });
  }

  public getUsers(chatId: number) : Promise<User[]> {
    return this.http.get(`/${chatId}/users`);
  }

  public addUser(data: ChatToggleUserData): Promise<Response> {
    return this.http.put('/users', { body: JSON.stringify(data) });
  }

  public deleteUser(data: ChatToggleUserData): Promise<Response> {
    return this.http.delete('/users', { body: JSON.stringify(data) });
  }

  public token(chatId: number): Promise<ChatTokenResponse> {
    return this.http.post(`/token/${chatId}`);
  }
}

export default new ChatAPI();
