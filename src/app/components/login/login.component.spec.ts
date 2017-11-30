import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { authServiceMock, getUserSubject, mockUser, USER_NAME } from '../../testing/mocks';
import { LoginComponent } from './login.component';
import { AuthService } from '../../services/auth.service';
import { DebugElement } from '@angular/core/src/debug/debug_node';

describe('LoginComponent', () => {
  const SIGN_IN_TEXT = 'Sign in';
  const LOGOUT_TEXT = 'Logout';
  const HELLO_TEXT = `Hello ${USER_NAME}!`;
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [{ provide: AuthService, useValue: authServiceMock }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show login button, when user is not logged in', () => {
    getUserSubject.next(null);
    fixture.detectChanges();
    const button: HTMLButtonElement = de.query(By.css('button')).nativeElement;
    expect(button.textContent).toContain(SIGN_IN_TEXT);
  });

  it('should show logout button, when user is logged in', () => {
    getUserSubject.next(mockUser);
    fixture.detectChanges();
    const button: HTMLButtonElement = de.query(By.css('button')).nativeElement;
    expect(button.textContent).toBe(LOGOUT_TEXT);
  });

  it('should show user\'s display name, when user is logged in', () => {
    getUserSubject.next(mockUser);
    fixture.detectChanges();
    const heading: HTMLHeadingElement = de.query(By.css('h2')).nativeElement;
    expect(heading.innerText).toBe(HELLO_TEXT);
  });

  it('sign in button should call googleLogin()', () => {
    getUserSubject.next(null);
    fixture.detectChanges();
    const button: HTMLButtonElement = de.query(By.css('button')).nativeElement;
    spyOn(component, 'googleLogin');
    button.click();
    expect(component.googleLogin).toHaveBeenCalled();
  });

  it('logout button should call logout()', () => {
    getUserSubject.next(mockUser);
    fixture.detectChanges();
    const button: HTMLButtonElement = de.query(By.css('button')).nativeElement;
    spyOn(component, 'logout');
    button.click();
    expect(component.logout).toHaveBeenCalled();
  });

  it('should change states from logged out to logged in, when login button pressed', () => {
    getUserSubject.next(mockUser);
    fixture.detectChanges();

    let button: HTMLButtonElement = de.query(By.css('button')).nativeElement;
    expect(button.textContent).toBe(LOGOUT_TEXT, 'confirm logged in state');

    button.click();
    fixture.detectChanges();

    button = de.query(By.css('button')).nativeElement;
    expect(button.textContent).toContain(SIGN_IN_TEXT, 'confirm logged out state');
  });

  it('should change states from logged in to logged out, when logout button pressed', () => {
    getUserSubject.next(null);
    fixture.detectChanges();

    let button: HTMLButtonElement = de.query(By.css('button')).nativeElement;
    expect(button.textContent).toContain(SIGN_IN_TEXT, 'confirm logged out state');

    button.click();
    fixture.detectChanges();

    button = de.query(By.css('button')).nativeElement;
    expect(button.textContent).toBe(LOGOUT_TEXT, 'confirm logged in state');
  });
});
