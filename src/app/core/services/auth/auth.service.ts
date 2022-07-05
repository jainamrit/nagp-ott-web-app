import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ILoginInput } from '../../Interfaces/login/ILoginInput';
import { LoginOutput } from '../../Interfaces/login/LoginOutput';
import { IRegistrationInput } from '../../Interfaces/signUp/IRegistrationInput';
import { IRegistrationOutput } from '../../Interfaces/signUp/IRegistrationOutput';
import { RegistrationOutput } from '../../Interfaces/signUp/RegistrationOutput';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /**
   * Creates an instance of auth service.
   * @param config
   * @param http
   */
  constructor(
    private readonly config: ConfigService,
    private readonly http: HttpClient
  ) { }

  /**
   * Signs up
   * @param payload
   * @returns up
   */
  public signUp(payload: IRegistrationInput): Observable<RegistrationOutput> {
    return this.http
      .post<IRegistrationOutput>(`${this.config.getApiUrl()}users`, payload)
      .pipe(map((res) => RegistrationOutput.fromDTO(res)));
  }

  /**
   * Logins auth service
   * @param payLoad
   * @returns login
   */
  // Any is used because of the json server, if we use backend API it will change to valid datatype
  public login(payLoad: ILoginInput): Observable<LoginOutput> {
    return this.http
      .get<any>(`${this.config.getApiUrl()}users`)
      .pipe(map((res) => this.findLoginUser(payLoad, res)));
  }

  /**
   * Finds login user
   * @param payLoad
   * @param result
   * @returns login user
   */
  private findLoginUser(payLoad: ILoginInput, result: any): LoginOutput {
    if (result) {
      return result.find(
        (x: ILoginInput) =>
          x.email === payLoad.email &&
          x.password === payLoad.password &&
          x.isAdmin === payLoad.isAdmin
      );
    } else {
      return new LoginOutput();
    }
  }
}
