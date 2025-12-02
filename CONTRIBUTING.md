# Contributing to Hackathon Project

Thank you for participating in this hackathon! This guide will help you understand the development workflow and best practices.

## 🔄 Development Workflow

### 1. Making Changes

```bash
# Create a feature branch
git checkout -b feature/your-feature-name

# Make your changes
# ...

# Test your changes
npm test

# Commit with descriptive messages
git commit -m "feat: add token storage"
```

### 2. Working with Dependencies

```bash
# Install/update dependencies (use --legacy-peer-deps for Angular 21)
cd packages/shared
npm install --legacy-peer-deps

cd ../../apps/web-spa
npm install --legacy-peer-deps

cd ../mobile-app
npm install --legacy-peer-deps

# Build specific project
cd apps/web-spa
npm run build
```

### 3. Adding Dependencies

```bash
# Navigate to the specific package
cd apps/web-spa

# Add dependency (use --legacy-peer-deps)
npm install --legacy-peer-deps package-name --save
```

## 📝 Code Style Guidelines

### TypeScript

- Use **strict mode** TypeScript
- Define interfaces for all data structures
- Use meaningful variable and function names
- Add JSDoc comments for public APIs

### Angular Components

- Use **standalone components**
- Keep components focused and single-purpose
- Use OnPush change detection when possible
- Follow Angular style guide

```typescript
@Component({
  selector: 'app-to-do-item',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `...`,
  styles: [`...`]
})
export class ToDoItemComponent {
  // Component logic
}
```

### File Organization

```
src/
├── app/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Route components
│   ├── services/       # Business logic services
│   ├── models/         # TypeScript interfaces/types
│   └── utils/          # Helper functions
```

## 🧪 Testing Requirements

### Unit Tests

- Write tests for all services
- Test component logic
- Aim for >80% code coverage

```typescript
describe('Service', () => {
  it('should request permission', async () => {
    const service = new Service();
    const token = await service.requestPermission();
    expect(token).toBeDefined();
  });
});
```

### Integration Tests

- Test flow
- Test storage
- Test UI interactions

## 🔍 Code Review Checklist

Before submitting your work:

- [ ] Code follows style guidelines
- [ ] All tests pass
- [ ] No console errors
- [ ] TypeScript compiles without errors
- [ ] Documentation is updated
- [ ] No sensitive data (API keys) in code
- [ ] Error handling is implemented
- [ ] Code is properly formatted

## 🐛 Debugging Tips

### Web App

```bash
# Run with source maps
npm start

# Check service worker
# Chrome DevTools > Application > Service Workers
```

### Mobile App

```bash
# iOS logs
npx cap run ios --livereload

# Android logs
npx cap run android --livereload
adb logcat
```

## 🚀 Deployment

### Web App

```bash
cd apps/web-spa
npm run build
# Deploy dist/ folder to your hosting service
```

### Mobile App

```bash
cd apps/mobile-app
npm run build
npx cap sync

# iOS
npx cap open ios
# Archive and upload to App Store Connect

# Android
npx cap open android
# Build > Generate Signed Bundle/APK
```

## 📚 Resources

- [Angular Style Guide](https://angular.dev/style-guide)
- [TypeScript Best Practices](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)
- [Conventional Commits](https://www.conventionalcommits.org/)

## 💬 Getting Help

If you run into issues:

1. Check the [README.md](./README.md) troubleshooting section
2. Review [TESTING.md](./TESTING.md) for testing issues
3. Review [DEBUGGING_GUIDE.md](./DEBUGGING_GUIDE.md) for mobile debugging
4. Check the official documentation for [Angular](https://angular.dev), [Ionic](https://ionicframework.com/docs), and [Capacitor](https://capacitorjs.com/docs)

## 🎯 Best Practices

### Security

- Never commit config with real credentials
- Use environment variables for sensitive data
- Validate all user inputs
- Sanitize content

### Performance

- Lazy load routes when possible
- Use OnPush change detection
- Minimize bundle size
- Optimize images and assets

### Accessibility

- Use semantic HTML
- Add ARIA labels where needed
- Ensure keyboard navigation works
- Test with screen readers

Happy coding! 🚀
