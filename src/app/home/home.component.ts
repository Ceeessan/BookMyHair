import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { FindUsBannerComponent } from '../components/find-us-banner/find-us-banner.component';
import { CollageComponent } from '../components/collage/collage.component';
import { trigger, style, animate, transition } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { StaffComponent } from '../components/staff/staff.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FindUsBannerComponent, CollageComponent, CommonModule, StaffComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(50px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]

})
export class HomeComponent {
  @ViewChild('slideElement') slideElement!: ElementRef;
  slideInVisible = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (!this.slideElement) return;

    const rect = this.slideElement.nativeElement.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.top < windowHeight * 0.75) {
      this.slideInVisible = true;
    }
  }
}