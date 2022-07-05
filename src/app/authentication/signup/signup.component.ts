import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonUtilities } from '../.././shared/utils/common-utilities';
import { Routes } from '../../app.constants';
import { IRegistrationInput } from '../../core/Interfaces/signUp/IRegistrationInput';
import { RegistrationInput } from '../../core/Interfaces/signUp/RegistrationInput';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  /**
   * Form  of signup component
   */
  public form!: FormGroup;

  /**
   * Registration input of signup component
   */
  private registrationInput: IRegistrationInput = new RegistrationInput();

  /**
   * Determines whether registration success is
   */
  public isRegistrationSuccess = false;

  /**
   * Determines whether registration error is
   */
  public isRegistrationError = false;

  /**
   * Registrationcomplete msg of signup component
   */
  public registrationcompleteMsg = '';

  /**
   * Determines whether loading is
   */
  public isLoading = false;

  /**
   *
   * @param formBuilder
   * @param router
   * @param authService
   */
  constructor(private formBuilder: FormBuilder, private router: Router, private readonly authService: AuthService) { }

  /**
   * on init
   */
  ngOnInit(): void {
    this.createRegistrationForm();
    this.valueChanges();
  }

  /**
   * Creates registration form
   */
  private createRegistrationForm(): void {
    this.form = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/),
        ],
      ],
      confirmPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/),
        ],
      ],
    });
  }

  /**
   * Values changes
   */
  private valueChanges(): void {
    (this.getFormControl('email') as AbstractControl).valueChanges.subscribe((data) => {
      this.registrationInput.email = data;
    });
    (this.getFormControl('fullName') as AbstractControl).valueChanges.subscribe((data) => {
      this.registrationInput.fullName = data;
    });
    (this.getFormControl('password') as AbstractControl).valueChanges.subscribe((data) => {
      this.registrationInput.password = data;
    });
    (this.getFormControl('confirmPassword') as AbstractControl).valueChanges.subscribe((data) => {
      this.registrationInput.confirmPassword = data;
    });
  }

  /**
   * Registers new user
   */
  public registerNewUser(): void {
    this.isLoading = true;
    const payLoad: IRegistrationInput = {
      confirmPassword: this.registrationInput.confirmPassword,
      email: this.registrationInput.email,
      fullName: this.registrationInput.fullName,
      password: this.registrationInput.password,
      id: CommonUtilities.generateId(),
      isAdmin: false,
      optSubscription: false,
    };

    this.authService.signUp(payLoad).subscribe(
      (res) => {
        if (res && res.id) {
          this.form.reset();
          this.registrationInput = new RegistrationInput();
          this.isLoading = false;
          this.isRegistrationError = false;
          this.isRegistrationSuccess = true;
          this.registrationcompleteMsg = `${res.fullName} your registration is suceessful, please login with your credentials`;
        }
      },
      (error) => {
        this.isLoading = false;
        this.isRegistrationSuccess = false;
        this.isRegistrationError = true;
        this.registrationcompleteMsg = 'Error during registration , please try again';
      }
    );
  }

  /**
   * Checks passwords match
   */
  public checkPasswordsMatch(): void {
    const password = this.getFormControl('password');
    const confirmPassword = this.getFormControl('confirmPassword');

    if (password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ customError: 'PassWord Not match' });
    }
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
   * Logins signup component
   */
  public login(): void {
    this.isLoading = false;
    this.isRegistrationSuccess = false;
    this.registrationcompleteMsg = '';
    this.isRegistrationError = false;
    this.router.navigate([Routes.LOGIN]);
  }
}
