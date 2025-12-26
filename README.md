# George Hadow Concert Scraper

A Next.js web application that scrapes and displays upcoming concert dates for George Hadow from kuhnfumusic.com.

## Features

- 🎵 Real-time concert data scraping from kuhnfumusic.com/tour-dates
- 📱 Responsive design that works on all devices
- ⚡ Fast Next.js application with server-side rendering
- 🔄 Automatic data fetching and display
- 🎫 Direct links to ticket purchases

## Tech Stack

- **Next.js** - React framework for production
- **React** - UI library
- **Axios** - HTTP client for API requests
- **Cheerio** - HTML parsing and scraping
- **Vercel** - Deployment platform

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/washwalk/GLH-website.git
cd GLH-website
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
george-shadow-concerts/
├── pages/
│   ├── index.js          # Home page displaying concerts
│   └── api/
│       └── gigs.js       # API route for scraping concert data
├── public/               # Static assets
├── package.json          # Dependencies and scripts
├── next.config.js        # Next.js configuration
├── AGENTS.md            # Development guidelines for AI agents
└── README.md            # This file
```

## API Endpoints

### GET /api/gigs

Returns upcoming concert information scraped from kuhnfumusic.com.

**Response Format:**
```json
[
  {
    "date": "Jan 15",
    "venue": "The Venue Name",
    "city": "City, ST",
    "link": "https://ticket-link.com"
  }
]
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Auto-fix ESLint issues

### Code Quality

This project follows strict coding standards defined in `AGENTS.md`. Key guidelines:

- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting
- Functional React components
- Proper error handling

## Deployment

This application is configured for deployment on Vercel with automatic deployments from the main branch.

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect Next.js and configure deployment
3. The app will be available at your Vercel domain

## Environment Variables

No environment variables are required for basic functionality. The scraper makes direct requests to the public website.

## Contributing

1. Follow the coding guidelines in `AGENTS.md`
2. Test your changes locally
3. Run linting before committing
4. Create descriptive commit messages

## License

MIT License - see LICENSE file for details.

## Disclaimer

This application scrapes data from kuhnfumusic.com. Please respect the website's terms of service and robots.txt. This is for informational purposes only.