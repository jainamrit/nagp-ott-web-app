import {
  Component,
  EventEmitter,
  forwardRef,
  Input, Output
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlValueAccessorBase } from '../control-value-accessor-base';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    },
  ],
})
export class CheckboxComponent extends ControlValueAccessorBase<boolean> {
  /**
   * Input  of checkbox component
   */
  @Input() checkBoxId?: string;

  /**
   * Input  of checkbox component
   */
  @Input() checkBoxName?: string;

  /**
   * Input  of checkbox component
   */
  @Input() checkBoxText?: string;

  /**
   * Output  of checkbox component
   */
  @Output() onCheckClick = new EventEmitter<boolean>();

  /**
   * Output  of checkbox component
   */
  @Output() onCheckChange = new EventEmitter<boolean>();

  /**
   * Creates an instance of checkbox component.
   */
  constructor() {
    super();
  }

  /**
   * Determines whether check box change on
   */
  public onCheckBoxChange(): void {
    this.onCheckChange.emit(this.value);
  }

  /**
   * Determines whether checkbox click on
   */
  public onCheckboxClick(): void {
    this.onCheckClick.emit(this.value);
  }
}
