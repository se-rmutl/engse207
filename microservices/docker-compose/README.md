## Basic docker-compose command

**Change directory to docker-compose folder**

build image from all services
```
docker compose build
or
docker-compose build
```

run all container from all services
```
docker compose up -d
or
docker-compose up -d
```

down all container
```
docker compose down
or
docker-compose down
```

## Use docker-compose with custom image (Dockerfile)

create docker-compose.yml or docker-compose.yaml
```
services:
  web:
    image: <your_docker_username>/demo:4.0
    build:
      context: ./nginx
      dockerfile: Dockerfile
    container_name: nginx-demo
    ports:
      - 7777:80
```

run service web
```
docker compose up web -d
or
docker-compose up web -d
```

## Use docker-compose build PostgresDB (No Dockerfile)

in docker-compose after web service
```
  db:
    image: postgres:16.0
    container_name: postgres
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: postgres
    volumes:
      - ./postgres/table.sql:/docker-entrypoint-initdb.d/1.sql
      - ./postgres/data.sql:/docker-entrypoint-initdb.d/2.sql
```

run service db
```
docker compose up db -d
or
docker-compose up db -d
```

go insite postgres container
```
docker container exec -it postgres bash
psql -d postgres -U postgres
```

Change database
```
\c postgres
```

Show all tables
```
\dt
```

Get all data from table merchants
```
select * from merchants;
```

Quit
```
\q
```

## Workshop create Docker container Nginx with No Dockerfile

## Create backend (NodeJs) connect to PostgresDB

**Start db service before start backend**

in backend folder create Dockerfile
```
FROM node:21-alpine3.17 as build01
WORKDIR /app
COPY package*.json .
RUN npm i  
COPY . .
EXPOSE 3000
CMD [ "npm", "start" ]
```

in docker-compose after db service
```
  backend:
    image: backend:1.0
    container_name: backend
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      DB_HOST: db
      DB_NAME: postgres
      DB_USER: postgres
      DB_PASSWORD: postgres
```

run service backend
```
docker compose up backend -d
or
docker-compose up backend -d
```

use REST API below to request backend service
```
GET Method
http://localhost:3000
or
http://127.0.0.1:3000
```

use REST API below to request backend service
```
POST Method
http://localhost:3000/merchants
or
http://127.0.0.1:3000/merchants

//body
{
    "name": "your name",
    "email": "email@email.com"
}
```

## Create frontend (VueJs) connect to backend

**Start db and backend services before start frontend**

in frontend folder create Dockerfile
```
FROM node:21-alpine3.17 as build01
WORKDIR /app
COPY package*.json .
RUN npm i  
COPY . .
RUN npm run build

FROM nginx:1.21.3-alpine
COPY nginx_reverse.conf /etc/nginx/conf.d/default.conf
COPY --from=build01 /app/dist /usr/share/nginx/html
EXPOSE 80
```

in docker-compose after backend service
```
  frontend:
    image: frontend:1.0
    container_name: frontend
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "8888:80"
```

run service frontend
```
docker compose up frontend -d
or
docker-compose up frontend -d
```

Go to frontend web view
```
http://localhost:8888
or
http://127.0.0.1:8888
```

## Use depends_on and healthcheck

in serveice db
```
    healthcheck:
      test: ["CMD-SHELL", "pg_isready", "-d", "postgres"]
      interval: 5s
      timeout: 5s
      retries: 5
      start_period: 5s
```

run service db
```
docker compose up db -d
or
docker-compose up db -d
```

in serveice backend
```
    healthcheck:
      test: wget --no-verbose --tries=1 --spider http://localhost:3000 || exit 1
      interval: 5s
      timeout: 5s
      retries: 5
      start_period: 5s
    depends_on:
      db:
        condition: service_healthy
```

run service backend
```
docker compose up backend -d
or
docker-compose up backend -d
```

in serveice fronend
```
    depends_on:
      backend:
        condition: service_healthy
```

run service frontend
```
docker compose up frontend -d
or
docker-compose up frontend -d
```

## Created End to End APIs test (Postman)

Open Postman -> Create Postman collection -> write test source code -> import to backend-testing folder

in backend-testing folder craete Dockerfile
```
FROM node:alpine
RUN npm install -g newman newman-reporter-htmlextra
WORKDIR /etc/newman
COPY  . .
CMD [ "newman", "run", "<your_postman_collection_name>.postman_collection.json", "-r", "htmlextra,cli,junit" ]
```

in docker-compose add backend-test service
```
  backend-test:
    build: ./backend-testing
    container_name: backend-test
    volumes:
      - ./backend-test-report:/etc/newman/newman
```

run service backend-test
```
docker compose up backend-test
or
docker-compose up backend-test
```

## Created ui test (Playwright)

in playwright folder craete Dockerfile
```
FROM mcr.microsoft.com/playwright:v1.42.1-jammy
WORKDIR /app
COPY . .
RUN npm install
RUN npx playwright install
CMD [ "npx", "playwright", "test" ]
```

in docker-compose add frontend-test service
```
  frontend-test:
    build: ./playwright
    container_name: frontend-test
    volumes:
      - ./playwright/report:/app/report
```

run service frontend-test
```
docker compose up frontend-test
or
docker-compose up frontend-test
```

## Create Mountebank mock REST APIs

in docker-compose add mock-api service
```
  mock-api:
    image: mock-api:latest
    container_name: mock-api
    build:
      context: ./mountebank
      dockerfile: ./Dockerfile
    volumes:
      - ./mountebank/imposters:/imposters
    ports:
      - 2525:2525
      - 8090:8090
      - 8091:8091
      - 4000:4000
    command: --configfile /imposters/imposters.ejs --allowInjection
```

run service mock-api
```
docker compose up mock-api -d
or
docker-compose up mock-api -d
```