import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationFormComponent, NewNotificationPayload } from './notification-form.component';
import { NotificationType } from '../../types';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { jest } from '@jest/globals';

describe('notification-form', () => {
    let fixture: ComponentFixture<NotificationFormComponent>;
    let component: NotificationFormComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule, FormsModule],
            declarations: [NotificationFormComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(NotificationFormComponent);
        component = fixture.componentInstance;
    });

    describe('onSubmit()', () => {
        test('should emit payload and reset fields when title and body are valid', () => {
            component.title = 'Test Title';
            component.body = 'Test Body';
            component.type = 'warning';
            component.source = 'UnitTest';
            component.link = 'https://example.com';

            const emitSpy: jest.SpyInstance<void, [NewNotificationPayload]> = jest.spyOn(component.submitNotification, 'emit');

            component.onSubmit();

            expect(emitSpy).toHaveBeenCalledTimes(1);
            expect(emitSpy).toHaveBeenCalledWith({
                title: 'Test Title',
                body: 'Test Body',
                type: 'warning',
                source: 'UnitTest',
                link: 'https://example.com',
            });

            // fields reset
            expect(component.title).toBe('');
            expect(component.body).toBe('');
            expect(component.link).toBe('');
            expect(component.type).toBe(component.defaultType);
        });

        test('should set statusType and statusMessage when title is empty', () => {
            component.title = '   ';
            component.body = 'Test Body';

            const emitSpy: jest.SpyInstance<void, [NewNotificationPayload]> = jest.spyOn(component.submitNotification, 'emit');

            component.onSubmit();

            expect(emitSpy).toHaveBeenCalledTimes(0);
            expect(component.statusType).toBe('error');
            expect(component.statusMessage).toBe('Please add a title and body.');
        });

        test('should set statusType and statusMessage when body is empty', () => {
            component.title = 'Test Title';
            component.body = '   ';

            const emitSpy: jest.SpyInstance<void, [NewNotificationPayload]> = jest.spyOn(component.submitNotification, 'emit');

            component.onSubmit();

            expect(emitSpy).toHaveBeenCalledTimes(0);
            expect(component.statusType).toBe('error');
            expect(component.statusMessage).toBe('Please add a title and body.');
        });

        test('should default source and link if they are empty', () => {
            component.title = 'Title';
            component.body = 'Body';
            component.source = '   ';
            component.link = '   ';

            const emitSpy: jest.SpyInstance<void, [NewNotificationPayload]> = jest.spyOn(component.submitNotification, 'emit');

            component.onSubmit();

            expect(emitSpy).toHaveBeenCalledTimes(1);
            expect(emitSpy).toHaveBeenCalledWith({
                title: 'Title',
                body: 'Body',
                type: component.defaultType,
                source: 'Demo',
                link: undefined,
            });
        });
    });

    describe('defaultType input', () => {
        test('should initialize type with defaultType', () => {
            component.defaultType = 'error';
            component.type = component.defaultType;
            expect(component.type).toBe('error');
        });
    });

    describe('statusType and statusMessage inputs', () => {
        test('should allow setting initial statusType and statusMessage', () => {
            component.statusType = 'success';
            component.statusMessage = 'Completed';
            expect(component.statusType).toBe('success');
            expect(component.statusMessage).toBe('Completed');
        });
    });
});
