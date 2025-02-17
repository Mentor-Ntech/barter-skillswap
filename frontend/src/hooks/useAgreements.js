import { useState, useEffect } from 'react';
import useContract from './useContract';

export default function useAgreements() {
  const [agreements, setAgreements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Get contract instance with signer for write operations
  const contract = useContract(true);

  const transformAgreement = (contractAgreement) => {
    if (!contractAgreement) return null;
    
    const statusMap = {
      0: 'Active',
      1: 'Completed',
      2: 'Disputed',
      3: 'Canceled'
    };

    try {
      return {
        id: Number(contractAgreement.id),
        requestId: Number(contractAgreement.requestId),
        provider: contractAgreement.provider,
        requester: contractAgreement.requester,
        status: statusMap[Number(contractAgreement.status)],
        providerConfirmed: contractAgreement.providerConfirmed,
        requesterConfirmed: contractAgreement.requesterConfirmed
      };
    } catch (err) {
      console.error('Error transforming agreement:', err);
      return null;
    }
  };

  const createAgreement = async (requestId) => {
    if (!contract) {
      setError('Contract connection not available');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      const tx = await contract.createAgreement(requestId);
      await tx.wait();
      await fetchAgreements();
    } catch (err) {
      console.error('Failed to create agreement:', err);
      setError(err.message || 'Failed to create agreement');
    } finally {
      setLoading(false);
    }
  };

  const confirmCompletion = async (agreementId) => {
    if (!contract) {
      setError('Contract connection not available');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const tx = await contract.confirmCompletion(agreementId);
      await tx.wait();
      await fetchAgreements();
    } catch (err) {
      console.error('Failed to confirm completion:', err);
      setError(err.message || 'Failed to confirm completion');
    } finally {
      setLoading(false);
    }
  };

  const fetchAgreements = async () => {
    if (!contract) {
      setError('Contract connection not available');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const agreementCount = await contract.agreementCounter();
      const fetchedAgreements = [];

      for (let i = 0; i < Number(agreementCount); i++) {
        const agreement = await contract.agreements(i);
        const transformedAgreement = transformAgreement(agreement);
        if (transformedAgreement) {
          fetchedAgreements.push(transformedAgreement);
        }
      }

      setAgreements(fetchedAgreements);
    } catch (err) {
      console.error('Failed to fetch agreements:', err);
      setError(err.message || 'Failed to fetch agreements');
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if (contract) {
      const handleAgreementCreated = async (id, provider, requester) => {
        console.log('Agreement created:', { id, provider, requester });
        await fetchAgreements();
      };

      const handleAgreementCompleted = async (id) => {
        console.log('Agreement completed:', id);
        await fetchAgreements();
      };

      
      contract.on('AgreementCreated', handleAgreementCreated);
      contract.on('AgreementCompleted', handleAgreementCompleted);

    
      fetchAgreements().catch(console.error);

    
      return () => {
        contract.off('AgreementCreated', handleAgreementCreated);
        contract.off('AgreementCompleted', handleAgreementCompleted);
      };
    }
  }, [contract]);

  return {
    agreements,
    loading,
    error,
    createAgreement,
    confirmCompletion,
    fetchAgreements,
    isConnected: !!contract
  };
}