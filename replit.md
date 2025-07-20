# Recurring Date Picker Application

## Overview

This is a React-based task management application with a sophisticated recurring date picker component, built following the TickTick app's design principles. The application allows users to create tasks with complex recurring patterns, including daily, weekly, monthly, and yearly schedules with advanced customization options.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **Routing**: Wouter for client-side routing
- **Styling**: Tailwind CSS with shadcn/ui components for consistent design
- **State Management**: Zustand for global state management
- **Authentication**: Firebase Authentication for user management
- **UI Components**: Radix UI primitives with custom styling via shadcn/ui

### Backend Architecture
- **Runtime**: Node.js with Express server
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Database Provider**: Neon serverless PostgreSQL
- **API Pattern**: RESTful API with Express routes

### Key Components

#### Recurring Date Picker System
The core feature is a comprehensive recurring date picker that supports:
- **Basic Patterns**: Daily, weekly, monthly, yearly recurrence
- **Advanced Customization**: Every X intervals, specific days of week, complex patterns like "2nd Tuesday of every month"
- **Date Ranges**: Start date selection with optional end dates
- **Visual Preview**: Mini calendar showing calculated recurring dates

#### Authentication System
- Firebase Authentication integration for user management
- Firestore database integration for user profiles and task storage
- Protected routes with authentication guards
- User session persistence and state management

#### Task Management
- Professional TickTick-style recurring task creation interface
- Task creation with advanced recurring patterns (daily, weekly, monthly, yearly)
- Complex patterns like "2nd Tuesday of every month"
- Real-time calendar preview showing recurring dates
- Task completion tracking with Firestore persistence
- Priority levels (low, medium, high)
- Due date management with recurrence support

## Data Flow

1. **Authentication Flow**: Firebase handles user authentication with automatic Firestore user document creation
2. **Task Creation**: Users create tasks through the professional UI, which stores recurring patterns in Firestore
3. **Recurrence Calculation**: Client-side utilities generate recurring dates based on stored patterns with real-time preview
4. **Calendar Preview**: Interactive mini calendar shows calculated dates as users configure patterns
5. **Data Persistence**: Tasks and recurrence patterns stored in Firestore with real-time sync
6. **Task Loading**: React Query manages task fetching and caching from Firestore

## External Dependencies

### Core Technologies
- **React 18**: Modern React with hooks and concurrent features
- **TypeScript**: Full type safety across frontend and backend
- **Vite**: Fast development and optimized production builds
- **Tailwind CSS**: Utility-first styling framework

### Authentication & Database
- **Firebase**: Authentication service for user management
- **PostgreSQL**: Primary database for application data
- **Neon**: Serverless PostgreSQL hosting
- **Drizzle ORM**: Type-safe database operations with PostgreSQL

### UI & State Management
- **Zustand**: Lightweight state management
- **Radix UI**: Accessible component primitives
- **React Query**: Server state management and caching
- **date-fns**: Date manipulation and formatting

### Development Tools
- **Jest**: Testing framework with React Testing Library
- **ESLint/TypeScript**: Code quality and type checking
- **Replit**: Development environment integration

## Deployment Strategy

The application is designed for deployment on Replit with the following approach:

1. **Development**: Vite dev server for frontend with Express backend
2. **Build Process**: Vite builds the frontend to `/dist/public`, esbuild bundles the backend
3. **Production**: Express serves static files and API routes
4. **Database**: Neon PostgreSQL with connection pooling
5. **Environment**: Environment variables for Firebase and database configuration

### Database Schema
- **Users**: Firebase UID mapping with profile information
- **Tasks**: Task data with recurring pattern JSON storage
- **Recurrence Patterns**: Structured JSON with type validation via Zod schemas

The architecture prioritizes type safety, user experience, and maintainability while providing a robust recurring date picker that can handle complex scheduling scenarios similar to professional task management applications.