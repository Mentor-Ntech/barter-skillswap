// import { useState, useCallback } from "react";
// import { toast } from "react-toastify";
// import useContract from "./useContract";

// const useRequestService = () => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const contract = useContract();

//   const requestService = useCallback(
//     async (listingId, description, deadline) => {
//       if (!contract) {
//         toast.error("Contract is not available");
//         return;
//       }

//       setLoading(true);
//       setError(null);

//       try {

//         const estimatedGas = await contract.requestService.estimateGas(
//             listingId,description, deadline
//           );
  
  
//           const tx = await contract.requestService(listingId,description, deadline, {
//             gasLimit: (estimatedGas * BigInt(120)) / BigInt(100),
//           }
//           )
      
//         const receipt = await tx.wait();

//         if (receipt.status === 1) {
//           toast.success("Service requested successfully!");
//           return receipt.transactionHash;
//         } else {
//           throw new Error("Transaction failed");
//         }
//       } catch (err) {
//         console.error("Error requesting service:", err);
//         toast.error(`Error: ${err.message || "An unknown error occurred."}`);
//         setError(err.message);
//         throw err;
//       } finally {
//         setLoading(false);
//       }
//     },
//     [contract]
//   );

//   return { requestService, loading, error };
// };

// export default useRequestService;



// Update code

import { useState, useCallback } from "react";
import { toast } from "react-toastify";
import useContract from "./useContract";

const useRequestService = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const contract = useContract(true); // Ensure the contract is connected to a signer

  const requestService = useCallback(
    async (listingId, description, deadline) => {
      if (!contract) {
        toast.error("Contract is not available");
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const estimatedGas = await contract.requestService.estimateGas(
          listingId,
          description,
          deadline
        );

        const tx = await contract.requestService(listingId, description, deadline, {
          gasLimit: (estimatedGas * BigInt(120)) / BigInt(100),
        });

        const receipt = await tx.wait();

        if (receipt.status === 1) {
          toast.success("Service requested successfully!");
          return receipt.transactionHash;
        } else {
          throw new Error("Transaction failed");
        }
      } catch (err) {
        console.error("Error requesting service:", err);
        toast.error(`Error: ${err.message || "An unknown error occurred."}`);
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [contract]
  );

  return { requestService, loading, error };
};

export default useRequestService;