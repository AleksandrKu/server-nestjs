
## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
# Create database postgresql


To provide credentials used by our Docker containers, we need to create the docker.env file
POSTGRES_USER=admin
POSTGRES_PASSWORD=admin
POSTGRES_DB=nestjs
PGADMIN_DEFAULT_EMAIL=admin@admin.com
PGADMIN_DEFAULT_PASSWORD=admin

## Start the containers:

$ docker-compose up
```bash
http://localhost:8080/   - pgAdmin
```

If you use wsl2 on Windows to connect pgAdmin to PostgreSQL, then use this command:
$ grep nameserver /etc/resolv.conf | awk '{print $2}' 
to find IP( instead of 127.0.0.1)

## Running front
```bash
$ npm run start:front
```
Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Running server
```bash
$ npm start
```
Navigate to `http://localhost:3000/`

API:
/ping    - health check API endpoint which will return:{ “statusCode”: 200, “message”: “OK”, time: “{serverTime}*” }

c. Create the following REST API endpoints:
GET /api/quotes   - returns a list of all available quotes.
GET /api/quotes/random - returns a random quote from the list.
GET /api/quotes/random?tag={tag} - returns a random quote which has appropriate {tag} from query string 
POST /api/quotes - creates a new quote.
GET /api/quotes/:id - returns a quote with specified id if exist, otherwise return 404 response.
PUT /api/quotes/:id - updates a quote with specified id if exist, otherwise returns 404 response.
DELETE /api/quotes/:id - deletes a quote with specified id if exist, otherwise returns 404 response

Database table:
interface Quote {
id?: string; // Unique identifier of quote.
author: string; // Author of a quote.
text: string; // Quote text.
source?: string; // optional link/source of quote.
tags?: string[]; // optional list of tags related to quote.
createdBy?: string; // app’s user who initiate creation of quote.
createdAt?: string|Date; // timestamp of quote creation.
updatedAt?: string|Date; // timestamp of quote update.
isDeleted: boolean; // status of deletion (soft delete).
}
