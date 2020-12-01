# Express BoilerPlate

A Boilerplate for Express.js. It has basicly endpoint to CRUD and authentication with JSON Web Token.
You can use a RESTful API to easy. This boilerplate made by clean archtecture.

- RESTful API for CRUD on PostgreSQL and MongoDB
- Authentication with JWT and Redis

### Install & build server
```
$ cp .env.sample .env
$ cd infrastructure/docker
$ docker-compose up -d
$ cd ../../
$ yarn add
$ yarn start:dev
```

You already install, please access to `http://localhost:5000` or `http://localhost:5000/api` on your browser then, if you wanna api request, use developer tool.
In my opnion, I'll recommend using [postman](https://www.getpostman.com/).  
In addition, it has GraphQL endpoint, you can access playground at `http://localhost:5000/graphql`.

## Requirement
Docker

## LICESE
[MIT](https://github.com/Restoration/Express-Boilerplate/blob/master/LICENSE)

## Author  
[RyotArch](https://www.developer-ryota.com) 
