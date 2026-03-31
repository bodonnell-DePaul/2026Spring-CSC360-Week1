# Portfolio App (React + .NET)

This demo contains a full-stack portfolio website:
- Frontend: React + TypeScript (Vite)
- Backend: ASP.NET Core Web API + EF Core + SQLite
- Auth: Basic email/password auth with JWT

## Structure

- `backend/` - .NET API, SQLite DB, authentication, portfolio endpoints
- `frontend/` - React UI for public portfolio and authenticated admin actions

## Run the backend

```bash
cd backend
dotnet run
```

Backend URL: `http://localhost:5080`

Seeded admin credentials:
- Email: `admin@portfolio.local`
- Password: `Admin123!`

## Run the frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend URL: `http://localhost:5173`

Set API URL (optional):

```bash
echo "VITE_API_URL=http://localhost:5080/api" > frontend/.env
```

## API endpoints

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/portfolio/profile`
- `PUT /api/portfolio/profile` (auth required)
- `GET /api/portfolio/projects`
- `POST /api/portfolio/projects` (auth required)
- `PUT /api/portfolio/projects/{id}` (auth required)
- `DELETE /api/portfolio/projects/{id}` (auth required)
- `POST /api/portfolio/contact`
