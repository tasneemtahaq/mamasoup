declare module 'react-slick' {
    import { Component, ReactNode, CSSProperties } from 'react';
  
    export interface Settings {
      dots?: boolean;
      infinite?: boolean;
      speed?: number;
      slidesToShow?: number;
      slidesToScroll?: number;
      autoplay?: boolean;
      autoplaySpeed?: number;
      arrows?: boolean;
      children?: ReactNode; // Allow children of any valid React node type
      className?: string;
      style?: CSSProperties;
      draggable?: boolean;
      responsive?: Array<{
        breakpoint: number;
        settings: Partial<Settings>;
      }>; // responsive settings, common for carousels
    }
  
    export default class Slider extends Component<Settings> {}
  }
  