import { ThirdwebProvider, ChainId } from "@thirdweb-dev/react";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider desiredChainId={5}>
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;
