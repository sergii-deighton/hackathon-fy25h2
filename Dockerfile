# Multi-stage Dockerfile for Hackathon Development Environment
# This Dockerfile is optimized for DEVELOPMENT ONLY

FROM node:20-alpine AS base

# Set working directory
WORKDIR /workspace

# Install Angular CLI and Ionic CLI globally
RUN npm install -g @angular/cli@21 @ionic/cli --legacy-peer-deps

# Copy package files
COPY apps/web-spa/package.json apps/web-spa/package.json
COPY apps/mobile-app/package.json apps/mobile-app/package.json
COPY packages/shared/package.json packages/shared/package.json

# Install dependencies for each project
WORKDIR /workspace/packages/shared
RUN npm install --legacy-peer-deps

WORKDIR /workspace/apps/web-spa
RUN npm install --legacy-peer-deps

WORKDIR /workspace/apps/mobile-app
RUN npm install --legacy-peer-deps

# Reset working directory
WORKDIR /workspace

# Expose ports
# 4200 - Angular web-spa dev server
# 8100 - Ionic mobile-app dev server
EXPOSE 4200 8100

# Default command
CMD ["sh", "-c", "echo 'Development container ready. Use docker-compose to start services.'"]
