# Quick Start Guide

## Installation

```bash
cd ship-it-polls
npm install
```

## Development

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Overview

This is a **modular polling application** with industry-standard architecture:

### Core Structure
- **`types/`** - TypeScript interfaces and types
- **`lib/`** - Business logic (hooks, utilities)
- **`components/`** - Reusable React components
- **`app/`** - Next.js pages and entry point

### Key Components

1. **Header** - Navigation and branding
2. **HomePage** - List of all polls
3. **CreatePollPage** - Form to create new polls
4. **PollDetailPage** - Display results and voting interface
5. **Footer** - Footer with links

### Key Hook

**`useLocalBackend`** - Manages:
- User identification
- Poll storage (localStorage)
- Poll creation
- Voting functionality

## Features

✅ Create polls with multiple options  
✅ Vote on polls  
✅ View results with percentages  
✅ Responsive design (mobile, tablet, desktop)  
✅ LocalStorage persistence  
✅ Smooth animations  
✅ Clean, modern UI  

## Available Scripts

- **`npm run dev`** - Start dev server
- **`npm run build`** - Build for production
- **`npm start`** - Start production server
- **`npm run lint`** - Run ESLint

## Project Layout Example

```
Home Page          Create Page        Detail Page
┌──────────────┐  ┌──────────────┐   ┌──────────────┐
│ [PollCard]   │  │ Question Box │   │ Poll Results │
│ [PollCard]   │  │ Option 1     │   │ [Vote] 45%   │
│ [PollCard]   │  │ Option 2     │   │ [Vote] 35%   │
│              │  │ Add Option   │   │ [Vote] 20%   │
│              │  │ [Publish]    │   │              │
└──────────────┘  └──────────────┘   └──────────────┘
```

## Styling

The project uses **Tailwind CSS** for styling. All styles are class-based for consistency and maintainability.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### Port already in use
```bash
# Use a different port
npm run dev -- -p 3001
```

### Clear cache
```bash
rm -rf .next node_modules
npm install
npm run dev
```

### localStorage not working
- Check if cookies/storage is enabled in browser
- Open DevTools → Application → Local Storage

## Next Steps

See **ARCHITECTURE.md** for detailed documentation on:
- Project structure
- Data flow
- Adding features
- Best practices

---

Happy coding! 🚀
