# React 19 + TypeScript + Ant Design Boilerplate

A production-ready React 19 boilerplate with TypeScript, Vite 6, Ant Design 5, and comprehensive testing setup using Vitest. This project includes modern development tooling, pre-configured linting, formatting, and Git hooks for maintaining code quality.

## Tech Stack

### Core

- **React 19.0.0** - Latest React with modern JSX runtime
- **TypeScript 5.7.2** - Type-safe development with strict mode
- **Vite 6.4.1** - Fast build tool and dev server with HMR
- **Ant Design 5.22.5** - Enterprise UI component library with 50+ components
- **TanStack Router 1.x** - Type-safe file-based routing for React

### State & Data Management

- **React Query 5.90.6** (`@tanstack/react-query`) - Server state management with caching
- **React Hook Form 7.54.2** - Performant forms with easy validation
- **Yup 1.6.0** - Schema validation for forms
- **React Context API** - Global client state management

### Development & Testing

- **Vitest 4.0.7** - Fast unit testing framework with Vite integration
- **Testing Library** - React component testing utilities
- **Oxlint 1.26.0** - Fast, Rust-based linter
- **Prettier 3.6.2** - Opinionated code formatter
- **Husky 9.1.7** - Git hooks for pre-commit quality checks

### Additional Libraries

- **Axios 1.7.9** - Promise-based HTTP client with interceptors
- **Serializr 3.0.2** - Object serialization/deserialization for API responses
- **Day.js 1.11.13** - Lightweight date manipulation library
- **SASS 1.83.0** - CSS preprocessor with modern `@use` syntax

### Package Manager

- **PNPM** - Fast, disk space efficient package manager with strict dependencies

## Getting Started

### Installation

```bash
pnpm install
```

### Development

```bash
pnpm dev                 # Start dev server on port 3000
pnpm dev:staging         # Start with staging environment
pnpm dev:production      # Start with production environment
```

### Testing

```bash
pnpm test               # Run tests in watch mode
pnpm coverage           # Generate test coverage report
```

### Building

```bash
pnpm build              # Production build (TypeScript check + Vite build)
pnpm build:staging      # Build with staging environment
pnpm build:production   # Build with production environment
```

### Linting & Formatting

```bash
pnpm lint               # Run Oxlint
pnpm lint:fix           # Auto-fix linting issues
pnpm format             # Format code with Prettier
pnpm lint:all           # Run Oxlint and Prettier check
pnpm lint:fix:all       # Auto-fix with Oxlint and format with Prettier
```

### Other Commands

```bash
pnpm prepare            # Setup Husky Git hooks (runs automatically after install)
```

## Architecture

### State Management

This project uses **React Context API** for global state management:

- **AuthContext** (`src/context/AuthContext/`) - Manages authentication state and user information
  - Provides `useAuth()` hook with `authenticated`, `user`, and `setAuthenticated()`
  - Used throughout the app for authentication checks

### Data Fetching & API

- **React Query** (`@tanstack/react-query`) - Server state management with automatic caching, refetching, and background updates
- **Axios Instance** (`src/interceptor/axiosInstance.ts`) - Centralized HTTP client with:
  - Request interceptor that automatically adds Authorization header from localStorage
  - Response interceptor that normalizes responses and handles 401 errors (auto-logout)
  - Base URL configuration via `ApiRoutes.BASE_URL`
- **Service Hooks** (`src/services/`) - Custom hooks that wrap React Query:
  - `useAuthService` - Authentication operations (login, logout, session management)
  - `useAttachmentService` - File upload/download operations with progress tracking
  - Each service returns React Query mutations/queries with built-in loading, error states

### Form Management

- **React Hook Form** - Form state management with Yup validation
- **Custom Form Component** (`src/shared/components/Form/`) - Wraps React Hook Form with Ant Design components
- **Form Fields** - Pre-built components that integrate with React Hook Form:
  - `InputField`, `DropdownField`, `DatePickerField`, `OTPField`, `Switch`, `Radio`, `Checkbox`

### Routing

- **TanStack Router** - Client-side file-based routing
  - `src/routes/app/` - File-based route definitions
  - `src/routeTree.gen.ts` - Generated route tree managed by TanStack Router
  - `src/routes/index.tsx` - Router creation, provider setup, and router context wiring
  - `src/routes/routerContext.ts` - Typed context shared with route guards
  - `src/routes/routeConstants/appRoutes.ts` - Frontend route path constants
  - `src/routes/routeConstants/apiRoutes.ts` - Backend API endpoints
  - Route-level guards for public and authenticated routes

