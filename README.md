# The KNESTS Stack
* [KNEx.js](http://knexjs.org/)
* [NEST.js](https://nestjs.com/)
* [NExT.js](https://nextjs.org/)
* [TS](https://www.typescriptlang.org/)

* [GraphQL](https://graphql.org/)
* [Docker](https://www.docker.com/)

The above libraries and frameworks are the best ones (in my opinion, of course) regarding my desires at the moment of starting this project. 

It's just a simple (albeit huge) coincidence that 3 of them sound NEX-ish. It would've been a shame not to name the stack similarly.

I wanted a NodeJS/Typescript based stack that would:
* Help me develop web apps as fast as possible
* With the cool javascript technologies of the moment (the "moment" is 2020 - most probably a small part of 2020): Typescript, React with typescript and hooks, GraphQL, Material-UI.
* While following as much as possible the good ideas from the [NodeJS best practices](https://github.com/goldbergyoni/nodebestpractices).

## About

If interested, read about the [whys and the objectives of the Knests Stack on my blog.](https://programming.tudorconstantin.com/2020/05/the-knests-stack.html)

## How it looks

It contains the [free admin dashboard theme from devias.io](https://react-material-dashboard.devias.io/dashboard).

![Login](/client/public/screenshots/login.png?raw=true "Simple Login with Email" )
![Signup](/client/public/screenshots/signup.png?raw=true "Signup Form")
![Dashboard Big](/client/public/screenshots/dashboard_big.png?raw=true "Big Dashboard")
![Responsive Dashboard](/client/public/screenshots/dashboard_small.png?raw=true "Responsive Dashboard")

## Getting started
* Clone this repo and `cd` into it

Only needed to be run first time: 

```bash
$ docker network create traefik-public
$ docker network create knests-dev
```

```bash
`rm -rf client/dist && docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build -V --force-recreate`
```

Note: The `rm -rf client/dist` part is needed (for now, until we have a better solution) for deleting the files  nextjs generates.

Go to http://localhost:8080/api/migrate to have the latest migrations applied.
Go to http://localhost:8080/signup and create your first user.

## Make it yours

Search and replace `knests` with **your own project name** and you'll have a project with:
* `/signup` page and functionality
* `/login` page and functionality
* `/admin/dashboard` basic page, taken from [devias.io](https://devias.io/products/material-react-dashboard)

### Documentation

There is some [frontend](https://github.com/tudorconstantin/knests/tree/master/client) / [backend](https://github.com/tudorconstantin/knests/tree/master/server) documentation written so you can debug things more thoroughly when they don't go as expected.