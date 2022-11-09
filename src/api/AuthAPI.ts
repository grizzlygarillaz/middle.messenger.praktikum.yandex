import {
  BaseAPI,
  CreateApiMethod,
  DeleteApiMethod,
  ReadApiMethod,
  StoreApiMethod,
} from './BaseAPI';

export interface SignInData {
  login: string,
  password: string,
}

export interface SignUpData {
  first_name: string,
  second_name: string,
  login: string,
  email: string,
  password: string,
  phone: string,
}

class AuthAPI extends BaseAPI implements
  CreateApiMethod, ReadApiMethod, DeleteApiMethod, StoreApiMethod {
  constructor() {
    super('/auth');
  }

  public create(data: SignUpData) {
    return this.http.post('/signup', { body: JSON.stringify(data) });
  }

  public store(data: SignInData) {
    return this.http.post('/signin', { body: JSON.stringify(data) });
  }

  public read(): Promise<User> {
    return this.http.get('/user');
  }

  public delete() {
    return this.http.post('/logout');
  }
}

export default new AuthAPI();
