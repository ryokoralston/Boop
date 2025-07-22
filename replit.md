# Replit.md - Boop! Game

## Overview

This is a full-stack web application featuring a cute animal "booping" game built with React, Express, and PostgreSQL. The application uses a modern TypeScript setup with Vite for the frontend and Express for the backend API. The game allows players to click on animal characters to score points, featuring sound effects and visual animations.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a full-stack monorepo architecture with clear separation between frontend and backend:

- **Frontend**: React-based SPA with TypeScript, built using Vite
- **Backend**: Express.js server with TypeScript 
- **Database**: PostgreSQL with Drizzle ORM
- **State Management**: Zustand for client-side state
- **Styling**: Tailwind CSS with Radix UI components

## Key Components

### Frontend Architecture
- **React 18** with TypeScript for the main UI framework
- **Vite** as the build tool and development server
- **Tailwind CSS** for utility-first styling
- **Radix UI** component library for accessible UI primitives
- **React Three Fiber** for 3D graphics capabilities (imported but not actively used in current game)
- **Zustand** for lightweight state management
- **TanStack Query** for server state management

### Backend Architecture
- **Express.js** server with TypeScript
- **ESM modules** throughout the codebase
- **Memory storage** as the current data persistence layer (with interface for easy database migration)
- API routes prefixed with `/api`
- Comprehensive request logging middleware

### Database Layer
- **Drizzle ORM** configured for PostgreSQL
- **Neon Database** serverless PostgreSQL provider
- Schema definition in shared directory for type safety
- Database migrations support via Drizzle Kit

### Game Components
- **GameBoard**: Main game area with animal positioning
- **AnimalCharacter**: Interactive animal components with click handlers
- **ScoreDisplay**: Real-time score tracking
- **SoundManager**: Audio management for game sounds
- **Audio Store**: Zustand store for sound state management
- **Game Store**: Zustand store for game phase management

## Data Flow

1. **Game State**: Managed through Zustand stores (`useGame`, `useAudio`)
2. **User Interactions**: Click events on animals trigger score updates and sound effects
3. **Audio System**: Separate audio elements for background music, hit sounds, and success sounds
4. **Server Communication**: Ready for API integration via TanStack Query (currently using memory storage)

## External Dependencies

### Core Framework Dependencies
- React ecosystem (React, React DOM, React Three Fiber)
- Express.js for server framework
- Vite for build tooling and development

### Database & ORM
- Drizzle ORM for type-safe database queries
- Neon Database for serverless PostgreSQL
- Drizzle Kit for migrations

### UI & Styling
- Tailwind CSS for styling
- Radix UI for accessible component primitives
- Lucide React for icons
- Inter font family

### State Management & Data Fetching
- Zustand for client state management
- TanStack React Query for server state

### Development Tools
- TypeScript for type safety
- ESBuild for production bundling
- TSX for development server execution

## Deployment Strategy

### Development
- Frontend: Vite dev server with HMR
- Backend: TSX for direct TypeScript execution
- Database: Neon serverless PostgreSQL

### Production Build
- Frontend: Vite build to `dist/public`
- Backend: ESBuild bundle to `dist/index.js`
- Static serving: Express serves built frontend assets
- Environment: Node.js with ESM modules

### Environment Configuration
- `DATABASE_URL` required for PostgreSQL connection
- Vite handles environment variables for client-side
- Express configuration for server-side environment

The application is structured as a monorepo with shared types and schemas, making it easy to maintain type safety across the full stack. The current implementation uses memory storage but is architected to easily transition to the configured PostgreSQL database when needed.