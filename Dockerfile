# First stage: Build the frontend application
FROM node:14-alpine as builder
WORKDIR /app
COPY package.json ./
RUN npm install 
COPY . .
RUN npm run build

# Second stage: Serve the application using Nginx
FROM nginx:1.23-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/build .
ENTRYPOINT ["nginx", "-g", "daemon off;"]
