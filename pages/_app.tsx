import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SettingsProvider } from "./settingsContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SettingsProvider>
      <div className="min-h-screen bg-cloud bg-cover bg-fixed ">
        <Component {...pageProps} />
      </div>
    </SettingsProvider>
  );
}

export default MyApp;
