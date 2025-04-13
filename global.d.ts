declare namespace JSX {
    interface IntrinsicElements {
      marquee: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          behavior?: string;
          direction?: string;
          scrollamount?: string;
        },
        HTMLElement
      >;
    }
  }
  