import { Injectable, signal } from '@angular/core';
import { GuideTouristique } from '../models/guide-touristique';

@Injectable({
  providedIn: 'root',
})
export class GuideTouristiqueService {
  private guides: GuideTouristique[] = [
    {
      id: 1,
      prenom: 'Awa',
      nom: 'Ndiaye',
      region: 'Dakar',
      langues: ['Français', 'Wolof', 'Anglais'],
      specialites: 'Patrimoine et histoire de Dakar',
      email: 'awa.ndiaye@example.com',
      telephone: '+221 77 000 00 01',
      note: 4.8,
      actif: true,
    },
    {
      id: 2,
      prenom: 'Ibrahima',
      nom: 'Diop',
      region: 'Saint-Louis',
      langues: ['Français', 'Wolof'],
      specialites: 'Architecture coloniale et fleuve Sénégal',
      email: 'ibrahima.diop@example.com',
      telephone: '+221 77 000 00 02',
      note: 4.6,
      actif: true,
    },
    {
      id: 3,
      prenom: 'Fatou',
      nom: 'Sane',
      region: 'Ziguinchor',
      langues: ['Français', 'Diola', 'Anglais'],
      specialites: 'Écotourisme et culture casamançaise',
      email: 'fatou.sane@example.com',
      telephone: '+221 77 000 00 03',
      note: 4.9,
      actif: true,
    },
    {
      id: 4,
      prenom: 'Mamadou',
      nom: 'Fall',
      region: 'Thiès',
      langues: ['Français', 'Wolof'],
      specialites: 'Artisanat et paysages de la Petite Côte',
      email: 'mamadou.fall@example.com',
      telephone: '+221 77 000 00 04',
      note: 4.3,
      actif: false,
    },
    {
      id: 5,
      prenom: 'Mariama',
      nom: 'Ba',
      region: 'Tambacounda',
      langues: ['Français', 'Pulaar', 'Mandinka'],
      specialites: 'Nature et découverte du parc du Niokolo-Koba',
      email: 'mariama.ba@example.com',
      telephone: '+221 77 000 00 05',
      note: 4.7,
      actif: true,
    },
    {
      id: 6,
      prenom: 'Cheikh',
      nom: 'Gueye',
      region: 'Fatick',
      langues: ['Français', 'Sérère', 'Wolof'],
      specialites: 'Îles du Saloum et traditions sérères',
      email: 'cheikh.gueye@example.com',
      telephone: '+221 77 000 00 06',
      note: 4.5,
      actif: false,
    },
  ];

  readonly notification = signal<string | null>(null);

  lister(): GuideTouristique[] {
    return this.guides.map((guide) => ({ ...guide, langues: [...guide.langues] }));
  }

  recupererParId(id: number): GuideTouristique | undefined {
    const guide = this.guides.find((item) => item.id === id);
    return guide ? { ...guide, langues: [...guide.langues] } : undefined;
  }

  ajouter(guide: Omit<GuideTouristique, 'id'>): GuideTouristique {
    const nouvelId = this.guides.reduce((maximum, item) => Math.max(maximum, item.id), 0) + 1;
    const nouveauGuide = { ...guide, langues: [...guide.langues], id: nouvelId };
    this.guides = [...this.guides, nouveauGuide];
    return { ...nouveauGuide, langues: [...nouveauGuide.langues] };
  }

  modifier(id: number, donnees: Omit<GuideTouristique, 'id'>): boolean {
    const index = this.guides.findIndex((guide) => guide.id === id);
    if (index === -1) {
      return false;
    }

    this.guides = this.guides.map((guide) =>
      guide.id === id ? { ...donnees, langues: [...donnees.langues], id } : guide,
    );
    return true;
  }

  supprimer(id: number): boolean {
    const guidesRestants = this.guides.filter((guide) => guide.id !== id);
    if (guidesRestants.length === this.guides.length) {
      return false;
    }

    this.guides = guidesRestants;
    return true;
  }
}
