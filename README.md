# WARN
Please beware that in order to use it for your projects right now you'd have to be quite comfortable with the nodejs ecosystem because the whole stack is not quite tidied up.

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

There is some [frontend](/knests/tree/master/client) / [backend](https://github.com/tudorconstantin/knests/tree/master/server) documentation written so you can debug things more thoroughly when they don't go as expected.