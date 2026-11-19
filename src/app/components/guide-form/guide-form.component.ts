import { Component, inject, OnInit, signal } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { GuideTouristique } from '../../models/guide-touristique';
import { GuideTouristiqueService } from '../../services/guide-touristique.service';

const telephoneSenegalais =
  /^(?:(?:\+|00)221[\s.-]?)?(?:7[05678][\s.-]?\d{3}[\s.-]?\d{2}[\s.-]?\d{2}|33[\s.-]?\d{3}[\s.-]?\d{2}[\s.-]?\d{2})$/;

function auMoinsUneLangue(control: AbstractControl): ValidationErrors | null {
  const langues = String(control.value ?? '')
    .split(',')
    .map((langue) => langue.trim())
    .filter(Boolean);
  return langues.length > 0 ? null : { langueRequired: true };
}

@Component({
  selector: 'app-guide-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './guide-form.component.html',
  styleUrl: './guide-form.component.css',
})
export class GuideFormComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly guideService = inject(GuideTouristiqueService);

  readonly regions = [
    'Dakar',
    'Diourbel',
    'Fatick',
    'Kaffrine',
    'Kaolack',
    'Kédougou',
    'Kolda',
    'Louga',
    'Matam',
    'Saint-Louis',
    'Sédhiou',
    'Tambacounda',
    'Thiès',
    'Ziguinchor',
  ];
  readonly erreurChargement = signal<string | null>(null);
  readonly estEdition = signal(false);
  private guideId: number | null = null;

  readonly form = this.formBuilder.nonNullable.group({
    prenom: ['', [Validators.required, Validators.minLength(2)]],
    nom: ['', [Validators.required, Validators.minLength(2)]],
    region: ['', Validators.required],
    langues: ['', [Validators.required, Validators.minLength(2), auMoinsUneLangue]],
    specialites: ['', [Validators.required, Validators.minLength(5)]],
    email: ['', [Validators.required, Validators.email]],
    telephone: ['', [Validators.required, Validators.pattern(telephoneSenegalais)]],
    note: [3, [Validators.required, Validators.min(0), Validators.max(5)]],
    actif: [true, Validators.required],
  });

  ngOnInit(): void {
    const idParametre = this.route.snapshot.paramMap.get('id');
    if (idParametre === null) {
      return;
    }

    const id = Number(idParametre);
    const guide = Number.isInteger(id) ? this.guideService.recupererParId(id) : undefined;
    if (!guide) {
      this.erreurChargement.set('Ce guide est introuvable. Vérifiez le lien ou retournez à la liste.');
      return;
    }

    this.guideId = id;
    this.estEdition.set(true);
    this.form.setValue({
      prenom: guide.prenom,
      nom: guide.nom,
      region: guide.region,
      langues: guide.langues.join(', '),
      specialites: guide.specialites,
      email: guide.email,
      telephone: guide.telephone,
      note: guide.note,
      actif: guide.actif,
    });
  }

  enregistrer(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const valeur = this.form.getRawValue();
    const guide: Omit<GuideTouristique, 'id'> = {
      ...valeur,
      langues: valeur.langues.split(',').map((langue) => langue.trim()).filter(Boolean),
    };

    if (this.guideId === null) {
      this.guideService.ajouter(guide);
      this.guideService.notification.set('Le guide a été ajouté avec succès.');
    } else if (this.guideService.modifier(this.guideId, guide)) {
      this.guideService.notification.set('La fiche du guide a été modifiée avec succès.');
    } else {
      this.erreurChargement.set('La modification a échoué : ce guide est introuvable.');
      return;
    }

    void this.router.navigateByUrl('/');
  }
}
