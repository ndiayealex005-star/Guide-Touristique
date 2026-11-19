
# Répertoire des guides touristiques du Sénégal

Application pédagogique Angular permettant de consulter, rechercher, filtrer, ajouter, modifier et supprimer des fiches de guides touristiques. Elle utilise des composants standalone, le routage Angular, les formulaires réactifs et les blocs de contrôle modernes (`@if`, `@for`, `@empty`).

## Prérequis

- Node.js compatible avec Angular 22 et npm
- Angular CLI 22 (ou les commandes via `npx ng`)
- Un navigateur récent

Le projet est déjà créé. Depuis sa racine, installez les dépendances présentes dans `package.json` si nécessaire :

```bash
npm install
```

## Lancement

```bash
npm start
```

Ouvrez ensuite [http://localhost:4200](http://localhost:4200). Le serveur de développement recharge l’application après les modifications.

## Vérification et compilation

```bash
npm test
npm run build
```

## Commandes Angular CLI de génération

Les commandes suivantes illustrent la génération de la structure. Les fichiers correspondants sont déjà créés dans ce projet ; ne les relancez pas tels quels au risque de créer des fichiers en doublon.

```bash
ng generate interface models/guide-touristique
ng generate service services/guide-touristique
ng generate component components/guide-list --standalone
ng generate component components/guide-form --standalone
ng generate component components/not-found --standalone
```

## Rôle des fichiers principaux

- `src/main.ts` : point d’entrée navigateur. Il démarre l’application en passant `AppComponent` et `appConfig` à `bootstrapApplication`, sans module Angular classique.
- `angular.json` : configuration Angular CLI du projet : chemins des sources, options de compilation, styles globaux, SSR, budgets de production et commande de test.
- `package.json` : scripts (`npm start`, `npm test`, `npm run build`) et dépendances Angular/TypeScript du projet.
- `src/app/app.routes.ts` : associe les URL à la liste, au formulaire de création/édition et à la page 404.
- `src/app/app.component.ts` : coque de l’application et `<router-outlet />`, dans lequel le routeur affiche l’écran courant.
- `src/app/models/guide-touristique.ts` : contrat TypeScript des données d’une fiche guide.
- `src/app/services/guide-touristique.service.ts` : jeu de données fictives en mémoire et opérations CRUD.
- `src/app/components/` : écrans autonomes de liste, de formulaire et de page introuvable.

## Fonctionnalités

- Recherche dynamique sur le prénom, le nom et les spécialités, combinable avec les filtres région et statut.
- Présentation responsive en cartes, note sur 5, badge d’activité et message lorsqu’aucun résultat ne correspond.
- Formulaire réactif avec validations obligatoires, e-mail, téléphone sénégalais, note et longueurs minimales.
- Confirmation avant suppression et notification des opérations CRUD.
- Navigation au clavier, libellés associés aux champs et attributs accessibles.

Les coordonnées et profils du jeu initial sont fictifs et servent uniquement à la démonstration. Ne les utilisez pas pour contacter une personne.

## Limites de cette solution front-end

1. Les fiches sont uniquement stockées dans la mémoire du navigateur. Les ajouts, modifications et suppressions disparaissent au rechargement et ne sont pas partagés entre utilisateurs.
2. Les données ne sont ni authentifiées ni protégées par des autorisations serveur. Un utilisateur peut modifier l’application côté client ; une validation front-end ne constitue donc pas une garantie de sécurité ou d’intégrité.
3. La recherche et les filtres s’appliquent uniquement aux fiches déjà chargées côté client ; cette approche n’est pas adaptée à un grand volume de données.

## Évolution vers une API REST avec `HttpClient`

Pour une version persistante et multi-utilisateur, le service local peut être remplacé par un backend REST (par exemple une API Node.js/Express ou Spring) et une base de données. Le serveur devient la source de vérité, valide chaque requête, applique les droits d’accès et conserve les données.

1. Activer `HttpClient` dans `src/app/app.config.ts` en ajoutant `provideHttpClient()` aux providers. Pour une API utilisant des cookies avec protection contre les requêtes intersites, configurer également la stratégie XSRF selon le backend.
2. Déclarer l’adresse de base de l’API dans la configuration d’environnement du projet, par exemple `https://api.exemple.test/api`. En production, utiliser une URL HTTPS fournie par le déploiement.
3. Remplacer les tableaux et méthodes synchrones de `GuideTouristiqueService` par des appels `HttpClient` retournant des `Observable`, typés avec `GuideTouristique` :

```ts
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GuideTouristique } from '../models/guide-touristique';

@Injectable({ providedIn: 'root' })
export class GuideTouristiqueService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://api.exemple.test/api/guides';

  lister(): Observable<GuideTouristique[]> {
    return this.http.get<GuideTouristique[]>(this.apiUrl);
  }

  recupererParId(id: number): Observable<GuideTouristique> {
    return this.http.get<GuideTouristique>(`${this.apiUrl}/${id}`);
  }

  ajouter(guide: Omit<GuideTouristique, 'id'>): Observable<GuideTouristique> {
    return this.http.post<GuideTouristique>(this.apiUrl, guide);
  }

  modifier(id: number, guide: Omit<GuideTouristique, 'id'>): Observable<GuideTouristique> {
    return this.http.put<GuideTouristique>(`${this.apiUrl}/${id}`, guide);
  }

  supprimer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
```

Cet extrait illustre les routes REST usuelles (`GET`, `POST`, `PUT`, `DELETE`) ; il faut l’adapter aux contrats réels de l’API. La chaîne `.test` est une adresse d’exemple et doit être remplacée par l’URL configurée pour l’environnement. Les composants devront s’abonner aux réponses ou les consommer avec `async`, afficher les états de chargement, traiter les erreurs HTTP (réseau, validation serveur, session expirée) et ne confirmer une action qu’après le succès du serveur. L’API devra refaire toutes les validations et vérifier les autorisations côté serveur. Un intercepteur Angular peut centraliser l’authentification et certains traitements d’erreur ; il ne remplace jamais les contrôles du backend.

## Tests

Le projet utilise le runner configuré par Angular CLI/Vitest. Ajoutez des tests unitaires au service pour les opérations CRUD et des tests de composants pour les filtres et validations lors de l’évolution du projet.
# Guide-Touristique
Application Angular de gestion d'un répertoire de guides touristiques fictifs au Sénégal.
