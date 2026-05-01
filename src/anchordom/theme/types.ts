export type AnchorPoint =
  | 'TOP_LEFT'
  | 'TOP_CENTER'
  | 'TOP_RIGHT'
  | 'MIDDLE_LEFT'
  | 'MIDDLE_CENTER'
  | 'MIDDLE_RIGHT'
  | 'BOTTOM_LEFT'
  | 'BOTTOM_CENTER'
  | 'BOTTOM_RIGHT';

export interface ThemeColors {
  primary: string;
  secondary: string;
  text: string;
  background: string;
  [key: string]: string;
}

export interface ComponentStyles {
  button: {
    fontFamily?: string;
    fontSize?: string | number;
    color?: string;
    padding?: string | number;
    backgroundImage?: string;
    backgroundSlice?: string;
    activeBackgroundImage?: string;
  };
  label: {
    fontFamily?: string;
    fontSize?: string | number;
    color?: string;
    textShadow?: string;
  };
  progressBar: {
    trackImage?: string;
    trackSlice?: string;
    fillImage?: string;
    fillSlice?: string;
    height?: number | string;
  };
  toggle: {
    backgroundImage?: string;
    handleImage?: string;
    width?: number | string;
    height?: number | string;
  };
  scrollList: {
    backgroundColor?: string;
    padding?: string | number;
  };
}

export interface Theme {
  name: string;
  colors: ThemeColors;
  assets: string[]; // List of local asset paths to preload
  components: ComponentStyles;
}

export interface BaseComponentProps {
  anchor?: AnchorPoint;
  x?: number;
  y?: number;
  className?: string;
  style?: React.CSSProperties;
  targetRef?: React.RefObject<HTMLElement | null>;
}
