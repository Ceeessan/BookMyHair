import { Component, HostListener } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone:true,
  imports: [RouterLink, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }

  @HostListener('document:click', ['$event'])
    onClickOutside(event: MouseEvent) {
      const target = event.target as HTMLElement;

      const clickedNav = target.closest('nav');
      const clickedBurger = target.closest('#burgerMenu');
    
      if (!clickedNav && !clickedBurger) {
        this.closeMenu();
      }
    } 
}