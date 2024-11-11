import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Muebles3Component } from './muebles3.component';

describe('Muebles3Component', () => {
  let component: Muebles3Component;
  let fixture: ComponentFixture<Muebles3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Muebles3Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Muebles3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
