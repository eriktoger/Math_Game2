import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SettingsProvider, useSettingsContext } from "contexts/settingsContext";
import { NextComponentType, NextPageContext } from "next/types";
import Login from "./login";

function MyApp({
  Component,
  pageProps,
}: {
  Component: NextComponentType<NextPageContext, any, {}>;
  pageProps: any;
}) {
  const { user } = useSettingsContext();

  return (
    <div className="min-h-screen bg-cloud bg-cover bg-fixed flex flex-col items-center">
      {user.loggedIn ? <Component {...pageProps} /> : <Login />}
    </div>
  );
}

function MyAppWithProvider({ Component, pageProps }: AppProps) {
  return (
    <SettingsProvider>
      <MyApp Component={Component} pageProps={pageProps} />
    </SettingsProvider>
  );
}

export default MyAppWithProvider;
