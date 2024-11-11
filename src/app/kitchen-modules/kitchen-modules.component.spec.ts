import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitchenModulesComponent } from './kitchen-modules.component';

describe('KitchenModulesComponent', () => {
  let component: KitchenModulesComponent;
  let fixture: ComponentFixture<KitchenModulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KitchenModulesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KitchenModulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
