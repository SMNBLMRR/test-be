FROM node:lts-alpine AS build

WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./

RUN npm install --omit=dev --force

# Copy the application code and Prisma schema
COPY dist/apps/api api/
COPY prisma prisma/

# Generate Prisma client
RUN npx prisma generate

# Set up a production stage
FROM node:lts-alpine

WORKDIR /app

# Add a non-root user for security
RUN addgroup -S api && adduser -S api -G api

# Copy the built application from the previous stage
COPY --from=build /app /app

# Change ownership of the files
RUN chown -R api:api /app

# Switch to the non-root user
USER api

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["node", "api"]
