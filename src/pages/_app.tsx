import "../styles/global.css";
import { NextPageWithLayout } from "next";
import type { AppProps } from "next/app";

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp = ({ Component, pageProps }: AppPropsWithLayout): JSX.Element => {
  const getLayout = Component.getLayout ?? ((page) => page);

  /* eslint-disable-next-line react/jsx-props-no-spreading */
  return getLayout(<Component {...pageProps} />);
};
export default MyApp;
