import { Component, Input } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent {
  @Input() overlayColor?: string;
  @Input() loaderText?: string;
  @Input() loaderTextColor?: string;
  constructor(public loaderService: LoaderService) {}
}