## Project Directory Structure

### `src/constants/`

Application-wide constants and configuration values

### `src/context/`

React Context providers for global state (AuthContext)

### `src/enums/`

TypeScript enumerators (DOM element roles, loader sizes, etc.)

### `src/interceptor/`

Axios interceptor for request/response handling with authentication tokens

### `src/models/`

Data models with serializr decorators for API response mapping

### `src/routes/`

Application route setup, file-based route definitions, router context, and API endpoint constants

### `src/services/`

Service layer with custom React Query hooks:

- `useAuthService` - Authentication service hook
- `useAttachmentService` - File attachment service hook

### `src/shared/`

Reusable shared resources across the application

#### `src/shared/components/`

Reusable UI components - each includes implementation, tests, and styles:

- **Forms**: Button, Checkbox, DatePickerField, DropdownField, FileUpload, Form, InputField, OTPField, Radio, SearchField, Switch
- **Layout**: Accordion, BreadCrumb, Drawer, Modal, Navbar, Stepper, Table, Tabs, Timeline, Tooltip
- **Feedback**: DeleteModal, Error, Loader, Notification, Offline, Skeleton
- **Display**: CustomAvatar, RestrictedAccess
- **HOC**: requireNetwork

#### `src/shared/hooks/`

Custom React hooks for reusable logic across components:

- `useAuth` - Access authentication context (authenticated state, user info)
- Custom hooks for common patterns (form handling, API calls, etc.)

#### `src/shared/types/`

Shared TypeScript type definitions and interfaces used across the application

#### `src/shared/utils/`

Helper utilities and functions:

- `renderWithContext` - Test utility for rendering components with providers (Router, Context, Form)
- Additional helper functions for common operations

#### `src/shared/validation/`

Yup validation schemas and utilities:

- Reusable validation rules (email, password, phone number patterns)
- Common validation schemas that can be composed
- Custom validators for specific business logic

### `src/styles/`

Global SCSS styles, variables, mixins, and fonts using modern `@use` syntax

### `src/views/`

Page-level components (screens/pages) with their own `.tsx` and `.scss` files. Each view represents a distinct page in the application.

## Key Features & Patterns

### Authentication Flow

1. User logs in via `useAuthService` hook
2. JWT token stored in localStorage
3. Axios interceptor automatically adds token to all requests
4. TanStack Router `beforeLoad` guards protect routes that need authentication
5. 401 responses trigger automatic logout and redirect to login

### Form Handling Pattern

```typescript
// Using the Form component with validation
<Form
  defaultValues={{ email: "", password: "" }}
  validationSchema={loginSchema}
  onSubmit={async (data) => {
    await loginMutation.mutateAsync(data);
  }}
>
  {(methods) => (
    <>
      <InputField name="email" type="email" placeholder="Email" />
      <InputField name="password" type="password" placeholder="Password" />
      <Button htmlType="submit">Login</Button>
    </>
  )}
</Form>
```

### API Integration Pattern

```typescript
// Service hook pattern
const useAuthService = () => {
  const loginMutation = useMutation({
    mutationFn: (credentials: LoginData) =>
      axiosInstance.post('/auth/login', credentials),
    onSuccess: (response) => {
      localStorage.setItem('token', response.data.token)
      setAuthenticated(true)
    },
  })

  return { loginMutation }
}
```

### Model Serialization

```typescript
// Using serializr for API response mapping
class User {
  @serializable(alias('user_id', primitive()))
  id: string

  @serializable(alias('email_address', primitive()))
  email: string
}

// In API call
const response = await axiosInstance.get('/users/me')
const user = deserialize(User, response.data)
```

### Protected Routes

```typescript
// src/routes/app/_authenticated.dashboard.tsx
import { createFileRoute } from '@tanstack/react-router'
import Dashboard from 'src/views/Dashboard'

export const Route = createFileRoute('/_authenticated/dashboard')({
  component: Dashboard,
})
```

Protected pages should be added under the pathless `/_authenticated` route group. The guard in `src/routes/app/_authenticated.tsx` checks localStorage tokens and `AuthContext` before the page loads, then redirects unauthenticated users to `AppRoutes.AUTH.LOGIN` with the attempted URL preserved in the `redirect` search param.

