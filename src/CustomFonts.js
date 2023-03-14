import { Global } from "@mantine/core";
import bold from "./fonts/Ubuntu-Medium.ttf";

export function CustomFonts() {
  return (
    <Global
      styles={[
        {
          "@font-face": {
            fontFamily: "Ubuntu, sans-serif",
            src: `url('${bold}') format("ttf")`,
            fontStyle: "normal",
          },
        },
      ]}
    />
  );
}
