# The KNESTS Stack

## Running the app (with docker)

Only needed to be run first time: 

```bash
$ docker network create traefik-public
$ docker network create knests-dev
```

### For development:

`rm -rf client/dist && docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build -V --force-recreate`

Note: The `rm -rf client/dist` part is needed (for now, until we have a better solution) for deleting the files  nextjs generates.

Go to http://localhost:8080/api/migrate to have the latest migrations applied.
Go to http://localhost:8080/signup and create your first user.