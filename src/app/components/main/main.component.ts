import { Component } from '@angular/core';
import { faTv } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  faTelevision = faTv;
}
