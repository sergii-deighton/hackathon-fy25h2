# 🚀 Quick Start Guide

This is a condensed quick start guide for getting the hackathon project running quickly.

## Prerequisites

- Node.js 18+ or 20+ (Node 22 also works)
- Docker Desktop (for containerized development)

## Option 1: Docker (Recommended for Quick Start)

```bash
# Build containers
docker-compose build

# Start both web and mobile dev servers
docker-compose up

# Access applications
# Web SPA: http://localhost:4200
# Mobile App: http://localhost:8100
```

## Option 2: Local Development

```bash
# Install dependencies for all projects
# Note: Use --legacy-peer-deps due to Angular 21 compatibility

# Install shared library dependencies
cd packages/shared
npm install --legacy-peer-deps

# Install Web SPA dependencies
cd ../../apps/web-spa
npm install --legacy-peer-deps

# Install Mobile App dependencies
cd ../mobile-app
npm install --legacy-peer-deps

# Run Web SPA (from apps/web-spa directory)
npm start
# Access at http://localhost:4200

# Run Mobile App (in another terminal, from apps/mobile-app directory)
cd apps/mobile-app
npm start
# Access at http://localhost:8100
```

## Known Issues

### Peer Dependency Warnings

You may see warnings about:
- `@angular/fire` peer dependencies (expects Angular 18, we're using 21)
- `@typescript-eslint/utils` missing peer dependencies
- `@standard-schema/spec` missing

These are **non-blocking warnings** and won't prevent the apps from running. The project uses:
- Angular 21 (latest)
- Ionic with Angular 21
- Compatible versions of all core dependencies


## Troubleshooting

1. **Dependency installation fails**: Make sure to use `--legacy-peer-deps` flag:
   ```bash
   npm install --legacy-peer-deps
   ```

2. **Module not found errors**: Ensure all three projects have dependencies installed:
   ```bash
   cd packages/shared && npm install --legacy-peer-deps
   cd ../../apps/web-spa && npm install --legacy-peer-deps
   cd ../mobile-app && npm install --legacy-peer-deps
   ```

## Next Steps

1. See [README.md](./README.md) for full documentation
2. See [CONTRIBUTING.md](./CONTRIBUTING.md) for development guidelines
3. See [TESTING.md](./TESTING.md) for testing instructions
4. See [DEBUGGING_GUIDE.md](./DEBUGGING_GUIDE.md) for running on simulators/emulators

## Testing the Setup

### Web SPA
```bash
cd apps/web-spa
npm start
```
Visit http://localhost:4200 - you should see the home page UI

### Mobile App
```bash
cd apps/mobile-app
npm start
```
Visit http://localhost:8100 - you should see the Ionic app with tabs
