// scroll.service.ts
import { HostListener, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  private scrollSubject = new Subject<ScrollEvent>();

  constructor() { }

  getScrollEvent(): Subject<ScrollEvent> {
    return this.scrollSubject;
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    const target = event.target as Document;
    const scrollEvent: ScrollEvent = {
      scrollTop: target.documentElement.scrollTop || target.body.scrollTop,
      scrollHeight: target.documentElement.scrollHeight || target.body.scrollHeight,
      clientHeight: target.documentElement.clientHeight || target.body.clientHeight
    };
    this.scrollSubject.next(scrollEvent);
    console.log(scrollEvent);
  }
}

export interface ScrollEvent {
  scrollTop: number;
  scrollHeight: number;
  clientHeight: number;
}
