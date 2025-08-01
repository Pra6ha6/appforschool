# FitGenius - AI-Powered Fitness App

A comprehensive fitness application that generates personalized diet and workout plans using AI-powered APIs.

## Features

- **Personalized Plan Generation**: AI-driven meal plans and workout routines
- **Multi-step User Profiling**: Comprehensive data collection for accurate recommendations
- **API-Based Intelligence**: Real-time plan generation with smart fallback systems
- **Responsive Design**: Optimized for all devices and screen sizes
- **Real-time Status**: API connectivity monitoring and error handling

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Icons**: Lucide React
- **API Integration**: Custom service layer with fallback support

## Getting Started

### Prerequisites

- Node.js 16+ and npm
- API access (optional - fallback system included)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your API credentials (optional)

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open http://localhost:5173 in your browser

## API Integration

The app uses a sophisticated API service layer that:

- **Primary Mode**: Connects to external fitness APIs for real-time plan generation
- **Fallback Mode**: Uses intelligent mock data when APIs are unavailable
- **Error Handling**: Graceful degradation with user-friendly error messages
- **Status Monitoring**: Real-time API connectivity status

### API Endpoints

- `POST /generate-nutrition-plan` - Generate personalized meal plans
- `POST /generate-workout-plan` - Generate custom workout routines
- `GET /health` - API health check

## Project Structure

```
src/
├── components/          # React components
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── PlanGenerator.tsx
│   ├── PlanDisplay.tsx
│   └── forms/          # Form components
├── services/           # API service layer
│   └── api.ts
├── types/             # TypeScript definitions
│   └── index.ts
├── utils/             # Utility functions
│   └── planGenerator.ts
└── App.tsx            # Main application
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_API_BASE_URL` | Base URL for fitness API | No |
| `VITE_API_KEY` | API authentication key | No |
| `VITE_ANALYTICS_ID` | Analytics tracking ID | No |

## Features in Detail

### Plan Generation
- Calculates BMR and daily calorie needs
- Adjusts for fitness goals (weight loss, muscle gain, etc.)
- Considers dietary restrictions and preferences
- Generates equipment-specific workout routines

### User Experience
- Progressive form with validation
- Real-time API status monitoring
- Smooth animations and transitions
- Mobile-optimized interface

### Error Handling
- Graceful API failure recovery
- User-friendly error messages
- Automatic fallback to mock data
- Retry mechanisms

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details