# LostWare Script Hosting

A simple Node.js server that hosts the LostWare script for Roblox execution while blocking direct browser access.

## Features

- **Browser Access Blocked**: Returns 403 when accessed from a web browser
- **Roblox Compatible**: Works seamlessly with `game:HttpGetAsync()` 
- **Simple Setup**: One command to start

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

The server will run on `http://localhost:3000`

## Usage in Roblox

```lua
loadstring(game:HttpGetAsync("http://localhost:3000"))()
```

or

```lua
loadstring(game:HttpGetAsync("http://localhost:3000/script"))()
```

## How It Works

- Detects browser requests by checking User-Agent and Accept headers
- Blocks access if browser is detected (returns 403)
- Allows access from Roblox's HttpGetAsync (no browser headers)
- Returns plain text Lua code that executes directly

## Testing

Try accessing `http://localhost:3000` in your browser - you'll get "Access Denied"

The Roblox execution will work fine with the test message.

## Deployment

To deploy to a public server:
- Use services like Heroku, Replit, Railway, or Render
- Update the URL in your Roblox scripts
- The access blocking logic will work the same way
