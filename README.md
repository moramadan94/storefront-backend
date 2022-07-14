# storefront-backend

## Prepare env

- add a `.env` file in the root directory and set the missing `###` environment parameters

```
PORT=3000
NODE_ENV=dev
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=store_dev
POSTGRES_DB_TEST=store_test
POSTGRES_USER=postgres
POSTGRES_PASSWORD=###
BCRYPT_PASSWORD=###
SALT_ROUNDS=10
TOKEN_SECRET=###

```

## Set up

- `npm install` to install all dependencies
- `npm run db-up` to set up the database
- `npm run build` to build the app

## Start the app

- `npm run start` to start the app

## Test the app

- add a `database.json` file in the root directory and set the missing `###` parameters

```
{
  "defaultEnv": { "ENV": "NODE_ENV" },
  "dev": {
    "driver": "pg",
    "host": { "ENV": "POSTGRES_HOST" },
    "port": { "ENV": "POSTGRES_PORT" },
    "database": { "ENV": "POSTGRES_DB" },
    "user": { "ENV": "POSTGRES_USER" },
    "password": { "ENV": "POSTGRES_PASSWORD" }
  },
  "test": {
    "driver": "pg",
    "host": { "ENV": "POSTGRES_HOST" },
    "port": { "ENV": "POSTGRES_PORT" },
    "database": { "ENV": "POSTGRES_DB_TEST" },
    "user": { "ENV": "POSTGRES_USER" },
    "password": { "ENV": "POSTGRES_PASSWORD" }
  }
}
```

- `npm run test` to run all tests
