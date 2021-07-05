/**
 * Can delete file if not using @magiclabs/ui
 */

import Document, { Html, Head, Main, NextScript } from "next/document";
import { DEFAULT_THEME, getThemeVariables } from "@magiclabs/ui";
export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head></Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
