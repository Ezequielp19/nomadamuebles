import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Muebles2Component } from './muebles2.component';

describe('Muebles2Component', () => {
  let component: Muebles2Component;
  let fixture: ComponentFixture<Muebles2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Muebles2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Muebles2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
