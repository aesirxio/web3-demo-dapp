import { AuthenticationProvider } from "@shared_auth/AuthenticationProvider";
import { useEffect, useState } from "react";
import { detectConcordiumProvider } from "@concordium/browser-wallet-api-helpers";

function AuthComponent({ children }) {
  const [provider, setProvider] = useState();
  const [accountAddress, setAccountAddress] = useState();

  const handleConnect = async () => {
    const accountAddress = await provider.connect();

    if (accountAddress) {
      setAccountAddress(accountAddress);
    }
  };

  useEffect(() => {
    (async () => {
      const provider = await detectConcordiumProvider();
      setProvider(provider);
    })();
  }, [provider]);

  useEffect(() => {
    (async () => {
      const provider = await detectConcordiumProvider();

      if (provider) {
        setProvider(provider);
      }
    })();
  }, []);

  return (
    <AuthenticationProvider
      content={{ accountAddress: accountAddress, provider: provider, handleConnect: handleConnect }}
    >
      {children}
    </AuthenticationProvider>
  );
}

export default AuthComponent;
