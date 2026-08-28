# Use a lightweight Node.js runtime
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package files first to leverage caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose frontend port
EXPOSE 3000

# Start frontend development server
CMD ["npm", "start"]
