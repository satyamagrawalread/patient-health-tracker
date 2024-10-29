FROM node:20

# Set the working directory
WORKDIR /app

# Copy package.json and pnpm-lock.yaml from tracker-backend folder
COPY tracker-backend/package.json ./tracker-backend/
COPY tracker-backend/pnpm-lock.yaml ./tracker-backend/

# Install pnpm globally
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install --prefix ./tracker-backend

# Copy the rest of your application code
COPY tracker-backend/ .

# Expose the port your app runs on
EXPOSE 7860

# Start the application
CMD ["nodemon", "start"]
