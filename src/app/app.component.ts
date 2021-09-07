import { Component, VERSION } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name = new FormControl('');

  ngAfterViewInit() {
    this.name.valueChanges.subscribe(val => {
      console.log(val);
    });
  }
}
