import {
  BaseAPI,
  CreateApiMethod,
  DeleteApiMethod,
  ReadApiMethod,
  StoreApiMethod,
} from './BaseAPI';

interface SignInData {
  login: string,
  password: string,
}

interface SignUpData {
  first_name: string,
  second_name: string,
  login: string,
  email: string,
  password: string,
  phone: string
}

interface User {
  id: number,
  first_name: string,
  second_name: string,
  display_name: string,
  login: string,
  email: string,
  phone: string
  avatar: string
}

class AuthAPI extends BaseAPI implements
  CreateApiMethod, ReadApiMethod, DeleteApiMethod, StoreApiMethod {
  constructor() {
    super('/auth');
  }

  create(data: SignInData) {
    return this.http.post('/signin', { body: JSON.stringify(data) });
  }

  store(data: SignUpData) {
    return this.http.post('/signup', { body: JSON.stringify(data) });
  }

  read(): Promise<User> {
    return this.http.get('/user');
  }

  delete() {
    return this.http.post('/logout');
  }
}

export default new AuthAPI();

export { AuthAPI, SignInData, SignUpData };
