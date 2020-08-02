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

![ "Simple Login with Email"](../client/public/screenshots/login.png)
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


## Debugging tips & tricks

* You can run just a service from the stack (for example if you want to connect to DB from some external GUI client), you can do it like this: `rm -rf client/dist/ && docker-compose -f docker-compose.yml -f docker-compose.dev.yml run  --service-ports postgres` - make sure you expose the service ports to the host using the [ports directive](https://docs.docker.com/compose/compose-file/#ports)

## Docker & docker-compose cheatsheet

### Docker image re-building from scratch
There are moments in the dev/test flow when the docker images need to be rebuilt (after installing new packages for example). AAdding the `--build` parameter to the docker-compose command will usually be enough. For example:

`rm -rf client/dist/ && time docker-compose -f docker-compose.yml -f docker-compose.test.yml up --build --abort-on-container-exit --renew-anon-volumes --force-recreate`

When that's not enough, try one of the things below.

### Docker caching
Docker can be surprising at caching stuff. Caching anonymous volumes was totally unexpected for me. 

Read the docs of all the commands that you intend to run on your systems, because these **can and will have side effects** on your systems!

Here are some commands that clear all kind of caches:

* `docker system prune` - this might take a while, because it says it clears everything.
* `docker rmi $(docker image ls -a)` - tries to remove all the local images.

### Documentation

There is some [frontend](https://github.com/tudorconstantin/knests/tree/master/client) / [backend](https://github.com/tudorconstantin/knests/tree/master/server) documentation written so you can debug things more thoroughly when they don't go as expected.

## Road map
[] Fullstack e2e testing using Playwright and code coverage generating for both UI and server.
[] Create tutorials documenting the development flow using the Knests stack.
[] Since this is hosted on Github, migrate the Gitlab CI/CD pipeline to Github actions and dockerhub registry.
[] Deployment and hosting on Kubernetes (?)
[] Internationalization (?)
[] Other good ideas
  
## Wanna Help?
- Pick any task from the road map, develop it, document it and submit a Pull Request
- Clone the repo, build something, see how it goes, come up with ideas on how to improve the overall development experience.
- Review the code, send suggestions, fixes, etc.
- Star the repo, share the articles, write yourself about it :)