### Code Splitting

The build automatically splits code into optimized chunks:

- Core React libraries cached separately for better browser caching
- Ant Design components in separate chunk to reduce main bundle size
- Form libraries isolated for pages that don't use forms
- TanStack Router automatically splits route code during build

### Testing Components

```typescript
// Use customRender for consistent test setup
const { user } = customRender(<MyComponent />, {
  withRouter: true, // Wrap with test TanStack Router context
  withContext: true, // Wrap with Context providers
  withForm: true, // Wrap with Form component
  formProps: { defaultValues: {} },
});

await user.click(screen.getByRole("button"));
expect(screen.getByText("Success")).toBeInTheDocument();
```

## Testing Standards

This project follows specific testing standards for consistency and maintainability.

### Test Structure

All tests should follow this structure:

1. **Import Organization** - Group imports logically
2. **Constants Section** - Define all test constants (field names, messages)
3. **Mock Data Section** - Define mock values, schemas, and handlers
4. **Mock Form Props** - Consolidated form configuration
5. **Setup Functions** - Reusable setup functions for each test scenario
6. **Test Suites** - Organized with describe blocks

### Setup Functions Pattern

Create reusable setup functions that return commonly used elements:

```typescript
// Setup for standalone component
const setupStandaloneComponent = (props = {}) => {
  const renderResult = customRender(<Component {...props} />, {
    withRouter: false,
    withContext: false,
  });

  return {
    ...renderResult,
    input: getByRole(DOM_ELEMENT_ROLE.TEXT_BOX),
  };
};

// Setup for component with Form
const setupComponentWithForm = (props = {}) => {
  const renderResult = customRender(
    <Component.Formik name={FIELD_NAME} {...props} />,
    {
      withForm: true,
      formProps: mockFormProps,
    }
  );

  return {
    ...renderResult,
    input: getByRole(DOM_ELEMENT_ROLE.TEXT_BOX),
  };
};
```

### customRender Options

The `customRender` utility provides flexible wrapper options:

- `withRouter` (default: true) - Wrap with test TanStack Router context
- `initialEntries` (default: `['/']`) - Set the starting route/search for router-aware tests
- `withContext` (default: true) - Wrap with Context providers
- `withForm` (default: false) - Wrap with Form component
- `formProps` - Form configuration when withForm is true

### TanStack Router Testing

Write TanStack Router-specific tests when a component or route reads router state, writes search params, renders `<Link />`, calls `useNavigate()`, uses the shared `useRedirect()` hook, or defines route guards with `beforeLoad`.

- Use `customRender()` with the default `withRouter: true` for router-aware components.
- Use `initialEntries` to test path or search-param behavior, such as `initialEntries: ['/?page=2&pageSize=10']`.
- Assert URL state through the returned `router` when testing navigation or search-param updates.
- Test route guards directly by calling `Route.options.beforeLoad` and asserting TanStack `redirect()` behavior.
- Use `expectRedirect()` and `expectNotFound()` from `src/routes/routerTestUtils.ts` when testing route guards, redirects, loaders, or not-found behavior.
- Test route search validation directly through `Route.options.validateSearch` or shared validators.
- Test route loaders directly when they contain branching logic, data shaping, redirects, or `notFound()` behavior.
- Route-adjacent `.test.*` and `.spec.*` files are ignored by the TanStack Router Vite plugin.
- Use `withRouter: false` only for components that do not render links and do not use TanStack Router hooks.

### Best Practices

1. Use constants for repetitive values
2. Create setup functions for each test scenario
3. Mock all external dependencies at the top
4. Clear mocks in `beforeEach` if needed
5. Use descriptive test names
6. Follow AAA pattern: Arrange, Act, Assert
7. Extract helper functions for complex operations
8. Return commonly used elements from setup functions

See test files in `src/shared/components/` for examples.

## Configuration

### Environment Variables

The project supports multiple environments using `env-cmd`:

- **`.env`** - Default environment variables (local development)
- **`.env.staging`** - Staging environment configuration
- **`.env.production`** - Production environment configuration

Environment variables must be prefixed with `VITE_` to be accessible in the application via `import.meta.env.VITE_*`.

Example `.env` file:

```bash
VITE_API_BASE_URL=http://localhost:3001/api
VITE_APP_NAME=My App
VITE_UNDER_DEVELOPMENT=true
```

### Prettier Configuration

