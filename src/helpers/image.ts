// Get the high-resolution of an image by appending `l` to the image URL obtained in the API response.
const getHiResImageUrl = (imageUrl: string) => `${imageUrl}l`;

export { getHiResImageUrl };
