# Use a lightweight Node.js image for smaller build size
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package files first to take advantage of Docker caching
COPY package*.json ./

# Install all project dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the port where the app will run
EXPOSE 8080

# Start the development server
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]