import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ListComponent } from './list.component';
import { ListService } from '../../services/list.service';
import { By } from '@angular/platform-browser';
import * as moment from 'moment';
import { DebugElement } from '@angular/core/src/debug/debug_node';
import { FormGroup, AbstractControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListItem } from '../../interfaces/main';
import {
  listServiceMock,
  mockListItem1,
  getListSubject,
  LIST_1_UID,
  DATE_TIME,
  LIST_1_TITLE,
  mockDate1,
  mockListItem2
} from '../../testing/mocks';

describe('ListComponent', () => {
  const newDate = new Date();
  const NEW_TITLE = 'new title';
  const updatedItem: ListItem = {
    uid: LIST_1_UID,
    done: false,
    date: newDate,
    title: NEW_TITLE
  };

  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let de: DebugElement;

  let titleInput: AbstractControl;
  let dateInput: AbstractControl;
  let submitBtn: HTMLButtonElement;
  let cancelBtn: HTMLButtonElement;
  let deleteBtn: HTMLButtonElement;

  const intiallizeFormElements = () => {
    dateInput = component.form.controls['date'];
    titleInput = component.form.controls['title'];
    const buttons: DebugElement[] = de.queryAll(By.css('button'));
    submitBtn = buttons[0].nativeElement;
    cancelBtn = buttons[1].nativeElement;
    deleteBtn = buttons[2].nativeElement;
  };

  const resetFormElemets = () => {
    dateInput = undefined;
    titleInput = undefined;
    submitBtn = undefined;
    cancelBtn = undefined;
    deleteBtn = undefined;
  };

  const setUpFirstListItemToBeEdited = () => {
    getListSubject.next([mockListItem1]);
    fixture.detectChanges();
    const editIcon: HTMLElement = de.query(By.css('i')).nativeElement;
    editIcon.click();
    fixture.detectChanges();
    intiallizeFormElements();
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListComponent],
      providers: [
        { provide: ListService, useValue: listServiceMock }
      ],
      imports: [
        ReactiveFormsModule,
        FormsModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    // reset values
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    mockListItem1.title = LIST_1_TITLE;
    mockListItem1.done = false;
    resetFormElemets();
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should have no items in list, when service gives no items', () => {
    getListSubject.next(null);
    fixture.detectChanges();
    expect(component.list).toBeNull();
  });

  it('should have same in the list as the ones service gives it to', () => {
    getListSubject.next([mockListItem1]);
    fixture.detectChanges();
    expect(component.list.length).toBe(1, 'list length');
    expect(component.list[0]).toBe(mockListItem1, 'item itself');
    expect(component.list[0].uid).toBe(LIST_1_UID, 'item uid');
  });

  it('should display correct list item', () => {
    getListSubject.next([mockListItem1]);
    fixture.detectChanges();
    const spans: DebugElement[] = de.queryAll(By.css('span'));
    const titleSpan: HTMLSpanElement = spans[0].nativeElement;
    const dateSpan: HTMLSpanElement = spans[1].nativeElement;
    expect(titleSpan.textContent.trim()).toBe(LIST_1_TITLE, 'title value');
    // convert dates, to avoid locale issues
    const resultDate = new Date(dateSpan.textContent.trim());
    expect(resultDate.toDateString()).toBe(mockDate1.toDateString(), 'date value');
  });

  it('item to edit should be intially undefined', () => {
    getListSubject.next([mockListItem1]);
    fixture.detectChanges();
    expect(component.itemToEdit).toBeUndefined();
  });

  it('clicking edit button should set correct item to edit', () => {
    setUpFirstListItemToBeEdited();
    expect(component.itemToEdit).toBe(mockListItem1);
  });

  it('form should not be present initially', () => {
    getListSubject.next([mockListItem1]);
    fixture.detectChanges();
    expect(component.form).toBeUndefined();
  });

  it('form should initialize when edit clicked', () => {
    setUpFirstListItemToBeEdited();
    expect(component.form).toBeDefined();
  });

  it('form should pre-fill correct values of list item, including formatted date', () => {
    setUpFirstListItemToBeEdited();
    const formattedDate = moment(mockDate1).format('YYYY-MM-DDThh:mm');
    expect(dateInput.value).toBe(formattedDate, 'formatted date value');
    expect(titleInput.value).toBe(LIST_1_TITLE, 'title value');
  });

  it('should allow to edit element via form when clicked', () => {
    setUpFirstListItemToBeEdited();
    titleInput.setValue(NEW_TITLE);
    dateInput.setValue(newDate);
    fixture.detectChanges();
    expect(dateInput.value).toBe(newDate, 'new date value');
    expect(titleInput.value).toBe(NEW_TITLE, 'new title value');
  });

  it('update item after item form is submitted', () => {
    const listService = TestBed.get(ListService);
    spyOn(listService, 'updateItem');
    setUpFirstListItemToBeEdited();
    titleInput.setValue(NEW_TITLE);
    dateInput.setValue(newDate);
    fixture.detectChanges();
    submitBtn.click();
    fixture.detectChanges();
    expect(listService.updateItem).toHaveBeenCalledWith(updatedItem);
  });

  it('cancel button should close the form', () => {
    setUpFirstListItemToBeEdited();
    cancelBtn.click();
    fixture.detectChanges();
    expect(component.form).toBeNull();
  });

  it('submitting form should close the form', () => {
    setUpFirstListItemToBeEdited();
    submitBtn.click();
    expect(component.form).toBeNull();
  });

  it('clicking on different item\'s edit button, should swap form to that item', () => {
    getListSubject.next([mockListItem1, mockListItem2]);
    fixture.detectChanges();
    const editIcons: DebugElement[] = de.queryAll(By.css('i'));
    const editIcon1: HTMLElement = editIcons[0].nativeElement;
    const editIcon2: HTMLElement = editIcons[1].nativeElement;

    editIcon1.click();
    fixture.detectChanges();
    intiallizeFormElements();
    expect(component.itemToEdit).toBe(mockListItem1, 'first item form');

    editIcon2.click();
    fixture.detectChanges();
    intiallizeFormElements();
    expect(component.itemToEdit).toBe(mockListItem2, 'second item form');
  });

  it('clicking delete item, should delete currently selected item', () => {
    const listService = TestBed.get(ListService);
    spyOn(listService, 'deleteItem');
    setUpFirstListItemToBeEdited();
    deleteBtn.click();
    fixture.detectChanges();
    expect(listService.deleteItem).toHaveBeenCalledWith(mockListItem1);
  });

  it('deleting item should close the form', () => {
    setUpFirstListItemToBeEdited();
    expect(component.form).toBeDefined('setup failed');
    deleteBtn.click();
    expect(component.form).toBeNull();
  });

  it('deleting item should set itemToEdit to null', () => {
    setUpFirstListItemToBeEdited();
    expect(component.itemToEdit).toBe(mockListItem1, 'setup failed');
    deleteBtn.click();
    expect(component.itemToEdit).toBeNull();
  });

  it('clicking done should toggle item to "done" attribute', () => {
    getListSubject.next([mockListItem1]);
    fixture.detectChanges();
    const checkboxLabel = de.query(By.css('label')).nativeElement;
    expect(mockListItem1.done).toBeFalsy('setup failed');
    checkboxLabel.click();
    expect(mockListItem1.done).toBeTruthy('first click');
    checkboxLabel.click();
    expect(mockListItem1.done).toBeFalsy('second click');
  });
  it('clicking done should update clicked item to service', () => {
    getListSubject.next([mockListItem1]);
    fixture.detectChanges();
    const checkboxLabel = de.query(By.css('label')).nativeElement;
    const listService = TestBed.get(ListService);
    spyOn(listService, 'updateItem');
    checkboxLabel.click();
    expect(listService.updateItem).toHaveBeenCalledWith(mockListItem1);
  });

});
