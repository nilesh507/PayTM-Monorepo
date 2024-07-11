## Steps to reproduce
- clone the repo

```jsx
git clone https://github.com/nilesh507/PayTM-Monorepo.git
```

-   npm install
-   Run postgres either locally or on the cloud (neon.tech)

```jsx
docker run  -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres
```

-   Copy over all .env.example files to .env
-   Update .env files everywhere with the right db url
-   Go to `packages/db`
    -   ```jsx npx prisma migrate dev```
    -   ```jsx npx prisma db seed ```
-   Go to `apps/user-app` , run `npm run dev`
-   Try logging in using phone - 1111111111 , password - alice (See `seed.ts`)

---
## Merchant App
<img width="1511" alt="image" src="https://github.com/nilesh507/PayTM-Monorepo/assets/56382235/0abfef5a-5119-4786-982b-c6a414e409a2">
---
## User App
<img width="1512" alt="image" src="https://github.com/nilesh507/PayTM-Monorepo/assets/56382235/0c7b07cb-d602-40da-9003-1374823c9bd4">

<img width="1512" alt="image" src="https://github.com/nilesh507/PayTM-Monorepo/assets/56382235/74b47ff3-c18a-47fa-9b55-3d5d0e26a4b6">

<img width="1512" alt="image" src="https://github.com/nilesh507/PayTM-Monorepo/assets/56382235/a533ea4a-529a-4f3d-a354-c45b60ac1d17">




