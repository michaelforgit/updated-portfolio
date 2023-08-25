## About

Personal portfolio created using [Next.js](https://nextjs.org/), [Tailwind](https://tailwindcss.com/), and [MongoDB](https://www.mongodb.com/).  

### Why is there a DB for a portfolio?

MongoDB is used to store information that is later displayed on the portfolio.  This choice ensures seamless text updates and eliminates the need for frequent redeployments.

## Run it Locally

If you want to run this locally you can.  Nothing will load unless you set a ```MONGO_URI``` inside of ```.env.local```
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
