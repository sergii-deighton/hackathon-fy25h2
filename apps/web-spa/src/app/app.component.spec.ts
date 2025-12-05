import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { BaseLayoutComponent } from '@hackathon/shared';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AppComponent, BaseLayoutComponent],
            providers: [provideAnimations()]
        }).compileComponents();

        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the app component', () => {
        expect(component).toBeTruthy();
    });

    it('should have title property', () => {
        expect(component.title).toBe('web-spa');
    });

    it('should render base layout', () => {
        const compiled = fixture.nativeElement as HTMLElement;
        const layout = compiled.querySelector('lib-base-layout');
        expect(layout).toBeTruthy();
    });

    it('should render message control panel', () => {
        const compiled = fixture.nativeElement as HTMLElement;
        const panelTitle = compiled.querySelector('mat-card-title');
        expect(panelTitle?.textContent).toContain('Message Control');
    });
});
