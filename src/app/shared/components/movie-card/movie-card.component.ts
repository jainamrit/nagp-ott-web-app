import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IUploadMovieOutput } from 'src/app/core/Interfaces/upload-movie/IUploadMovieOutput';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css'],
})
export class MovieCardComponent {
  /**
   * Input  of movie card component
   */
  @Input() movie?: IUploadMovieOutput;

  /**
   * Input  of movie card component
   */
  @Input() externalCSS?: string;

  /**
   * Output  of movie card component
   */
  @Output() showDetails = new EventEmitter<IUploadMovieOutput>(undefined);

  /**
   * Determines whether show details click on
   */
  public onShowDetailsClick(): void {
    this.showDetails.emit(this.movie);
  }
}
