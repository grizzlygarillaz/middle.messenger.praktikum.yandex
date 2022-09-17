import API, {AuthAPI, SignInData, SignUpData} from "../api/AuthAPI";

class AuthController {
  private readonly api: AuthAPI;

  constructor() {
    this.api = API;
  }

  async signin(data: SignInData) {
    await this.api.signin(data);
  }

  async signup(data: SignUpData) {
    await this.api.signin(data);
  }

  async signin(data: SignInData) {
    await this.api.signin(data);
  }
}
