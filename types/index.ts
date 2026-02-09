export interface Theme {
  name: string;
  description: string;
  colors: Color;
  backgroundImage: string;
}

export interface Color {
  frame: string;
  toolbar: string;
  tabBackground: string;
  tabText: string;
  background: string;
  text: string;
  button: string;
  buttonText: string;
}