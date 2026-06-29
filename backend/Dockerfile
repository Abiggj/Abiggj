FROM node:18-alpine

# Install build dependencies for sharp/canvas (if needed)
RUN apk add --no-cache python3 make g++ gcc

WORKDIR /usr/src/app

COPY package*.json ./

# Install dependencies (including production and dev dependencies if needed, or just standard dependencies)
# Note: npm install is fine here as it installs what is in package.json.
RUN npm ci --only=production

COPY . .

# Ensure the uploads directory exists
RUN mkdir -p public/uploads

EXPOSE 5000

CMD ["npm", "start"]
