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

- **`apps/landing`** - Main ANBU.ai landing page with Letter Glitch background
- **`apps/docs-hub`** - ANBU Solutions Documentation Hub
- **`apps/solutions-portal`** - Official ANBU Solutions Portal

### 📚 Shared Packages

- **`packages/ui`** - Shared UI components library
- **`packages/config`** - Shared configuration files
- **`packages/utils`** - Shared utility functions

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

| Script | Description |
|--------|-------------|
| `pnpm dev` | Start all apps in development mode |
| `pnpm build` | Build all apps for production |
| `pnpm test` | Run tests across all apps |
| `pnpm lint` | Lint all apps and packages |
| `pnpm typecheck` | Type check all TypeScript files |
| `pnpm format` | Format code with Prettier |
| `pnpm docker:dev` | Start development with Docker |
| `pnpm docker:prod` | Start production with Docker |

## 🐳 Docker Support

### Development with Docker

```bash
# Start all services
pnpm docker:dev

# Stop all services
pnpm docker:down
```

### Production Deployment

```bash
# Build and run production containers
pnpm docker:prod
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
├── apps/                    # Application packages
│   ├── landing/            # Main landing page
│   ├── docs-hub/          # Documentation hub
│   └── solutions-portal/   # Solutions portal
├── packages/               # Shared packages
│   ├── ui/                # UI components
│   ├── config/            # Configurations
│   └── utils/             # Utilities
├── docker/                 # Docker configurations
│   ├── development/       # Dev Dockerfiles
│   └── production/        # Prod Dockerfiles
├── .github/               # GitHub configurations
│   └── workflows/         # CI/CD workflows
├── scripts/               # Build scripts
├── docs/                  # Documentation
└── [config files]         # Root configuration
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
- Email: contact@anbu.ai

## 🙏 Acknowledgments

- [React Bits](https://reactbits.dev/) for the Letter Glitch background
- [Vercel](https://vercel.com/) for hosting
- [shadcn/ui](https://ui.shadcn.com/) for UI components

---

<div align="center">
  Made with ❤️ by ANBU Solutions
</div>