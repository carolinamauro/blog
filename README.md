# Blog

Desde un poco antes de recibirme en diciembre de 2025, comenzo el bichito de "y ahora, que?". Qué me interesa? Qué quiero aprender? A qué me quiero dedicar? Y más cuando me doy cuenta la cantidad de conceptos que me faltan aprencer ante la constante evolución de la tecnología. Por eso creo este blog para comprometerme en mi ruta de aprendizaje y dejar un contenido que sea útil para quien lo encuentre.

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

### Expandable details in MDX

`Accordion` and `AccordionItem` are available in every blog `.mdx` file without imports.
Use one item on its own, or group several items:

```mdx
<Accordion>
  <AccordionItem title="What is EC2?">

    EC2 provides **virtual servers** in the AWS cloud.

    - Choose your operating system.
    - Configure CPU, memory, and storage.

  </AccordionItem>
  <AccordionItem title="When should I use it?" defaultOpen>

    Use it when you need control over the server and its operating system.

  </AccordionItem>
</Accordion>
```

Keep blank lines around Markdown inside each item. Details support normal Markdown,
including lists, links, and code blocks. Each item opens independently; clicking its
title again closes it. Native buttons support Tab, Enter, and Space, and animations
respect reduced-motion preferences. Omit `defaultOpen` to start collapsed. Titles
use an `h3` by default; set `headingLevel={2}` (or 3–6) to fit your article structure.

For a single detail:

```mdx
<AccordionItem title="Learn more">

  Write your detailed explanation here.

</AccordionItem>
```

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
