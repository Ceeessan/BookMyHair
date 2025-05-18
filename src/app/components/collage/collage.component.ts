import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-collage',
  imports: [CommonModule],
  templateUrl: './collage.component.html',
  styleUrl: './collage.component.scss'
})
export class CollageComponent {

  images: string[] = [
    '/assets/img1.jpg',
    '/assets/img2.jpg',
    '/assets/img3.jpg',
    '/assets/img4.jpg',
    '/assets/img5.jpg',
    '/assets/img6.jpg',
    '/assets/img7.jpg',
    '/assets/img8.jpg',
    '/assets/img9.jpg',
  ]
}
