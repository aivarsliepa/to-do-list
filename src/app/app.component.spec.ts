import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';

import { WelcomeComponent } from './components/welcome/welcome.component';
import { ToDoListComponent } from './components/to-do-list/to-do-list.component';

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent,
                WelcomeComponent,
                ToDoListComponent
            ]
        }).compileComponents();
    }));
    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));
    it('should fail travis build', () => {
        expect(1).toBe(2);
    });
});
