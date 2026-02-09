import { defineEventHandler, readBody } from 'h3';
import { openai } from '@ai-sdk/openai';
import { generateText, Output } from 'ai';
import { z } from 'zod';

// Schema for theme colors
const ThemeColorsSchema = z.object({
  themeName: z.string().describe('A creative name for the theme'),
  themeDescription: z.string().describe('A brief description of the theme'),
  colors: z.object({
    bookmarkText: z.string().describe('Hex color for bookmark text'),
    ntpText: z.string().describe('Hex color for new tab page text'),
    ntpLink: z.string().describe('Hex color for new tab page links'),
    ntpHeader: z.string().describe('Hex color for new tab page header'),
    omniboxBackground: z.string().describe('Hex color for omnibox background'),
    omniboxText: z.string().describe('Hex color for omnibox text'),
    toolbarText: z.string().describe('Hex color for toolbar text'),
    toolbarButtonIcon: z.string().describe('Hex color for toolbar button icons'),
  }),
});

export default defineEventHandler(async (event) => {
  const { description } = await readBody(event);
  const config = useRuntimeConfig();

  try {
    // Get models from environment
    const textModel = config.TEXT_MODEL || 'gpt-4o';

    // Step 1: Generate theme name, description, and colors
    const { output: themeData } = await generateText({
      model: openai(textModel),
      output: Output.object({
        schema: ThemeColorsSchema,
      }),
      prompt: `Generate a Chrome browser theme based on this description: "${description}".
      Create a cohesive color palette that matches the theme.
      Ensure all colors work well together and provide good contrast for readability.`,
    });

    // Step 2: Generate background image using the dedicated endpoint
    const imageResult = await $fetch<{ imageUrl: string; status: string }>('/api/generate-image', {
      method: 'POST',
      body: { description },
    });

    // Return the complete theme data
    return {
      jobId: `theme-${Date.now()}`,
      status: 'completed',
      theme: {
        ...themeData,
        backgroundImage: imageResult.imageUrl,
      },
    };
  } catch (error: any) {
    console.error('Failed to generate theme:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to generate theme',
      data: { error: error.message },
    });
  }
});