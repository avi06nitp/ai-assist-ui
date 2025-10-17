# Orbis - AI Assistant Chat Interface

A modern, real-time AI chat interface built with Next.js 15, React 19, and TypeScript. Orbis provides an intuitive conversational interface with markdown support, typing animations, and message status indicators.

## Technology Stack

- **Framework**: Next.js 15.2.3 (App Router)
- **Runtime**: React 19 with Server Components
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4.0.15
- **Animations**: Framer Motion 12.5.0
- **Markdown**: react-markdown with remark-gfm
- **Icons**: Lucide React
- **Development**: Turbopack

## Features

- Real-time chat interface with typing indicators
- Markdown rendering for formatted responses
- Message delivery and read status tracking
- Smooth animations and transitions
- Responsive design for mobile and desktop
- Auto-scrolling message feed
- Error handling and loading states

## Prerequisites

- Node.js 20.x or higher
- npm, yarn, pnpm, or bun package manager

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ai-assist-ui
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env.local
```

4. Update `.env.local` with your configuration:
```
NEXT_PUBLIC_API_URL=https://ai-assist-bot-backend.onrender.com
```

## Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build production bundle
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality

## Project Structure

```
ai-assist-ui/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Main chat interface component
│   │   ├── layout.tsx         # Root layout with metadata
│   │   └── globals.css        # Global styles and Tailwind directives
├── public/                    # Static assets
├── .env.local                 # Local environment variables (not committed)
├── .env.example               # Environment variables template
├── .gitignore                 # Git ignore rules
├── next.config.ts             # Next.js configuration
├── tsconfig.json              # TypeScript configuration
├── tailwind.config.js         # Tailwind CSS configuration
├── postcss.config.mjs         # PostCSS configuration
└── package.json               # Project dependencies

```

## API Integration

The application communicates with a backend API endpoint for AI responses. The default endpoint is:

```
POST https://ai-assist-bot-backend.onrender.com/ask
```

### Request Format

```json
{
  "question": "User's question here"
}
```

### Response Format

```json
{
  "answer": "AI generated response"
}
```

## Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_API_URL` | Backend API endpoint URL | Yes |

### Customization

**Brand Colors**: Update the color scheme in `src/app/page.tsx` and `src/app/globals.css`

**Typing Speed**: Modify the interval delay in the `simulateTyping` function (line 68 in `src/app/page.tsx`)

**Fonts**: Configure in `src/app/layout.tsx` using Next.js font optimization

## Building for Production

1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm run start
```

The optimized build will be created in the `.next` directory.

## Deployment

### Vercel (Recommended)

1. Push your code to a Git repository
2. Import the project in Vercel
3. Configure environment variables
4. Deploy

### Other Platforms

The application can be deployed to any platform that supports Node.js:

- AWS Amplify
- Netlify
- Railway
- Docker containers

Ensure environment variables are configured in your deployment platform.

## Performance

- Server-side rendering for optimal initial load
- Code splitting and lazy loading
- Optimized fonts with next/font
- Turbopack for faster development builds

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### API Connection Issues

Check that the backend API is accessible and CORS is properly configured.

### Build Errors

Ensure all dependencies are installed:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Type Errors

Verify TypeScript configuration and update type definitions:
```bash
npm update @types/react @types/node
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/your-feature`
5. Submit a pull request

## License

Copyright (c) 2025 Atomic Labs Pvt. Ltd. All rights reserved.

## Support

For issues and questions, please open an issue in the repository or contact the development team.
