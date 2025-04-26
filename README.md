# Fashion AI Stylist

A simple React app that lets users upload a clothing image or describe an item, then get suggestions for similar items and where to buy them.

## Features
- Upload an image to get similar clothing suggestions
- Enter a text description to get suggestions
- Results include images, names, and links to buy

## Tech Stack
- React + TypeScript
- Tailwind CSS
- (Optional) Node.js/Express backend proxy

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the dev server:
   ```bash
   npm run dev
   ```
3. Open [http://localhost:5173](http://localhost:5173) in your browser.

## API Integration
- The app is set up to call the `fashion_buddy_main_agent` API.
- You can use a direct API call (if CORS and public) or set up a backend proxy for security.
- See `src/api.ts` for where to add your API logic.

## Customization
- Update the API call logic in `src/api.ts`.
- Style and extend as needed! 