# Ship-it-Polls - Modular Architecture Guide

## Overview

This is a modern, modular polling application built with **Next.js 16**, **React 19**, **TypeScript**, and **Tailwind CSS**. The project follows industry best practices with clear separation of concerns and organized file structure.

## Project Structure

```
ship-it-polls/
├── types/                    # TypeScript type definitions
│   ├── poll.ts              # Poll-related interfaces
│   └── index.ts             # Central type exports
│
├── lib/                      # Business logic layer
│   ├── hooks/               # Custom React hooks
│   │   ├── useLocalBackend.ts    # Backend data management hook
│   │   └── index.ts              # Hook exports
│   ├── utils/               # Utility functions
│   │   ├── storage.ts       # localStorage operations
│   │   ├── helpers.ts       # General helpers
│   │   ├── seed.ts          # Initial seed data
│   │   └── index.ts         # Utils exports
│   └── index.ts             # Lib exports
│
├── components/              # React components
│   ├── common/              # Shared/layout components
│   │   ├── Button.tsx       # Reusable button component
│   │   ├── Header.tsx       # App header with navigation
│   │   ├── Footer.tsx       # App footer
│   │   └── index.ts         # Common components exports
│   ├── polls/               # Feature-specific components
│   │   ├── PollCard.tsx     # Poll list card component
│   │   ├── PollOptionComponent.tsx  # Poll option display
│   │   └── index.ts         # Polls components exports
│   └── index.ts             # Central component exports
│
├── app/                     # Next.js App Router pages
│   ├── layout.tsx           # Root layout wrapper
│   ├── page.tsx             # Main app entry point
│   ├── globals.css          # Global styles
│   ├── HomePage.tsx         # Poll list view
│   ├── CreatePollPage.tsx   # Create poll form
│   ├── PollDetailPage.tsx   # Poll results view
│   ├── polls/
│   │   └── [id]/            # Dynamic poll detail route
│   └── create/              # Create poll route
│
├── public/                  # Static assets
├── package.json             # Dependencies
├── tsconfig.json            # TypeScript config
├── next.config.ts           # Next.js config
└── README.md               # Project documentation
```

## Architecture Layers

### 1. **Types Layer** (`types/`)
- Central location for all TypeScript interfaces and type definitions
- Ensures type safety across the entire application
- Exports organized through index files for clean imports

**Key Types:**
- `Poll`: Complete poll object structure
- `PollOption`: Individual poll option
- `PollCreationData`: Data for creating new polls
- `BackendHook`: Interface for backend operations

### 2. **Data/Business Logic Layer** (`lib/`)

#### Hooks (`lib/hooks/`)
- `useLocalBackend`: Custom hook managing all data operations
  - User identification
  - Poll persistence via localStorage
  - Create poll functionality
  - Vote poll functionality

#### Utils (`lib/utils/`)
- **storage.ts**: localStorage wrapper functions
  - `getStoredUserId()`: Retrieve user ID
  - `setStoredUserId()`: Save user ID
  - `getStoredPolls()`: Retrieve polls
  - `setStoredPolls()`: Save polls

- **helpers.ts**: Common utility functions
  - `delay()`: Simulate network delays
  - `generateId()`: Generate random IDs
  - `generateUserId()`, `generatePollId()`, `generateOptionId()`

- **seed.ts**: Initial data for first-time users
  - `INITIAL_POLLS`: Array of sample polls

### 3. **Component Layer** (`components/`)

#### Common Components (`components/common/`)
**Button.tsx**
- Reusable button with 4 variants: `primary`, `secondary`, `outline`, `ghost`
- Full TypeScript support with proper forwarding

**Header.tsx**
- Sticky header with logo and navigation
- Responsive mobile menu
- Navigation handlers

**Footer.tsx**
- Footer with links and copyright

#### Feature Components (`components/polls/`)
**PollCard.tsx**
- Displays polls in grid layout
- Shows poll question
- Includes "View Results" button

**PollOptionComponent.tsx**
- Individual poll option display
- Shows voting button or vote count
- Animated progress bars
- Indicates user's voted option

### 4. **Page/Presentation Layer** (`app/`)

