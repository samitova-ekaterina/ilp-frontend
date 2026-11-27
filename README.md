# ILP front end

[![Checks](https://github.com/samitova-ekaterina/ilp-frontend/actions/workflows/checks.yml/badge.svg?branch=develop)](https://github.com/samitova-ekaterina/ilp-frontend/actions/workflows/checks.yml)

The browser application of ILP, a web system that turns PDF learning materials into interactive exercises with adaptive spaced repetition. It is a single-page application written in React and TypeScript and built with Vite. The server lives in the repository [ilp-backend](https://github.com/samitova-ekaterina/ilp-backend).

## How to run the project

You need Node.js 24 (the file `.node-version` names the version) and npm.

| Command                | What it does                                                                                                                           |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `npm ci`               | Installs the libraries exactly as `package-lock.json` records them                                                                     |
| `npm run dev`          | Starts the application at `http://localhost:5173`; requests that start with `/api` are passed to the server at `http://localhost:8080` |
| `npm run build`        | Checks the types and builds the application into the folder `dist`                                                                     |
| `npm run preview`      | Serves the built application on the local computer                                                                                     |
| `npm run lint`         | Checks the code style with ESLint                                                                                                      |
| `npm run format:check` | Checks the code format with Prettier; `npm run format` rewrites the files                                                              |
| `npm run api:types`    | Generates the TypeScript types of requests and responses from the saved API description                                                |
| `npm run check`        | Runs the style check, the format check and the build one after another                                                                 |

To see data from the server, start `ilp-backend` first; its README says how.

In Windows PowerShell with scripts disabled by the execution policy, call `npm.cmd` instead of `npm`.

## Where the Front-End criterion is implemented

The table lists what is in the repository now.

| Requirement                                                           | Where                                                                                                                                                                                                                               |
| --------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A single-page application built with a modern framework and a bundler | React 19 and Vite 8: `index.html`, `src/main.tsx`, `vite.config.ts`                                                                                                                                                                 |
| A clear project structure                                             | `src/app` holds the start of the application and its common settings, `src/features` holds one folder for every section of the application, `src/shared` holds what all sections use. A folder appears together with its first code |
| Separation into feature modules                                       | A section takes common things from `src/shared` and never imports from another section; `src/shared` imports from no section. ESLint checks both rules: `eslint.config.js`                                                          |
| Clear data interfaces and types for the API                           | `api/openapi.json` is the saved API description of the server; the types in `src/shared/api/generated` are generated from it and are not written by hand                                                                            |
| ESLint and a formatter                                                | `eslint.config.js` and `.prettierrc.json`. The type `any` and styles written in the markup are errors                                                                                                                               |
| Checks on every push                                                  | `.github/workflows/checks.yml`: the code style, the code format, the generated types and the build                                                                                                                                  |

## The API description and the generated types

The server keeps the description of its API in `docs/api/openapi.json` of `ilp-backend`. This repository holds a copy of that file in `api/openapi.json`.

When the API of the server changes:

1. Copy the new `docs/api/openapi.json` from `ilp-backend` to `api/openapi.json`.
2. Run `npm run api:types`.
3. Run `npm run build`: it names every place of the code that no longer fits the new description.
4. Commit `api/openapi.json` together with the folder `src/shared/api/generated`.

The check on GitHub generates the types again and fails when they differ from the committed ones.

## Status and plan

The project is in active development on the `develop` branch.

- Implemented now: see the sections above.
- Planned: screens, forms with validation, global error handling, loading states, unit tests for key components and end-to-end tests.
- Each planned piece of work is an issue with sub-issues: [milestones](https://github.com/samitova-ekaterina/ilp-frontend/milestones), [issues](https://github.com/samitova-ekaterina/ilp-frontend/issues).
