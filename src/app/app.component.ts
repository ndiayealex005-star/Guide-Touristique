import { Component, inject, OnDestroy, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  template: `
    <header class="site-header" [class.is-home]="estAccueil()">
      <a class="brand" routerLink="/" aria-label="Guide-Touristique, page d'accueil">
        <span class="brand-mark" aria-hidden="true">
          <svg viewBox="0 0 32 32" role="img">
            <path d="M16 2.5c-5.8 0-10.5 4.7-10.5 10.5 0 7.9 10.5 16.5 10.5 16.5S26.5 20.9 26.5 13C26.5 7.2 21.8 2.5 16 2.5Z" />
            <circle cx="16" cy="13" r="4.2" />
          </svg>
        </span>
        <span class="brand-name">Guide<span>-</span>Touristique</span>
      </a>

      <button
        class="menu-toggle"
        type="button"
        (click)="menuOuvert.set(!menuOuvert())"
        [attr.aria-expanded]="menuOuvert()"
        aria-label="Ouvrir le menu de navigation"
      >
        <span></span><span></span><span></span>
      </button>

      <nav class="nav-links" [class.is-open]="menuOuvert()" aria-label="Navigation principale">
        <a routerLink="/" (click)="fermerMenu()">Accueil</a>
        <a routerLink="/" fragment="destinations" (click)="fermerMenu()">Destinations</a>
        <a routerLink="/guides" (click)="fermerMenu()">Nos guides</a>
        <a class="nav-cta" routerLink="/guides/nouveau" (click)="fermerMenu()">Ajouter un guide</a>
      </nav>
    </header>

    <main class="main-content">
      <router-outlet />
    </main>

    <footer class="site-footer">
      <div class="footer-inner">
        <div class="footer-brand">
          <a class="brand footer-brand-link" routerLink="/">
            <span class="brand-mark" aria-hidden="true">
              <svg viewBox="0 0 32 32" role="img">
                <path d="M16 2.5c-5.8 0-10.5 4.7-10.5 10.5 0 7.9 10.5 16.5 10.5 16.5S26.5 20.9 26.5 13C26.5 7.2 21.8 2.5 16 2.5Z" />
                <circle cx="16" cy="13" r="4.2" />
              </svg>
            </span>
            <span class="brand-name">Guide<span>-</span>Touristique</span>
          </a>
          <p>Explorez le Sénégal à travers ses paysages, son patrimoine et ses guides locaux.</p>
        </div>
        <nav class="footer-nav" aria-label="Navigation secondaire">
          <a routerLink="/">Accueil</a>
          <a routerLink="/" fragment="destinations">Destinations</a>
          <a routerLink="/guides">Nos guides</a>
        </nav>
        <div class="footer-meta">
          <strong>Projet universitaire</strong>
          <span>Application Angular — Sénégal</span>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© 2026 Guide-Touristique</span>
        <span>Le voyage commence ici</span>
      </div>
    </footer>
  `,
  styles: `
    :host { --ink:#122b24; --green:#087b68; --cream:#f7f4ed; display:flex; min-height:100vh; flex-direction:column; }
    .site-header { position:absolute; z-index:50; top:0; left:0; width:100%; height:84px; display:flex; align-items:center; justify-content:space-between; gap:2rem; padding:0 max(1.25rem, calc((100% - 1180px)/2)); border-bottom:1px solid #e2ebe7; background:#fff; color:var(--ink); }
    .site-header.is-home { border-bottom:0; background:transparent; color:#fff; }
    .brand { display:flex; align-items:center; gap:.72rem; color:inherit; text-decoration:none; }
    .brand-mark { display:grid; width:42px; height:42px; place-items:center; border:1px solid #b9ccc4; border-radius:50%; background:#edf5f1; color:var(--green); backdrop-filter:blur(10px); }
    .site-header.is-home .brand-mark { border-color:rgba(255,255,255,.5); background:rgba(255,255,255,.12); color:#fff; }
    .brand-mark svg { width:21px; height:21px; fill:none; stroke:currentColor; stroke-width:1.8; }
    .brand-mark circle { fill:currentColor; stroke:none; }
    .brand-name { font-family:Georgia, 'Times New Roman', serif; font-size:1.22rem; font-weight:700; letter-spacing:-.02em; }
    .brand-name span { color:#e6c77c; }
    .nav-links { display:flex; align-items:center; gap:1.8rem; }
    .nav-links a { position:relative; color:var(--ink); font-size:.91rem; font-weight:700; text-decoration:none; }
    .site-header.is-home .nav-links a { color:#fff; }
    .nav-links a:not(.nav-cta)::after { content:''; position:absolute; left:0; bottom:-8px; width:100%; height:2px; background:#e7c879; transform:scaleX(0); transition:.25s ease; }
    .nav-links a:hover::after { transform:scaleX(1); }
    .nav-cta { padding:.72rem 1.05rem; border:1px solid #b9ccc4; border-radius:999px; background:#edf5f1; backdrop-filter:blur(10px); transition:.25s ease; }
    .site-header.is-home .nav-cta { border-color:rgba(255,255,255,.5); background:rgba(255,255,255,.12); }
    .nav-cta:hover { background:var(--ink); color:#fff; transform:translateY(-2px); }
    .site-header.is-home .nav-cta:hover { background:#fff; color:var(--ink); }
    .menu-toggle { display:none; width:44px; height:44px; padding:11px; border:1px solid #b9ccc4; border-radius:50%; background:#edf5f1; }
    .menu-toggle span { display:block; width:100%; height:2px; margin:4px 0; border-radius:2px; background:var(--ink); }
    .site-header.is-home .menu-toggle { border-color:rgba(255,255,255,.45); background:rgba(0,0,0,.12); }
    .site-header.is-home .menu-toggle span { background:#fff; }
    .main-content { flex:1; min-width:0; padding-top:84px; }
    .site-footer { background:#11261f; color:#dbe7e1; }
    .footer-inner { width:min(1180px, calc(100% - 2.5rem)); display:grid; grid-template-columns:minmax(260px,1.5fr) .7fr .7fr; gap:3rem; margin:0 auto; padding:4rem 0 3rem; }
    .footer-brand-link { color:#fff; width:max-content; }
    .footer-brand p { max-width:390px; margin:.9rem 0 0; color:#9fb3aa; line-height:1.7; }
    .footer-nav, .footer-meta { display:flex; flex-direction:column; gap:.75rem; }
    .footer-nav a { color:#dbe7e1; text-decoration:none; }
    .footer-nav a:hover { color:#e7c879; }
    .footer-meta strong { color:#fff; }
    .footer-meta span { color:#9fb3aa; }
    .footer-bottom { width:min(1180px, calc(100% - 2.5rem)); display:flex; justify-content:space-between; gap:1rem; margin:0 auto; padding:1.25rem 0; border-top:1px solid rgba(255,255,255,.1); color:#879d94; font-size:.82rem; }
    @media (max-width:760px) {
      .site-header { height:74px; padding-inline:1rem; }
      .brand-name { font-size:1.05rem; }
      .brand-mark { width:38px; height:38px; }
      .menu-toggle { display:block; }
      .nav-links { position:absolute; top:64px; left:1rem; right:1rem; display:none; align-items:stretch; flex-direction:column; gap:0; padding:.55rem; border:1px solid rgba(255,255,255,.18); border-radius:18px; background:rgba(14,43,35,.96); box-shadow:0 18px 40px rgba(0,0,0,.22); backdrop-filter:blur(18px); }
      .nav-links.is-open { display:flex; }
      .nav-links a { padding:.9rem 1rem; border-radius:10px; color:#fff; }
      .nav-links .nav-cta { border-color:rgba(255,255,255,.35); background:rgba(255,255,255,.08); }
      .nav-links a:not(.nav-cta)::after { display:none; }
      .nav-cta { margin:.25rem 0 0; text-align:center; }
      .main-content { padding-top:74px; }
      .footer-inner { grid-template-columns:1fr; gap:2rem; padding-top:3rem; }
      .footer-bottom { align-items:flex-start; flex-direction:column; }
    }
  `,
})
export class AppComponent implements OnDestroy {
  private readonly router = inject(Router);
  private readonly routeSubscription: Subscription;
  readonly menuOuvert = signal(false);
  readonly estAccueil = signal(true);

  constructor() {
    this.actualiserPage(this.router.url);
    this.routeSubscription = this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.actualiserPage(event.urlAfterRedirects);
        this.fermerMenu();
      });
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }

  private actualiserPage(url: string): void {
    const chemin = url.split('?')[0].split('#')[0];
    this.estAccueil.set(chemin === '/');
  }

  fermerMenu(): void {
    this.menuOuvert.set(false);
  }
}
