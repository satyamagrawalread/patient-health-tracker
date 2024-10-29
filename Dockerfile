FROM node:20-alpine

# Set the working directory
WORKDIR /app/tracker-backend

# Copy package.json and pnpm-lock.yaml to the working directory
COPY tracker-backend/package.json ./
COPY tracker-backend/pnpm-lock.yaml ./

# Install pnpm globally
RUN npm install -g pnpm

# Install dependencies (this will also install nodemon)
RUN pnpm install --shamefully-hoist
# RUN pnpm install

# Copy the rest of your application code
COPY tracker-backend/. ./

# Expose the port your app runs on
EXPOSE 8080

# Start the application using nodemon
CMD ["node", "index.js"]  # Change 'index.js' to your entry file
