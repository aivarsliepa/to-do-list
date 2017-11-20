import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComponent } from './list.component';
import { ListService } from '../../services/list.service';
import { Observable } from 'rxjs/Observable';
import { ListItem } from '../../interfaces/main';

describe('ListComponent', () => {

  const listItem: ListItem = {
    uid: '1234',
    date: null,
    done: true,
    title: 'item'
  };
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  const listServiceMock = {
    getList: () => Observable.of(null)
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListComponent],
      providers: [{ provide: ListService, useValue: listServiceMock }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should have no items in list, when service gives no items', () => {
    fixture.detectChanges();
    expect(component.list).toBeNull();
  });

  it('should have same in the list as the ones service gives it to', () => {
    const listService = TestBed.get(ListService);
    spyOn(listService, 'getList').and.returnValue(Observable.of([listItem]));
    fixture.detectChanges();
    expect(component.list.length).toBe(1);
    expect(component.list[0]).toBe(listItem);
    expect(component.list[0].done).toBeTruthy();
  });
});
