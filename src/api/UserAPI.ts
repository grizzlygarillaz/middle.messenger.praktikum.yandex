import { BaseAPI, ReadApiMethod } from 'api/BaseAPI';

export interface UserSearchData {
  login: string
}

export interface UserUpdateProfileData {
  first_name: string,
  second_name: string,
  display_name: string,
  login: string,
  email: string,
  phone: string,
}

export interface UserUpdateAvatarData {
  avatar: FormData,
}

export interface UserUpdatePasswordData {
  oldPassword: string,
  newPassword: string,
}

class UserAPI extends BaseAPI implements
    ReadApiMethod {
  constructor() {
    super('/user');
  }

  public read(id: string): Promise<User> {
    return this.http.get(`/${id}`);
  }

  public search(data: UserSearchData) : Promise<User[]> {
    return this.http.post('/search', { body: JSON.stringify(data) });
  }

  public updateProfile(data: UserUpdateProfileData): Promise<User> {
    return this.http.put('/profile', { body: JSON.stringify(data) });
  }

  public updateAvatar(data: FormData): Promise<User> {
    return this.http.put('/profile/avatar', {
      body: data,
      headers: {
        accept: 'application/json',
      },
    });
  }

  public updatePassword(data: UserUpdatePasswordData): Promise<User> {
    return this.http.put('/profile', { body: JSON.stringify(data) });
  }
}

export default new UserAPI();
