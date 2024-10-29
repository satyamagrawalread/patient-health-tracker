FROM node:20

# Set the working directory for the backend
WORKDIR /app

# First, copy the backend directory
COPY tracker-backend ./tracker-backend

# Move to the backend directory
WORKDIR /app/tracker-backend

# Install pnpm globally
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install --shamefully-hoist

# Expose the port
EXPOSE 7860

# Debug: List files to verify structure
RUN ls -la

# Start the application
CMD ["node", "index.js"]