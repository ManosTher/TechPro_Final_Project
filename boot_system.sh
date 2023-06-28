#!/bin/bash

# Change directory to the location of the script
cd "$(dirname "$0")"

# Run the containers using docker-compose
docker compose up -d --build

# Optionally, you can add a command to wait for the containers to be fully up and running
# For example, waiting for the backend container to be ready
docker compose exec backend sh -c 'while ! nc -z localhost 8080; do sleep 1; done'


# Done!
echo "Containers are up and running."
