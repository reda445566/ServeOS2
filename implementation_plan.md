# Implementation Plan - Authentication & Restaurant Onboarding

We will implement the foundational process of the system: **Restaurant Onboarding and Authentication**. Since all data (branches, users, orders, menus) is scoped to a specific `Restaurant` and `Branch`, we need to build the onboarding flow first to register a restaurant, its first branch, and its owner.

## User Review Required

> [!IMPORTANT]
> - We will create a default branch named `"Main Branch"` during onboarding. The owner can rename it or add more branches later.
> - Password hashing will be done using `bcryptjs`.
> - JWT tokens will be generated and can be sent back in the API response or HTTP-only cookies.

## Open Questions

> [!NOTE]
> - Do you want the JWT to be sent via **HTTP-only cookies** (recommended for web security) or as a bearer token in the JSON response? (We will support both in `authMiddleware` to keep it flexible).

## Proposed Changes

---

### Security Utilities

#### [MODIFY] [jwt.js](file:///d:/front_projects/ServeOS/ServeOS2/backend/utils/jwt.js)
Define helper functions to generate and verify JWTs.
- `generateToken(payload)`: Generates a JWT token using `process.env.JWT_SECRET` and sets an expiration (e.g., 7 days).

---

### Middleware Layer

#### [MODIFY] [auth.middleware.js](file:///d:/front_projects/ServeOS/ServeOS2/backend/middlewares/auth.middleware.js)
Update the existing middleware to load the actual user from the database using Prisma.
- Retrieve the token from cookies or authorization header.
- Verify JWT.
- Query database using `prisma.user.findUnique` to ensure the user exists and is active.
- Attach the `user` object to `req.user`.

---

### Authentication Module

#### [MODIFY] [auth.service.js](file:///d:/front_projects/ServeOS/ServeOS2/backend/modules/auth/auth.service.js)
Write core business logic:
- `registerOwner({ restaurantName, ownerEmail, ownerPassword, branchName })`:
  - Verify email is unique.
  - Run a database transaction (`prisma.$transaction`) to:
    1. Create `Restaurant`.
    2. Hash password and create `User` with `OWNER` role.
    3. Create the default `Branch`.
    4. Link the owner to the branch.
    5. Create an `AuditLog` entry for signup.
- `loginUser({ email, password })`:
  - Find user by email (include restaurant and branch info).
  - Verify password hash.
  - Verify user is `ACTIVE`.
  - Create an `AuditLog` entry for login.
  - Return user data and token.

#### [MODIFY] [auth.controller.js](file:///d:/front_projects/ServeOS/ServeOS2/backend/modules/auth/auth.controller.js)
Define request handlers that parse incoming requests, call `auth.service.js` methods, and send responses using `ApiResponse` or errors using `ApiError`.
- `registerOwnerController`
- `loginUserController`
- `getCurrentUserController`

#### [MODIFY] [auth.routes.js](file:///d:/front_projects/ServeOS/ServeOS2/backend/modules/auth/auth.routes.js)
Map endpoints to controllers:
- `POST /api/auth/register-owner` (Public onboarding)
- `POST /api/auth/login` (Public login)
- `GET /api/auth/me` (Protected - gets current authenticated user)

---

### Server Configuration

#### [MODIFY] [server.js](file:///d:/front_projects/ServeOS/ServeOS2/backend/server.js)
Mount the authentication routes under `/api/auth`.

---

## Verification Plan

### Manual Verification
- We will test the registration endpoint using a curl command or a local JS script to register a new restaurant and owner.
- We will test the login endpoint with correct and incorrect credentials to verify the token is generated.
- We will verify that database records are successfully created in the tables.


