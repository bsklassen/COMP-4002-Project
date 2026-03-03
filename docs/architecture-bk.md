# Architecture Notes

## useAuth (Hook)
- What: A React hook exposing savedUsers, login, signup, remove, and refreshSaved.
- Logic decision: Acts as the hub for UI facing authentication ensuring the login components dont have to worry about business logic by delegating the responsibilities to this authService.
- Where used: src/components/pages/Login/Login.tsx imports and uses useAuth to perform login/signup and to display saved logins.

## authService (Service)
- What: Encapsulates authentication-related operations (login, register, getSavedUsers, removeUser).
- Logic decision: This layer keeps the business rules like validation or making repository calls isolated so it doesn't clutter the ui or data layers
- Where used: src/hooks/useAuth.ts calls authService methods; this separates concerns between UI, service logic, and persistence.

## UserRepository (Repository)
- What: Does basic CRUD through getAll, getById, create, update, delete for User resources.
- Logic decision: This layer acts as a pluggable data source. Currently, it pulls from a local test file to satisfy sprint requirements. But, it is designed so I can seamlessly swap the data source to a provider like Clerk in sprint 5. Because the rest of the app only knows how to ask the Repository for data, switching to Clerk’s API would only require updating this single file, leaving the Hook and Service layers completely untouched.
- Where used: src/services/authService.ts uses UserRepository to fetch and mutate user data.

## Types and Test Data
- src/types/User.ts defines the User type which is used across repository, service, hook, and components.
- src/data/usersTestData.ts contains at least 10 fake User objects and is imported by UserRepository to test the functionality of the app.