Code formatting is managed by Prettier with the following settings (`.prettierrc`):

```json
{
  "semi": false, // No semicolons
  "singleQuote": true, // Single quotes for strings
  "trailingComma": "all" // Trailing commas everywhere possible
}
```

Run `pnpm format` to format all files according to these rules.

### TypeScript Configuration

Key TypeScript compiler options (`tsconfig.json`):

- **JSX**: `react-jsx` (React 17+ new JSX transform, no need to import React)
- **Module Resolution**: `bundler` (optimized for Vite)
- **Strict Mode**: Enabled for maximum type safety
- **Path Aliases**: `src/*` for absolute imports
- **Experimental Decorators**: Enabled for serializr models
- **Types**: Includes Vite, Vitest, and Testing Library types

### Vite Configuration

Build and development server settings (`vite.config.ts`):

- **Dev Server**: Runs on port 3000
- **Build Output**: `build/` directory
- **Code Splitting**: Manual vendor chunks plus automatic route code splitting
  - `react-vendor`: React, React-DOM, TanStack Router
  - `antd-vendor`: Ant Design and icons (~1 MB)
  - `form-vendor`: React Hook Form and Yup (~75 kB)
- **Plugins**: TanStack Router, React, TypeScript paths, SVGR for SVG imports
- **Route Generation**: TanStack Router ignores route-adjacent `.test.*` and `.spec.*` files
- **SCSS**: Modern compiler API with path aliases
- **Test Setup**: Vitest configured with jsdom, coverage via v8

### SCSS Path Aliases

The project includes SCSS path aliases for importing shared styles:

```typescript
// Available in TypeScript and SCSS files
@scssVariables   // → src/styles/variables.scss
@scssHelpers     // → src/styles/helpers.scss
@scssAntOverrides // → src/styles/antOverrides.scss
@scssMain        // → src/styles/main.scss
```

Usage in SCSS:

```scss
@use '@scssVariables' as *;
```

### Git Hooks (Husky)

Pre-commit hook (`.husky/pre-commit`) automatically runs:

```bash
pnpm lint:all  # Oxlint + Prettier check
```

This ensures all committed code passes linting and formatting checks. The hook is automatically installed when running `pnpm install`.

## Linting Configuration

This project uses **Oxlint** for fast, efficient linting of TypeScript and React code. The configuration is defined in `.oxlintrc.json`.

### Running Linting

- `pnpm lint` - Run Oxlint on the entire project
- `pnpm lint:fix` - Automatically fix linting issues where possible

### Oxlint Rules Explained

#### React Rules

- **`react/rules-of-hooks` (error)** - Enforces React Hooks rules to prevent common mistakes. Hooks must be called in the same order on every render and only at the top level (not in loops, conditions, or nested functions).

- **`react/exhaustive-deps` (warn)** - Validates dependencies array in `useEffect`, `useMemo`, and `useCallback`. Warns about missing or unnecessary dependencies to prevent stale closures.

- **`react/no-danger` (warn)** - Prevents usage of dangerous JSX props like `dangerouslySetInnerHTML`. These can expose the app to XSS attacks if not handled carefully.

- **`react/no-direct-mutation-state` (error)** - Prevents direct mutation of `this.state` in class components. State should only be updated via `setState()` to ensure proper re-rendering.

- **`react/no-deprecated` (warn)** - Prevents usage of deprecated React APIs. Helps maintain compatibility with future React versions.

- **`react/no-unknown-property` (error)** - Prevents usage of unknown DOM properties. Catches typos in DOM property names (e.g., 'class' instead of 'className').

- **`react/react-in-jsx-scope` (off)** - Disabled because React 17+ with new JSX transform doesn't require React to be in scope.

#### TypeScript Rules

- **`@typescript-eslint/no-unused-vars` (warn)** - Warns about unused variables to keep code clean. Helps identify dead code and potential bugs.

- **`@typescript-eslint/no-explicit-any` (warn)** - Warns about explicit 'any' types. Using 'any' bypasses TypeScript's type checking and should be avoided when possible.

- **`@typescript-eslint/no-non-null-assertion` (warn)** - Prevents non-null assertions (`!.`) in production code. Can lead to runtime errors if the value is actually null/undefined.

#### General JavaScript/TypeScript Rules

- **`no-console` (warn)** - Prevents usage of console statements in production. Console logs should be removed or replaced with proper logging.

