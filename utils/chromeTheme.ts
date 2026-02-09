export const isValidColor = (color: string): boolean => {
    const hexColorPattern = /^#([0-9A-F]{3}|[0-9A-F]{6})$/i;
    return hexColorPattern.test(color);
};

export const isValidImageSize = (width: number, height: number): boolean => {
    const maxWidth = 1920;
    const maxHeight = 1080;
    return width <= maxWidth && height <= maxHeight;
};

export const generateThemeId = (): string => {
    return 'theme-' + Math.random().toString(36).substr(2, 9);
};