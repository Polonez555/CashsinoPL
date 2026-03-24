# CashsinoPL 🎰

A modern, secure online casino platform built with Next.js 14, TypeScript, and cryptographically secure random number generation.

## Features

- ✅ **Roulette** - European Roulette with secure RNG
- ✅ **Blackjack** - Classic Blackjack with full game logic
- 🚧 **Uno** - Multiplayer Uno (coming soon)
- 🔒 **Secure RNG** - Cryptographically secure random number generation using Node.js crypto module
- 🎨 **Modern UI** - Responsive design built with Next.js 14 App Router
- 🧪 **Full Test Coverage** - Unit, integration, and E2E tests
- 🔄 **CI/CD Pipeline** - GitHub Actions and Jenkins pipelines
- 📊 **Code Quality** - ESLint, Prettier, and SonarQube integration

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5.4
- **Styling**: CSS with inline styles
- **Testing**: Jest, Supertest, TestCafé
- **CI/CD**: GitHub Actions, Jenkins
- **Code Quality**: ESLint, Prettier, SonarQube

## Getting Started

### Prerequisites

- Node.js 20 or higher
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Polonez555/CashsinoPL.git
cd CashsinoPL

# Install dependencies
npm install
```

### Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## Testing

```bash
# Run all tests
npm test

# Run unit tests
npm run test:unit

# Run integration tests
npm run test:integration

# Run E2E tests
npm run test:e2e
```

## Code Quality

```bash
# Lint code
npm run lint

# Check formatting
npm run format-check
```

## Project Structure

```
CashsinoPL/
├── app/                      # Next.js App Router
│   ├── api/                 # API routes
│   │   └── game/           # Game API endpoints
│   ├── games/              # Game pages
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Homepage
├── lib/                     # Core logic
│   ├── games/              # Game logic
│   │   ├── roulette.ts     # Roulette game
│   │   └── blackjack.ts    # Blackjack game
│   └── rng.ts              # Secure RNG
├── tests/                   # Test files
│   ├── unit/              # Unit tests
│   ├── integration/       # Integration tests
│   └── e2e/               # E2E tests
├── .github/                # GitHub Actions workflows
├── docs/                   # Documentation
└── ...config files         # Configuration files
```

## Game Rules

### Roulette
- European Roulette (numbers 0-36)
- Bet types: straight, color, even/odd, low/high
- Payouts: 35:1 for straight bets, 1:1 for outside bets

### Blackjack
- Standard Blackjack rules
- Dealer stands on 17 or higher
- Blackjack pays 3:2
- Hit or Stand options

## Security

- Cryptographically secure random number generation using Node.js `crypto` module
- Input validation on all API endpoints
- Type-safe with TypeScript strict mode

## CI/CD

### GitHub Actions
- Triggers on push to main/develop, pull requests, and scheduled runs
- Runs lint, format checks, and tests
- Node.js 20 with caching for faster builds

### Jenkins
- Declarative pipeline with multiple stages
- Automated testing and builds
- Success/failure notifications

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature (refs #XX)'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Testing powered by [Jest](https://jestjs.io/) and [TestCafé](https://devexpress.github.io/testcafe/)
- CI/CD with [GitHub Actions](https://github.com/features/actions) and [Jenkins](https://www.jenkins.io/)