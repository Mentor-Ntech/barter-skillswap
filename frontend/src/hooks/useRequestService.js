import { useState, useCallback } from "react";
import { toast } from "react-toastify";
import { ethers } from "ethers";
import useContract from "./useContract";
import ABI from "../abis/SkillExchange.json";

const useRequestService = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { contract } = useContract(import.meta.env.VITE_APP_SKILL_EXCHANGE, ABI);

  const requestService = useCallback(
    async (description, deadline, overrides = {}) => {
      if (!contract) {
        toast.error("Contract is not available");
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const signer = contract.signer;
        if (!signer) {
          toast.error("Please connect your wallet");
          return;
        }

        const signerAddress = await signer.getAddress();
        console.log("Requesting service with:", {
          description,
          deadline,
          value: overrides.value?.toString(),
          signerAddress
        });

        // Request the service with the provided ETH value
        const tx = await contract.requestService(
          description, 
          deadline,
          overrides // This includes the ETH value
        );

        console.log("Transaction sent:", tx.hash);

        // Wait for transaction confirmation
        const receipt = await tx.wait();
        console.log("Transaction receipt:", receipt);

        if (receipt.status === 1) {
          return receipt.transactionHash;
        } else {
          throw new Error("Transaction failed");
        }
      } catch (err) {
        console.error("Error requesting service:", err);
        const errorMessage = err.reason || err.message || "An unknown error occurred";
        toast.error(`Error: ${errorMessage}`);
        setError(errorMessage);
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