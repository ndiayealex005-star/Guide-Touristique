export interface GuideTouristique {
  id: number;
  prenom: string;
  nom: string;
  region: string;
  langues: string[];
  specialites: string;
  email: string;
  telephone: string;
  note: number;
  actif: boolean;
}
