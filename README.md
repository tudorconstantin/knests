# The KNESTS Stack

## Running the app (with docker)

Only needed to be run first time: 

```bash
$ docker network create traefik-public
$ docker network create knests-dev
```

For development:
`docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build -V --force-recreate`

Go to http://localhost:8080/signup and create your first user.