import { Component, VERSION } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {
  filter,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  map,
  tap
} from 'rxjs/operators';

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

  constructor(private http: HttpClient) {}

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
    this.name.valueChanges
      .pipe(
        debounceTime(300),
        tap(val => console.log(val)),
        distinctUntilChanged(),
        filter(val => val.length > 3),
        switchMap(username =>
          this.http.get(`https://api.github.com/search/users?q=${username}`)
        ),
        tap(val => console.log(val)),
        map((res: any) => res.total_count)
      )
      .subscribe(val => {
        console.log(val);
      });
  }
}
