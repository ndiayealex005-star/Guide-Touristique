import { AfterViewInit, Component, inject, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { GuideTouristiqueService } from '../../services/guide-touristique.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, DecimalPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  private readonly observer?: IntersectionObserver;

  readonly guideService = inject(GuideTouristiqueService);
  readonly guidesVedettes = this.guideService.lister().filter((guide) => guide.actif).slice(0, 3);

  readonly destinations = [
    {
      nom: 'Dakar',
      type: 'Capitale vivante',
      description: 'Marchés créatifs, corniche Atlantique et richesses du patrimoine dakarois.',
      image: '/images/dakar.jpg',
    },
    {
      nom: 'Saint-Louis',
      type: 'Histoire & architecture',
      description: 'Une île chargée d’histoire, entre façades coloniales et fleuve Sénégal.',
      image: '/images/saint-louis.jpg',
    },
    {
      nom: 'Saly',
      type: 'Plages & détente',
      description: 'Une escale balnéaire chaleureuse au rythme des plages de la Petite Côte.',
      image: '/images/saly.jpg',
    },
    {
      nom: 'Casamance',
      type: 'Nature & culture',
      description: 'Mangroves verdoyantes, rivières paisibles et traditions profondément vivantes.',
      image: '/images/casamance.webp',
    },
    {
      nom: 'Lac Rose',
      type: 'Paysage unique',
      description: 'Un lac aux reflets roses, sculpté par les dunes et les travaux des récolteurs.',
      image: '/images/lac-rose.jpg',
    },
    {
      nom: 'Djoudj',
      type: 'Réserve naturelle',
      description: 'L’un des sanctuaires ornithologiques les plus remarquables d’Afrique.',
      image: '/images/djoudj.jpg',
    },
  ];

  constructor() {
    if (typeof IntersectionObserver !== 'undefined') {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              this.observer?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12 },
      );
    }
  }

  ngAfterViewInit(): void {
    document.querySelectorAll('.reveal').forEach((element) => this.observer?.observe(element));
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
