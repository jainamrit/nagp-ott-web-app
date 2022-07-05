/**
 * Validation error types
 */
export enum ValidationErrorTypeEnum {
  Required = 'required',
  MinDate = 'mindate',
  MaxDate = 'maxdate',
  MinValue = 'min',
  MaxValue = 'max',
  MinLength = 'minlength',
  MaxLength = 'maxlength',
  PatternString = 'pattern',
  CustomError = 'customError',
  Email = 'email',
}
