# Use a minimal base image
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy only package.json and package-lock.json to leverage caching
COPY package.json ./

# Install dependencies
RUN npm i 

# Copy the rest of the application files (excluding node_modules)
COPY . .

# Set the command to start the application
CMD ["npm", "run", "dev"]
