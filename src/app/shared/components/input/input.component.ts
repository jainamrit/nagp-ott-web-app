import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlValueAccessorBase } from '../control-value-accessor-base';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent extends ControlValueAccessorBase<string> {
  /**
   * Input  of input component
   */
  @Input() label?: string;

  /**
   * Input  of input component
   */
  @Input() placeHolder?: string;

  /**
   * Output  of input component
   */
  @Output() inputChange = new EventEmitter<string>();

  /**
   * Output  of input component
   */
  @Output() keyUpChange = new EventEmitter();

  /**
   * Creates an instance of input component.
   */
  constructor() {
    super();
  }

  /**
   * Determines whether input change on
   */
  public onInputChange(): void {
    setTimeout(() => {
      this.showErrorMessage = this.hasError;
    }, 0);
    this.inputChange.emit(this.value);
  }

  /**
   * Onkeys up
   * @param event
   */
  public onkeyUp(event: KeyboardEvent): void {
    setTimeout(() => {
      this.showErrorMessage = this.hasError;
    }, 0);
    this.inputChange.emit(this.value);
    this.keyUpChange.emit(event);
  }
}
