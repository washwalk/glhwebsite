# George Hadow Concert Scraper

A Next.js web application that scrapes and displays upcoming concert dates for George Hadow from kuhnfumusic.com.

## Features

- 🎵 Real-time concert data scraping from kuhnfumusic.com/tour-dates
- 📱 Responsive design that works on all devices
- ⚡ Fast Next.js application with server-side rendering
- 🔄 Automatic data fetching and display
- 🎫 Direct links to ticket purchases
- ➕ Manual concert addition and management
- ✏️ Edit and delete manually added concerts
- 💾 Local storage for manual concerts
- 📅 Automatic sorting by date

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
george-hadow-concerts/
├── pages/
│   ├── index.js          # Home page with concert display and manual management
│   └── api/
│       └── gigs.js       # API route for scraping concert data
├── public/               # Static assets
├── package.json          # Dependencies and scripts
├── next.config.js        # Next.js configuration
├── AGENTS.md            # Development guidelines for AI agents
└── README.md            # This file
```

## Manual Concert Management (Admin Only)

**Admin Access Required**: Only administrators can add, edit, or delete manual concerts.

### Admin Login
- Click "Admin Login" button in the top-right
- Enter the admin password (contact George for access)
- Once logged in, you'll see "✓ Admin Mode" indicator

### Manual Concert Features
- **Add Concerts**: Click "Add Concert Manually" to open the form
- **Edit Concerts**: Click the "Edit" button on manually added concerts
- **Delete Concerts**: Click the "Delete" button to remove concerts
- **Data Storage**: Manual concerts are stored locally in your browser's localStorage

Manual concerts are visually distinguished with a green "MANUAL" badge and yellow background.

## API Endpoints

### GET /api/gigs

Returns upcoming concert information scraped from kuhnfumusic.com/tour-dates.

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

Create a `.env.local` file in the project root:

```env
# Admin authentication password
NEXT_PUBLIC_ADMIN_PASSWORD=your_secure_password_here
```

The scraper makes direct requests to the public website and doesn't require additional environment variables.

## Contributing

1. Follow the coding guidelines in `AGENTS.md`
2. Test your changes locally
3. Run linting before committing
4. Create descriptive commit messages

## License

MIT License - see LICENSE file for details.

## Disclaimer

This application scrapes data from kuhnfumusic.com. Please respect the website's terms of service and robots.txt. This is for informational purposes only.