> [!WARNING]  
> If db-data may not be contained on github repository, if that is the case YOU SHOULD CREATE IT YOURSELF

On Linux:
  ```bash 
  mkdir db-data
``` 

And whateverthefuck on Windows, you can manage
## General information
None of our programs should be executed raw on our machines, thats why we use docker and docker compose.
In case you are not familiar with those:

  - Docker is used to create containers (small "virtual machines"), created based on images we configure in Dockerfiles.
    So: image is like a blueprint which we use to create container with running code. Previously mentioned configuration
    includes things like installing npm or running certain commands inside our container.

  - Docker compose on the other hand is used to manage multiple images and containers. 
    So: we use docker compose to avoid having to run very long and complicated commands every time we want to rebuild our apps.

Configurations can be found in:
#### For docker:

  `client/Dockerfile` for frontend configuration
  `server/Dockerfile` for backend configuration
  for simplicity reasons we Postgresql configuration is hardwired in docker compose

#### For docker compose:
    
  `docker-compose.yaml` in project root, it contains informations telling docker composer how to create different services (frontend, backend, database)

Hopefully now everything is at least a bit clear.

## Installation:

Install nodejs from this website: https://nodejs.org/en/download

Make sure you have docker or docker desktop installed and that docker has appropriate privileges. 
I will show you how to set everyting in CLI but most of those things are doable in docker desktop.
If you use docker desktop, remember that it has to be turned on for docker commands to work.

In project root directory, create an `.env` file and fill it with data in such manner:
```
POSTGRES_PASSWORD=<value>
POSTGRES_USER=<value>
PGUSER=<value>
```
Then proceed to create an empty .env files in both client and server subdirectories.

Those values will be used to generate database config, replace <value> with appropriate values
Keep in mind both POSTGRES_USER and PGUSER should be the same. You should NEVER share ".env" file anywhere as it
contains sensitive data.

1. Check if you have db-data, client and server directories in your root directory. 
   If db-data is missing, create an empty directory named db-data.

2. Go to "client/" directory and install dependencies:
   
     ```bash 
     cd client/
     npm install --os=linux
     cd ..
     ```

3. Go to "server/" directory and repeat the previous step:

     ```bash
     cd server/
     npm install --os=linux
     cd ..
     ```

4. You should be back in the project root dir and run:

    ```bash
    docker compose build
    ```

   it may take a while so don't panic if looks stuck.

5. Once docker is finished mining bitcoin on your computer run:
    
    ```bash
    docker compose up
    ```

You should be greeted with a wall of colorful text (hopefully not red) this is output of every service running in docker.

Each service can be accessed under different ips:

  - Frontend: `http://192.168.25.50:5000`
  - Backend: `http://192.168.25.100:3000`
  - Database `postgres://192.168.25.150:5432`

Due to Windows Networking Magic™ if you're using windows you are forced to use localhost to access docker services:

  - Frontend: `http://localhost:5000`
  - Backend: `http://localhost:3000`
  - Database `postgres://localhost:5432`
