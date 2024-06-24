<div align="center">
<p>Translate App</p>
</div>

<div align="center">
  <a href="https://talk-translate.vercel.app" target="_blank">
    <img src="https://github.com/developaul/translate-app/assets/59939843/15e601e1-1012-45f1-93e9-78acc5500193" alt="Translate App" >
  </a>
</div>

<div align="center">  
  <a href="https://talk-translate.vercel.app" target="_blank">
    Discover
  </a>
  <span>&nbsp;✦&nbsp;</span>
</div>

</p>

<div align="center">

![Next.js Badge](https://img.shields.io/badge/Next.js&nbsp;14-000?logo=nextdotjs&logoColor=fff&style=flat)
![Tailwind CSS Badge](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?logo=tailwindcss&logoColor=fff&style=flat)

</div>

## 🛠️ Stack

- [**Nextjs**](https://nextjs.org/) - The React Framework for the Web.
- [**Typescript**](https://www.typescriptlang.org/) - JavaScript with syntax for types.
- [**TailwindCSS**](https://tailwindcss.com) + [**shadcn/ui**](https://ui.shadcn.com) & [**Radix Primitives**](https://www.radix-ui.com) - Design System.
- [**use-debounce**](https://github.com/xnimorz/use-debounce) - A React hook for debouncing events.
- [**Zod**](https://zod.dev/) - Schema declaration and validation library.
- [**Bun**](https://bun.sh/) - A fast JavaScript runtime, package manager and bundler.
- [**ai**](https://sdk.vercel.ai/docs/introduction) - AI framework for TypeScript.
- [**Vercel**](https://vercel.com/) - Deploy your app anywhere.
- [**Vercek KV**](https://vercel.com/storage/kv) - Key-value store for Vercel.
- [**Vercel Analytics**](https://vercel.com/analytics) - Analytics for Vercel.
- [**Upstash Rate Limit**](https://github.com/upstash/ratelimit) - Rate limiter for Vercel.
- [**Day.js**](https://day.js.org/) - Date and time library for JavaScript.
- [**pdf2json**](https://github.com/modesty/pdf2json) - Convert PDF to JSON.

<!-- Help me to describe features of this project -->

## 📝 Features

- 📄 Translate text.
- 📷 Translate images.
- 📕 Translate documents (PDFs).

## 🚀 Getting Started

You will need:

- [Node.js 20+ (recommended 20.14 LTS)](https://nodejs.org/en/).
- [Git](https://git-scm.com/).

1. [Clone](https://github.com/developaul/translate-app.git) this repository locally:

```bash
git clone git@github.com:developaul/translate-app.git
```

2. Install dependencies:

```bash
# Install bun globally if you don't have it:
npm install -g bun

# and install dependencies:
bun install
```

3. Create a **.env** file with the following content:

> 🚧 The environment variables must match the following schema

```bash
# OpenAI Provider
OPENAI_API_KEY=

# Vercel KV Store
KV_URL=
KV_REST_API_URL=
KV_REST_API_TOKEN=
KV_REST_API_READ_ONLY_TOKEN=
```

**OpenAI API Key**

- [Get your OpenAI API key](https://platform.openai.com/account/api-keys).

**Vercel KV Store**

- [Get your Vercel KV Store](https://vercel.com/docs/storage/vercel-kv/quickstart).

4. Run the development server:

```bash
bun run dev
```
