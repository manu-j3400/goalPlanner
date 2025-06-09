# AI Personal Assistant

An intelligent personal assistant that helps manage your goals, academic work, and skill development by integrating with Google Calendar and leveraging AI capabilities.

## Features

- Google Calendar Integration
- Goal Management and Planning
- Academic Work Planning
- Skill Development Tracking
- AI-Powered Schedule Optimization
- Course Syllabus Integration

## Tech Stack

- Frontend: React with TypeScript
- Backend: Node.js with Express
- Database: MongoDB
- Authentication: Google OAuth
- AI Integration: OpenAI API
- Calendar Integration: Google Calendar API

## Project Structure

```
goalPlanner/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/        # Page components
│   │   ├── services/     # API services
│   │   └── types/        # TypeScript types
│   └── public/           # Static files
├── server/                # Backend Node.js application
│   ├── src/
│   │   ├── controllers/  # Route controllers
│   │   ├── models/       # Database models
│   │   ├── routes/       # API routes
│   │   └── services/     # Business logic
│   └── config/           # Configuration files
└── docs/                 # Documentation
```

## Setup Instructions

1. Clone the repository
2. Install dependencies:

   ```bash
   # Install backend dependencies
   cd server
   npm install

   # Install frontend dependencies
   cd ../client
   npm install
   ```

3. Set up environment variables:

   - Create `.env` files in both client and server directories
   - Add necessary API keys and configuration

4. Start the development servers:

   ```bash
   # Start backend server
   cd server
   npm run dev

   # Start frontend server
   cd ../client
   npm start
   ```

## Environment Variables

### Backend (.env)

```
PORT=5000
MONGODB_URI=your_mongodb_uri
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
OPENAI_API_KEY=your_openai_api_key
JWT_SECRET=your_jwt_secret
```

### Frontend (.env)

```
REACT_APP_API_URL=http://localhost:5000
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
```

## API Documentation

Detailed API documentation can be found in the `docs` directory.

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

MIT License
