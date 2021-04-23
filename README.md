
## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.


## Create database postgresql and pgAdmin
To provide credentials used by our Docker containers, we need to create the `docker.env`:
```bash
POSTGRES_USER=admin
POSTGRES_PASSWORD=123
POSTGRES_DB=nestjs
PGADMIN_DEFAULT_EMAIL=admin@admin.com
PGADMIN_DEFAULT_PASSWORD=admin
```
If you use wsl2 on Windows for connecting pgAdmin to PostgreSQL, instead using 'localhost' use IP from command:
```bash
$ grep nameserver /etc/resolv.conf | awk '{print $2}' 
```
### Start containers:
```bash
$ docker-compose up
```
http://localhost:8080/   - pgAdmin


## Installation
### Backend dependencies
```bash
$ npm install 
```

### Frontend dependencies
```bash    
$ cd client
$ npm install
```

## Running the app
### Running server
```bash
$ npm start
http://localhost:3000
```

### Running front
```bash
$ cd client
$ npm start
or
$ npm run start:front
http://localhost:4200
```

## Fill database with data
The base quotes from `quotesy` npm module stored in file /src/quotes/database/quotes-base.json. To upload the database from this file, run the endpoint `http://localhost:3000/api/quotes/create-db`

### REST API endpoints:
```bash
GET `/ping`    - health check API endpoint which will return:{ “statusCode”: 200, “message”: “OK”, time: “{serverTime}” }
GET `/api/quotes`   - returns a list of all available quotes.
GET `/api/quotes/random` - returns a random quote from the list.
GET `/api/quotes/random?tag={tag}` - returns a random quote which has appropriate {tag} from query string 
POST `/api/quotes` - creates a new quote.
GET `/api/quotes/:id` - returns a quote with specified id if exist, otherwise return 404 response.
PUT `/api/quotes/:id` - updates a quote with specified id if exist, otherwise returns 404 response.
DELETE `/api/quotes/:id` - deletes a quote with specified id if exist, otherwise returns 404 response
```
### Database table:
```bash
{
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
```