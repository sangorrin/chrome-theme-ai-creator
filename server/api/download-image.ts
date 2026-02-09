import { defineEventHandler, getQuery } from 'h3';

export default defineEventHandler(async (event) => {
  const { url } = getQuery(event);

  if (!url || typeof url !== 'string') {
    throw createError({
      statusCode: 400,
      statusMessage: 'Image URL is required',
    });
  }

  try {
    // Fetch the image from the external URL
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }

    const imageBuffer = await response.arrayBuffer();

    // Return the image with appropriate headers
    return new Response(imageBuffer, {
      headers: {
        'Content-Type': response.headers.get('Content-Type') || 'image/png',
        'Content-Length': imageBuffer.byteLength.toString(),
      },
    });
  } catch (error: any) {
    console.error('Failed to download image:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to download image',
      data: { error: error.message },
    });
  }
});
