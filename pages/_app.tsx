import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SettingsProvider } from "./settingsContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SettingsProvider>
      <Component {...pageProps} />
    </SettingsProvider>
  );
}

export default MyApp;
