import { DecimalPipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { GuideTouristiqueService } from '../../services/guide-touristique.service';

@Component({
  selector: 'app-guide-list',
  standalone: true,
  imports: [DecimalPipe, FormsModule, RouterLink],
  templateUrl: './guide-list.component.html',
  styleUrl: './guide-list.component.css',
})
export class GuideListComponent {
  private readonly guideService = inject(GuideTouristiqueService);
  readonly guides = signal(this.guideService.lister());
  readonly regions = computed(() => [...new Set(this.guides().map((guide) => guide.region))].sort());
  recherche = '';
  regionSelectionnee = '';
  statutSelectionne = '';
  readonly notification = this.guideService.notification;

  get guidesFiltres() {
    const normaliser = (valeur: string) => valeur.trim().replace(/\s+/g, ' ').toLowerCase();
    const recherche = normaliser(this.recherche);

    return this.guides().filter((guide) => {
      const prenom = normaliser(guide.prenom);
      const nom = normaliser(guide.nom);
      const correspondRecherche =
        !recherche ||
        [
          prenom,
          nom,
          `${prenom} ${nom}`,
          `${nom} ${prenom}`,
          normaliser(guide.specialites),
        ].some((valeur) =>
          valeur.includes(recherche),
        );
      const correspondRegion = !this.regionSelectionnee || guide.region === this.regionSelectionnee;
      const correspondStatut =
        !this.statutSelectionne ||
        guide.actif === (this.statutSelectionne === 'actif');

      return correspondRecherche && correspondRegion && correspondStatut;
    });
  }

  supprimer(id: number, nomComplet: string): void {
    if (!confirm(`Voulez-vous vraiment supprimer la fiche de ${nomComplet} ?`)) {
      return;
    }

    if (this.guideService.supprimer(id)) {
      this.guides.set(this.guideService.lister());
      this.notification.set('La fiche du guide a été supprimée.');
    } else {
      this.notification.set('La suppression a échoué : ce guide est introuvable.');
    }
  }

  reinitialiserFiltres(): void {
    this.recherche = '';
    this.regionSelectionnee = '';
    this.statutSelectionne = '';
  }
}
