This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## folder structure

my-app/
├── public/
│ └── uploads/ # Multer will store uploaded files here
├── src/
│ ├── app/ # If you're using Next.js 13+ with app directory
│ │ ├── api/
│ │ │ ├── posts/
│ │ │ │ ├── route.js # Handles GET and POST for posts
│ │ │ │ └── [id]/
│ │ │ │ └── route.js # Handles GET, PUT, DELETE for a single post
│ │ │ └── upload/
│ │ │ └── route.js # File upload API using multer
│ │ ├── posts/
│ │ │ └── page.js # Frontend to show/create posts
│ │ └── layout.js # App-wide layout
│ ├── lib/
│ │ ├── mongodb.js # MongoDB connection utility
│ │ └── multer.js # Multer setup and config
│ └── models/
│ └── Post.js # Mongoose schema for your post
├── .env.local # Environment variables (Mongo URI, etc.)
├── next.config.js
└── package.json
