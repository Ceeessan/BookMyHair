import { Component } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-find-us-banner',
  standalone: true,
  imports: [ButtonComponent, RouterLink],
  templateUrl: './find-us-banner.component.html',
  styleUrls: ['./find-us-banner.component.scss']
})
export class FindUsBannerComponent {

}
