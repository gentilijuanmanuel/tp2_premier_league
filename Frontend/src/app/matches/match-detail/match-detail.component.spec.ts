import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchDetailComponent } from './match-detail.component';

describe('MatchDetailComponent', () => {
  let component: MatchDetailComponent;
  let fixture: ComponentFixture<MatchDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

/* arreglar el metodo agregar evento con un push o sino find, agregar el evento al arreglo y luego
hacer un update definiendo otra vez el atributo events
arreglar el tema del sincronismo con un then.(promise) o meter el codigo dentro del callback
despues del manejp de error

*/