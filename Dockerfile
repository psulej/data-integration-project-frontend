# Node.js image as the base
FROM node:latest

# Working directory inside the container
WORKDIR /app

# Copy the React application files
COPY . .

# Install dependencies
RUN npm install

# Build the React application
RUN npm run build

# React application is listening on 3000
EXPOSE 3000

# command to run the React application
CMD ["npm", "start"]