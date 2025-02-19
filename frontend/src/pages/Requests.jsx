import { useState, useEffect } from "react";
import { PlusCircle } from "lucide-react";
import { toast } from "react-toastify";
import Badge from "../components/ui/Badge";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import useRequestService from "../hooks/useRequestService";
import { ethers } from "ethers";

// RequestCard Component remains the same
const RequestCard = ({ request }) => {
  const statusColors = {
    Open: "green",
    "In Progress": "blue",
    Completed: "gray",
  };

  return (
    <Card>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold">{request.title}</h3>
          <p className="text-gray-600">Request #{request.id}</p>
        </div>
        <Badge color={statusColors[request.status]}>{request.status}</Badge>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-500">Requester</p>
          <p className="font-semibold">{request.requester}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Skill Required</p>
          <p className="font-semibold">{request.skill}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Budget (ETH)</p>
          <p className="font-semibold">{request.budget} ETH</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Deadline</p>
          <p className="font-semibold">{request.deadline}</p>
        </div>
      </div>
      <div className="flex justify-end">
        <Button variant="secondary">View Details</Button>
      </div>
    </Card>
  );
};

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    skill: "",
    budget: 0,
    deadline: "",
    description: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { requestService, loading, error } = useRequestService();

  // Effect to load initial requests
  useEffect(() => {
    const initialRequests = [
      {
        id: 1,
        title: "DApp Frontend Development",
        requester: "0x1234...5678",
        skill: "React Development",
        budget: 0.5,
        deadline: "2023-07-30",
        status: "Open",
      },
      {
        id: 2,
        title: "Smart Contract Audit",
        requester: "0xabcd...efgh",
        skill: "Solidity",
        budget: 0.3,
        deadline: "2023-07-15",
        status: "In Progress",
      },
      {
        id: 3,
        title: "Tokenomics Design",
        requester: "0x2345...6789",
        skill: "Token Economics",
        budget: 0.2,
        deadline: "2023-07-20",
        status: "Completed",
      },
    ];
    console.log("Loading initial requests:", initialRequests);
    setRequests(initialRequests);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedValue = name === "budget" ? parseFloat(value) || 0 : value;
    console.log(`Form field "${name}" updated:`, updatedValue);
    setFormData(prev => ({
      ...prev,
      [name]: updatedValue
    }));
  };

  const resetForm = () => {
    console.log("Resetting form");
    setFormData({
      title: "",
      skill: "",
      budget: 0,
      deadline: "",
      description: ""
    });
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log("Submitting form data:", formData);

    try {
      const deadlineTimestamp = Math.floor(new Date(formData.deadline).getTime() / 1000);
      console.log("Calculated deadline timestamp:", deadlineTimestamp);

      if (isNaN(deadlineTimestamp) || deadlineTimestamp <= Date.now() / 1000) {
        toast.error("Invalid deadline. Please select a future date.");
        return;
      }

      const ethValue = ethers.parseUnits(formData.budget.toString());
      console.log("Calculated ETH value:", ethValue.toString());

      toast.info("Please confirm the transaction in MetaMask...");

      // Updated to match the new requestService signature
      const txHash = await requestService(
        formData.description,
        deadlineTimestamp,
        { value: ethValue }
      );

      console.log("Transaction hash:", txHash);

      if (txHash) {
        const signer = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const userAddress = signer[0];
        console.log("User address:", userAddress);

        const newRequest = {
          id: requests.length + 1,
          title: formData.title,
          skill: formData.skill,
          budget: formData.budget,
          deadline: formData.deadline,
          description: formData.description,
          requester: `${userAddress.slice(0, 6)}...${userAddress.slice(-4)}`,
          status: "Open",
          transactionHash: txHash
        };

        console.log("Adding new request:", newRequest);
        setRequests(prev => [...prev, newRequest]);
        toast.success("Service request submitted successfully!");
        resetForm();
      }
    } catch (err) {
      console.error("Error submitting request:", err);
      toast.error(err.message || "Failed to submit request");
    } finally {
      setIsSubmitting(false);
    }
  };
  // Rest of the JSX remains the same
  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Service Requests</h2>
        <Button onClick={() => setShowModal(true)}>
          <PlusCircle className="w-4 h-4 mr-2" />
          Create New Request
        </Button>
      </div>

      <div className="grid gap-6">
        {requests.map((request) => (
          <RequestCard key={request.id} request={request} />
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <form onSubmit={handleSubmit} className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Create New Service Request</h3>
              
              <div className="space-y-4">
                <input
                  type="text"
                  name="title"
                  placeholder="Title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="px-3 py-2 border rounded w-full"
                  required
                />
                
                <input
                  type="text"
                  name="skill"
                  placeholder="Skill Required"
                  value={formData.skill}
                  onChange={handleInputChange}
                  className="px-3 py-2 border rounded w-full"
                  required
                />
                
                <input
                  type="number"
                  name="budget"
                  step="0.01"
                  min="0"
                  placeholder="Budget (ETH)"
                  value={formData.budget}
                  onChange={handleInputChange}
                  className="px-3 py-2 border rounded w-full"
                  required
                />
                
                <input
                  type="date"
                  name="deadline"
                  placeholder="Deadline"
                  value={formData.deadline}
                  onChange={handleInputChange}
                  className="px-3 py-2 border rounded w-full"
                  required
                />
                
                <textarea
                  name="description"
                  placeholder="Description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="px-3 py-2 border rounded w-full"
                  required
                />
              </div>

              <div className="mt-6 space-y-2">
                <Button 
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting || loading}
                >
                  {isSubmitting ? "Submitting..." : "Submit Request"}
                </Button>
                
                <Button 
                  type="button"
                  variant="secondary"
                  className="w-full"
                  onClick={resetForm}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
              </div>

              {error && (
                <p className="mt-2 text-red-500 text-sm">{error}</p>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Requests;