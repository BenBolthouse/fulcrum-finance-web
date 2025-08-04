# Feature-Based Project Structure

This document explains how the project is structured to organize features as separate packages that can be imported into the main React SPA.

## Overview

The project uses a monorepo structure with Nx to organize features as separate packages. Each feature is self-contained with its own components, hooks, services, and types, making it easy to import and use in the main application.

## Project Structure

```
packages/
├── common/          # Shared utilities and components
├── features/        # Feature packages
│   ├── auth/        # Authentication feature
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── types/
│   │   └── index.ts
│   └── index.ts     # Main features export
└── main/            # Main React SPA
```

## Feature Package Structure

Each feature follows a consistent structure:

### 1. **Types** (`types/`)
- TypeScript interfaces and types
- Shared across the feature
- Example: `auth.types.ts`

### 2. **Services** (`services/`)
- API calls and business logic
- External service integrations
- Example: `authService.ts`

### 3. **Hooks** (`hooks/`)
- Custom React hooks
- State management logic
- Example: `useAuth.ts`

### 4. **Components** (`components/`)
- React components specific to the feature
- UI components and providers
- Example: `AuthProvider.tsx`, `LoginForm.tsx`

### 5. **Index Files**
- Export all public APIs
- Provide clean import interface

## Auth Feature Example

The auth feature demonstrates the complete structure:

### Types
```typescript
// packages/features/auth/types/auth.types.ts
export interface User {
  id: string;
  email: string;
  // ... other properties
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  // ... other methods
}
```

### Services
```typescript
// packages/features/auth/services/authService.ts
class AuthService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    // API call implementation
  }
  
  async logout(): Promise<void> {
    // Logout implementation
  }
}
```

### Hooks
```typescript
// packages/features/auth/hooks/useAuth.ts
export const useAuth = (): AuthContextType => {
  // State management and authentication logic
  return {
    user,
    isAuthenticated,
    login,
    logout,
    // ... other properties
  };
};
```

### Components
```typescript
// packages/features/auth/components/AuthProvider.tsx
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const auth = useAuth();
  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};
```

## Usage in Main Package

The main package can import and use features:

```typescript
// packages/main/example-usage.tsx
import { AuthProvider, useAuthContext, LoginForm } from '@fulcrum-finance/features';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <div className="app">
        <AuthContent />
      </div>
    </AuthProvider>
  );
};
```

## Benefits of This Structure

### 1. **Modularity**
- Each feature is self-contained
- Easy to add/remove features
- Clear separation of concerns

### 2. **Reusability**
- Features can be shared across different applications
- Consistent API across features
- Easy to test individual features

### 3. **Maintainability**
- Clear file organization
- Easy to find and modify code
- Reduced coupling between features

### 4. **Scalability**
- Easy to add new features
- Teams can work on different features independently
- Clear boundaries between features

## Adding New Features

To add a new feature (e.g., `dashboard`):

1. **Create the directory structure:**
   ```bash
   mkdir -p packages/features/dashboard/{components,hooks,services,types}
   ```

2. **Create the feature files:**
   - `types/dashboard.types.ts`
   - `services/dashboardService.ts`
   - `hooks/useDashboard.ts`
   - `components/DashboardProvider.tsx`

3. **Export from the feature:**
   ```typescript
   // packages/features/dashboard/index.ts
   export * from './types';
   export * from './services';
   export * from './hooks';
   export * from './components';
   ```

4. **Export from the features package:**
   ```typescript
   // packages/features/index.ts
   export * from './dashboard';
   ```

5. **Use in the main package:**
   ```typescript
   import { DashboardProvider } from '@fulcrum-finance/features';
   ```

## Package Dependencies

### Features Package
- `react`: Peer dependency for React components
- Internal dependencies between features (if needed)

### Main Package
- `@fulcrum-finance/features`: Imports feature packages
- `react`: For React components

## Development Workflow

1. **Feature Development:**
   - Work on features in isolation
   - Test features independently
   - Use TypeScript for type safety

2. **Integration:**
   - Import features into main package
   - Compose features together
   - Handle feature interactions

3. **Testing:**
   - Unit tests for individual features
   - Integration tests for feature combinations
   - E2E tests for complete workflows

## Best Practices

1. **Keep features focused:** Each feature should have a single responsibility
2. **Use TypeScript:** Ensure type safety across features
3. **Document APIs:** Clear documentation for feature interfaces
4. **Test thoroughly:** Unit and integration tests for each feature
5. **Follow naming conventions:** Consistent naming across features
6. **Minimize dependencies:** Keep features as independent as possible

This structure provides a solid foundation for building scalable React applications with clear feature boundaries and excellent developer experience. 