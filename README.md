# Music App

A full-stack music app for listening to and creating music.

## 🚀 Quick Start

### Local Development
```bash
npm install
npm start
```
Then open `http://localhost:3000` in your browser

### Deploy to Netlify (Free)

1. Push this repo to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "New site from Git"
4. Select your repository
5. Build command: `npm run build`
6. Publish directory: `public`
7. Deploy!

Or click the button below:

[![Deploy to Netlify](https://www.netlifyusercontent.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/kade123456128/music-app)

### Deploy to Vercel (Free)

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Click "Deploy"

## Features

- 🎵 Browse and manage playlists
- 📝 Create custom playlists
- 🎧 View playlist details
- 🌐 Full-stack web application

## Tech Stack

- **Backend:** Node.js + Express.js
- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Styling:** Modern CSS with gradients and responsive design

## Installation

1. Clone the repository
```bash
git clone https://github.com/kade123456128/music-app.git
cd music-app
```

2. Install dependencies
```bash
npm install
```

3. Start the server
```bash
npm start
```

4. Open your browser and navigate to `http://localhost:3000`

## Development

To run in development mode with auto-restart:
```bash
npm run dev
```

## API Endpoints

- `GET /api/playlists` - Get all playlists
- `GET /api/playlists/:id` - Get a specific playlist
- `POST /api/playlists` - Create a new playlist

## Future Enhancements

- User authentication
- Music file uploads
- Play audio functionality
- Social sharing features
- Recommendations engine
- Dark mode

## License

MIT
