# ZITADEL Login UI

This is the login interface for ZITADEL, built with Next.js 15, React 19, and Tailwind CSS.

## Prerequisites

- **Node.js**: v20.x or higher
- **pnpm**: v10.x (specified in package.json: `pnpm@10.13.1`)
- **Operating System**: Linux, macOS, or Windows with WSL

## Project Structure

⚠️ **Important**: This project is part of a **pnpm workspace** (monorepo). It cannot be run standalone without its workspace dependencies.

```
zitadel/                          # Main workspace root
├── pnpm-workspace.yaml           # Workspace configuration
├── packages/
│   ├── zitadel-client/          # @zitadel/client package
│   └── zitadel-proto/           # @zitadel/proto package
└── apps/
    └── login/                    # This project (zitadel-ui)
```

## Initial Setup

### 1. Navigate to Workspace Root

```bash
cd /home/mothilal/Documents/temp/zitadel
```

### 2. Install Dependencies

Install all workspace dependencies using pnpm:

```bash
pnpm install
# or
npx pnpm install
```

This will install dependencies for all workspace packages including:
- `@zitadel/client` (workspace package)
- `@zitadel/proto` (workspace package)
- All npm dependencies

### 3. Run Development Server

#### Option A: From the workspace root (recommended)
```bash
pnpm --filter "@zitadel/login" dev
```

#### Option B: From the app directory
```bash
cd apps/login
HOSTNAME=127.0.0.1 ./scripts/entrypoint.sh npx next dev
```

The development server will start on:
- **Local**: http://localhost:3000 (or next available port)
- **Network**: http://[your-local-ip]:3000

## Configuration

The application uses environment variables that can be configured in:
- `.env` file in the project root
- `/.env-file/.env` (Docker volume mount)

### Key Environment Variables

- `HOSTNAME`: The hostname to bind to (default: `127.0.0.1`)
- `ZITADEL_SERVICE_USER_TOKEN`: Service user token for ZITADEL API
- `ZITADEL_SERVICE_USER_TOKEN_FILE`: Path to file containing the token

## Scripts

```bash
# Development
pnpm dev                    # Start development server

# Production
pnpm build                  # Build for production (standalone)
pnpm build-vercel          # Build for Vercel deployment
pnpm prod                  # Run production server

# Code Quality
pnpm lint-check-next       # Run Next.js linter
pnpm lint-check-prettier   # Check code formatting
pnpm lint-fix              # Auto-fix formatting issues

# Testing
pnpm test-unit             # Run unit tests with Vitest

# Maintenance
pnpm clean                 # Remove node_modules, .next, and cypress folders
```

## Dependencies

### Key Runtime Dependencies
- **Next.js**: 15.5.9
- **React**: 19.2.3
- **React Hook Form**: 7.54.2 (updated for React 19 compatibility)
- **Tailwind CSS**: 3.4.14
- **next-intl**: 3.25.1 (internationalization)
- **nice-grpc**: 2.0.1 (gRPC client)

### Workspace Dependencies
- `@zitadel/client`: Shared client utilities
- `@zitadel/proto`: Generated Protocol Buffer types

## Troubleshooting

### Issue: "Cannot find module '@zitadel/client' or '@zitadel/proto'"

**Cause**: Trying to run the project outside the workspace.

**Solution**: 
1. Navigate to the workspace root: `cd /home/mothilal/Documents/temp/zitadel`
2. Install dependencies: `pnpm install`
3. Run from workspace root: `pnpm --filter "@zitadel/login" dev`

### Issue: "ERESOLVE unable to resolve dependency tree" (React version conflict)

**Cause**: react-hook-form 7.39.5 doesn't support React 19.

**Solution**: Already fixed in package.json. The project now uses react-hook-form ^7.54.2 which supports React 19.

### Issue: Port 3000 is already in use

**Cause**: Another process is using port 3000.

**Solution**: 
- Next.js will automatically use the next available port (e.g., 3001)
- Or stop the process using port 3000: `lsof -ti:3000 | xargs kill -9`

### Issue: 404 Error on Root Path

**Cause**: This is a ZITADEL login UI that requires backend configuration.

**Solution**: This is expected behavior. The application needs to be connected to a ZITADEL instance with proper authentication flow configuration.

## Docker Deployment

The project includes Docker support:

```bash
# Build image
docker build -f Dockerfile -t zitadel-login .

# Run container
docker run -p 3000:3000 \
  -v /path/to/.env:/.env-file/.env \
  zitadel-login
```

## Development

### Project Structure
```
src/
├── app/              # Next.js app router pages
├── components/       # React components
├── helpers/          # Utility functions
├── i18n/            # Internationalization
├── lib/             # Shared libraries
└── styles/          # Global styles

locales/             # Translation files (12 languages)
public/              # Static assets
integration/         # Cypress integration tests
acceptance/          # Playwright acceptance tests
```

### Theme Customization

See [THEME_CUSTOMIZATION.md](THEME_CUSTOMIZATION.md) and [THEME_ARCHITECTURE.md](THEME_ARCHITECTURE.md) for details on customizing the UI theme.

## Testing

### Unit Tests
```bash
pnpm test-unit
```

### Integration Tests (Cypress)
```bash
pnpm cypress:open    # Interactive mode
```

### Acceptance Tests (Playwright)
```bash
cd acceptance
npx playwright test
```

## Package Manager

This project **requires pnpm** due to workspace configuration. Do not use npm or yarn:

```bash
# ✅ Correct
pnpm install
pnpm dev

# ❌ Incorrect
npm install
yarn install
```

## License

See [LICENSE](LICENSE) file for details.

## Support

For issues related to ZITADEL, visit:
- Documentation: https://zitadel.com/docs
- GitHub: https://github.com/zitadel/zitadel
