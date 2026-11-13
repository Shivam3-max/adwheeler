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

## Contact email

The contact and franchise forms send messages through Resend using `/api/contact` and `/api/franchise`. Franchise applications go to `franchise@adwheeler.in`; applicants receive an acknowledgement email. Before enabling delivery:

1. Verify `adwheeler.in` in Resend and add the DNS records Resend provides.
2. Create a sending API key and add it to the Hostinger Node.js app environment as `RESEND_API_KEY`.
3. Set `RESEND_FROM_EMAIL` only if you want a sender other than `AdWheeler Team <website@adwheeler.in>`.
4. Restart or redeploy the app after changing its environment variables.

Both forms send a receipt email to the person who submitted the form. Inbox placement is controlled by the receiving mail provider; confirm the domain's SPF, DKIM, and DMARC authentication in Resend and review each message's delivery events there if emails land in spam.

Never commit the real API key. `.env.example` documents the required variables; the actual `.env` files remain ignored by Git.

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
