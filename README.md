# ILP front end

[![Checks](https://github.com/samitova-ekaterina/ilp-frontend/actions/workflows/checks.yml/badge.svg?branch=develop)](https://github.com/samitova-ekaterina/ilp-frontend/actions/workflows/checks.yml)

The browser application of ILP, a web system that turns PDF learning materials into interactive exercises with adaptive spaced repetition. It is a single-page application written in React and TypeScript and built with Vite. The server lives in the repository [ilp-backend](https://github.com/samitova-ekaterina/ilp-backend).

## How to run the project

You need Node.js 24 (the file `.node-version` names the version) and npm.

| Command                 | What it does                                                                                                                           |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `npm ci`                | Installs the libraries exactly as `package-lock.json` records them                                                                     |
| `npm run dev`           | Starts the application at `http://localhost:5173`; requests that start with `/api` are passed to the server at `http://localhost:8080` |
| `npm run build`         | Checks the types and builds the application into the folder `dist`                                                                     |
| `npm run preview`       | Serves the built application on the local computer                                                                                     |
| `npm run lint`          | Checks the code style with ESLint                                                                                                      |
| `npm run format:check`  | Checks the code format with Prettier; `npm run format` rewrites the files                                                              |
| `npm run locales:check` | Checks that the files of interface texts hold the same set of texts in every language                                                  |
| `npm run api:types`     | Generates the TypeScript types of requests and responses from the saved API description                                                |
| `npm run check`         | Runs the style check, the format check, the check of interface texts and the build one after another                                   |

To see data from the server, start `ilp-backend` first; its README says how.

In Windows PowerShell with scripts disabled by the execution policy, call `npm.cmd` instead of `npm`.

## Where the Front-End criterion is implemented

The table lists what is in the repository now.

| Requirement                                                           | Where                                                                                                                                                                                                                                                                                                       |
| --------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A single-page application built with a modern framework and a bundler | React 19 and Vite 8: `index.html`, `src/main.tsx`, `vite.config.ts`                                                                                                                                                                                                                                         |
| A clear project structure                                             | `src/app` holds the start of the application and its common settings, `src/features` holds one folder for every section of the application, `src/shared` holds what all sections use, in the folders `components`, `services`, `models`, `styles` and `i18n`. A folder appears together with its first code |
| Separation into feature modules                                       | A section takes common things from `src/shared` and never imports from another section; `src/shared` imports from no section. ESLint checks both rules: `eslint.config.js`                                                                                                                                  |
| Clear data interfaces and types for the API                           | `api/openapi.json` is the saved API description of the server; the types in `src/shared/models/api` are generated from it and are not written by hand                                                                                                                                                       |
| Pages and routing                                                     | `src/app/router.tsx` lists every address of the application; the pages live in `src/features/<section>/pages`. The section below names them                                                                                                                                                                 |
| Lazy loading of routes                                                | Every page is a separate file of the build and is downloaded when it is opened: the function `page` in `src/app/router.tsx`                                                                                                                                                                                 |
| Centralized request handling                                          | `src/shared/services/request.ts` is the only file that calls `fetch`, and ESLint forbids `fetch` anywhere else. A failed request becomes an `ApiError` with the status and the error body of the server. `src/shared/services/languages.ts` is the first request: the list of interface languages           |
| Handling of 401, 403, 404 and 500                                     | `src/app/queryClient.ts`, one place for all requests. The section below says what each status leads to                                                                                                                                                                                                      |
| A global error handler                                                | `src/app/RouteErrorPage.tsx` is the error boundary of the routes: a page that fails is replaced by a message, and the menu stays on the screen                                                                                                                                                              |
| Clear error messages and loading states                               | Messages: `src/shared/components/ToastList.tsx` and `ErrorMessage.tsx`. Loading: `src/shared/components/LoadingPlaceholder.tsx`, shown while a page, its texts or a request are loading                                                                                                                     |
| Global state                                                          | Data of the server is kept by TanStack Query. Zustand keeps only what does not come from the server: now the messages to the user, `src/shared/services/toasts.ts`                                                                                                                                          |
| Basic logging                                                         | `src/shared/services/logger.ts` writes every failure to the browser console: failed requests, failed pages and rejected promises. ESLint forbids `console` anywhere else                                                                                                                                    |
| Interface texts outside the code, a choice of the language            | `public/locales/<language>/<section>.json`, English and Russian. ESLint rejects a text written in the markup. The list of languages in `src/shared/components/LanguageSwitcher.tsx` comes from the server                                                                                                   |
| ESLint and a formatter                                                | `eslint.config.js` and `.prettierrc.json`. The type `any` and styles written in the markup are errors                                                                                                                                                                                                       |
| Checks on every push                                                  | `.github/workflows/checks.yml`: the code style, the code format, the interface texts, the generated types and the build                                                                                                                                                                                     |

## The pages and their addresses

| Section              | Address                                       | Page                               |
| -------------------- | --------------------------------------------- | ---------------------------------- |
| Sign in              | `/sign-in`                                    | Sign in                            |
| Lessons              | `/lessons`                                    | Lessons                            |
| Lessons              | `/lessons/:lessonId`                          | Lesson summary                     |
| Students             | `/students`                                   | Students                           |
| Students             | `/students/:studentId`                        | Student card                       |
| Students             | `/students/:studentId/proposals/:proposalId`  | Adaptation proposal with rationale |
| Students             | `/students/:studentId/homework/new`           | Homework assignment                |
| Library              | `/library`                                    | Author's library                   |
| Library              | `/library/upload`                             | Material upload                    |
| Library              | `/library/materials/:materialId/split`        | Document split                     |
| Library              | `/library/materials/:materialId/report`       | Parsing report                     |
| Library              | `/library/materials/:materialId/flagged`      | Confirmation of flagged items      |
| Library              | `/library/exercises/:exerciseId/presentation` | Exercise presentation              |
| Today                | `/today`                                      | Daily queue                        |
| Today                | `/today/tasks/:taskId`                        | Task and answer result             |
| My level             | `/level`                                      | My level                           |
| Profile and settings | `/profile`                                    | Profile and settings               |

The address `/` leads to the Sign in page. Any other address shows the message "Nothing found". Every page shows its heading; the content of a page arrives together with its feature.

## What a failed request leads to

| Answer of the server             | What the person sees                                                                                      |
| -------------------------------- | --------------------------------------------------------------------------------------------------------- |
| 401, the person is not signed in | The Sign in page opens                                                                                    |
| 403, no access                   | The message "No access" in place of the page; after an action, a message on top of the page               |
| 404, not found                   | The message "Nothing found" in place of the page; after an action, a message on top of the page           |
| 500 and above                    | A request for data is repeated twice, then a message with the request number appears; the page stays open |
| No answer at all                 | A request for data is repeated twice, then the message "The server is not answering" appears              |

The request number in a message is the `requestId` of the error body: the same number stands in the log of the server.

## The API description and the generated types

The server keeps the description of its API in `docs/api/openapi.json` of `ilp-backend`. This repository holds a copy of that file in `api/openapi.json`.

When the API of the server changes:

1. Copy the new `docs/api/openapi.json` from `ilp-backend` to `api/openapi.json`.
2. Run `npm run api:types`.
3. Run `npm run build`: it names every place of the code that no longer fits the new description.
4. Commit `api/openapi.json` together with the folder `src/shared/models/api`.

The check on GitHub generates the types again and fails when they differ from the committed ones.
