import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideRouter, Router } from '@angular/router';
import { routes } from './app.routes';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideRouter(routes)],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render brand', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.brand')?.textContent).toContain('Guide-Touristique');
  });

  it('should expose the home, guide list and form routes', async () => {
    const router = TestBed.inject(Router);

    await router.navigateByUrl('/');
    expect(router.url).toBe('/');

    await router.navigateByUrl('/guides');
    expect(router.url).toBe('/guides');

    await router.navigateByUrl('/guides/nouveau');
    expect(router.url).toBe('/guides/nouveau');

    await router.navigateByUrl('/route-inconnue');
    expect(router.url).toBe('/route-inconnue');
  });
});
