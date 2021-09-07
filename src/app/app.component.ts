import { Component, VERSION } from '@angular/core';
import { FormControl } from '@angular/forms';
import { filter, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name = new FormControl('');
  isTimerRunning = false;
  prevValue = '';
  timer;
  onInputChange() {
    // if (!this.isTimerRunning) {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      // this.isTimerRunning = false;
      if (this.name.value.length > 3 && this.prevValue !== this.name.value) {
        this.prevValue = this.name.value;
        console.log(this.name.value);
      }
    }, 300);
    // this.isTimerRunning = true;
  }

  ngAfterViewInit() {
    // this.name.valueChanges
    //   .pipe(
    //     debounceTime(300),
    //     distinctUntilChanged(),
    //     filter(val => val.length > 3)
    //   )
    //   .subscribe(val => {
    //     console.log(val);
    //   });
  }
}
