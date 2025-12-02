import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TopBarComponent } from '@hackathon/shared';
import { RouterOutlet } from '@angular/router';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AppComponent, TopBarComponent, RouterOutlet],
            providers: [provideRouter(routes)]
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

    it('should render top-bar component', () => {
        const compiled = fixture.nativeElement as HTMLElement;
        const topBar = compiled.querySelector('lib-top-bar');
        expect(topBar).toBeTruthy();
    });

    it('should render welcome banner', () => {
        const compiled = fixture.nativeElement as HTMLElement;
        const banner = compiled.querySelector('.welcome-banner');
        expect(banner).toBeTruthy();
        expect(banner?.textContent).toContain('Welcome to the Hackathon!');
    });

    it('should have router outlet', () => {
        const compiled = fixture.nativeElement as HTMLElement;
        const routerOutlet = compiled.querySelector('router-outlet');
        expect(routerOutlet).toBeTruthy();
    });
});
