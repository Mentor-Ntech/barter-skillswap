// import { useState } from "react"
// import { Check, X } from "lucide-react"
// import Badge from "../components/ui/Badge"
// import Card from "../components/ui/Card"
// import Button from "../components/ui/Button"

// const Agreements = () => {
//   const [agreements, setAgreements] = useState([
//     {
//       id: 1,
//       title: "Web3 Development Project",
//       provider: "0x1234...5678",
//       requester: "0xabcd...efgh",
//       status: "Active",
//       amount: 0.5,
//       deadline: "2023-07-15",
//     },
//     {
//       id: 2,
//       title: "NFT Design",
//       provider: "0x2345...6789",
//       requester: "0xbcde...fghi",
//       status: "Completed",
//       amount: 0.2,
//       deadline: "2023-06-30",
//     },
//     {
//       id: 3,
//       title: "Smart Contract Audit",
//       provider: "0x3456...7890",
//       requester: "0xcdef...ghij",
//       status: "Disputed",
//       amount: 0.3,
//       deadline: "2023-07-10",
//     },
//   ])

//   return (
//     <div className="space-y-6 p-6">
//       <h2 className="text-3xl font-bold">Smart Contract Agreements</h2>
//       <div className="grid gap-6">
//         {agreements.map((agreement) => (
//           <AgreementCard key={agreement.id} agreement={agreement} />
//         ))}
//       </div>
//     </div>
//   )
// }

// const AgreementCard = ({ agreement }) => {
//   const statusColors = {
//     Active: "green",
//     Completed: "blue",
//     Disputed: "red",
//   }

//   return (
//     <Card>
//       <div className="flex justify-between items-start mb-4">
//         <div>
//           <h3 className="text-xl font-semibold">{agreement.title}</h3>
//           <p className="text-gray-600">Agreement #{agreement.id}</p>
//         </div>
//         <Badge color={statusColors[agreement.status]}>{agreement.status}</Badge>
//       </div>
//       <div className="grid grid-cols-2 gap-4 mb-4">
//         <div>
//           <p className="text-sm text-gray-500">Provider</p>
//           <p className="font-semibold">{agreement.provider}</p>
//         </div>
//         <div>
//           <p className="text-sm text-gray-500">Requester</p>
//           <p className="font-semibold">{agreement.requester}</p>
//         </div>
//         <div>
//           <p className="text-sm text-gray-500">Amount (ETH)</p>
//           <p className="font-semibold">{agreement.amount} ETH</p>
//         </div>
//         <div>
//           <p className="text-sm text-gray-500">Deadline</p>
//           <p className="font-semibold">{agreement.deadline}</p>
//         </div>
//       </div>
//       {agreement.status === "Active" && (
//         <div className="flex justify-end space-x-2">
//           <Button variant="secondary">
//             <Check className="w-4 h-4 mr-2" />
//             Confirm Completion
//           </Button>
//           <Button variant="danger">
//             <X className="w-4 h-4 mr-2" />
//             Initiate Dispute
//           </Button>
//         </div>
//       )}
//     </Card>
//   )
// }

// export default Agreements

// import { useState } from "react";
// import { Check, X } from "lucide-react";
// import Badge from "../components/ui/Badge";
// import Card from "../components/ui/Card";
// import Button from "../components/ui/Button";

// const Agreements = () => {
//   const [agreements, setAgreements] = useState([
//     {
//       id: 1,
//       title: "Web3 Development Project",
//       provider: "0x1234...5678",
//       requester: "0xabcd...efgh",
//       status: "Active",
//       amount: 0.5,
//       deadline: "2023-07-15",
//       providerConfirmed: false,
//       requesterConfirmed: false,
//     },
//     {
//       id: 2,
//       title: "NFT Design",
//       provider: "0x2345...6789",
//       requester: "0xbcde...fghi",
//       status: "Completed",
//       amount: 0.2,
//       deadline: "2023-06-30",
//       providerConfirmed: true,
//       requesterConfirmed: true,
//     },
//     {
//       id: 3,
//       title: "Smart Contract Audit",
//       provider: "0x3456...7890",
//       requester: "0xcdef...ghij",
//       status: "Disputed",
//       amount: 0.3,
//       deadline: "2023-07-10",
//       providerConfirmed: false,
//       requesterConfirmed: false,
//     },
//   ]);

//   // Simulate creating an agreement
//   const createAgreement = (requestId) => {
//     const newAgreement = {
//       id: agreements.length + 1, // Simulate agreementCounter
//       title: `New Agreement ${agreements.length + 1}`,
//       provider: "0xProviderAddress",
//       requester: "0xRequesterAddress",
//       status: "Active",
//       amount: 0.1, // Default amount
//       deadline: "2023-12-31", // Default deadline
//       providerConfirmed: false,
//       requesterConfirmed: false,
//     };

//     setAgreements([...agreements, newAgreement]);
//     console.log("Agreement Created:", newAgreement);
//   };

