import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-arrow-button',
  standalone: true,
  imports: [],
  templateUrl: './arrow-button.component.html',
  styleUrls: ['./arrow-button.component.scss']
})
export class ArrowButtonComponent {
  @Output() back = new EventEmitter<void>();

  onClick() {
    this.back.emit();
  }

}
