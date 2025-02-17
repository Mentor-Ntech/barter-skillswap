// import { useMemo } from "react";
// import useSignerOrProvider from "./UseSignerOrProvider";
// import { Contract } from "ethers";
// import ABI from "../abis/SkillExchange.json";

// const useContract = (withSigner = false) => {
//   const { signer, readOnlyProvider } = useSignerOrProvider();

//   return useMemo(() => {
//     if (withSigner) {
//       if (!signer) return null;
//       return new Contract(
//         import.meta.env.VITE_APP_SKILL_EXCHANGE,
//         ABI,
//         signer
//       );
//     }

//     return new Contract(
//       import.meta.env.VITE_APP_SKILL_EXCHANGE,
//       ABI,
//       readOnlyProvider
//     );
//   }, [signer, readOnlyProvider, withSigner]);
// };

// export default useContract;




// Update code
import { useMemo } from "react";
import useSignerOrProvider from "./UseSignerOrProvider";
import { Contract } from "ethers";
import ABI from "../abis/SkillExchange.json";

const useContract = (withSigner = false) => {
  const { signer, readOnlyProvider } = useSignerOrProvider();

  return useMemo(() => {
    try {
      const contractAddress = import.meta.env.VITE_APP_SKILL_EXCHANGE;

      if (!contractAddress) {
        console.error("Contract address is not defined in environment variables.");
        return null;
      }

      if (withSigner) {
        if (!signer) {
          console.warn("Signer is not available. Cannot create contract with signer.");
          return null;
        }
        return new Contract(contractAddress, ABI, signer);
      }

      if (!readOnlyProvider) {
        console.warn("Read-only provider is not available. Cannot create contract.");
        return null;
      }

      return new Contract(contractAddress, ABI, readOnlyProvider);
    } catch (error) {
      console.error("Failed to create contract instance:", error);
      return null;
    }
  }, [signer, readOnlyProvider, withSigner]);
};

export default useContract;