- **`no-debugger` (error)** - Prevents usage of debugger statements. Debugger statements should never be committed to production code.

- **`no-duplicate-imports` (warn)** - Warns about duplicate imports from the same module. Helps keep imports organized and reduces bundle size.

- **`no-unreachable` (error)** - Prevents unreachable code after return, throw, continue, and break statements. Indicates dead code that should be removed.

- **`eqeqeq` (error)** - Requires using `===` and `!==` instead of `==` and `!=`. Prevents type coercion bugs and makes comparisons more predictable.

- **`no-eval` (error)** - Prevents the use of `eval()` function. `eval()` is dangerous as it executes arbitrary code and can be exploited.

- **`no-shadow` (warn)** - Prevents variable declarations from shadowing variables in outer scope. Helps avoid confusion and potential bugs from variable name reuse.

#### Async/Promise Rules

- **`no-promise-executor-return` (error)** - Requires proper handling of Promise rejections. Prevents unhandled promise rejections that can cause silent failures.

- **`require-await` (warn)** - Requires await in async functions. An async function without await is usually a mistake.

#### Import/Export Rules

- **`no-duplicate-exports` (error)** - Prevents duplicate exports. Multiple exports of the same name will cause errors.

### Ignored Patterns

The following files and directories are excluded from linting:

- `dist/` - Production build output
- `build/` - Alternative build output directory
- `coverage/` - Test coverage reports
- `node_modules/` - Third-party dependencies
- `*.config.js` - Configuration files (vite, vitest, etc.)
- `*.config.ts` - TypeScript configuration files
- `**/*.test.tsx` - Test files (already validated by TypeScript)
- `**/*.test.ts` - TypeScript test files
- `setupTests.ts` - Test setup file

## React 19 Specific Features

This boilerplate is built for React 19 and takes advantage of its latest features:

### New JSX Transform

- No need to `import React` in component files
- JSX is handled automatically by the `react-jsx` runtime
- Smaller bundle sizes and faster builds

### Modern Hooks

- Uses React 19's improved hook implementations
- Optimized `useEffect`, `useMemo`, and `useCallback` behavior
- Better TypeScript inference for hooks

### Component Patterns

- `createRoot` from `react-dom/client` (not legacy `ReactDOM.render`)
- Proper type definitions with `React.ReactNode` for children
- Event handlers use React 19's improved event types

### Type Imports

- Import types from `antd/es/*` instead of deprecated paths
- Use `import type { }` for type-only imports to optimize bundles
- Avoid importing from internal Ant Design packages (like `rc-*`)

## Browser Support

Based on `browserslist` configuration in `package.json`:

### Production

- Coverage for > 0.2% of global browser usage
- Excludes dead browsers and Opera Mini
- Modern browser features (ES6+, async/await, fetch, etc.)

### Development

- Latest Chrome, Firefox, and Safari versions
- Optimized for modern development experience
- Fast refresh and HMR support

## Project Structure Best Practices

### Adding New Features

1. **Create service hook** in `src/services/` for API interactions
2. **Define models** in `src/models/` with serializr decorators
3. **Build UI components** in `src/shared/components/` (if reusable) or directly in views
4. **Add validation** in `src/shared/validation/` for form schemas
5. **Write tests** alongside components following testing standards
6. **Add route files** in `src/routes/app/` if adding new pages

### Component Guidelines

- Keep components small and focused (Single Responsibility Principle)
- Use TypeScript for all files (strict mode enabled)
- Co-locate tests and styles with components
- Extract reusable logic into custom hooks
- Use React Hook Form for all forms
- Leverage React Query for server state

### Styling Guidelines

- Use SCSS modules for component-specific styles
- Import shared variables/mixins using `@use` syntax
- Follow BEM naming convention for class names
- Use Ant Design theme tokens for consistency
- Avoid inline styles except for dynamic values

### State Management Guidelines

- **Server State**: Use React Query (`useQuery`, `useMutation`)
- **Global Client State**: Use Context API (like AuthContext)
- **Local Component State**: Use `useState`, `useReducer`
- **Form State**: Use React Hook Form
- **URL State**: Use TanStack Router search params, params, and router state hooks

### TanStack Router Guidelines

Use file-based routing as the source of truth for application pages. Route files belong in `src/routes/app/`, while page UI should stay in `src/views/`. Keep route files thin: import the page component, define route-level metadata or guards, and avoid putting large UI implementations directly in route files.

