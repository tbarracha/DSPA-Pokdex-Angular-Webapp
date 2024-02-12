import { TestBed } from '@angular/core/testing';

import { HttpSecureInterceptor } from './http-secure.interceptor';

describe('HttpSecureInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HttpSecureInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: HttpSecureInterceptor = TestBed.inject(HttpSecureInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