**app/page.tsx** (Main App Component)
- Central orchestrator for routing
- Manages application state:
  - `view`: Current view type (list, create, detail)
  - `selectedPollId`: Currently selected poll
- Integrates all layers

**HomePage.tsx**
- Grid display of all polls
- Create new poll button
- Empty state handling

**CreatePollPage.tsx**
- Form for creating new polls
- Dynamic option fields (add/remove)
- Form validation
- Question and option input

**PollDetailPage.tsx**
- Display poll with results
- Shows voting interface
- Displays vote percentages after voting
- Back navigation

**layout.tsx**
- Root HTML structure
- Metadata configuration
- Font imports

## Data Flow

```
useLocalBackend Hook (lib/hooks/)
    ↓
    ├── Manages userId (localStorage)
    ├── Manages polls array (localStorage)
    └── Provides createPoll() and votePoll()
        ↓
    App Component (app/page.tsx)
        ↓
        ├── HomePage
        │   └── PollCard components
        ├── CreatePollPage
        │   └── Form inputs
        └── PollDetailPage
            └── PollOptionComponent components
```

## Key Features

### 1. **Modular Organization**
- Clear separation of concerns
- Each file has a single responsibility
- Easy to test and maintain

### 2. **Type Safety**
- Full TypeScript implementation
- Centralized type definitions
- Prevents runtime errors

### 3. **Responsive Design**
- Mobile-first approach
- Tailwind CSS utility classes
- Works on all screen sizes

### 4. **State Management**
- Custom hook for data management
- localStorage persistence
- No external state library needed

### 5. **Component Reusability**
- Button component with variants
- Common export patterns
- Clean prop interfaces

## File Import Pattern

The project uses path aliases (`@/`) for clean imports:

```typescript
// Instead of:
import { Button } from '../../../components/common/Button';

// Use:
import { Button } from '@/components/common';
```

This is configured in `tsconfig.json` and `next.config.ts`.

## Dependencies

- **Next.js 16**: React framework with App Router
- **React 19**: UI library
- **TypeScript**: Type safety
- **Tailwind CSS 4**: Utility-first styling
- **lucide-react**: Icon library

## Getting Started

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
npm start
```

## Styling

- **Global Styles**: `app/globals.css`
- **Tailwind CSS**: Utility-first CSS framework
- **Inline Styles**: Used only for dynamic values (width %)

## Best Practices Implemented

✅ **Component Structure**
- Functional components with TypeScript
- Proper prop interfaces
- Single responsibility principle

✅ **Code Organization**
- Logical folder structure
- Clear naming conventions
- Centralized exports

✅ **State Management**
- Custom hook for backend logic
- Props for component communication
- localStorage for persistence

✅ **Performance**
- Memoized callbacks with `useCallback`
- Optimized re-renders
- Lazy loading state

✅ **Accessibility**
- Semantic HTML
- ARIA labels where needed
- Keyboard navigation support

✅ **Error Handling**
- Try-catch blocks for async operations
- User feedback on errors
- Graceful degradation

## Extending the Application

### Adding a New Feature
1. Create types in `types/poll.ts` if needed
2. Add logic to `lib/hooks/useLocalBackend.ts` or create new hook
3. Create UI components in `components/`
4. Integrate into page components

### Adding a New Page
1. Create component in `app/`
2. Import into `app/page.tsx`
3. Add routing logic in App component
4. Update navigation handlers

### Adding Styles
1. Use Tailwind utility classes
2. For reusable styles, consider creating component classes
3. Avoid inline styles except for dynamic values

## Testing Considerations

The modular structure makes testing straightforward:
- Test types in isolation
- Test hooks with `@testing-library/react`
- Test components with mocked props
- Mock localStorage for backend hook tests

## Future Enhancements

- [ ] API integration for real backend
- [ ] User authentication
- [ ] Real-time updates with WebSockets
- [ ] Poll sharing/embedding
- [ ] Analytics dashboard
- [ ] Poll categories/search
- [ ] Advanced filtering
- [ ] Email notifications

---

**Created**: 2025  
**Framework**: Next.js 16 with React 19  
**Language**: TypeScript  
**Styling**: Tailwind CSS 4
