import { Component } from '@angular/core';
import { FindUsBannerComponent } from '../components/find-us-banner/find-us-banner.component';
import { CollageComponent } from '../components/collage/collage.component';

@Component({
  selector: 'app-home',
  imports: [FindUsBannerComponent, CollageComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
