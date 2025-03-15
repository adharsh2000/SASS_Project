import * as React from "react";

const Cloack = React.forwardRef<
  HTMLElement,
  React.ComponentPropsWithoutRef<"span">
>(({ ...props }, ref) => <span ref={ref} aria-label="cloack" {...props} />);

Cloack.displayName = "Cloack";

export { Cloack };
