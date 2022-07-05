import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Routes } from '../../app.constants';
import { ILoginInput } from '../../core/Interfaces/login/ILoginInput';
import { LoginInput } from '../../core/Interfaces/login/LoginInput';
import { AuthService } from '../../core/services/auth/auth.service';
import { AuthenticationHelper } from '../../shared/helper/Authentication.hepler';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  /**
   * Form  of login component
   */
  public form!: FormGroup;

  /**
   * Login input of login component
   */
  private loginInput: ILoginInput = new LoginInput();

  /**
   * Determines whether admin is
   */
  public isAdmin = false;

  /**
   * Determines whether loading is
   */
  public isLoading = false;

  /**
   * Login error msg of login component
   */
  public loginErrorMsg = '';

  /**
   * Creates an instance of login component.
   * @param router
   * @param formBuilder
   * @param authService
   */
  constructor(private router: Router, private formBuilder: FormBuilder, private readonly authService: AuthService) { }

  /**
   * on init
   */
  ngOnInit(): void {
    this.createLoginForm();
    this.valueChanges();
  }

  /**
   * Creates login form
   */
  private createLoginForm(): void {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      isAdmin: [false],
    });
  }

  /**
   * Values changes
   */
  private valueChanges(): void {
    (this.getFormControl('password') as AbstractControl).valueChanges.subscribe((data) => {
      this.loginInput.password = data;
    });
    (this.getFormControl('email') as AbstractControl).valueChanges.subscribe((data) => {
      this.loginInput.email = data;
    });
    (this.getFormControl('isAdmin') as AbstractControl).valueChanges.subscribe((data) => {
      this.loginInput.isAdmin = data;
    });
  }

  /**
   * Gets form control
   * @param control
   * @returns form control
   */
  private getFormControl(control: string): AbstractControl {
    return this.form.get(control) as AbstractControl;
  }

  /**
   * Routes to signup
   */
  public routeToSignup(): void {
    this.router.navigate([Routes.SIGNUP]);
  }

  /**
   * Admins check click
   * @param event
   */
  public adminCheckClick(event: boolean): void {
    if (!event) {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
  }

  /**
   * Logins login component
   */
  public login(): void {
    this.loginErrorMsg = '';
    this.isLoading = true;
    const payLoad: ILoginInput = {
      email: this.loginInput.email,
      password: this.loginInput.password,
    };
    if (this.isAdmin) {
      payLoad.isAdmin = this.loginInput.isAdmin;
    } else {
      payLoad.isAdmin = false;
    }
    this.authService.login(payLoad).subscribe(
      (data) => {
        this.resetForm();
        if (data && data.id) {
          AuthenticationHelper.setLoggedUser(data);
          this.router.navigate(['home']);
        } else {
          this.loginErrorMsg = 'Invalid Credentials, Please try again..';
        }
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
        this.loginErrorMsg = 'Invalid Credentials, Please try again..';
      }
    );
  }

  /**
   * Resets form
   */
  private resetForm(): void {
    this.form.reset();
    this.isAdmin = false;
  }
}