Do not edit `src/routeTree.gen.ts` manually. It is generated by the TanStack Router Vite plugin when the dev server or build runs. The generated file is excluded from formatting, linting, file watching, and search noise. If route types look stale after adding, renaming, or deleting a route file, run `pnpm build` or restart `pnpm dev`.

Use these route conventions:

- `__root.tsx` defines root router behavior, shared router context typing, and the root outlet.
- `_authenticated.tsx` is the pathless protected layout route.
- `_authenticated.index.tsx` is the authenticated home page at `/`.
- `auth.tsx` is the auth layout route.
- `auth.login.tsx` is the login page at `/auth/login`.
- `app-components.tsx` is the development-only component showcase route.

The router is created in `src/routes/index.tsx`. Keep global router options there, such as default route fallbacks and `defaultPreload: 'intent'`. Prefer route-level configuration for page-specific behavior.

When adding a new page, add the route file first, then add an entry to `src/routes/routeConstants/appRoutes.ts` only if the path is referenced by navigation, redirects, tests, breadcrumbs, or shared components.

#### Common Route Recipes

```typescript
// src/routes/app/_authenticated.profile.tsx
import { createFileRoute } from '@tanstack/react-router'
import Profile from 'src/views/Profile'

export const Route = createFileRoute('/_authenticated/profile')({
  component: Profile,
})
```

Create dynamic resource routes with `$` params:

```typescript
// src/routes/app/_authenticated.users.$userId.tsx
import { createFileRoute, notFound } from '@tanstack/react-router'
import UserProfile from 'src/views/UserProfile'
import { getUserById } from 'src/services/userService'

export const Route = createFileRoute('/_authenticated/users/$userId')({
  loader: async ({ params }) => {
    const user = await getUserById(params.userId)

    if (!user) throw notFound()

    return user
  },
  component: UserProfile,
})
```

Dynamic route filenames contain `$`, such as `users.$userId.tsx`. Quote or escape these paths in shell commands, for example `src/routes/app/users.\$userId.tsx`.

Put route access rules in `beforeLoad`, not inside page components. Use `throw redirect(...)` for navigation guards and `throw notFound()` for unavailable routes. This keeps protected pages from rendering before the access decision is made. When redirecting to login, preserve the current location in a validated `redirect` search param so users can return to their original destination after successful login.

```typescript
import { createFileRoute, redirect } from '@tanstack/react-router'
import { validateRedirectSearch } from 'src/routes/redirectSearch'
import { AppRoutes } from 'src/routes/routeConstants/appRoutes'

export const Route = createFileRoute('/auth/login')({
  validateSearch: validateRedirectSearch,
  beforeLoad: ({ context, search }) => {
    if (context.auth.authenticated && context.auth.user) {
      throw redirect({ href: search.redirect ?? AppRoutes.HOME, replace: true })
    }
  },
  component: LoginForm,
})
```

#### Search Params

Avoid root-level `validateSearch` unless every route in the app shares the exact same search contract. Prefer route-level `validateSearch` for page-specific URL state. This keeps unrelated routes from inheriting search requirements they do not own.

Search params are inherited by child routes. If a parent route validates search params, links into its children may need to pass `search` explicitly or preserve the current search object with `Route.useSearch()`.

Use the helpers in `src/routes/routerSearchUtils.ts` to keep validators predictable:

```typescript
import { createFileRoute } from '@tanstack/react-router'
import {
  readEnumSearchParam,
  readPositiveIntegerSearchParam,
  readTrimmedStringSearchParam,
} from 'src/routes/routerSearchUtils'
import Users from 'src/views/Users'

const statuses = ['all', 'active', 'archived'] as const

export const Route = createFileRoute('/_authenticated/users')({
  validateSearch: (search) => ({
    status: readEnumSearchParam(search.status, statuses, 'all'),
    page: readPositiveIntegerSearchParam(search.page, 1),
    query: readTrimmedStringSearchParam(search.query),
  }),
  component: Users,
})
```

#### Loaders And React Query

Use route loaders for route-critical data that should be resolved before a page renders, especially when the route may redirect or throw `notFound()`. Use React Query for server-state caching, mutations, background refetching, and component-level data that can load after the route shell renders.

For larger apps, route loaders can coordinate with the shared `queryClient` to prefetch critical queries and avoid loading waterfalls.

#### TanStack Router + Query Pattern

