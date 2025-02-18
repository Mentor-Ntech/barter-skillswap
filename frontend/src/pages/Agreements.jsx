import { useState } from "react";
import { Check, X } from "lucide-react";
import Badge from "../components/ui/Badge";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import InitiateDisputeModal from "../modal/InitiateDisputeModal";
import useAgreements from "../hooks/useAgreements";
import useRaiseDispute from "../hooks/useRaiseDispute ";


const Agreements = () => {
  const {
    agreements,
    loading,
    error,
    createAgreement,
    confirmCompletion,
    isConnected,
  } = useAgreements();

  const {raiseDispute, isloading} = useRaiseDispute()


  // State to control the dispute modal and selected agreement
  const [isDisputeModalOpen, setIsDisputeModalOpen] = useState(false);
  const [selectedAgreement, setSelectedAgreement] = useState(null);

  const handleInitiateDisputeSubmit = async (reason) => {
    if (!selectedAgreement) return;
    try {
      // Call your initiateDispute function with the agreement id and dispute reason
      await raiseDispute(selectedAgreement.id, reason);
      // Optionally refresh your data or display a success message here
    } catch (err) {
      console.error("Error initiating dispute:", err);
    }
  };

  if (!isConnected) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <p className="text-lg">Connecting to contract...</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <p className="text-lg">Loading agreements...</p>
      </div>
    );
  }

  if (error) {
    console.error(error);
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        {/* Uncomment below if you want to display the header and create agreement button */}
        {/* <h2 className="text-3xl font-bold">Smart Contract Agreements</h2>
        <Button onClick={() => createAgreement(1)}>Create Agreement</Button> */}
      </div>
      
      {agreements.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500">No agreements found</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {agreements.map((agreement) => (
            <AgreementCard
              key={agreement.id}
              agreement={agreement}
              onConfirmCompletion={confirmCompletion}
              onInitiateDispute={(agreement) => {
                setSelectedAgreement(agreement);
                setIsDisputeModalOpen(true);
              }}
            />
          ))}
        </div>
      )}

      <InitiateDisputeModal
        isOpen={isDisputeModalOpen}
        onClose={() => setIsDisputeModalOpen(false)}
        onSubmit={handleInitiateDisputeSubmit}
        isLoading={isloading}
      />
    </div>
  );
};

const AgreementCard = ({ agreement, onConfirmCompletion, onInitiateDispute }) => {
  const statusColors = {
    Active: "green",
    Completed: "blue",
    Disputed: "red",
    Canceled: "gray"
  };

  const shortenAddress = (address) =>
    address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "Unknown";

  const handleConfirmCompletion = async () => {
    try {
      await onConfirmCompletion(agreement.id);
    } catch (err) {
      console.error("Error confirming completion:", err);
    }
  };

  return (
    <Card>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold">Agreement #{agreement.id}</h3>
          <p className="text-gray-600">Request #{agreement.requestId}</p>
        </div>
        <Badge color={statusColors[agreement.status] || "gray"}>
          {agreement.status}
        </Badge>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-500">Provider</p>
          <p className="font-semibold">{shortenAddress(agreement.provider)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Requester</p>
          <p className="font-semibold">{shortenAddress(agreement.requester)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Provider Confirmed</p>
          <p className="font-semibold">
            {agreement.providerConfirmed ? (
              <span className="text-green-500">Yes</span>
            ) : (
              <span className="text-red-500">No</span>
            )}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Requester Confirmed</p>
          <p className="font-semibold">
            {agreement.requesterConfirmed ? (
              <span className="text-green-500">Yes</span>
            ) : (
              <span className="text-red-500">No</span>
            )}
          </p>
        </div>
      </div>

      {agreement.status === "Active" && (
        <div className="flex justify-end space-x-2">
          {!agreement?.providerConfirmed && (
            <Button
              variant="secondary"
              onClick={handleConfirmCompletion}
              className="flex items-center"
            >
              <Check className="w-4 h-4 mr-2" />
              Confirm Completion
            </Button>
          )}
          
          <Button
            variant="danger"
            className="flex items-center"
            onClick={() => onInitiateDispute(agreement)}
          >
            <X className="w-4 h-4 mr-2" />
            Initiate Dispute
          </Button>
        </div>
      )}
    </Card>
  );
};

export default Agreements;
