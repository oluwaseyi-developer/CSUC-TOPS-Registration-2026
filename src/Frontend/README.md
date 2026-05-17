# CSUC TOPS Covenant Service 2026 - Frontend

A modern, mobile-responsive React frontend for the registration system.

## Features

- 🎨 **Beautiful UI** - Glass morphism design with smooth animations
- 📱 **Mobile-First** - Fully responsive design
- ⚡ **Fast** - Built with Vite for optimal performance
- 🔒 **Type-Safe** - Written in TypeScript with Zod validation
- 🎭 **Animations** - Smooth transitions with Framer Motion

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- React Query (TanStack Query)
- React Hook Form + Zod
- Framer Motion
- Lucide Icons

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Build

```bash
npm run build
```

## Project Structure

```
src/
├── api/              # API client functions
├── components/
│   ├── ui/           # Reusable UI components
│   ├── registration/ # Registration form components
│   └── admin/        # Admin dashboard components
├── hooks/            # Custom React hooks
├── lib/              # Utility functions
├── pages/            # Page components
└── types/            # TypeScript types
```

## Pages

- `/` - Home page with registration form
- `/admin` - Admin dashboard

## Environment Variables

Create a `.env` file based on `.env.example`:

```env
VITE_API_URL=/api
```
