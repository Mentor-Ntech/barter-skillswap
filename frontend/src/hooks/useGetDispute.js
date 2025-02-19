import { useState, useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import useContract from "./useContract";

const useGetDispute = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [disputes, setDisputes] = useState([]);
    const contract = useContract();

    const getDisputes = useCallback(async () => {
        if (!contract) {
            toast.error("Contract is not available");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            // Fetch disputes from the contract
            const disputes = await contract.getAllDisputes();
            setDisputes(disputes);
        } catch (err) {
            console.error("Error fetching disputes:", err);
            toast.error(`Error: ${err.message || "An unknown error occurred."}`);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [contract]);

    useEffect(() => {
        getDisputes();
    }, [getDisputes]);

    return { disputes, loading, error, getDisputes };
};

export default useGetDispute;