import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ControlValueAccessor, ValidationErrors } from '@angular/forms';
import { ValidationErrorTypeEnum } from './validation-error-type.enum';
import { StringUtilities } from './../utils/string-utilities';
import { Callable, Func } from './type-definitions';

/** * Implements ControlValueAccessor which allows
 * any component inheriting this class to be
 * used in reactive forms or with [(ngModel)] in template driven forms. */
@Component({ template: '' })

// eslint-disable-next-line @angular-eslint/component-class-suffixexport
export class ControlValueAccessorBase<T> implements ControlValueAccessor {
  /**
   * Value  of control value accessor base
   */
  private _value?: T;

  /**
   * Value on ui of control value accessor base
   */
  private _valueOnUI: string | undefined;

  /**
   * Determines whether error has
   */
  private _hasError = false;

  /**
   * Input  of control value accessor base
   */
  @Input() isEditMode = true;

  /**
   * Sets input
   */
  @Input() set validationErrors(errors: ValidationErrors | null) {
    this.setError(errors);
  }

  /**
   * Sets input
   */
  @Input()
  set hasError(value: boolean) {
    this._hasError = value;
  }

  /**
   * Gets whether has error
   */
  get hasError(): boolean {
    if (
      !StringUtilities.isEmpty(this.value as unknown as string) ||
      !StringUtilities.isEmpty(this._valueOnUI)
    ) {
      return this._hasError;
    } else {
      return this._hasError && this.showErrorMessage;
    }
  }

  /**
   * Input  of control value accessor base
   */
  @Input() controlId = 'xxx';

  /**
   * Input  of control value accessor base
   */
  @Input() disabled = false;

  /**
   * Input  of control value accessor base
   */
  @Input() msgTitle?: string;

  /**
   * Input  of control value accessor base
   */
  @Input() minDateErrorMsg?: string;

  /**
   * Input  of control value accessor base
   */
  @Input() maxDateErrorMsg?: string;

  /**
   * Input  of control value accessor base
   */
  @Input() minValueErrorMsg?: string;

  /**
   * Input  of control value accessor base
   */
  @Input() maxValueErrorMsg?: string;

  /**
   * Input  of control value accessor base
   */
  @Input() minLengthErrorMsg?: string;

  /**
   * Input  of control value accessor base
   */
  @Input() maxLengthErrorMsg?: string;

  /**
   * Input  of control value accessor base
   */
  @Input() requiredErrorMsg?: string;

  /**
   * Input  of control value accessor base
   */
  @Input() emailErrorMsg?: string;

  /**
   * Input  of control value accessor base
   */
  @Input() patternErrorMsg?: string;

  /**
   * Input  of control value accessor base
   */
  @Input() showErrorMessage = false;

  /**
   * Output  of control value accessor base
   */
  @Output() blurEvent = new EventEmitter<T>();

  /**
   * Gets value
   */
  get value(): T | undefined {
    return this._value;
  }

  /**
   * Sets value
   */
  set value(value: T | undefined) {
    this.writeValue(value);
  }

  /**
   * Determines whether change on
   */
  private onChange?: Func<T | undefined, void>;

  /**
   * Update value format of control value accessor base
   */
  protected updateValueFormat?: Func<T | undefined, T | undefined>;

  /**
   *
   */
  private onTouched: Callable = () => { };

  /**
   * Validation error msg of control value accessor base
   */
  public validationErrorMsg?: string;

  /**
   * Determines whether blur on
   * @param event
   */
  public onBlur(event: FocusEvent): void {
    this._valueOnUI = (event.target as HTMLInputElement).value;
    this.onTouched();
    setTimeout(() => {
      this.showErrorMessage = this.hasError;
    }, 0);
    this.blurEvent.emit(this.value);
  }

  /**
   * Writes value
   * @param value
   */
  public writeValue(value: T | undefined): void {
    if (this._value !== value) {
      this._value =
        this.updateValueFormat !== undefined
          ? this.updateValueFormat(value)
          : value;
      if (this.onChange) {
        this.onChange(this._value);
      }
    }
  }

  /**
   * Registers on change
   * @param fn
   */
  public registerOnChange(fn: Func<T | undefined, void>): void {
    this.onChange = fn;
  }

  /**
   * Registers on touched
   * @param fn
   */
  public registerOnTouched(fn: Callable): void {
    this.onTouched = fn;
  }

  /**
   * Sets disabled state
   * @param isDisabled
   */
  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  /**
   * Sets error
   * @param errors
   */
  private setError(errors: ValidationErrors | null): void {
    if (errors !== null) {
      this.hasError = true;

      if (
        Object.prototype.hasOwnProperty.call(
          errors,
          ValidationErrorTypeEnum.CustomError
        )
      ) {
        this.validationErrorMsg = errors[
          ValidationErrorTypeEnum.CustomError
        ] as string;
      } else if (
        Object.prototype.hasOwnProperty.call(
          errors,
          ValidationErrorTypeEnum.Required
        )
      ) {
        this.validationErrorMsg = this.requiredErrorMsg;
      } else if (
        Object.prototype.hasOwnProperty.call(
          errors,
          ValidationErrorTypeEnum.MinLength
        )
      ) {
        this.validationErrorMsg = this.minLengthErrorMsg;
      } else if (
        Object.prototype.hasOwnProperty.call(
          errors,
          ValidationErrorTypeEnum.MaxLength
        )
      ) {
        this.validationErrorMsg = this.maxLengthErrorMsg;
      } else if (
        Object.prototype.hasOwnProperty.call(
          errors,
          ValidationErrorTypeEnum.MinValue
        )
      ) {
        this.validationErrorMsg = this.minValueErrorMsg;
      } else if (
        Object.prototype.hasOwnProperty.call(
          errors,
          ValidationErrorTypeEnum.MaxValue
        )
      ) {
        this.validationErrorMsg = this.maxValueErrorMsg;
      } else if (
        Object.prototype.hasOwnProperty.call(
          errors,
          ValidationErrorTypeEnum.MinDate
        )
      ) {
        this.validationErrorMsg = this.minDateErrorMsg;
      } else if (
        Object.prototype.hasOwnProperty.call(
          errors,
          ValidationErrorTypeEnum.MaxDate
        )
      ) {
        this.validationErrorMsg = this.maxDateErrorMsg;
      } else if (
        Object.prototype.hasOwnProperty.call(
          errors,
          ValidationErrorTypeEnum.Email
        )
      ) {
        this.validationErrorMsg = this.emailErrorMsg;
      } else if (
        Object.prototype.hasOwnProperty.call(
          errors,
          ValidationErrorTypeEnum.PatternString
        )
      ) {
        this.validationErrorMsg = this.patternErrorMsg;
      }
    } else {
      this.hasError = this.showErrorMessage = false;
      this.validationErrorMsg = undefined;
    }
  }
}
