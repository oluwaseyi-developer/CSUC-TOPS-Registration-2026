# CSUC TOPS Anniversary & Covenant Service 2026 Registration

A web application for managing registrations for the CSUC TOPS Chapter Anniversary & Covenant Service 2026.

## 🎉 Event Details

- **Event**: TOPS CHAPTER Anniversary & Covenant Service
- **Theme**: "ARISING TO BUILD" - Nehemiah 2:18-20
- **Dates**: June 17-21, 2026
- **Covenant Service**: June 20, 2026
- **Venue**: CSUC National Campground, Kilometre 4, Ife/Ibadan Expressway, Ile-Ife, Osun State

## 🏗️ Architecture

This project follows **Clean Architecture** principles with CQRS pattern:

```
src/
├── CSUC.Registration.Api/           # API Layer (Controllers, Middleware)
├── CSUC.Registration.Application/   # Application Layer (Commands, Queries, DTOs)
├── CSUC.Registration.Domain/        # Domain Layer (Entities, Enums, Interfaces)
├── CSUC.Registration.Infrastructure/# Infrastructure Layer (EF Core, Repositories)
└── Frontend/                        # React Frontend (Vite, TypeScript)
```

## 🛠️ Tech Stack

### Backend
- .NET 8
- ASP.NET Core Web API
- Entity Framework Core
- PostgreSQL
- MediatR (CQRS)
- FluentValidation
- JWT Authentication

### Frontend
- React 18
- TypeScript
- Vite
- TailwindCSS
- React Query (TanStack Query)
- React Hook Form + Zod
- Framer Motion

## 🚀 Getting Started

### Prerequisites
- .NET 8 SDK
- Node.js 18+
- PostgreSQL

### Backend Setup

1. Update the connection string in `src/CSUC.Registration.Api/appsettings.json`

2. Run migrations:
```bash
cd src/CSUC.Registration.Api
dotnet ef database update
```

3. Run the API:
```bash
dotnet run
```

The API will be available at `https://localhost:5001`

### Frontend Setup

1. Install dependencies:
```bash
cd src/Frontend
npm install
```

2. Create `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

3. Run the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

## 🔐 Admin Access

Default admin credentials:
- **Username**: admin
- **Password**: Admin@TOPS2026

## 📋 Features

### Public
- ✅ Event registration form
- ✅ Form validation (Nigerian phone numbers)
- ✅ Success confirmation

### Admin Dashboard
- ✅ JWT Authentication
- ✅ View all registrations
- ✅ Search and pagination
- ✅ Registration statistics
- ✅ Export to Excel
- ✅ Delete registrations

## 🌐 Deployment

### Backend (Azure App Service / Railway / Render)
1. Set environment variables for production
2. Update CORS settings for your frontend domain
3. Use a production PostgreSQL database

### Frontend (Vercel / Netlify)
1. Set `VITE_API_URL` to your production API URL
2. Build: `npm run build`
3. Deploy the `dist` folder

## 📄 License

This project is for CSUC TOPS Chapter internal use.

## 🙏 Glory to God

*"So I answered them, and said to them, 'The God of heaven, He will prosper us; therefore we His servants will arise and build...'"* - Nehemiah 2:20
