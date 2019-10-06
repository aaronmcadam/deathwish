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

- [ ] A user can view a list of available Deathwish templates (minimum of 2).
- [ ] A user can add a Deathwish to their account.
- [ ] A user can view their Deathwishes.
- [ ] A user can edit the Deathwish.
- [ ] A user can delete the Deathwish.

A Deathwish has the following attributes:

- id
- type
- title
- description
- cost
- recipients

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

### Available Scripts

In the project directory, you can run:

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

### Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
