# 🌟 ANBU Solutions Landing Page

<div align="center">
  <img src="docs/assets/anbu-logo.png" alt="ANBU Solutions" width="200" />
  
  **Welcome to ANBU Solutions - Innovative Digital Solutions**
  
  [![CI](https://github.com/shighetari/anbu-landing/actions/workflows/ci.yml/badge.svg)](https://github.com/shighetari/anbu-landing/actions/workflows/ci.yml)
  [![CD](https://github.com/shighetari/anbu-landing/actions/workflows/cd.yml/badge.svg)](https://github.com/shighetari/anbu-landing/actions/workflows/cd.yml)
  [![License](https://img.shields.io/badge/license-Proprietary-blue.svg)](LICENSE)
  [![Node Version](https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen)](https://nodejs.org)
  [![pnpm Version](https://img.shields.io/badge/pnpm-%3E%3D8.0.0-orange)](https://pnpm.io)
</div>

## 🏗️ Architecture

This is a monorepo containing the ANBU Solutions landing page and related applications, built with modern web technologies and best practices.

### 📦 Applications

- **`apps/landing`** – Main ANBU.ai landing page with Letter Glitch background and premium motion system

> ℹ️ `docs-hub` and `solutions-portal` remain roadmap items; they stay documented but are not yet present in the workspace so new contributors can focus on the landing experience.

### 📚 Shared Packages

- **`packages/ui`** - Shared UI components library
- **`packages/config`** - Shared configuration files
- **`packages/utils`** - Shared utility functions

### 🗂️ Knowledge Docs

- **`docs/design/landing-ui-decisions.md`** – Detailed component rationale, motion guidelines, and integration tips.
- **`docs/changelog/landing.md`** – Running log of landing redesign milestones and component installs.

## ✅ UX Navigation To-Do

- [ ] Validate new journey routes (`/solutions`, `/resources`, `/contact`) in browser and capture polish issues.
- [ ] Confirm mega menu + mobile nav microinteractions meet performance and accessibility targets.
- [ ] Align CTA copy and section headings across new pages with brand voice.
- [ ] Add analytics/events for journey CTAs before launch.
- [ ] Update Playwright coverage for journey navigation paths once UI stabilizes.

## 🎨 Design System

Our design system features a sophisticated **black and gold with marble aesthetic**:

- **Primary Colors**: Black (#000000), Gold (#FFD700)
- **Marble Textures**: Custom gradients and patterns
- **Typography**: Modern, clean fonts with elegant spacing
- **Animations**: React Bits Letter Glitch and smooth transitions

## 🚀 Getting Started

### Prerequisites

- Node.js >= 20.0.0
- pnpm >= 8.0.0
- Docker (optional, for containerized development)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/shighetari/anbu-landing.git
cd anbu-landing
```

2. Install dependencies:

```bash
pnpm install
```

3. Copy environment variables:

```bash
cp .env.example .env.local
```

4. Start development server:

```bash
pnpm dev
```

### Available Scripts

| Script           | Description                                |
| ---------------- | ------------------------------------------ |
| `pnpm dev`       | Start all apps in development mode         |
| `pnpm build`     | Build all apps for production              |
| `pnpm test`      | Run tests across all apps                  |
| `pnpm lint`      | Lint all apps and packages                 |
| `pnpm typecheck` | Type check all TypeScript files            |
| `pnpm format`    | Format code with Prettier                  |
| `pnpm clean`     | Clean all build artifacts and node_modules |

## 🐳 Docker Support

I've optimized our Docker setup for cross-platform development with hot reload enabled for Windows, macOS, and Linux.

### Quick Start with Docker

```bash
# First-time setup (detects your platform automatically)
pnpm docker:setup

# Start just the landing page with hot reload
pnpm docker:landing  # Note: it's pnpm, not pnmp

# View logs in real-time
pnpm docker:landing:logs

# Access the container shell for debugging
pnpm docker:landing:shell
```

📚 **[Full Docker Development Guide](docs/DOCKER_GUIDE.md)** - Comprehensive platform-specific instructions

### Docker Commands

| Command                       | Description                                     |
| ----------------------------- | ----------------------------------------------- |
| `pnpm docker:landing`         | Start landing app with hot reload               |
| `pnpm docker:landing:build`   | Rebuild landing container (no cache)            |
| `pnpm docker:landing:rebuild` | Rebuild and start landing app                   |
| `pnpm docker:landing:logs`    | View landing app logs                           |
| `pnpm docker:landing:shell`   | Access landing container shell                  |
| `pnpm docker:dev`             | Start all services in detached mode             |
| `pnpm docker:stop`            | Stop all containers                             |
| `pnpm docker:down`            | Stop and remove containers                      |
| `pnpm docker:clean`           | Remove everything (containers, volumes, images) |
| `pnpm docker:prune`           | Clean up all unused Docker resources            |

### Windows Hot Reload Setup

The Docker configuration is optimized for Windows with:

- `WATCHPACK_POLLING=true` for file watching
- Delegated volume mounts for better performance
- Proper node_modules exclusion to avoid conflicts

### Local Development Customization

I've included a `docker-compose.override.yml.example` file for local customization:

```bash
# Copy the example to create your local override
cp docker-compose.override.yml.example docker-compose.override.yml

# Edit to add your local environment variables or port changes
```

### Troubleshooting Docker

If you experience issues with hot reload on Windows:

1. **Ensure Docker Desktop is using WSL 2**:
   - Open Docker Desktop Settings
   - Go to General → Use WSL 2 based engine

2. **File watching not working**:

   ```bash
   # Rebuild the container
   pnpm docker:landing:rebuild
   ```

3. **Port conflicts**:
   - Edit `docker-compose.override.yml` to use a different port

4. **Clean slate**:

   ```bash
   # Remove everything and start fresh
   pnpm docker:clean
   pnpm docker:landing:build
   pnpm docker:landing
   ```

## 🌳 Git Workflow

We follow Git Flow methodology:

```
main (production)
  └── develop
      ├── feature/your-feature
      ├── release/v1.0.0
      └── hotfix/critical-fix
```

### Branch Naming Convention

- `feature/*` - New features
- `fix/*` - Bug fixes
- `chore/*` - Maintenance tasks
- `docs/*` - Documentation updates
- `release/*` - Release preparation
- `hotfix/*` - Critical production fixes

### Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): description

[optional body]
[optional footer]
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`, `ci`, `build`

## 🔄 CI/CD Pipeline

### Continuous Integration

- ✅ Linting and formatting checks
- ✅ Type checking
- ✅ Unit and integration tests
- ✅ Build verification
- ✅ Docker image building

### Continuous Deployment

- 🚀 Automatic deployment to Vercel on main branch
- 🔍 Preview deployments for pull requests
- 📊 Performance monitoring
- 🔔 Deployment notifications

## 🛠️ Technology Stack

- **Framework**: [Next.js 14](https://nextjs.org/) with App Router
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **Animations**: [React Bits](https://reactbits.dev/) + [Framer Motion](https://www.framer.com/motion/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Package Manager**: [pnpm](https://pnpm.io/)
- **Build Tool**: [Turbo](https://turbo.build/)
- **Testing**: [Vitest](https://vitest.dev/) + [Playwright](https://playwright.dev/)
- **CI/CD**: [GitHub Actions](https://github.com/features/actions)
- **Deployment**: [Vercel](https://vercel.com/)
- **Containerization**: [Docker](https://www.docker.com/)

## 📁 Project Structure

```
anbu-landing/
├── apps/
│   └── landing/               # Next.js app currently in production
├── packages/
│   ├── ui/                    # Shared UI kit
│   ├── config/                # ESLint/Tailwind/TS presets
│   └── utils/                 # Cross-cutting helpers
├── docs/
│   ├── design/landing-ui-decisions.md
│   ├── changelog/landing.md
│   └── *.md                   # Additional runbooks & guides
├── docker/
│   └── development|production # Container images
├── scripts/                   # Automation + platform helpers
├── .github/workflows/         # CI/CD configuration
└── [config files]             # Root configs (.env.example, eslint, turbo, etc.)
```

## 🔒 Security

- Environment variables for sensitive data
- Docker secrets management
- GitHub Actions secrets
- Regular dependency updates via Dependabot
- Security headers configuration

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is proprietary software owned by ANBU Solutions. All rights reserved.

## 📞 Contact

- Website: [anbu.ai](https://anbu.ai)
- Email: <contact@anbu.ai>

## 🙏 Acknowledgments

- [React Bits](https://reactbits.dev/) for the Letter Glitch background
- [Vercel](https://vercel.com/) for hosting
- [shadcn/ui](https://ui.shadcn.com/) for UI components

---

<div align="center">
  Made with ❤️ by ANBU Solutions
</div>
