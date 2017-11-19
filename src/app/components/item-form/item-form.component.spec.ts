import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemFormComponent } from './item-form.component';
import { ListService } from '../../services/list.service';
import { ListItem } from '../../interfaces/main';
import { DebugElement } from '@angular/core/src/debug/debug_node';
import { fail } from 'assert';
import { FormsModule } from '@angular/forms';

describe('ItemFormComponent', () => {
  let component: ItemFormComponent;
  let fixture: ComponentFixture<ItemFormComponent>;
  let de: DebugElement;

  const listServiceMock = {
    addNewItem: (item: ListItem) => { }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ItemFormComponent],
      providers: [{ provide: ListService, useValue: listServiceMock }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemFormComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onSubmit() should add item with correct values', () => {
    // fail('not yet implemented');
  });
});
