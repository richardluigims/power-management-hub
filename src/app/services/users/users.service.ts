import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../interfaces/user';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private API_URL = 'http://localhost:3000/users';

  constructor(
    private httpClient: HttpClient
  ) { }

  getUser(userId: string): Promise<User> {
    return firstValueFrom(this.httpClient.get(this.API_URL, {
      params: {
        id: userId
      }
    })).then((user: any) => {
      let result = user[0];

      return result;
    })
  }

  getAllUsers(): Promise<User[]> {
    return firstValueFrom(this.httpClient.get<User[]>(this.API_URL));
  }

  createUser(newUser: User): Promise<User> {
    return firstValueFrom(this.httpClient.post<User>(this.API_URL, newUser));
  }

  editUser(user: User): Promise<User> {
    let url = this.API_URL + "/" + user.id;

    return firstValueFrom(this.httpClient.put<User>(url, user));
  }

  deleteUsers(usersIDs: string[]): Promise<User[]> {
    return Promise.all(usersIDs.map((userId) => {
      let url = this.API_URL + "/" + userId;

      return firstValueFrom(this.httpClient.delete<User>(url));
    }))
  }
}
