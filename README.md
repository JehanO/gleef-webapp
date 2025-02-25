# Gleef - Localization Platform

Gleef is a B2B platform that aims to revolutionize localization software. It starts with a Figma plugin for key localization management with automated creation and retrieval through AI.

## Features

- Authentication with email/password or OAuth providers
- Internationalization with Next-Intl
- Responsive UI with Tailwind CSS and shadcn/ui components
- Dark/Light mode support
- Supabase integration for authentication and database
- Multi-language support (English and French)

## Getting Started

### Prerequisites

- Node.js 18+ (required for Next.js 15+)
- npm or yarn
- Supabase account (for authentication and database)

### Setup Instructions

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/gleef-webapp.git
cd gleef-webapp
```

2. **Install dependencies**

```bash
npm install
# or
yarn
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory and add your Supabase credentials:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

4. **Set up your Supabase project**

- Create a new project on [Supabase](https://supabase.com)
- Enable Email/Password authentication and OAuth providers (Google, GitHub)
- Set up redirect URLs in your Supabase Authentication settings

5. **Run the development server**

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
├── app/                  # Next.js app directory
│   ├── [locale]/         # Locale-based routing
│   │   ├── (auth)/       # Authentication routes (login, signup)
│   │   ├── globals.css   # Global styles
│   │   ├── layout.tsx    # Root layout with providers
│   │   └── page.tsx      # Home page
├── components/           # Reusable UI components
│   ├── auth/             # Authentication components
│   ├── ui/               # UI components
│   └── themeProvider.tsx # Theme provider
├── hooks/                # Custom React hooks
├── i18n/                 # Internationalization configuration
├── lib/                  # Utility functions and libraries
│   ├── email-validation/ # Email validation utilities
│   ├── supabase/         # Supabase client
│   └── utils.ts          # General utilities
├── locales/              # Translation files
│   ├── en-US.json        # English translation
│   └── fr-FR.json        # French translation
└── types/                # TypeScript type definitions
```

## Technology Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui
- **Authentication**: Supabase Auth
- **Database**: Supabase (PostgreSQL)
- **Internationalization**: next-intl
- **Icons**: Lucide Icons

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.