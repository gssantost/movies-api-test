# Movies API Test

Movies and Genres REST API Test using Express, PostgreSQL with Sequelize deployed to Heroku using Docker.

## Getting Started

### Prerequisites

Run `yarn` or `npm install` to install dependencies.

### Set up Postgres databse

To set up Postgres database, migrations and initial seeders run:

```
yarn db:start
```

Alternatively you can run each of the following commands in the specified order:

```
yarn db:create
yarn db:migrate
yarn db:seed:all
```

## Run

Run `yarn start` or `yarn start:dev`

## Testing

Run `yarn test` to run Jest endpoint tests
