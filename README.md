# storefront-backend

## Prepare env

- add a `.env` file in the root directory

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

- `yarn install` to install all dependencies
- `yarn db-up` to set up the database
- `yarn build` to build the app

## Start the app

- `yarn start` to start the app

## Test the app

- add a `database.json` file in the root directory

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

- `yarn test` to run all tests

## Author

Mohamed Ramadan (https://github.com/moramadan94)
