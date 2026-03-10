# Frens MVP 🎵

A song request and donation platform tailored for streamers in the "just-chatting" and interactive livestreaming niche. Built with Next.js 14+ and modern frontend technologies.

## 🌟 Features

- **Song Requests**: Viewers can request songs with donations
- **YouTube Integration**: Search and play YouTube videos
- **Real-time Queue**: Manage song requests with drag-and-drop
- **Custom Overlays**: OBS-compatible overlays for alerts and player
- **Donation Tiers**: Configure custom donation amounts with visual feedback
- **Analytics Dashboard**: Track donations, requests, and top songs

## 🚀 Tech Stack

| Category | Technology |
|:---------|:-----------|
| **Framework** | Next.js 14+ (App Router) |
| **Styling** | Tailwind CSS v3.4+ |
| **UI Components** | shadcn/ui (Radix-based) |
| **State Management** | Zustand (global), TanStack Query (server) |
| **Form Handling** | React Hook Form + Zod validation |
| **Icons** | Lucide React |
| **Charts** | Recharts |
| **Animation** | Framer Motion |
| **Package Manager** | pnpm |

## 📦 Getting Started

### Prerequisites

- Node.js 20+ LTS
- pnpm (or npm)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd music-donation-2
```

2. Install dependencies:
```bash
pnpm install
# or
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Update `.env.local` with your values:
```env
NEXT_PUBLIC_YOUTUBE_API_KEY=your_api_key_here
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_PLATFORM_FEE_PERCENTAGE=5
```

5. Start the development server:
```bash
pnpm dev
# or
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🏗 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (marketing)/        # Public pages
│   ├── (auth)/            # Auth pages
│   ├── (dashboard)/       # Protected dashboard
│   ├── (viewer)/          # Viewer public profiles
│   └── overlay/          # OBS overlays
├── components/
│   ├── ui/               # shadcn/ui components
│   ├── layout/           # Layout components
│   ├── shared/           # Shared components
│   └── ...
├── hooks/               # Custom React hooks
├── lib/                 # Utilities and helpers
├── store/              # Zustand stores
├── types/              # TypeScript types
└── styles/             # Global styles
```

## 📝 Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier

## 🎨 Design Tokens

- **Primary Accent**: Premium Modern Orange (#FF6B35)
- **Background**: Light/White (#FFFFFF, #FAFAFA)
- **Text Primary**: Dark (#1A1A2E)
- **Text Secondary**: Gray (#6B7280)
- **Font Family**: Inter, system-ui, sans-serif

## 📄 Documentation

See the `docs/` folder for:
- [`01-Architecture-And-Rules.md`](docs/01-Architecture-And-Rules.md) - Full architecture and coding standards
- [`02-Implementation-Plan.md`](docs/02-Implementation-Plan.md) - Complete task list
- [`features/`](docs/features/) - Detailed feature specifications

## 🤝 Contributing

This is an MVP project. Contributions are welcome after the initial MVP is complete.

## 📄 License

[Your License Here]

---

Built with ❤️ using the [Agentic Workflow Factory](https://opencode.ai/).
