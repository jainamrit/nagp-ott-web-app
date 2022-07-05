import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUploadMovieInput } from '../../core/Interfaces/upload-movie/IUploadMovieInput';
import { UploadMovieInput } from '../../core/Interfaces/upload-movie/UploadMovieInput';
import { DropDownModel } from '../../core/models/DropDownModel';
import { CommonUtilities } from '../../shared/utils/common-utilities';
import {
  GENRE_DROP_DOWN_MODEL,
  IMDB_RATING_DROP_DOWN,
  LANGUAGE_DROP_DOWN_MODEL,
  UPLOAD_TYPE
} from '../../movies/movies.constants';
import { UploadMovieService } from '../services/upload-movie/upload-movie.service';

@Component({
  selector: 'app-upload-movies',
  templateUrl: './upload-movies.component.html',
  styleUrls: ['./upload-movies.component.css'],
})
export class UploadMoviesComponent implements OnInit {
  /**
   * Image url of upload movies component
   */
  public imageUrl?: string;

  /**
   * Form  of upload movies component
   */
  public form!: FormGroup;

  /**
   * Show notification of upload movies component
   */
  public showNotification = false;

  /**
   * Notification text of upload movies component
   */
  public notificationText = '';

  /**
   * View child of upload movies component
   */
  @ViewChild('Image') imageInput!: ElementRef;

  /**
   * Upload movie input of upload movies component
   */
  private uploadMovieInput: IUploadMovieInput = new UploadMovieInput();

  /**
   * Gets drop down model options language
   */
  public get dropDownModelOptionsLanguage(): DropDownModel[] {
    return LANGUAGE_DROP_DOWN_MODEL;
  }

  /**
   * Gets drop down option for imdbrating
   */
  public get dropDownOptionForIMDBRating(): DropDownModel[] {
    return IMDB_RATING_DROP_DOWN;
  }

  /**
   * Gets drop down for genre
   */
  public get dropDownForGenre(): DropDownModel[] {
    return GENRE_DROP_DOWN_MODEL;
  }

  /**
   * Gets upload type drop down
   */
  public get uploadTypeDropDown(): DropDownModel[] {
    return UPLOAD_TYPE;
  }

  /**
   * Creates an instance of upload movies component.
   * @param formBuilder
   * @param uploadMovieService
   */
  constructor(private formBuilder: FormBuilder, private readonly uploadMovieService: UploadMovieService) { }

  /**
   * on init
   */
  ngOnInit(): void {
    this.createUploadMovieForm();
    this.valueChanges();
  }

  /**
   * Creates upload movie form
   */
  private createUploadMovieForm(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      language: ['', Validators.required],
      genre: ['', Validators.required],
      image: ['', Validators.required],
      imdnRating: ['', Validators.required],
      type: ['', Validators.required],
      isPrime: [false],
    });
  }

  /**
   * Values changes
   */
  private valueChanges(): void {
    this.getFormControl('name').valueChanges.subscribe((data) => {
      this.uploadMovieInput.name = data;
    });
    this.getFormControl('title').valueChanges.subscribe((data) => {
      this.uploadMovieInput.title = data;
    });
    this.getFormControl('description').valueChanges.subscribe((data) => {
      this.uploadMovieInput.description = data;
    });
    this.getFormControl('genre').valueChanges.subscribe((data) => {
      this.uploadMovieInput.genre = data;
    });
    this.getFormControl('imdnRating').valueChanges.subscribe((data) => {
      this.uploadMovieInput.imdnRating = data;
    });
    this.getFormControl('language').valueChanges.subscribe((data) => {
      this.uploadMovieInput.language = data;
    });
    this.getFormControl('image').valueChanges.subscribe((data) => {
      this.uploadMovieInput.imageUrl = data;
    });
    this.getFormControl('type').valueChanges.subscribe((data) => {
      this.uploadMovieInput.type = data;
    });
    this.getFormControl('isPrime').valueChanges.subscribe((data) => {
      this.uploadMovieInput.isPrime = data;
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
   * Handles file upload
   * @param event
   */
  public handleFileUpload(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
        this.getFormControl('image').setValue(this.imageUrl);
      };
    }
  }

  /**
   * Closes notification
   * @param value
   */
  public closeNotification(value: boolean): void {
    if (value) {
      this.showNotification = false;
      this.notificationText = '';
    }
  }

  /**
   * Uploads movie
   */
  public uploadMovie(): void {
    const payLoad: IUploadMovieInput = {
      description: this.uploadMovieInput.description,
      genre: this.uploadMovieInput.genre,
      imageUrl: this.uploadMovieInput.imageUrl,
      imdnRating: this.uploadMovieInput.imdnRating,
      language: this.uploadMovieInput.language,
      name: this.uploadMovieInput.name,
      title: this.uploadMovieInput.title,
      type: this.uploadMovieInput.type,
      id: CommonUtilities.generateId(),
      isPrime: this.uploadMovieInput.isPrime,
    };
    if (payLoad) {
      this.uploadMovieService.uploadMovie(payLoad).subscribe(
        (data) => {
          if (data) {
            this.resetUploadForm();
            (this.showNotification = true), (this.notificationText = `${data.name} successfully uploaded !! Enjoy`);
          }
        },
        (error) => {
          (this.showNotification = true), (this.notificationText = 'Error While uploading , Please try again ');
        }
      );
    }
  }

  /**
   * Resets upload form
   */
  private resetUploadForm(): void {
    this.form.reset();
    this.form.patchValue({
      language: '',
      genre: '',
      type: '',
      imdnRating: '',
      isPrime: false,
    });
    this.uploadMovieInput = new UploadMovieInput();
    this.imageUrl = undefined;
    this.imageInput.nativeElement.value = '';
  }
}
