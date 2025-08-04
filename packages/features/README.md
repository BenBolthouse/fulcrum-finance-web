# Features Package

This package contains feature modules that can be imported into the main React SPA. Each feature is organized as a separate directory with its own components, hooks, utilities, and types.

## Structure

```
packages/features/
├── README.md
├── package.json
├── tsconfig.json
├── index.ts (main export file)
└── auth/             # Authentication feature
    ├── components/
    ├── hooks/
    ├── services/
    ├── types/
    ├── index.ts
    └── README.md
```

## Feature Module Structure

Each feature module follows this structure:

```
feature-name/
├── components/       # React components specific to this feature
│   ├── FeatureComponent.tsx
│   └── index.ts
├── hooks/           # Custom hooks for this feature
│   ├── useFeatureHook.ts
│   └── index.ts
├── services/        # API calls and business logic
│   ├── featureService.ts
│   └── index.ts
├── types/           # TypeScript types and interfaces
│   ├── feature.types.ts
│   └── index.ts
└── index.ts         # Main export file for the feature
```

## Usage

Features can be imported into the main package:

```typescript
// Import specific features
import { AuthFeature } from '@fulcrum-finance/features/auth';

// Import shared utilities
import { useSharedHook } from '@fulcrum-finance/features/shared/hooks';
```

## Adding New Features

1. Create a new directory under `packages/features/`
2. Follow the standard feature module structure
3. Add the feature to the main `index.ts` export file
4. Update the main package to import and use the feature 