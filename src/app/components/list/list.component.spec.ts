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

  let form: FormGroup;
  let titleInput: AbstractControl;
  let dateInput: AbstractControl;
  let submitBtn: HTMLButtonElement;
  let cancelBtn: HTMLButtonElement;

  const intiallizeFormElements = () => {
    form = component.form;
    dateInput = form.controls['date'];
    titleInput = form.controls['title'];
    submitBtn = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
    cancelBtn = fixture.debugElement.queryAll(By.css('button'))[1].nativeElement;
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
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
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
    expect(component.list.length).toBe(1);
    expect(component.list[0]).toBe(mockListItem1);
    expect(component.list[0].uid).toBe(LIST_1_UID);
  });

  it('should display correct list item', () => {
    getListSubject.next([mockListItem1]);
    fixture.detectChanges();
    const spans: DebugElement[] = de.queryAll(By.css('span'));
    const titleSpan: HTMLSpanElement = spans[0].nativeElement;
    const dateSpan: HTMLSpanElement = spans[1].nativeElement;
    expect(titleSpan.textContent.trim()).toBe(LIST_1_TITLE);
    // convert dates, to avoid locale issues
    const resultDate = new Date(dateSpan.textContent.trim());
    expect(resultDate.toDateString()).toBe(mockDate1.toDateString());
  });

  it('item to edit should be intially undefined', () => {
    getListSubject.next([mockListItem1]);
    fixture.detectChanges();
    expect(component.itemToEdit).toBeUndefined();
  });

  it('clicking edit button should set correct item to edit', () => {
    getListSubject.next([mockListItem1]);
    fixture.detectChanges();
    const editIcon: HTMLElement = de.query(By.css('i')).nativeElement;
    editIcon.click();
    fixture.detectChanges();
    expect(component.itemToEdit).toBe(mockListItem1);
  });

  it('form should not be present initially', () => {
    getListSubject.next([mockListItem1]);
    fixture.detectChanges();
    expect(form).toBeUndefined();
  });

  it('form should initialize when edit clicked', () => {
    getListSubject.next([mockListItem1]);
    fixture.detectChanges();
    const editIcon: HTMLElement = de.query(By.css('i')).nativeElement;
    editIcon.click();
    fixture.detectChanges();
    intiallizeFormElements();
    expect(form).toBeDefined();
  });

  it('form should pre-fill correct values of list item, including formatted date', () => {
    getListSubject.next([mockListItem1]);
    fixture.detectChanges();
    const editIcon: HTMLElement = de.query(By.css('i')).nativeElement;
    editIcon.click();
    fixture.detectChanges();
    intiallizeFormElements();
    const formattedDate = moment(mockDate1).format('YYYY-MM-DDThh:mm');
    expect(dateInput.value).toBe(formattedDate);
    expect(titleInput.value).toBe(LIST_1_TITLE);
  });

  it('should allow to edit element via form when clicked', () => {
    getListSubject.next([mockListItem1]);
    fixture.detectChanges();
    const editIcon: HTMLElement = de.query(By.css('i')).nativeElement;
    editIcon.click();
    fixture.detectChanges();
    intiallizeFormElements();
    titleInput.setValue(NEW_TITLE);
    dateInput.setValue(newDate);
    fixture.detectChanges();
    expect(dateInput.value).toBe(newDate);
    expect(titleInput.value).toBe(NEW_TITLE);
  });

  it('update item after item form is submitted', () => {
    const listService = TestBed.get(ListService);
    spyOn(listService, 'updateItem');
    getListSubject.next([mockListItem1]);
    fixture.detectChanges();
    const editIcon: HTMLElement = de.query(By.css('i')).nativeElement;
    editIcon.click();
    fixture.detectChanges();
    intiallizeFormElements();
    titleInput.setValue(NEW_TITLE);
    dateInput.setValue(newDate);
    fixture.detectChanges();
    submitBtn.click();
    fixture.detectChanges();
    expect(listService.updateItem).toHaveBeenCalledWith(updatedItem);
  });

  it('cancel button should close the form', () => {
    getListSubject.next([mockListItem1]);
    fixture.detectChanges();
    const editIcon: HTMLElement = de.query(By.css('i')).nativeElement;
    editIcon.click();
    fixture.detectChanges();
    intiallizeFormElements();
    cancelBtn.click();
    fixture.detectChanges();
    expect(component.form).toBeNull();
  });

  it('submitting form should close the form', () => {
    getListSubject.next([mockListItem1]);
    fixture.detectChanges();
    const editIcon: HTMLElement = de.query(By.css('i')).nativeElement;
    editIcon.click();
    fixture.detectChanges();
    intiallizeFormElements();
    submitBtn.click();
    fixture.detectChanges();
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
    // confirm first item form
    expect(component.itemToEdit).toBe(mockListItem1);

    editIcon2.click();
    fixture.detectChanges();
    intiallizeFormElements();
    // confirm second item form
    expect(component.itemToEdit).toBe(mockListItem2);
  });

});
