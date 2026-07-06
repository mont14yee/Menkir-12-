# Stage 1: Build the React application
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies (using npm ci for a cleaner install if possible, else npm install)
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the application for production
RUN npm run build

# Stage 2: Serve the application with NGINX
FROM nginx:alpine

# Set default port for Cloud Run (Cloud Run sets the PORT env var)
ENV PORT=8080

# Remove default NGINX configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy the NGINX configuration template
# NGINX image automatically substitutes variables in .template files using envsubst
COPY nginx.conf.template /etc/nginx/templates/default.conf.template

# Copy the compiled static assets from the build stage to NGINX's serve directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the configured port
EXPOSE $PORT

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