The boilerplate exposes the shared React Query `queryClient` through TanStack Router context. Use this when route loaders need to warm or require Query cache data before a page renders.

Keep query options in feature service files so routes, components, tests, and mutations all share the same query key and query function:

```typescript
// src/services/users/users.queries.ts
import { queryOptions } from '@tanstack/react-query'
import { getUsers } from './users.api'

export interface UsersSearch {
  page: number
  query: string
}

export const usersQueryOptions = (search: UsersSearch) =>
  queryOptions({
    queryKey: ['users', 'list', search],
    queryFn: () => getUsers(search),
  })
```

Use route search params as the source of truth for list query keys. This keeps filters, pagination, browser back/forward behavior, and Query cache entries aligned:

```typescript
// src/routes/app/_authenticated.users.tsx
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import {
  readPositiveIntegerSearchParam,
  readTrimmedStringSearchParam,
} from 'src/routes/routerSearchUtils'
import { usersQueryOptions } from 'src/services/users/users.queries'
import Users from 'src/views/Users'

export const Route = createFileRoute('/_authenticated/users')({
  validateSearch: (search) => ({
    page: readPositiveIntegerSearchParam(search.page, 1),
    query: readTrimmedStringSearchParam(search.query),
  }),
  loaderDeps: ({ search }) => search,
  loader: ({ context, deps }) =>
    context.queryClient.ensureQueryData(usersQueryOptions(deps)),
  component: UsersRoute,
})

function UsersRoute() {
  const search = Route.useSearch()
  const { data } = useSuspenseQuery(usersQueryOptions(search))

  return <Users users={data} />
}
```

Use this convention for Query keys:

- `['users']` for all user-related data
- `['users', 'list', search]` for list pages driven by route search
- `['users', 'detail', userId]` for dynamic detail routes
- `['users', 'permissions', userId]` for related child resources

After mutations, invalidate Query cache for changed server data. Call `router.invalidate()` only when route guards, loaders, or router context decisions need to be re-evaluated.

```typescript
await queryClient.invalidateQueries({ queryKey: ['users'] })
await router.invalidate()
```

#### Route Fallbacks

The boilerplate defines default pending, error, and not-found fallbacks in `src/routes/routeFallbacks.tsx` and wires them in `src/routes/index.tsx`. Override these at the route level only when a feature needs a more specific empty, error, or loading state.

#### TanStack Router Devtools

TanStack Router Devtools are enabled only during local development through `import.meta.env.DEV`. They are rendered in `src/routes/index.tsx` beside `RouterProvider` and start closed by default.

Run the app with:

```bash
pnpm dev
```

Then open the small TanStack Router button in the bottom-left corner of the browser. Use it to inspect:

- The current route match stack
- Route params and validated search params
- Router state and location changes
- Loader, pending, error, and not-found route states
- Which routes are preloading when links use intent preloading

Keep devtools development-only. Do not use `TanStackRouterDevtoolsInProd` unless a project has a specific production debugging requirement and the security/privacy impact is reviewed.

Keep router context generic and small. The current router context receives `AuthContext` and the shared React Query `queryClient` through `RouterProvider`, so route guards and loaders can read pre-render dependencies without importing React context directly. Add new router context values only when they are needed before a route loads, and invalidate the router when context values that guards depend on change.

Use TanStack Router primitives for navigation:

- Use `<Link />` for user-visible links.
- Use `useNavigate()` or the shared `useRedirect()` hook for imperative navigation.
- Use route params for resource identity, such as `/users/$userId`.
- Use search params for shareable UI state, such as pagination, filters, sorting, and tabs.
- Keep search params serializable, preserve values as their natural JSON types when possible, and prefer route-level validation when a page depends on typed search values.

Tests that render router-aware components should use `customRender` with the default `withRouter: true`. Provide `initialEntries` when the component depends on the current path or search params.

## Contributing

When contributing to this project:

1. **Follow the code style** enforced by Prettier and Oxlint
2. **Write tests** for all new components and features
3. **Update documentation** when adding new patterns or features
4. **Use conventional commits** for clear git history
5. **Ensure all tests pass** before committing (`pnpm test`)
6. **Check build succeeds** before creating PRs (`pnpm build`)

The pre-commit hook will automatically check linting and formatting, but you should also:

- Run `pnpm coverage` to ensure adequate test coverage
- Test your changes in different browsers if UI-related
- Review the build output size if adding new dependencies
