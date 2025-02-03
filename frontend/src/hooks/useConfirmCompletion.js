import { useState, useCallback } from "react";
import { toast } from "react-toastify";
import useContract from "./useContract";
import ABI from "../abis/SkillExchange.json";

const useConfirmCompletion = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { contract } = useContract(import.meta.env.VITE_APP_SKILL_EXCHANGE, ABI);

  const confirmCompletion = useCallback(
    async (agreementId) => {
      if (!contract) {
        toast.error("Contract is not available");
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const tx = await contract.confirmCompletion(agreementId);
        const receipt = await tx.wait();

        if (receipt.status === 1) {
          toast.success("Completion confirmed successfully!");
          return receipt.transactionHash;
        } else {
          throw new Error("Transaction failed");
        }
      } catch (err) {
        console.error("Error confirming completion:", err);
        toast.error(`Error: ${err.message || "An unknown error occurred."}`);
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [contract]
  );

  return { confirmCompletion, loading, error };
};

export default useConfirmCompletion;