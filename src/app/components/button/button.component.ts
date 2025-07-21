import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [NgClass],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {

  @Input() color: 'primary' | 'secondary' = 'secondary';
  @Input() disabled = false;
  @Input() type: 'button' | 'submit' = 'button';
  @Input() text = "Klicka här";
}