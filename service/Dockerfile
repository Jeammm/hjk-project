# Stage 1: Build the application
FROM node:14 AS build

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy the rest of the application source code to the container
COPY backend/ ./

# Stage 2: Create the production image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the built application from the previous stage
COPY --from=build /usr/src/app ./

# Expose port 8000 for the backend service
EXPOSE 8000

# Start the backend service
CMD [ "npm", "start" ]