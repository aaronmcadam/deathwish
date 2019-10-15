# Deathwish

This app allows users to create and manage their "Deathwishes".

A "Deathwish" is a request somebody can create that gets carried out after they pass away.

In theory a Deathwish could be anything:

- A video messages for family members
- Life insurance
- A Digital Will
- Holiday for family a loved one
- Mortgage payment for the family home

The app allows the following use cases:

- [x] A user can view a list of available Deathwish templates (minimum of 2).
- [x] A user can add a Deathwish to their account.
- [x] A user can view their Deathwishes.
- [x] A user can edit the Deathwish.
- [x] A user can delete the Deathwish.

A Deathwish has the following attributes:

- id
- type
- title
- description
- cost
- recipients
- createdAt (? do we need this? Sorting/filtering?)
- updatedAt (? do we need this? Sorting/filtering?)

## First Phase

The first phase will persist DeathWishes on the client, using Apollo. This will allow an easy migration to a GraphQL service

## Second Phase

We will implement a GraphQL service that will persist the DeathWishes to some data store.

## Hosting

A serverless environment could work well.

### Front end

The front end could be a deployed a bundled static files.

Some concerns to note are:

- CloudFront distribution rules, time to build and invalidate
- CORS headers for the GraphQL service

### Back end

The back end could be a deployed with serverless or docker as a standard Node.js application.

Some concerns to note are:

- GraphQL query execution times should be low

## Engineering

We use TypeScript for all of the source code. The app is unit tested with [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro). We use [Cypress](https://www.cypress.io/) for End to End testing.

### Running and developing the app locally

If you wish to just see the app in action, run `yarn start`.

To get started with development, run `yarn dev`.

Both commands may take a little while when you run them first as they fetch and build their dependencies.

We're using a monorepo implemented with yarn workspaces to keep our client
and server code together. This makes it easier to manage feature development and
share dependencies.

There are two folders within `packages`:

- `deathwish-client` for the React application
- `deathwish-server` for the GraphQL server application.

We use docker to bring up the application with all of its dependencies.

Here are the available scripts at the root of the project:

| Name            | Description                                                                                                                           |
|-----------------|---------------------------------------------------------------------------------------------------------------------------------------|
| `dev`           | Starts the app in Cypress, ready for [outside-in TDD](https://www.codecademy.com/articles/tdd-outside-in). Starts the services first. |
| `dev:up`        | Installs dependencies and brings up the services                                                                                      |
| `dev:down`      | Stops the services                                                                                                                    |
| `dev:uninstall` | Cleans up and removes the docker containers                                                                                           |
| `start`         | Stops any running services and brings up the services                                                                                 |
| `test:all`      | Runs the unit and End to End tests for the server and client. Starts the services first.                                              |
| `test`          | Runs the unit and End to End tests for the server and client                                                                          |
| `cypress`       | Launches the Cypress app                                                                                                              |
| `client`        | Starts the client                                                                                                                     |
| `server`        | Starts the server                                                                                                                     |

We have added common tasks to the root scripts, but we can still access the scripts
within the client or server workspaces by using the `yarn workspace` command.
For example, to generate new types for the client, we could run
`yarn workspace deathwish-client generate`.

Here are the scripts available inside `deathwish-server`:

| Name         | Description                                         |
|--------------|-----------------------------------------------------|
| `dev`        | Starts the dev server with live reloading           |
| `test`       | Runs the unit tests                                 |
| `validate`   | Checks the types, lints and runs the tests          |
| `build`      | Builds the app for production to the `dist` folder. |
| `lint`       | Runs ESLint                                         |
| `start`      | Starts the production app                           |
| `prod`       | Builds and starts the production app                |
| `type-check` | Checks the types                                    |
| `format`     | Formats the code with prettier                      |

Here are the scripts available inside `deathwish-client`:

| Name          | Description                                                                                               |
|---------------|-----------------------------------------------------------------------------------------------------------|
| `dev`         | Starts the app in Cypress, ready for [outside-in TDD](https://www.codecademy.com/articles/tdd-outside-in) |
| `test`        | Launches the unit test runner in interactive watch mode                                                   |
| `validate`    | Checks the types, lints and runs the tests                                                                |
| `test:all`    | Runs the unit and End to End tests                                                                        |
| `build`       | Builds the app for production to the `build` folder.                                                      |
| `cypress`     | Launches the Cypress app                                                                                  |
| `cypress:run` | Runs the End to End tests headlessly                                                                      |
| `lint`        | Runs ESLint                                                                                               |
| `start`       | Starts the app in development mode                                                                        |
| `test:e2e`    | Runs the End to End tests headlessly. It starts the app first.                                            |
| `test:unit`   | Runs the unit tests.                                                                                      |
| `test:once`   | Runs all the tests once. It does not start the app first.                                                 |
