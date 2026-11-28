import { Routes } from '@angular/router';
import { GuideFormComponent } from './components/guide-form/guide-form.component';
import { GuideListComponent } from './components/guide-list/guide-list.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Guide-Touristique | Explorez le Sénégal' },
  { path: 'guides', component: GuideListComponent, title: 'Guides touristiques du Sénégal' },
  { path: 'guides/nouveau', component: GuideFormComponent, title: 'Ajouter un guide' },
  { path: 'guides/:id/modifier', component: GuideFormComponent, title: 'Modifier un guide' },
  { path: '**', component: NotFoundComponent, title: 'Page introuvable' },
];
