import { render } from "@testing-library/react";
import React from "react";

import App from "./App";

test("render without errors", () => {
  render(<App />);
});
