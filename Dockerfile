# Stage 1: Build the React application
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies (using npm ci for a cleaner install if possible, else npm install)
RUN npm ci

# Copy the rest of the application source code
COPY . .

# Build the application for production
RUN npm run build

# Stage 2: Serve the application with Node.js
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Set Node environment to production
ENV NODE_ENV=production
ENV PORT=3000

# Copy package.json and package-lock.json
COPY package*.json ./

# Install production dependencies
RUN npm ci --omit=dev

# Copy the compiled static assets and server bundle from the build stage
COPY --from=build /app/dist ./dist

# Expose the configured port
EXPOSE $PORT

# Start Node server
CMD ["node", "dist/server.cjs"]
