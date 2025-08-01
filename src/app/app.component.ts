import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FooterComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'bookmyhair';

  constructor( private http: HttpClient){}

  ngOnInit(): void {
    setInterval(() => {
      this.http.get('https://bookmyhair-backend.onrender.com/api/ping').subscribe({
        next: () => console.log('pinged backend'),
        error: (err) => console.error('ping error', err)
      });
    }, 600000);
  }
}