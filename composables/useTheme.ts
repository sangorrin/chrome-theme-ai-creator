export const useTheme = () => {
  const themeData = ref({
    name: '',
    colors: {
      frame: '',
      toolbar: '',
      tab_background_text: '',
      tab_text: '',
      bookmark_text: '',
      ntp_background: '',
      ntp_text: '',
    },
    backgroundImage: '',
  });

  const updateThemeName = (name) => {
    themeData.value.name = name;
  };

  const updateThemeColor = (key, color) => {
    if (themeData.value.colors[key] !== undefined) {
      themeData.value.colors[key] = color;
    }
  };

  const setBackgroundImage = (image) => {
    themeData.value.backgroundImage = image;
  };

  const getThemeData = () => {
    return themeData.value;
  };

  return {
    themeData,
    updateThemeName,
    updateThemeColor,
    setBackgroundImage,
    getThemeData,
  };
};