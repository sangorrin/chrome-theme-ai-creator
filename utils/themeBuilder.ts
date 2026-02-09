export interface Theme {
  name: string;
  description: string;
  colors: {
    frame: string;
    toolbar: string;
    tab_background_text: string;
    tab_text: string;
    bookmark_text: string;
    ntp_background: string;
    ntp_text: string;
  };
  images: {
    theme_frame: string;
    theme_toolbar: string;
    theme_ntp_background: string;
  };
}

export function createManifest(theme: Theme): object {
  return {
    manifest_version: 2,
    name: theme.name,
    description: theme.description,
    version: "1.0",
    theme: {
      colors: theme.colors,
      images: theme.images,
    },
  };
}