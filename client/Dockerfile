# Build stage
FROM node:18-alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

# Set REACT_APP_API to empty string so it uses relative paths,
# which allows Nginx to handle routing to the backend.
ENV REACT_APP_API=""

RUN npm run build

# Production stage
FROM nginx:stable-alpine

# Copy build assets to Nginx html folder
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Copy Nginx template configuration
COPY nginx.conf.template /etc/nginx/templates/default.conf.template

# Default values for Nginx template variables (can be overridden at runtime)
ENV PORT=80
ENV BACKEND_URL=http://backend:5000

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
