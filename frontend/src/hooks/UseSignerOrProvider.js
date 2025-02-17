// import { useAppKitProvider } from "@reown/appkit/react";
// import { BrowserProvider } from "ethers";
// import { useEffect, useMemo, useState } from "react";
// import { readOnlyProvider } from "../constant/readOnlyProvider";

// const useSignerOrProvider = () => {
//   const [signer, updateSigner] = useState();
//   const { walletProvider } = useAppKitProvider("eip155");

//   const provider = useMemo(
//     () => (walletProvider ? new BrowserProvider(walletProvider) : null),
//     [walletProvider]
//   );

//   useEffect(() => {
//     if (!provider) return updateSigner(null);
//     provider.getSigner().then((newSigner) => {
//       if (!newSigner) return updateSigner(newSigner);
//       if (newSigner.address === signer?.address) return;
//       updateSigner(newSigner);
//     });
//   }, [readOnlyProvider, signer]);

//   return { signer, provider, readOnlyProvider };
// };

// export default useSignerOrProvider;



// Update 

import { useAppKitProvider } from "@reown/appkit/react";
import { BrowserProvider } from "ethers";
import { useEffect, useMemo, useState } from "react";
import { readOnlyProvider } from "../constant/readOnlyProvider";

const useSignerOrProvider = () => {
  const [signer, setSigner] = useState(null);
  const { walletProvider } = useAppKitProvider("eip155");

  const provider = useMemo(() => {
    if (!walletProvider) return null;
    return new BrowserProvider(walletProvider);
  }, [walletProvider]);

  useEffect(() => {
    if (!provider) {
      setSigner(null); 
      return;
    }

    const fetchSigner = async () => {
      try {
        const newSigner = await provider.getSigner();
        if (newSigner.address !== signer?.address) {
          setSigner(newSigner); 
        }
      } catch (error) {
        console.error("Failed to fetch signer:", error);
        setSigner(null); 
      }
    };

    fetchSigner();
  }, [provider]); 

  return { signer, provider, readOnlyProvider };
};

export default useSignerOrProvider;