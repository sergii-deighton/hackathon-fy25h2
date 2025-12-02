# Testing Guide

This document provides comprehensive instructions on how to run and write tests for all projects in this monorepo.

## Table of Contents

- [Overview](#overview)
- [Web SPA Testing](#web-spa-testing)
- [Mobile App Testing](#mobile-app-testing)
- [Shared Library Testing](#shared-library-testing)
- [Writing Tests](#writing-tests)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

## Overview

This monorepo uses **Jest** with **jest-preset-angular** for all projects:

- **Web SPA** (`apps/web-spa`): Jest with Angular preset
- **Mobile App** (`apps/mobile-app`): Jest with Angular preset (supports Ionic)
- **Shared Library** (`packages/shared`): Jest with Angular preset

All test files follow the naming convention `*.spec.ts`.

---

## Web SPA Testing

### Running Tests

```bash
# Navigate to the web-spa directory
cd apps/web-spa

# Run tests once
npm test

# Run tests in watch mode (re-runs on file changes)
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

### Test Configuration

- **Config File**: `jest.config.js`
- **Setup File**: `src/test-setup.ts`
- **Test Framework**: Jest
- **Preset**: jest-preset-angular

### Example Test

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TopBarComponent } from '@hackathon/shared';
import { provideRouter } from '@angular/router';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, TopBarComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

### Adding New Tests

1. Create a file with `.spec.ts` extension next to your component
2. Import necessary testing utilities from `@angular/core/testing`
3. Use `describe`, `it`, `beforeEach` for test structure
4. Use `expect` for assertions

---

## Mobile App Testing

### Running Tests

```bash
# Navigate to the mobile-app directory
cd apps/mobile-app

# Run tests once
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Test Configuration

- **Config File**: `jest.config.js`
- **Setup File**: `src/test-setup.ts`
- **Test Framework**: Jest
- **Preset**: jest-preset-angular

### Example Test

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Tab1Page } from './tab1.page';
import { IonicModule } from '@ionic/angular';

describe('Tab1Page', () => {
  let component: Tab1Page;
  let fixture: ComponentFixture<Tab1Page>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Tab1Page, IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Tab1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

### Adding New Tests

1. Create a file with `.spec.ts` extension next to your page/component
2. Import `IonicModule` for Ionic components
3. Import shared library components as needed
4. Configure TestBed with all required imports

---

## Shared Library Testing

### Running Tests

```bash
# Navigate to the shared library directory
cd packages/shared

# Run tests once
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Test Configuration

- **Config File**: `jest.config.js`
- **Setup File**: `src/test-setup.ts`
- **Test Framework**: Jest
- **Preset**: jest-preset-angular

### Example Test

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TopBarComponent } from './top-bar.component';

describe('TopBarComponent', () => {
  let component: TopBarComponent;
  let fixture: ComponentFixture<TopBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopBarComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TopBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should accept title input', () => {
    component.title = 'Test Title';
    fixture.detectChanges();
    expect(component.title).toBe('Test Title');
  });
});
```

### Adding New Tests

1. Create `.spec.ts` file next to your component/service
2. Keep tests focused on the shared library functionality
3. Don't test consuming applications here

---

## Writing Tests

### Test Structure

All tests follow the AAA pattern:

- **Arrange**: Set up test data and dependencies
- **Act**: Execute the code being tested
- **Assert**: Verify the results

```typescript
it('should do something', () => {
  // Arrange
  const input = 'test';
  
  // Act
  const result = component.doSomething(input);
  
  // Assert
  expect(result).toBe('expected');
});
```

### Common Test Patterns

#### Testing Component Creation

```typescript
it('should create', () => {
  expect(component).toBeTruthy();
});
```

#### Testing Component Properties

```typescript
it('should have correct property value', () => {
  expect(component.title).toBe('Expected Value');
});
```

#### Testing Template Rendering

```typescript
it('should render element', () => {
  const compiled = fixture.nativeElement as HTMLElement;
  const element = compiled.querySelector('.my-class');
  expect(element).toBeTruthy();
  expect(element?.textContent).toContain('Expected Text');
});
```

#### Testing User Interactions

```typescript
it('should handle click event', () => {
  const button = fixture.nativeElement.querySelector('button');
  button.click();
  fixture.detectChanges();
  
  expect(component.wasClicked).toBe(true);
});
```

#### Testing Inputs

```typescript
it('should accept input', () => {
  component.myInput = 'test value';
  fixture.detectChanges();
  
  expect(component.myInput).toBe('test value');
});
```

#### Testing Outputs

```typescript
it('should emit event', (done) => {
  component.myOutput.subscribe((value: string) => {
    expect(value).toBe('emitted value');
    done();
  });
  
  component.triggerOutput();
});
```

#### Testing Services

```typescript
describe('MyService', () => {
  let service: MyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyService]
    });
    service = TestBed.inject(MyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return data', () => {
    const result = service.getData();
    expect(result).toEqual(expectedData);
  });
});
```

#### Mocking Dependencies

```typescript
const mockService = {
  getData: jest.fn().mockReturnValue({ data: 'mock' })
};

beforeEach(async () => {
  await TestBed.configureTestingModule({
    imports: [MyComponent],
    providers: [
      { provide: MyService, useValue: mockService }
    ]
  }).compileComponents();
});
```

#### Using Jest Spies

```typescript
it('should call service method', () => {
  const spy = jest.spyOn(service, 'getData');
  component.loadData();
  expect(spy).toHaveBeenCalled();
});
```

---

## Best Practices

### 1. Test Naming

- Use descriptive test names that explain what is being tested
- Start with "should" for clarity
- Be specific about the expected behavior

```typescript
// Good
it('should display error message when form is invalid', () => {});

// Bad
it('test form', () => {});
```

### 2. Test Independence

- Each test should be independent and not rely on other tests
- Use `beforeEach` to set up fresh state for each test
- Clean up after tests if needed using `afterEach`

### 3. Test Coverage

- Aim for high coverage but focus on meaningful tests
- Test edge cases and error conditions
- Don't just test for 100% coverage

### 4. Keep Tests Simple

- One assertion per test when possible
- Avoid complex logic in tests
- Make tests easy to understand and maintain

### 5. Use Test Doubles

- Mock external dependencies with `jest.fn()`
- Use spies to verify function calls with `jest.spyOn()`
- Stub data for predictable tests

### 6. Async Testing

For async operations, use `async/await`:

```typescript
it('should load data', async () => {
  const data = await component.loadData();
  expect(data).toBeDefined();
});
```

### 7. Testing Shared Library Components

When testing components that use shared library:

```typescript
import { TopBarComponent } from '@hackathon/shared';

await TestBed.configureTestingModule({
  imports: [MyComponent, TopBarComponent]
}).compileComponents();
```

---

## Troubleshooting

### Common Issues

#### Issue: "Cannot find module '@hackathon/shared'"

**Solution**: Ensure paths are configured in `jest.config.js`:

```javascript
moduleNameMapper: {
  '@hackathon/shared': '<rootDir>/../../packages/shared/src/public-api.ts',
}
```

#### Issue: "Jest encountered an unexpected token"

**Solution**: Ensure `transform` is properly configured in `jest.config.js`:

```javascript
transform: {
  '^.+\\.(ts|js|html)$': [
    'jest-preset-angular',
    {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.(html|svg)$',
    },
  ],
}
```

#### Issue: Tests fail with "Cannot find name 'describe'"

**Solution**: Ensure Jest types are in `tsconfig.spec.json`:

```json
{
  "compilerOptions": {
    "types": ["jest", "node"]
  }
}
```

#### Issue: "Module not found" errors in tests

**Solution**: Install dependencies:

```bash
# For web-spa
cd apps/web-spa
npm install

# For mobile-app
cd apps/mobile-app
npm install

# For shared library
cd packages/shared
npm install
```

#### Issue: Angular component tests fail

**Solution**: Ensure `jest-preset-angular/setup-jest` is imported in test setup:

```typescript
// src/test-setup.ts
import 'jest-preset-angular/setup-jest';
```

---

## Coverage Reports

### Viewing Coverage

After running tests with coverage, reports are generated in:

- **Web SPA**: `apps/web-spa/coverage/`
- **Mobile App**: `apps/mobile-app/coverage/`
- **Shared Library**: `packages/shared/coverage/`

Open `coverage/lcov-report/index.html` in a browser to view detailed coverage reports.

### Coverage Thresholds

Consider setting coverage thresholds in your Jest configuration:

```javascript
// jest.config.js
coverageThreshold: {
  global: {
    branches: 80,
    functions: 80,
    lines: 80,
    statements: 80
  }
}
```

---

## Continuous Integration

### Running All Tests

To run all tests across all projects:

```bash
# From the root directory
cd apps/web-spa && npm test && cd ../..
cd apps/mobile-app && npm test && cd ../..
cd packages/shared && npm test && cd ../..
```

### CI Configuration Example

```yaml
# .github/workflows/test.yml
name: Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '20'
      
      - name: Install dependencies
        run: |
          cd apps/web-spa && npm install
          cd ../mobile-app && npm install
          cd ../../packages/shared && npm install
      
      - name: Run tests
        run: |
          cd apps/web-spa && npm test
          cd ../mobile-app && npm test
          cd ../../packages/shared && npm test
```

---

## Jest-Specific Features

### Snapshot Testing

Jest supports snapshot testing for components:

```typescript
it('should match snapshot', () => {
  expect(fixture).toMatchSnapshot();
});
```

### Test Filtering

Run specific tests:

```bash
# Run tests matching a pattern
npm test -- --testNamePattern="should create"

# Run tests in a specific file
npm test -- app.component.spec.ts
```

### Debugging Tests

```bash
# Run tests in debug mode
node --inspect-brk node_modules/.bin/jest --runInBand
```

---

## Summary

- **All Projects**: Use `npm test` with Jest
- **Web SPA**: `cd apps/web-spa && npm test`
- **Mobile App**: `cd apps/mobile-app && npm test`
- **Shared Library**: `cd packages/shared && npm test`
- All test files use `.spec.ts` extension
- Follow AAA pattern for test structure
- Use Jest mocks and spies for dependencies
- Keep tests simple, independent, and meaningful
- Use coverage reports to identify untested code

For more information on testing Angular applications with Jest, see:
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [jest-preset-angular](https://thymikee.github.io/jest-preset-angular/)
- [Angular Testing Guide](https://angular.dev/guide/testing)