//   // Simulate confirming completion
//   const confirmCompletion = (agreementId, userType) => {
//     setAgreements((prevAgreements) =>
//       prevAgreements.map((agreement) => {
//         if (agreement.id === agreementId) {
//           const updatedAgreement = { ...agreement };
//           if (userType === "provider") {
//             updatedAgreement.providerConfirmed = true;
//           } else if (userType === "requester") {
//             updatedAgreement.requesterConfirmed = true;
//           }

//           // Check if both parties confirmed
//           if (
//             updatedAgreement.providerConfirmed &&
//             updatedAgreement.requesterConfirmed
//           ) {
//             completeAgreement(agreementId);
//           }

//           return updatedAgreement;
//         }
//         return agreement;
//       })
//     );
//   };

//   // Simulate completing an agreement
//   const completeAgreement = (agreementId) => {
//     setAgreements((prevAgreements) =>
//       prevAgreements.map((agreement) => {
//         if (agreement.id === agreementId) {
//           return { ...agreement, status: "Completed" };
//         }
//         return agreement;
//       })
//     );
//     console.log("Agreement Completed:", agreementId);
//   };

//   return (
//     <div className="space-y-6 p-6">
//       <h2 className="text-3xl font-bold">Smart Contract Agreements</h2>
//       <div className="grid gap-6">
//         {agreements.map((agreement) => (
//           <AgreementCard
//             key={agreement.id}
//             agreement={agreement}
//             onConfirmCompletion={confirmCompletion}
//           />
//         ))}
//       </div>
//       <Button onClick={() => createAgreement(1)}>Create Agreement</Button>
//     </div>
//   );
// };

// const AgreementCard = ({ agreement, onConfirmCompletion }) => {
//   const statusColors = {
//     Active: "green",
//     Completed: "blue",
//     Disputed: "red",
//   };

//   return (
//     <Card>
//       <div className="flex justify-between items-start mb-4">
//         <div>
//           <h3 className="text-xl font-semibold">{agreement.title}</h3>
//           <p className="text-gray-600">Agreement #{agreement.id}</p>
//         </div>
//         <Badge color={statusColors[agreement.status]}>{agreement.status}</Badge>
//       </div>
//       <div className="grid grid-cols-2 gap-4 mb-4">
//         <div>
//           <p className="text-sm text-gray-500">Provider</p>
//           <p className="font-semibold">{agreement.provider}</p>
//         </div>
//         <div>
//           <p className="text-sm text-gray-500">Requester</p>
//           <p className="font-semibold">{agreement.requester}</p>
//         </div>
//         <div>
//           <p className="text-sm text-gray-500">Amount (ETH)</p>
//           <p className="font-semibold">{agreement.amount} ETH</p>
//         </div>
//         <div>
//           <p className="text-sm text-gray-500">Deadline</p>
//           <p className="font-semibold">{agreement.deadline}</p>
//         </div>
//       </div>
//       {agreement.status === "Active" && (
//         <div className="flex justify-end space-x-2">
//           <Button
//             variant="secondary"
//             onClick={() => onConfirmCompletion(agreement.id, "provider")}
//           >
//             <Check className="w-4 h-4 mr-2" />
//             Provider Confirm
//           </Button>
//           <Button
//             variant="secondary"
//             onClick={() => onConfirmCompletion(agreement.id, "requester")}
//           >
//             <Check className="w-4 h-4 mr-2" />
//             Requester Confirm
//           </Button>
//           <Button variant="danger">
//             <X className="w-4 h-4 mr-2" />
//             Initiate Dispute
//           </Button>
//         </div>
//       )}
//     </Card>
//   );
// };

// export default Agreements;


// Updated code 


import { Check, X } from "lucide-react";
import Badge from "../components/ui/Badge";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import useAgreements from "../hooks/useAgreements";

const Agreements = () => {
  const {
    agreements,
    loading,
    error,
    createAgreement,
    confirmCompletion,
    isConnected
  } = useAgreements();

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
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <p className="text-lg text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Smart Contract Agreements</h2>
        <Button onClick={() => createAgreement(1)}>Create Agreement</Button>
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
            />
          ))}
        </div>
      )}
    </div>
  );
};

const AgreementCard = ({ agreement, onConfirmCompletion }) => {
  const statusColors = {
    Active: "green",
    Completed: "blue",
    Disputed: "red",
    Canceled: "gray"
  };

  const shortenAddress = (address) => {
    return address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Unknown';
  };

  const handleConfirmCompletion = async () => {
    try {
      await onConfirmCompletion(agreement.id);
    } catch (err) {
      console.error('Error confirming completion:', err);
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
          <Button
            variant="secondary"
            onClick={handleConfirmCompletion}
            className="flex items-center"
          >
            <Check className="w-4 h-4 mr-2" />
            Confirm Completion
          </Button>
          <Button variant="danger" className="flex items-center">
            <X className="w-4 h-4 mr-2" />
            Initiate Dispute
          </Button>
        </div>
      )}
    </Card>
  );
};

export default Agreements;