import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-fh-paginator',
  templateUrl: './fh-paginator.component.html',
  styleUrls: ['./fh-paginator.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FhPaginatorComponent {
  defaultSettings;

  @Input() set pagination(_defaultPagination) {
    this.defaultSettings = _defaultPagination;
  }

  @Output() emitPage = new EventEmitter<any>();

  takeEvent(event) {
    this.emitPage.emit(event);
  }
}
