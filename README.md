#
 🌍 EcoTrack - CO2 Carbon Footprint Calculator

A full-stack Next.js application for calculating and tracking your annual carbon footprint across energy, transportation, lifestyle, and waste categories.
##
 📸 Screenshots

###
 Calculator Interface

!
[
Calculator
](
./screenshots/calculator.png
)

*
Multi-step form for calculating your carbon footprint
*

###
 Results Dashboard

!
[
Results Dashboard
](
./screenshots/dashboard.png
)

*
Interactive charts showing your emission breakdown
*

###
 Calculation History

!
[
History
](
./screenshots/history.png
)

*
Track and compare your past calculations
*

##
 🚀 Quick Start

### Prerequisites

- Node.js 20+ and npm
- Docker and Docker Compose
- Git

### Installation

1. **Clone the repository**
```bash
git clone <https://github.com/racemsethom5/ecotrack.git>
cd ecotrack
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure API key** (Optional)
```bash
cp .env.example .env.local
```
Edit `.env.local` and add your CarbonInterface API key:
```env
CARBON_INTERFACE_API_KEY=your_api_key_here
```
Get your free API key at [CarbonInterface.com](https://www.carboninterface.com/)

**Note:** App works without API key using fallback calculations.

4. **Start the application**
```bash
docker-compose up
```

The app will be available at **http://localhost:3000**

## 📁 Project Structure

```
ecotrack/
├── src/
│   ├── app/
│   │   ├── api/emissions/      # API endpoints
│   │   ├── results/            # Results page
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Calculator page
│   ├── components/
│   │   ├── calculator/         # Form components
│   │   └── results/            # Dashboard components
│   ├── lib/
│   │   ├── validators/         # Zod schemas
│   │   ├── mongodb.ts          # DB connection
│   │   ├── carbonInterface.ts  # API integration
│   │   └── emissionsCalculator.ts  # Calculations
│   ├── models/
│   │   └── EmissionRecord.ts   # Mongoose model
│   └── types/
│       └── index.ts            # TypeScript types
├── docker-compose.yml
├── .env.local
└── package.json
```

## 🧪 Testing

```bash
npm test              # Run tests
npm run test:watch    # Watch mode
npm run test:coverage # With coverage
```

## 🐳 Docker Commands

```bash
docker-compose up           # Start services
docker-compose up -d        # Start in background
docker-compose down         # Stop services
docker-compose down -v      # Stop and remove data
docker-compose logs -f app  # View logs
```

## 📋 Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `MONGODB_URI` | Yes | MongoDB connection string (configured in docker-compose.yml) |
| `CARBON_INTERFACE_API_KEY` | No | API key (app works without it) |

## 🛠 Tech Stack

- **Next.js 16** - Full-stack framework (handles both frontend and backend)
  - *Why?* Single codebase for UI and API routes, built-in TypeScript support, optimized performance, and simplified deployment
- **TypeScript** - Type safety across the entire application
- **MongoDB + Mongoose** - NoSQL database for flexible emission records storage
- **Tailwind CSS** - Utility-first styling for rapid UI development
- **Recharts** - Interactive data visualization for emission breakdowns
- **React Hot Toast** - User-friendly notifications
- **Zod** - Schema validation for both frontend forms and backend APIs
- **Docker** - Containerization for consistent development and deployment environments


##
 🤖 AI Usage

AI assistance was used in the following areas:
-
 
**
Design improvements
**
 - UI/UX enhancements and component styling

**
Bug fixing
**
 - Debugging and resolving technical issues

**
Documentation
**
 - README and setup guides

