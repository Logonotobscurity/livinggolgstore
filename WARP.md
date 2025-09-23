# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

Living Gold is a luxury lighting e-commerce website for a Nigerian retailer based in Asaba. Built with Next.js 15.3.3, TypeScript, and Tailwind CSS, it features AI-powered product recommendations using Google's Genkit framework.

## Development Commands

### Core Development
- `npm run dev` - Start development server with Turbopack on port 9002
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run Next.js linter
- `npm run typecheck` - Run TypeScript type checking

### AI Development
- `npm run genkit:dev` - Start Genkit AI development server
- `npm run genkit:watch` - Start Genkit with file watching

## Architecture Overview

### AI-First Design
The project centers around AI-powered features using Google's Genkit framework:
- **AI Flows**: Located in `src/ai/flows/`, including product search, recommendations, sentiment analysis, and image enhancement
- **Genkit Integration**: Configured in `src/ai/genkit.ts` with Google AI (Gemini 1.5 Flash)
- **AI Components**: `AIConsultant` provides interactive product recommendations based on user preferences

### Project Structure
```
src/
├── ai/                    # Genkit AI flows and configuration
│   ├── flows/            # Individual AI capabilities
│   └── genkit.ts         # AI framework setup
├── app/                  # Next.js App Router pages
│   ├── (routes)/         # Individual page components
│   └── layout.tsx        # Root layout with providers
├── components/           # Reusable React components
│   ├── sections/         # Page section components
│   ├── layout/           # Header, footer components
│   └── ui/              # Shadcn/ui components
├── context/             # React context providers
└── lib/                 # Utilities and configurations
```

### Key Architectural Patterns

#### Component Architecture
- **Section-based Layout**: Homepage composed of modular sections (Hero, ProductCategories, FeaturedFinds, etc.)
- **Context Providers**: Cart and Wishlist state managed through React Context
- **Client-Only Components**: Hydration-sensitive components wrapped with `ClientOnly`

#### AI Integration Pattern
AI flows follow a consistent pattern:
1. Input schema validation with Zod
2. Prompt definition with structured output
3. Flow execution with error handling
4. Type-safe outputs for UI consumption

#### Styling System
- **Design Tokens**: Gold primary (#D4AF37), black secondary, dark charcoal backgrounds
- **Typography**: Playfair Display (headlines), Inter (body text)
- **Custom Animations**: Reveal cards, marquee scrolling, hover transitions (0.3s ease-in-out)
- **Responsive Design**: Container max-width 1200px, section padding 120px top/bottom

## Firebase & Deployment

- **Firebase Hosting**: Configured via `.firebaserc` and `apphosting.yaml`
- **Netlify Support**: Alternative deployment via `netlify.toml`
- **Image Optimization**: Remote patterns configured for multiple CDNs (Cloudinary, Unsplash, product catalogs)

## Development Notes

### Build Configuration
- **TypeScript**: Build errors ignored during development (`ignoreBuildErrors: true`)
- **ESLint**: Ignored during builds for faster development
- **Turbopack**: Enabled for faster development builds

### AI Development Workflow
1. Create flows in `src/ai/flows/` with proper schemas
2. Test using `npm run genkit:dev`
3. Integrate flows into React components via server actions
4. Use proper error handling and fallback states

### Component Development
- Follow the established section-based pattern for new pages
- Use the existing context providers for cart/wishlist functionality
- Implement proper loading states for AI-powered features
- Maintain design system consistency using Tailwind utilities

## Key Dependencies

### Core Framework
- Next.js 15.3.3 with App Router
- React 18.3.1 with TypeScript
- Tailwind CSS with custom animations

### AI & Data Processing
- @genkit-ai/googleai and @genkit-ai/next
- Natural language processing (natural, node-nlp)
- TensorFlow.js for client-side ML

### UI Components
- Radix UI primitives for accessibility
- Custom shadcn/ui implementation
- Embla Carousel for image galleries
- React Hook Form with Zod validation

### Backend Services
- Firebase (auth, hosting, functions)
- Cloudinary for image management
- Next Cloudinary integration

## Testing & Quality

Run type checking before commits:
```bash
npm run typecheck
```

The project prioritizes rapid development with build-time error tolerance, but maintains type safety through TypeScript strict mode.