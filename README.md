# FlexFrame - Video Stretch App

A cross-platform video stretching application that allows users to apply 2-axis warping effects to videos with real-time preview.

## 🚀 Tech Stack

### Frontend (Mobile)
- **React Native** with **Expo** (latest)
- **TypeScript** with strict mode
- **Expo Router** for navigation
- **NativeWind** for styling (Tailwind CSS)
- **React Query** for state management
- **Context API** for global state
- **Supabase Auth** for authentication

### Backend (API)
- **Node.js** with **Express**
- **TypeScript** with strict mode
- **Supabase** (PostgreSQL) for database
- **JWT** authentication via Supabase
- **Joi** for validation
- **CORS**, **Helmet**, **Morgan** for security & logging

### Development & Deployment
- **ESLint** + **Prettier** for code quality
- **Jest** for testing
- **Metro** bundler
- **Vercel** ready for backend deployment
- **Expo EAS** ready for mobile deployment

## 📁 Project Structure

```
newapp/
├── app/                    # Expo Router pages
│   ├── _layout.tsx        # Root layout with providers
│   ├── index.tsx          # Home page (todos)
│   ├── login.tsx          # Login screen
│   └── signup.tsx         # Signup screen
├── src/
│   ├── components/        # Reusable components
│   │   ├── common/        # Common UI components
│   │   └── providers/     # Context providers
│   ├── hooks/             # Custom React hooks
│   ├── services/          # API clients & services
│   ├── types/             # TypeScript type definitions
│   ├── utils/             # Utility functions
│   └── constants/         # App constants & config
├── backend/               # Express.js API server
│   ├── src/
│   │   ├── routes/        # API route handlers
│   │   ├── middleware/    # Express middleware
│   │   └── index.ts       # Server entry point
│   └── package.json       # Backend dependencies
├── assets/                # Static assets
└── config files...        # Various configuration files
```

## 🛠️ Setup Instructions

### Prerequisites

- Node.js 18+ and npm/yarn
- Expo CLI: `npm install -g @expo/cli`
- Supabase account: [supabase.com](https://supabase.com)

### 1. Clone and Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Settings > API to get your keys
3. Create the todos table:

```sql
-- Create todos table
CREATE TABLE todos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  completed BOOLEAN DEFAULT FALSE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE todos ENABLE ROW LEVEL SECURITY;

-- Create policy for users to only see their own todos
CREATE POLICY "Users can view their own todos" ON todos
  FOR ALL USING (auth.uid() = user_id);
```

### 3. Environment Configuration

Copy and configure environment files:

```bash
# Frontend environment
cp .env.example .env
# Edit .env with your Supabase credentials

# Backend environment
cp backend/.env.example backend/.env
# Edit backend/.env with your Supabase service role key
```

**Frontend (.env):**
```env
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url_here
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
EXPO_PUBLIC_API_URL=http://localhost:3000/api
```

**Backend (backend/.env):**
```env
PORT=3000
NODE_ENV=development
SUPABASE_URL=your_supabase_url_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here
```

### 4. Development

Start both frontend and backend in development mode:

```bash
# Terminal 1: Start backend API server
cd backend
npm run dev

# Terminal 2: Start Expo development server
npm start
```

The backend API will be available at `http://localhost:3000/api`

## 📱 Features

### Authentication
- ✅ Email/password signup and login
- ✅ Supabase Auth integration
- ✅ Protected routes
- ✅ Auto-redirect based on auth state
- ✅ Secure token storage

### Todo Management
- ✅ Create, read, update, delete todos
- ✅ Mark todos as completed
- ✅ Real-time updates with React Query
- ✅ User-specific todos (RLS)

### UI/UX
- ✅ Modern, responsive design with NativeWind
- ✅ Loading states and error handling
- ✅ Error boundaries for crash protection
- ✅ Form validation and user feedback

### API
- ✅ RESTful API with Express
- ✅ JWT authentication middleware
- ✅ Input validation with Joi
- ✅ Error handling and logging
- ✅ Health check endpoint

## 🧪 Testing

```bash
# Run frontend tests
npm test

# Run backend tests
cd backend
npm test
```

## 🏗️ Building & Deployment

### Frontend (Mobile App)

```bash
# Preview build
npm run build:android  # or build:ios

# Production build with EAS
npx eas build --platform android --profile production
```

### Backend (API)

```bash
# Build for production
cd backend
npm run build

# Deploy to Vercel (after connecting your repo)
vercel --prod
```

## 📋 Available Scripts

### Frontend
- `npm start` - Start Expo development server
- `npm run android` - Start on Android device/emulator
- `npm run ios` - Start on iOS device/simulator
- `npm run web` - Start web version
- `npm test` - Run tests
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

### Backend
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm test` - Run tests
- `npm run lint` - Run ESLint

## 🔧 API Endpoints

### Health Check
- `GET /api/health` - Server health status

### Todos (Protected)
- `GET /api/todos` - Get user's todos
- `POST /api/todos` - Create new todo
- `PUT /api/todos/:id` - Update todo
- `DELETE /api/todos/:id` - Delete todo

All protected endpoints require `Authorization: Bearer <token>` header.

## 🎯 Next Steps

Some ideas for extending this app:

1. **Add OAuth providers** (Google, GitHub, etc.)
2. **Implement push notifications**
3. **Add offline support** with React Query persistence
4. **Create todo categories/tags**
5. **Add due dates and reminders**
6. **Implement real-time collaboration**
7. **Add file attachments to todos**
8. **Create a web dashboard**

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Run linting and tests
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

**Happy coding! 🎉**

For questions or issues, please open an issue in the GitHub repository.