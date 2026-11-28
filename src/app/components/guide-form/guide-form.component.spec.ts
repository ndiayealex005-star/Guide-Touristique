import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { GuideFormComponent } from './guide-form.component';
import { routes } from '../../app.routes';

describe('GuideFormComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [GuideFormComponent],
      providers: [provideRouter(routes)],
    });
  });

  it('marks the required fields and prevents an invalid submission', () => {
    const component = TestBed.createComponent(GuideFormComponent).componentInstance;

    component.enregistrer();

    expect(component.form.invalid).toBe(true);
    expect(component.form.controls.prenom.touched).toBe(true);
  });

  it('accepts a valid Senegalese guide and transforms the languages', () => {
    const component = TestBed.createComponent(GuideFormComponent).componentInstance;

    component.form.setValue({
      prenom: 'Moussa',
      nom: 'Sow',
      region: 'Dakar',
      langues: 'Français, Wolof',
      specialites: 'Visites patrimoniales de Dakar',
      email: 'moussa.sow@example.com',
      telephone: '+221 77 123 45 67',
      note: 4.5,
      actif: true,
    });

    component.enregistrer();

    expect(component.form.valid).toBe(true);
  });
});
