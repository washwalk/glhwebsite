# AGENTS.md - George Hadow Concert Scraper

This document provides coding guidelines and commands for the George Hadow concert scraping application.

## Project Overview
This is a Next.js application that scrapes concert dates from kuhnfumusic.com/tour-dates and displays upcoming gigs for George Hadow.

## Build/Lint/Test Commands

### Development
```bash
npm run dev          # Start development server (http://localhost:3000)
```

### Building
```bash
npm run build        # Create production build
npm run start        # Start production server (after build)
```

### Code Quality
```bash
npm run lint         # Run ESLint with Next.js rules
npm run lint:fix     # Auto-fix ESLint issues
```

### Testing
```bash
# No tests currently configured - add Jest/Vitest when implementing tests
# npm run test       # Run all tests
# npm run test:watch # Run tests in watch mode
```

## Manual Concert Management

The application includes functionality for manually adding concerts via a text file:

- **File-based Management**: Manual concerts stored in `concerts.txt` file
- **Format**: `Date|Venue|City|Link` (pipe-separated values)
- **Data Loading**: File loaded at runtime and merged with scraped data
- **Visual Indicators**: Manual concerts shown with green "MANUAL" badges and yellow background
- **Sorting**: All concerts (scraped + manual) sorted by date automatically

## Code Style Guidelines

### File Structure & Naming
- Use kebab-case for file names: `user-profile.tsx`, `api-handler.ts`
- Use PascalCase for React component names: `ConcertList.tsx`
- Group related files in directories: `components/`, `pages/api/`, `utils/`
- Use `index.ts` files for clean imports from directories

### Imports
Organize imports in this order with blank lines between groups:
```typescript
// 1. React and Next.js imports
import React from 'react';
import { useState, useEffect } from 'react';
import { NextPage } from 'next';

// 2. Third-party libraries (alphabetical)
import axios from 'axios';
import cheerio from 'cheerio';

// 3. Internal imports (absolute paths preferred)
import { Button } from '@/components/ui/button';
import { api } from '@/lib/api';

// 4. Relative imports (avoid when possible)
import { formatDate } from '../utils/date';

// 5. Type imports (separate from value imports)
import type { Concert } from '@/types/concert';
```

### TypeScript
- Use TypeScript for all files (.ts/.tsx extensions)
- Prefer interfaces over types for object definitions
- Use strict typing - avoid `any` type
- Define types near their usage or in dedicated type files

```typescript
// Good: Interface for component props
interface ConcertCardProps {
  concert: Concert;
  onClick?: () => void;
}

// Good: Type for API responses
type ApiResponse<T> = {
  data: T;
  error?: string;
};
```

### React Components
- Use functional components with hooks
- Prefer named exports over default exports
- Use descriptive component names
- Keep components focused on single responsibility

```typescript
// Good: Named export, clear interface
export interface ConcertListProps {
  concerts: Concert[];
  loading?: boolean;
}

export function ConcertList({ concerts, loading }: ConcertListProps) {
  // Component logic here
}
```

### Hooks & State Management
- Use React hooks for state management
- Custom hooks for reusable logic
- Avoid over-using useEffect - prefer server components when possible
- Handle loading and error states properly

```typescript
// Good: Custom hook for data fetching
export function useConcerts() {
  const [concerts, setConcerts] = useState<Concert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchConcerts()
      .then(setConcerts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { concerts, loading, error };
}
```

### Error Handling
- Use try/catch for async operations
- Provide user-friendly error messages
- Log errors for debugging
- Use Next.js error boundaries for React errors

```typescript
// API route error handling
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = await scrapeConcerts();
    res.status(200).json(data);
  } catch (error) {
    console.error('Failed to fetch concerts:', error);
    res.status(500).json({ error: 'Failed to fetch concert data' });
  }
}

// React error boundary
'use client';
export default function ErrorFallback({ error, reset }: ErrorFallbackProps) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
```

### Formatting & Style
- Use Prettier for consistent formatting (auto-formats on save)
- Follow ESLint rules (extends next/core-web-vitals)
- Use semantic HTML elements
- Maintain consistent indentation (2 spaces)
- Max line length: 100 characters

### API Design
- Use RESTful conventions in pages/api/
- Validate input data
- Return consistent response formats
- Handle CORS appropriately

```typescript
// Good: Consistent API response structure
export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: string;
};
```

### Security Considerations
- Validate and sanitize all user inputs
- Use HTTPS for external API calls
- Implement rate limiting for scraping operations
- Never expose sensitive data in client-side code
- Use environment variables for API keys

### Performance
- Use Next.js Image component for images
- Implement proper loading states
- Avoid unnecessary re-renders with React.memo/useMemo
- Use server components when possible
- Optimize bundle size

### Git & Version Control
- Use descriptive commit messages
- Follow conventional commits format when possible
- Keep PRs focused on single features
- Review code before merging

## Tools & Dependencies
- **Next.js**: React framework with SSR/SSG
- **React**: UI library
- **TypeScript**: Type safety
- **ESLint**: Code linting (Next.js config)
- **Prettier**: Code formatting
- **Axios**: HTTP client for API calls
- **Cheerio**: HTML parsing for web scraping

## Development Workflow
1. `npm run dev` - Start development server
2. Make changes with hot reload
3. `npm run lint` - Check code quality
4. `npm run build` - Test production build
5. Commit with descriptive message

## Adding Tests (Future)
When implementing tests:
```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
```

Add to package.json:
```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```

For single test file:
```bash
npm run test -- components/ConcertCard.test.tsx
```</content>
<parameter name="filePath">AGENTS.md