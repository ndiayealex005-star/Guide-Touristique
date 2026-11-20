import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  template: `
    <header class="site-header">
  <h1>Bienvenue sur notre plateforme touristique</h1>
  <p>Explorez les merveilles du Sénégal !</p>
</header>

<main class="main-content">
  <section>
    <h2>Découvrez le Sénégal</h2>
    <p>
      Retrouvez les meilleurs guides touristiques
      et préparez vos prochaines visites.
    </p>

    <button routerLink="/">Voir les guides</button>
  </section>

  <router-outlet />
</main>

<footer class="site-footer">
  <p>Application réalisée par notre équipe Angular.</p>
  <p>Version de test pour apprendre Git et les fusions.</p>
</footer>
  `,
  styles: `
    :host { display: flex; min-height: 100vh; flex-direction: column; }
    .site-header { display: flex; align-items: center; justify-content: space-between; gap: 1rem; padding: 1rem max(1.25rem, calc((100% - 1180px) / 2)); border-bottom: 1px solid #e0e9e5; background: #fff; }
    .brand { display: flex; align-items: center; gap: .7rem; color: #18332e; font-size: 1.05rem; font-weight: 800; text-decoration: none; }
    .brand-mark { display: grid; width: 2.2rem; height: 2.2rem; place-items: center; border-radius: .7rem; background: #0c7767; color: #fff; }
    .site-header p, .site-footer p { margin: 0; color: #61716d; font-size: .9rem; }
    .main-content { width: min(1180px, 100%); flex: 1; margin: 0 auto; padding: 2rem 1.25rem 3rem; }
    .site-footer { padding: 1.25rem; border-top: 1px solid #e0e9e5; text-align: center; }
    @media (max-width: 500px) { .site-header { align-items: flex-start; flex-direction: column; } }
  `,
})
export class AppComponent {}
