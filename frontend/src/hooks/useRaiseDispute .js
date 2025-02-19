import { useState, useCallback } from "react";
import { toast } from "react-toastify";
import useContract from "./useContract";
import ABI from "../abis/SkillExchange.json";

const useRaiseDispute = () => {
  const [isloading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const contract = useContract(true);


  const raiseDispute = useCallback(
    async (agreementId, reason) => {
      if (!contract) {
        toast.error("Contract is not available");
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const tx = await contract.raiseDispute(agreementId, reason);
        const receipt = await tx.wait();

        if (receipt.status === 1) {
          toast.success("Dispute raised successfully!");
          setLoading(false)
          return receipt.transactionHash;
        } else {
          throw new Error("Transaction failed");
        }
      } catch (err) {
        console.error("Error raising dispute:", err);
        toast.error(`Error: ${err.message || "An unknown error occurred."}`);
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [contract]
  );

  return { raiseDispute, isloading, error };
};

export default useRaiseDispute;