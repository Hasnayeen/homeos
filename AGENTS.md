# AGENTS.md - HomeOS Development Guide

## Build/Lint/Test Commands

- **PHP Tests**: `composer test` or `php artisan test` (runs Pest test suite)
- **PHP Lint**: `vendor/bin/pint` (Laravel Pint formatter)
- **JS/TS Build**: `npm run build` or `npm run build:ssr` (for SSR)
- **JS/TS Lint**: `npm run lint` (ESLint with auto-fix)
- **JS/TS Types**: `npm run types` (TypeScript check)
- **JS/TS Format**: `npm run format` or `npm run format:check`
- **Development**: `composer run dev` (starts server, queue, logs, and Vite)
- **Single Test**: `php artisan test --filter TestName`

## Code Style Guidelines

- **PHP**: Laravel PSR-4 standards, strict types, return type hints, camelCase for methods/properties
- **TypeScript**: 4-space tabs, single quotes, semicolons, explicit types for props/functions
- **React**: Functional components with hooks, props interfaces, no React import needed
- **Imports**: Absolute imports using `@/` alias for TypeScript, full namespace for PHP
- **CSS**: Tailwind utility classes, use `cn()` for conditional classes
- **Naming**: PascalCase for components/classes, camelCase for functions/variables, kebab-case for files
- **Error Handling**: Use ValidationException for validation, try/catch for external calls
- **File Structure**: Follow Laravel conventions (app/, resources/js/, tests/)
