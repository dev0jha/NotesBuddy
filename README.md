# NotesBuddy

A modern notes sharing platform for college students built with Next.js and Sanity CMS.

![NotesBuddy Preview](public/NotesBuddy.jpg)

## Features

- **Notes System** - Browse and access college notes, PYQs, and one-shots
- **Quiz System** - Interactive quizzes for self-assessment
- **Flashcards** - Create and study with digital flashcards
- **AI Chat** - Subject-specific AI assistants powered by Google Gemini
- **Premium System** - Subscription plans with Razorpay integration
- **User Management** - Profile, onboarding, and referral system
- **Admin Panel** - Complete platform management dashboard
- **Wallet & Coupons** - Balance system with discount codes

## Tech Stack

| Category      | Technologies                            |
| ------------- | --------------------------------------- |
| **Framework** | Next.js 15, React 19, TypeScript        |
| **Styling**   | Tailwind CSS 4, shadcn/ui, Motion       |
| **Database**  | PostgreSQL with Prisma ORM              |
| **CMS**       | Sanity CMS with Portable Text           |
| **Auth**      | Better Auth                             |
| **Payments**  | Razorpay                                |
| **AI**        | Google Gemini AI                        |
| **Tools**     | Bun, ESLint, Prettier, Husky, Turbopack |

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- PostgreSQL database
- Sanity account
- Razorpay account (for payments)

### Installation

```bash
# Clone the repository
git clone https://github.com/dev0jha/NotesBuddy.git
cd NotesBuddy

# Install dependencies
bun install

# Setup environment variables
cp .env.example .env.local
```

### Environment Variables

```env
# Database
DATABASE_URL="postgresql://..."

# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID="your_project_id"
NEXT_PUBLIC_SANITY_DATASET="production"
SANITY_API_TOKEN="your_api_token"

# Better Auth
BETTER_AUTH_SECRET="your_auth_secret"
BETTER_AUTH_URL="http://localhost:3001"

# Razorpay
RAZORPAY_KEY_ID="your_razorpay_key"
RAZORPAY_KEY_SECRET="your_razorpay_secret"

# Google AI
GOOGLE_GENERATIVE_AI_API_KEY="your_gemini_api_key"
```

See `.env.example` for all required variables.

### Database Setup

```bash
bun prisma migrate dev
bun prisma generate
```

### Run Development Server

```bash
bun dev
```

Visit `http://localhost:3001` for the app and `http://localhost:3001/studio` for Sanity Studio.

## Project Structure

```
src/
├── app/
│   ├── (main)/               # Main app routes
│   │   ├── (admin)/          # Admin dashboard
│   │   ├── (auth)/           # Authentication pages
│   │   ├── (modals)/         # Modal routes
│   │   ├── (staticPages)/    # Static pages
│   │   └── (user)/           # User dashboard
│   ├── (studio)/             # Sanity Studio
│   └── api/                  # API routes
│       ├── ai/               # AI endpoints
│       ├── auth/             # Auth endpoints
│       ├── flashcard/        # Flashcard actions
│       ├── premium/          # Payment endpoints
│       ├── revalidate/       # Cache revalidation
│       └── user/             # User endpoints
├── cache/                    # Caching utilities
├── components/
│   ├── admin/                # Admin components
│   ├── ai/                   # AI chat components
│   ├── auth/                 # Auth components
│   ├── core/                 # Core UI (Nav, Footer)
│   ├── flashcard/            # Flashcard components
│   ├── landing/              # Landing page sections
│   ├── note/                 # Note display
│   ├── premium/              # Premium/payment UI
│   ├── profile/              # User profile
│   ├── quiz/                 # Quiz components
│   └── ui/                   # shadcn/ui components
├── dal/                      # Data Access Layer
├── hooks/                    # Custom React hooks
├── lib/                      # Utilities & integrations
├── sanity/                   # Sanity configuration
├── types/                    # TypeScript types
└── utils/                    # Helper functions
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit changes: `git commit -m "feat: add new feature"`
4. Push and create a Pull Request

### Guidelines

- Use TypeScript for all code
- Follow existing folder structure
- Use conventional commits (`feat:`, `fix:`, `docs:`, etc.)
- Test locally before submitting PR

### Database Changes

```bash
bun prisma migrate dev --name your_migration_name
```

## Contributors

<a href="https://github.com/dev0jha/NotesBuddy/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=dev0jha/NotesBuddy" />
</a>

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
