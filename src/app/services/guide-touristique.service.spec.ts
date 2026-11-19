import { GuideTouristique } from '../models/guide-touristique';
import { GuideTouristiqueService } from './guide-touristique.service';

describe('GuideTouristiqueService', () => {
  it('initializes with six fictional guides and supports CRUD operations', () => {
    const service = new GuideTouristiqueService();
    const nouveauGuide: Omit<GuideTouristique, 'id'> = {
      prenom: 'Test',
      nom: 'Guide',
      region: 'Dakar',
      langues: ['Français'],
      specialites: 'Visite de démonstration',
      email: 'test.guide@example.com',
      telephone: '+221 77 000 00 07',
      note: 4,
      actif: true,
    };

    expect(service.lister()).toHaveLength(6);

    const ajoute = service.ajouter(nouveauGuide);
    expect(service.recupererParId(ajoute.id)?.email).toBe(nouveauGuide.email);

    const modifie = { ...nouveauGuide, specialites: 'Nouvelle spécialité' };
    expect(service.modifier(ajoute.id, modifie)).toBe(true);
    expect(service.recupererParId(ajoute.id)?.specialites).toBe('Nouvelle spécialité');

    expect(service.supprimer(ajoute.id)).toBe(true);
    expect(service.recupererParId(ajoute.id)).toBeUndefined();
    expect(service.modifier(ajoute.id, nouveauGuide)).toBe(false);
    expect(service.supprimer(ajoute.id)).toBe(false);
  });
});
