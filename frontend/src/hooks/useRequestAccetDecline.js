import { useState, useCallback } from "react";
import { toast } from "react-toastify";
import useContract from "./useContract";

const useRequestAccetDecline = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const contract = useContract(true);
    

    const acceptDeeclineService = useCallback(
        async (requestId, status) => {
            if (!contract) {
                toast.error("Contract is not available");
                return;
            }
    
            setLoading(true);
            setError(null);
    
            try {
                const newId = Number(requestId);
                console.log("Calling contract with:", { requestId: newId, status });
    
                // Estimate gas
                let estimatedGas;
                try {
                    estimatedGas = await contract.respondToRequest.estimateGas(
                        BigInt(newId), status
                    );
                    console.log("Estimated gas:", estimatedGas.toString());
                } catch (err) {
                    console.error("Gas estimation failed:", err);
                    toast.error("Gas estimation failed. Check contract logic or parameters.");
                    return;
                }
    
                // Send transaction
                const tx = await contract.respondToRequest(BigInt(newId), status, {
                    gasLimit: (estimatedGas * BigInt(150)) / BigInt(100), 
                });
                console.log("Transaction sent:", tx.hash);
    
                // Wait for receipt
                const receipt = await tx.wait();
                console.log("Transaction receipt:", receipt);
    
                if (receipt.status === 1) {
                    toast.success(
                        status
                            ? "Service request accepted successfully!"
                            : "Service request declined successfully!"
                    );
                    return receipt.transactionHash;
                } else {
                    throw new Error("Transaction failed");
                }
            } catch (err) {
                console.error("Error accepting/declining service:", err);
                toast.error(`Error: ${err.message || "An unknown error occurred."}`);
                setError(err.message);
                throw err;
            } finally {
                setLoading(false);
            }
        },
        [contract]
    );

    return { acceptDeeclineService, loading, error };
};

export default useRequestAccetDecline;