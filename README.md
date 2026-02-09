# Chrome Theme AI Creator

## Overview
Chrome Theme AI Creator is a web application that allows users to generate and customize Chrome themes using artificial intelligence. The application provides an intuitive interface for users to input their preferences and see real-time previews of their themes.

## Tech Stack
- **Nuxt 4** - Vue.js framework with SSR support
- **Vue 3.5** - Progressive JavaScript framework
- **TypeScript 5.9** - Type-safe development
- **Vercel AI SDK 6** - AI integration with OpenAI
- **OpenAI GPT-4o** - Text generation (theme names, colors, descriptions)
- **OpenAI DALL-E 3** - Image generation (theme backgrounds)
- **Zod 4** - Schema validation

## Features
- **Theme Generation**: Users can input a description and select colors to generate a Chrome theme.
- **Theme Preview**: A simulation of the Chrome browser displays the generated theme, allowing users to see how their choices affect the appearance.
- **Theme Customization**: Users can manually adjust colors for different Chrome elements and see real-time updates.
- **Theme Export**: The application allows users to download their generated theme as a zip package, along with installation instructions.

## Project Structure
```
chrome-theme-ai-creator
├── components
│   ├── ThemeGenerator.vue
│   ├── ThemePreview.vue
│   ├── ThemeCustomizer.vue
│   └── ThemeExport.vue
├── composables
│   └── useAI.ts
├── pages
│   ├── index.vue
│   └── generate.vue
├── server
│   └── api
│       ├── generate.ts
│       ├── generate-image.ts
│       └── download-image.ts
├── public
│   └── manifest.json
├── utils
│   └── chromeTheme.ts
├── .env.example
├── nuxt.config.ts
├── package.json
├── tsconfig.json
├── vercel.json
└── README.md
```

## Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/chrome-theme-ai-creator.git
cd chrome-theme-ai-creator
```

### 2. Install dependencies
```bash
npm install
```

### 3. Get your OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign up or log in to your OpenAI account
3. Navigate to the API Keys section
4. Click "Create new secret key"
5. Copy the API key (you won't be able to see it again!)

**Note:** OpenAI API requires a paid account with credits. You'll need to add billing information at [OpenAI Billing](https://platform.openai.com/settings/organization/billing/overview).

### 4. Configure Environment Variables

1. Copy the `.env.example` file to create your `.env` file:
   ```bash
   cp .env.example .env
   ```

2. Open the `.env` file and add your OpenAI API key:
   ```env
   OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxx
   TEXT_MODEL=gpt-4o
   IMAGE_MODEL=dall-e-3
   ```

### 5. Run the development server
```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `OPENAI_API_KEY` | Your OpenAI API key from platform.openai.com | Yes | - |
| `TEXT_MODEL` | OpenAI model for text generation (theme names, colors) | No | `gpt-4o` |
| `IMAGE_MODEL` | OpenAI model for image generation (backgrounds) | No | `dall-e-3` |

### Available Models

**Text Models:** `gpt-4o`, `gpt-4-turbo`, `gpt-4`, `gpt-3.5-turbo`
**Image Models:** `dall-e-3` (recommended), `dall-e-2`

## Deployment to Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project directory
3. Configure environment variables in Project → Settings → Environment Variables:
   - Add `OPENAI_API_KEY` with your key and toggle the **Sensitive** checkbox ON.
   - Add `TEXT_MODEL` (default: `gpt-4o`) and `IMAGE_MODEL` (default: `dall-e-3`) as non-sensitive variables.

## Usage
- Navigate to the landing page to input your theme description and select colors.
- After generating the theme, you can customize it further on the generate page.
- Once satisfied, download your theme package for installation.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.