# Copilot Working Group Repository Instructions

## Repository Overview

This repository hosts hands-on workshops to learn and practice GitHub Copilot. It's a React-based web application designed for educational purposes, demonstrating Copilot features including Chat in the GitHub UI, Copilot in VSCode, and custom agents.

## Technology Stack

- **Runtime**: Node.js v20
- **Language**: TypeScript 5.9.3
- **Framework**: React 19.2.0
- **Build Tool**: Vite 7.2.4
- **Routing**: TanStack Router 1.140.0
- **State Management**: TanStack React Query 5.90.12
- **Linting**: ESLint 9.39.1 with TypeScript ESLint
- **Compiler Features**: React Compiler (Babel plugin)

## Build and Development Commands

### Initial Setup
**Always run `npm ci` before building or running the application.** This ensures dependencies are installed correctly.

```bash
npm ci
```

### Development Server
Run the development server with hot module replacement:

```bash
npm run dev
```

This starts Vite's development server (usually on http://localhost:5173).

### Build
Compile TypeScript and build for production:

```bash
npm run build
```

This command:
1. Runs TypeScript compiler in build mode (`tsc -b`)
2. Builds the application with Vite
3. Outputs to the `dist/` directory

**Build time**: Approximately 3-5 seconds on a clean build.

### Linting
Run ESLint to check code quality:

```bash
npm run lint
```

To automatically fix linting issues:

```bash
npm run lint:fix
```

### Preview
Preview the production build locally:

```bash
npm run preview
```

## Project Structure

```
.
├── .github/
│   ├── workflows/
│   │   └── lint.yml          # GitHub Actions workflow for linting PRs
│   └── copilot-instructions.md
├── src/
│   ├── components/           # React components
│   ├── contexts/             # React contexts
│   ├── hooks/                # Custom React hooks
│   ├── routes/               # TanStack Router route components
│   ├── services/             # API services and data fetching
│   ├── types/                # TypeScript type definitions
│   ├── main.tsx              # Application entry point
│   ├── index.css             # Global styles
│   └── routeTree.gen.ts      # Auto-generated TanStack Router tree
├── assets/                   # Static assets and images
├── dist/                     # Build output (gitignored)
├── package.json              # Dependencies and scripts
├── tsconfig.json             # TypeScript configuration (references)
├── tsconfig.app.json         # App TypeScript config
├── tsconfig.node.json        # Node/Vite TypeScript config
├── vite.config.ts            # Vite configuration
├── eslint.config.js          # ESLint configuration
└── index.html                # HTML entry point
```

## GitHub Actions and CI/CD

### Lint Workflow (`.github/workflows/lint.yml`)
Runs on every pull request:
1. Checks out code
2. Sets up Node.js v20
3. Runs `npm ci` to install dependencies
4. Runs `npm run lint`

**Important**: The lint workflow uses `npm ci` (not `npm install`) for consistent, reproducible builds.

## Key Configuration Files

- **vite.config.ts**: Vite build configuration with React and TanStack Router plugins, includes React Compiler
- **eslint.config.js**: ESLint configuration using flat config format (ESLint 9+)
- **tsconfig.json**: Root TypeScript configuration using project references
- **package.json**: All npm scripts and dependencies

## Development Notes

### TypeScript Configuration
The project uses TypeScript project references with separate configs for app code and build tools:
- `tsconfig.app.json` - Application code configuration
- `tsconfig.node.json` - Vite/Node configuration

### TanStack Router
The router automatically generates `routeTree.gen.ts` from the route files. This is a generated file and should not be edited manually.

### React Compiler
This project uses the experimental React Compiler via Babel plugin. This optimizes React components automatically.

### Dependencies Installation
- **Always use `npm ci`** for consistent dependency installation
- Do not use `npm install` unless intentionally updating dependencies
- The `package-lock.json` is committed and should be respected

## Common Issues and Solutions

### Build Errors After Checkout
If you encounter TypeScript errors like "Cannot find type definition file", run:
```bash
npm ci
npm run build
```

### Linting Failures
The project uses ESLint 9 with flat config. Ensure you're running the lint command through npm:
```bash
npm run lint
```

## Validation Steps

Before committing changes:
1. Run `npm run lint` to ensure code quality
2. Run `npm run build` to verify the build succeeds
3. Check that no unintended files are added to git (e.g., `dist/`, `node_modules/`)

## Additional Context

- This is an educational repository designed for workshop participants
- Users are expected to fork the repository to their own accounts
- The application includes TanStack Router DevTools and React Query DevTools for development
- Static assets for documentation are stored in the `assets/` directory
