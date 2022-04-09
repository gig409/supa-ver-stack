# Remix Supa Ver Stack

![The Remix Ver Stack](https://raw.githubusercontent.com/rphlmr/supa-fly-stack/main/doc/supa-fly-stak.png)

Learn more about [Remix Stacks](https://remix.run/stacks).

```
npx create-remix --template rphlmr/supa-fly-stack
```

## What's in the stack

- [Vercel app deployment](https://vercel.com) with [Docker](https://www.docker.com/products/docker-desktop/)
- Production-ready [Supabase Database](https://supabase.com/)
- Email/Password Authentication with [cookie-based sessions](https://remix.run/docs/en/v1/api/remix#createcookiesessionstorage)
  - **NEW** : Magic Link login 🥳
- Database ORM with [Prisma](https://prisma.io)
- Forms Schema (client and server sides !) validation with [Remix Params Helper](https://github.com/kiliman/remix-params-helper)
- Styling with [Tailwind](https://tailwindcss.com/)
- End-to-end testing with [Cypress](https://cypress.io)
- Local third party request mocking with [MSW](https://mswjs.io)
- Unit testing with [Vitest](https://vitest.dev) and [Testing Library](https://testing-library.com)
- Code formatting with [Prettier](https://prettier.io)
- Linting with [ESLint](https://eslint.org)
- Static Types with [TypeScript](https://typescriptlang.org)

Not a fan of bits of the stack? Fork it, change it, and use `npx create-remix --template your/repo`! Make it your own.

## Development

- Download and run [Docker Desktop](https://www.docker.com/products/docker-desktop/)

  > **Note:** Needed to create a [shadow database for prisma](https://www.prisma.io/docs/concepts/components/prisma-migrate/shadow-database)

  > **Note:** Shadow database is local and run by `docker-compose.yml`

- Create a [Supabase Database](https://supabase.com/) (Free tiers gives you 2 databases)

  > **Note:** Only one for playing around with Supabase or 2 for `staging` and `production`

  > **Note:** Used all your free tiers ? Also works with [Supabase CLI](https://github.com/supabase/cli) and local self-hosting

  > **Note:** Create a strong database password, but prefer a passphrase, it'll be more easy to use in connection string (no need to escape special char)
  >
  > _example : my_strong_passphrase_

- Go to https://app.supabase.io/project/{PROJECT}/settings/api to find your secrets
- "Project API keys"
- Add your `SUPABASE_URL`, `SERVER_URL`, `SUPABASE_SERVICE_ROLE` (aka `service_role` `secret`), `SUPABASE_ANON_PUBLIC` (aka `anon` `public`) and `DATABASE_URL` in the `.env` file
  > **Note:** `SERVER_URL` is your localhost on dev. It'll work for magic link login

```en
DATABASE_URL="postgres://postgres:{STAGING_POSTGRES_PASSWORD}@db.{STAGING_YOUR_INSTANCE_NAME}.supabase.co:5432/postgres"
SHADOW_DATABASE_URL="postgresql://postgres:postgres@localhost:12345/postgres"
SUPABASE_ANON_PUBLIC="{ANON_PUBLIC}"
SUPABASE_SERVICE_ROLE="{SERVICE_ROLE}"
SUPABASE_URL="https://{STAGING_YOUR_INSTANCE_NAME}.supabase.co"
SESSION_SECRET="super-duper-s3cret"
SERVER_URL="http://localhost:3000"
```

- Start Shadow database (Docker needs some time at initial run)

  ```sh
  npm run shadow-db:setup
  ```

- Wait until you see `supabase-shadow_1 | PostgreSQL init process complete; ready for start up.` in console output

- You can now `ctrl` + `c` to kill process

- Initial setup:

  ```sh
  npm run setup
  ```

- Start dev server:

  ```sh
  npm run dev
  ```

This starts your app in development mode, rebuilding assets on file changes.

The database seed script creates a new user with some data you can use to get started:

- Email: `hello@supabase.com`
- Password: `supabase`

### Relevant code:

This is a pretty simple note-taking app, but it's a good example of how you can build a full stack app with Prisma, Supabase and Remix. The main functionality is creating users, logging in and out (handling access and refresh tokens + refresh on expire), and creating and deleting notes.

- auth [./app/services/auth.server.ts](./app/services/auth.server.ts)
- user sessions, and verifying them [./app/services/session.server.ts](./app/services/session.server.ts)
- creating, and deleting notes [./app/models/note.server.ts](./app/models/note.server.ts)

## Deployment

- Create a new [GitHub Repository](https://repo.new), and then add it as the remote for your project. **Do not push your app yet!**

  ```sh
  git remote add origin <ORIGIN_URL>
  ```

- Integrate repo with Vercel

## GitHub Actions

//TODO
👉 **You have to add some env secrets for cypress.** 👈

Add a `SESSION_SECRET`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE`,`SUPABASE_ANON_PUBLIC`, `SERVER_URL` and `DATABASE_URL` to [your repo secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)

## Testing

### Cypress

We use Cypress for our End-to-End tests in this project. You'll find those in the `cypress` directory. As you make changes, add to an existing file or create a new file in the `cypress/e2e` directory to test your changes.

We use [`@testing-library/cypress`](https://testing-library.com/cypress) for selecting elements on the page semantically.

To run these tests in development, complete your `.env` and run `npm run test:e2e:dev` which will start the dev server for the app as well as the Cypress client. Make sure the database is running in docker as described above.

We also have a utility to auto-delete the user at the end of your test. Just make sure to add this in each test file:

```ts
afterEach(() => {
  cy.cleanupUser()
})
```

That way, we can keep your test db clean and keep your tests isolated from one another.

### Vitest

For lower level tests of utilities and individual components, we use `vitest`. We have DOM-specific assertion helpers via [`@testing-library/jest-dom`](https://testing-library.com/jest-dom).

### Type Checking

This project uses TypeScript. It's recommended to get TypeScript set up for your editor to get a really great in-editor experience with type checking and auto-complete. To run type checking across the whole project, run `npm run typecheck`.

### Linting

This project uses ESLint for linting. That is configured in `.eslintrc.js`.

### Formatting

We use [Prettier](https://prettier.io/) for auto-formatting in this project. It's recommended to install an editor plugin (like the [VSCode Prettier plugin](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)) to get auto-formatting on save. There's also a `npm run format` script you can run to format all files in the project.

CC BY-NC-SA 4.0

```

```
