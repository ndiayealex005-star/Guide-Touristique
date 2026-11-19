import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="not-found">
      <p class="code">404</p>
      <h2>Page introuvable</h2>
      <p>La page demandée n’existe pas ou n’est plus disponible.</p>
      <a routerLink="/">Retourner à la liste des guides</a>
    </section>
  `,
  styles: `
    .not-found { padding: 4rem 1rem; text-align: center; }
    .code { margin: 0; color: #0c7767; font-size: 4rem; font-weight: 800; }
    h2 { margin: 0 0 .75rem; }
    a { color: #0c7767; font-weight: 700; }
  `,
})
export class NotFoundComponent {}
