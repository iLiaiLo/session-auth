# Session-Based Authentication API

A Node.js and Express API that provides user signup, login, logout, and an authenticated greeting endpoint. User records and server-side sessions are stored in PostgreSQL.

## Requirements

- Node.js 20 or later
- PostgreSQL

## Setup

1. Install the dependencies:

   ```sh
   npm install
   ```

2. Create a PostgreSQL database.

3. Add a `.env` file in the project root:

   ```env
   PORT=server_port
   USER=database_user
   HOST=localhost
   DATABASE=database_name
   PASSWORD=your_database_password
   DB_PORT=database_port
   SESSION_SECRET=replace_with_a_long_random_secret
   NODE_ENV=development
   ```

   Set `USER`, `HOST`, `DATABASE`, `PASSWORD`, and `DB_PORT` to match your PostgreSQL setup. Use a long, unpredictable `SESSION_SECRET`; do not commit `.env` to version control.

4. Start the development server:

   ```sh
   npm run dev
   ```

On startup, the app creates the `users_schema.users` table and the PostgreSQL session table if they do not already exist. The configured database user needs permission to create these tables.

## API

All endpoints accept and return JSON. The base URL in the examples is `http://localhost:server_port`.

### Sign up

`POST /api/auth/signup`

```json
{
  "username": "Alex",
  "email": "alex@example.com",
  "password": "a-secure-password"
}
```

Passwords must be at least 8 characters. On success, the API responds with `201 Created` and signs the user in by setting a session cookie.

### Log in

`POST /api/auth/login`

```json
{
  "email": "alex@example.com",
  "password": "a-secure-password"
}
```

On success, the API responds with `200 OK` and sets a session cookie.

### Get the authenticated user's greeting

`GET /api/data/`

Send the session cookie returned by signup or login. On success, the response looks like:

```json
{
  "message": "hello Alex"
}
```

Requests without a valid authenticated session receive `401 Unauthorized`.

### Log out

`POST /api/auth/logout`

Send the session cookie to destroy the session and clear the cookie.

## Sessions

Sessions are stored in PostgreSQL rather than in application memory. The session cookie is HTTP-only, uses `SameSite=Strict`, and is marked secure when `NODE_ENV=production`. Its lifetime is 10 minutes and is refreshed while the session is active.

## Project structure

```text
controllers/  Signup, login, logout, and greeting handlers
db/           PostgreSQL connection and initialization
middlewares/  Authentication middleware
queries/      SQL schema, table, and user queries
routes/       Authentication and data API routes
utils/        Session lifecycle helpers
index.js      Express app and server startup
```
