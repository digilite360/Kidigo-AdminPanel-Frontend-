# Kidigo Admin Panel

A modern Next.js admin panel built with TypeScript, Tailwind CSS, and shadcn/ui components. Features protected routes, dynamic routing, and authentication.

## Features

- ✅ **Next.js 15** with App Router
- ✅ **TypeScript** for type safety
- ✅ **Tailwind CSS** for styling
- ✅ **shadcn/ui** components
- ✅ **NextAuth.js** for authentication
- ✅ **Protected Routes** with middleware
- ✅ **Dynamic Routes** for user and product management
- ✅ **Role-based Access Control** (Admin/User)
- ✅ **Responsive Design**

## Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Authentication**: NextAuth.js
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd kidigo-admin-panel
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Authentication

### Demo Credentials

- **Email**: admin@kidigo.com
- **Password**: admin123

### User Roles

- **Admin**: Full access to all features including admin panel
- **User**: Access to dashboard and basic features

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Dashboard pages
│   │   ├── users/         # User management
│   │   ├── products/      # Product management
│   │   └── orders/        # Order management
│   ├── admin/             # Admin-only pages
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
│   ├── ui/               # shadcn/ui components
│   ├── Navigation.tsx    # Main navigation
│   └── ProtectedRoute.tsx # Route protection
├── contexts/             # React contexts
│   └── AuthContext.tsx   # Authentication context
└── lib/                  # Utility functions
    ├── auth.ts           # NextAuth configuration
    └── utils.ts          # General utilities
```

## Key Features

### Protected Routes
- Middleware-based route protection
- Role-based access control
- Automatic redirects for unauthorized access

### Dynamic Routes
- User detail pages: `/dashboard/users/[id]`
- Product detail pages: `/dashboard/products/[id]`
- Order detail pages: `/dashboard/orders/[id]`

### Authentication Flow
- Sign in page with credential validation
- Session management with NextAuth.js
- Automatic redirects based on authentication status

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here
```

## Customization

### Adding New Pages
1. Create a new page in the appropriate directory
2. Wrap with `ProtectedRoute` component if needed
3. Add navigation links in `Navigation.tsx`

### Adding New Components
1. Use shadcn/ui CLI: `npx shadcn@latest add [component-name]`
2. Create custom components in `src/components/`

### Styling
- Use Tailwind CSS classes
- Customize theme in `tailwind.config.js`
- Modify CSS variables in `globals.css`

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms
1. Run `npm run build`
2. Deploy the `.next` folder to your hosting platform

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.
