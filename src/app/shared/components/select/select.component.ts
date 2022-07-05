import {
  Component,
  EventEmitter,
  forwardRef,
  Input, Output
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DropDownModel } from 'src/app/core/models/DropDownModel';
import { ControlValueAccessorBase } from '../control-value-accessor-base';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
})
export class SelectComponent extends ControlValueAccessorBase<string> {
  /**
   * Input  of select component
   */
  @Input() label?: string;

  /**
   * Input  of select component
   */
  @Input() options?: DropDownModel[] = [{ code: '1234', text: 'sasasa' }];

  /**
   * Output  of select component
   */
  @Output() inputChange = new EventEmitter<string>();

  /**
   * Input  of select component
   */
  @Input() placeHolderText?: string;

  /**
   * Creates an instance of select component.
   */
  constructor() {
    super();
  }

  /**
   * Determines whether input change on
   */
  public onInputChange(): void {
    this.inputChange.emit(this.value);
  }
}
