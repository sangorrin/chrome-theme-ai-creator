import { defineEventHandler, readBody } from 'h3';

export default defineEventHandler(async (event) => {
  const { description } = await readBody(event);
  const config = useRuntimeConfig();

  try {
    const imageModel = config.IMAGE_MODEL || 'dall-e-3';

    // Generate background image using DALL-E
    const imageResponse = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: imageModel,
        prompt: `Create a beautiful background image for a Chrome browser extension theme. The image should be suitable for a desktop wallpaper with dimensions 1920x1280. Theme description: ${description}. High quality, vibrant, and visually appealing.`,
        n: 1,
        size: '1792x1024',
        quality: 'hd',
      }),
    });

    const imageData = await imageResponse.json();
    const imageUrl = imageData.data?.[0]?.url;

    if (!imageUrl) {
      throw new Error('Failed to generate image');
    }

    return {
      imageUrl,
      status: 'completed',
    };
  } catch (error: any) {
    console.error('Failed to generate image:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to generate image',
      data: { error: error.message },
    });
  }
});
