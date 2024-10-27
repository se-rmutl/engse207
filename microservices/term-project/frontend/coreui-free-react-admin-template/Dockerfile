
# Use the official Node.js runtime as the base image
FROM node:18 as build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install --force

# Copy the entire application code to the container
COPY . .

# Build the React app for production
RUN npm run build

# Use Nginx as the production server
FROM nginx:alpine

# Copy nginx.conf file for Term project
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./nginx/certs/nginx.crt /usr/nginx/nginx.crt
COPY ./nginx/certs/nginx.key /usr/nginx/nginx.key

# Copy the built React app to Nginx's web server directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 for the Nginx server
EXPOSE 443:443

# Start Nginx when the container runs
CMD ["nginx", "-g", "daemon off;"]