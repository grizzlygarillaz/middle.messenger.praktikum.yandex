import API, { AuthAPI, SignInData, SignUpData } from 'api/AuthAPI';
import store from 'core/Store';
import router from 'core/Router';

class AuthController {
  private readonly api: AuthAPI;

  constructor() {
    this.api = API;
  }

  async signUp(data: SignUpData) {
    await this.api.store(data);

    router.go('/messenger');
  }

  async signIn(data: SignInData) {
    try {
      await this.api.create(data);

      await this.read();

      router.go('/messenger');
    } catch (e: any) {
      console.error(e.message);
    }
  }

  async read() {
    const user = await this.api.read();

    store.set('user', user);
  }

  async delete() {
    await this.api.delete();

    router.go('/');
  }
}

export default new AuthController();
