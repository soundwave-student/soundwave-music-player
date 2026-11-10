# SoundWave — Spotify-Inspired Music Player

A responsive music-player web app for a front-end lab assignment. The interface is inspired by common music-streaming layouts, but uses its own name, styling, sample data, and original generated demo audio. It is not affiliated with Spotify.

## Files

- `index.html` — semantic page structure and accessible controls
- `styles.css` — dark responsive interface using CSS Grid and Flexbox
- `script.js` — search, mood filters, audio playback, shuffle, repeat, volume, and liked-track toggle
- `assets/` — three original synthesized WAV demo tracks

## Run the project

1. Extract the ZIP file.
2. Open the `Spotify_Style_Music_Player` folder in Visual Studio Code.
3. Open `index.html`.
4. Right-click the file and choose **Open with Live Server** (if installed).
5. Click a track card or play button to hear the included demo audio.

The site can also be opened directly in a browser, but Live Server is recommended while developing.

## Main features

- Responsive sidebar navigation and mobile menu
- Search tracks by title, artist, or mood
- Filter by Chill, Pop, and Focus
- Play and pause original sample audio
- Next and previous track controls
- Shuffle and repeat controls
- Volume and playback progress sliders
- Liked-track toggle
- Accessible labels, skip link, keyboard focus indicators, and live search result announcements

## Git and GitHub

1. Create a new GitHub repository named `soundwave-music-player`.
2. Open the project folder in VS Code.
3. Open **Terminal → New Terminal**.
4. Run:

```bash
git init
git add .
git commit -m "Build SoundWave music player"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/soundwave-music-player.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your GitHub username. Sign in to GitHub if prompted.

For future changes:

```bash
git add .
git commit -m "Improve music player"
git push
```

## Deploy with GitHub Pages

1. Open the repository on GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Choose branch `main` and folder `/ (root)`.
5. Click **Save** and wait for deployment.
6. Your website URL will look like:

`https://YOUR-USERNAME.github.io/soundwave-music-player/`

## Rubric checklist

### Semantic HTML5 and accessibility — 20 points
- [x] HTML5 document structure and language
- [x] Meta viewport and description
- [x] Semantic `header`, `nav`, `main`, `section`, `aside`, and `footer`
- [x] Skip-to-content link
- [x] Accessible names for player controls and form inputs
- [x] Live announcements for status messages
- [x] Visible keyboard focus indicators

### Responsive layout — 25 points
- [x] CSS Grid and Flexbox
- [x] Desktop, tablet, and mobile breakpoints
- [x] Mobile sidebar toggle
- [x] Responsive cards, track list, and fixed player

### JavaScript interactivity — 25 points
- [x] Search tracks
- [x] Filter by mood
- [x] Play and pause audio
- [x] Next and previous tracks
- [x] Shuffle and repeat
- [x] Volume and progress controls
- [x] Like/unlike current track

### Code quality and Git — 15 points
- [x] HTML, CSS, and JS separated
- [x] Descriptive names and organized functions
- [x] Comments explaining key project behavior
- [ ] Initialize Git and push to GitHub

### Deployment and presentation — 15 points
- [ ] Test at desktop, tablet, and phone sizes
- [ ] Demonstrate search and filters
- [ ] Play, pause, skip, shuffle, and repeat tracks
- [ ] Publish with GitHub Pages
- [ ] Prepare a short explanation of the code

## Important notes

This is a front-end learning project. The included audio files are short original synthesized demos, not commercial songs. There is no account system, streaming service, server, or payment processing. The project uses a Spotify-inspired dark music-app layout but is not the official Spotify application.
