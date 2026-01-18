# 10XScale.ai Login UI

Custom login interface for 10XScale.ai, built with Next.js 15, React 19, and Tailwind CSS. Based on ZITADEL's login UI with custom branding and side-by-side layout.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/10XScale-in/zitadel-ui)

## 🚀 Live Demo

**Production**: [https://zitadel-ui-flax.vercel.app/ui/v2/login/loginname](https://zitadel-ui-flax.vercel.app/ui/v2/login/loginname)

## ✨ Features

- **Side-by-side Layout**: Modern split-screen design with branding panel
- **10XScale.ai Branding**: Custom logos, colors, and trust badges
- **Network Background**: Professional tech-inspired background image
- **Responsive Design**: Adapts to mobile with top-to-bottom layout
- **Dark Mode Support**: Automatic theme switching
- **12 Languages**: Full internationalization support
- **Vercel Optimized**: Ready for serverless deployment

## 📋 Prerequisites

- **Node.js**: v20.x or higher
- **pnpm**: v10.x (`npm install -g pnpm`)

## 🛠️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/10XScale-in/zitadel-ui.git
cd zitadel-ui
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Configure Environment

Create a `.env.local` file:

```env
# Zitadel Backend
ZITADEL_API_URL=https://dev.10xscale.ai

# Service User Token (for API calls)
ZITADEL_SERVICE_USER_TOKEN=your_service_user_token

# Theme Configuration
NEXT_PUBLIC_THEME_LAYOUT=side-by-side
NEXT_PUBLIC_BASE_PATH=/ui/v2/login
```

### 4. Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🚢 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Environment Variables for Vercel

Set these in your Vercel project settings:

| Variable | Description |
|----------|-------------|
| `ZITADEL_API_URL` | Your Zitadel instance URL |
| `ZITADEL_SERVICE_USER_TOKEN` | Service user PAT token |
| `NEXT_PUBLIC_THEME_LAYOUT` | `side-by-side` or `top-to-bottom` |
| `NEXT_PUBLIC_BASE_PATH` | Base path (e.g., `/ui/v2/login`) |

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   └── (login)/           # Login flow pages
├── components/
│   ├── dynamic-theme.tsx  # Side-by-side/top-to-bottom layout
│   └── ...                # UI components
├── lib/
│   ├── theme.ts           # Theme configuration
│   ├── server-transport.ts # HTTP Connect transport
│   └── zitadel.ts         # Zitadel client setup
└── styles/                # Global CSS

public/
├── ui/v2/login/
│   ├── 10xscale-black.svg # Dark logo
│   ├── 10xscale-white.svg # Light logo
│   └── 9142209.jpg        # Background image
└── ...
```

## 🎨 Theme Customization

### Layout Options

Set `NEXT_PUBLIC_THEME_LAYOUT`:

- **`side-by-side`**: Split screen with branding on left, form on right
- **`top-to-bottom`**: Traditional stacked layout

### Appearance Options

Set `NEXT_PUBLIC_THEME_APPEARANCE`:

- **`flat`**: Clean, minimal borders
- **`material`**: Elevated with shadows
- **`glass`**: Frosted glass effect

### Roundness Options

Set `NEXT_PUBLIC_THEME_ROUNDNESS`:

- **`edgy`**: Sharp corners
- **`mid`**: Subtle rounding
- **`full`**: Fully rounded

See [THEME_CUSTOMIZATION.md](THEME_CUSTOMIZATION.md) for detailed documentation.

## 🧪 Testing

```bash
# Unit tests
pnpm test-unit

# Lint check
pnpm lint-check-next

# Format check
pnpm lint-check-prettier
```

## 📜 Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm start` | Run production server |
| `pnpm lint-fix` | Auto-fix formatting |
| `pnpm test-unit` | Run unit tests |
| `pnpm clean` | Remove build artifacts |

## 🔧 Tech Stack

- **Framework**: Next.js 15.5.9
- **UI**: React 19, Tailwind CSS 3.4
- **API**: @connectrpc/connect-web (HTTP Connect protocol)
- **Auth**: Zitadel (@zitadel/client, @zitadel/proto)
- **i18n**: next-intl (12 languages)
- **Forms**: react-hook-form 7.54

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit changes: `git commit -m 'Add my feature'`
4. Push to branch: `git push origin feature/my-feature`
5. Open a Pull Request

## 📄 License

See [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Repository**: [https://github.com/10XScale-in/zitadel-ui](https://github.com/10XScale-in/zitadel-ui)
- **10XScale.ai**: [https://10xscale.ai](https://10xscale.ai)
- **Zitadel Docs**: [https://zitadel.com/docs](https://zitadel.com/docs)

---

Built with ❤️ by [10XScale.ai](https://10xscale.ai)
