import { DetailedHTMLProps, HTMLAttributes } from "react";
declare global {
  declare namespace JSX {
    type Span = DetailedHTMLProps<
      HTMLAttributes<HTMLSpanElement>,
      HTMLSpanElement
    > & {
      class?: string;
    };
    interface IntrinsicElements {}
  }
}
