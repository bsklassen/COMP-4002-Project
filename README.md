![Logo](apps/frontend/public/images/assets/logo.png)

## The Gauntlet of Night

A turn based fighting game created by Ben Klassen, Rahman Hajiserdar, and Lilly Adamo


### Local Setup 

Please note that you will need to install node.js before playing!

1. Clone the repository

2. install dependencies from the project root with `npm i` 

3. Set up environment variables:

in `apps/frontend/.env`:

```
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_API_BASE_URL=http://localhost:3000
```

in `apps/backend/.env`:

```
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
PORT=3000
FRONTEND_URL=http://localhost:5173
DB_URL=postgresql://postgres:your_password@localhost:5433/comp4002
```

4. set up a local database:

Create a new database called 'comp4002' and then navigate to `apps/backend`. Then, run:

```
npx prisma migrate deploy
npx prisma db seed
```

5. Run the application: 

in the terminal, type `npm run dev`

voila! your game will now be available at `http://localhost:5173`

Please make an account at clerk.com, then copy your API keys into the env files above.

Good luck, weary traveller. 