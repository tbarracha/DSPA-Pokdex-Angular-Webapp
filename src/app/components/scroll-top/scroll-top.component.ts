import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-scroll-top',
  templateUrl: './scroll-top.component.html',
  styleUrls: ['./scroll-top.component.scss']
})
export class ScrollTopComponent {
  showScrollTopButton: boolean = false;

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.showScrollTopButton = scrollPosition > 200; // Adjust 200 to the desired scroll position to show the button
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }  
}
