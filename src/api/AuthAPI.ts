// import BaseAPI from './utils/baseapi';

interface SignInData {
  login: string,
  password: string,
}

interface SignUpData {

}

class AuthAPI { //extends BaseApi
  constructor() {
    super('/auth');
  }

  signin(data: SignInData) {
    return this.http.post('/signin', data)
  }

  signup(data: SignUpData) {
    return this.http.post('/signup', data)
  }

  read(){
    return this.http.get('/user');
  }

  logout() {

  }
}

export default new AuthAPI();
