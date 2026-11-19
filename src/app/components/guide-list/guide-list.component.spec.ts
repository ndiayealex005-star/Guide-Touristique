import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { GuideListComponent } from './guide-list.component';

describe('GuideListComponent', () => {
  let component: GuideListComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [GuideListComponent],
      providers: [provideRouter([])],
    });

    component = TestBed.createComponent(GuideListComponent).componentInstance;
  });

  it('searches first name, last name, both full-name orders and specialties', () => {
    const cases = [
      '  AWA ',
      'ndiaye',
      ' Awa   Ndiaye ',
      'NDIAYE   AWA',
      'patrimoine',
    ];

    for (const recherche of cases) {
      component.recherche = recherche;
      expect(component.guidesFiltres.some((guide) => guide.id === 1)).toBe(true);
    }
  });

  it('resets the text search, region and status filters together', () => {
    component.recherche = 'awa';
    component.regionSelectionnee = 'Dakar';
    component.statutSelectionne = 'actif';

    component.reinitialiserFiltres();

    expect(component.recherche).toBe('');
    expect(component.regionSelectionnee).toBe('');
    expect(component.statutSelectionne).toBe('');
    expect(component.guidesFiltres.length).toBe(6);
  });
});
