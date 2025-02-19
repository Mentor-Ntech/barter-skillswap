import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Badge from "../components/ui/Badge";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { ethers } from "ethers";
import ABI from "../abis/SkillExchange.json";
import { useAppKitAccount } from "@reown/appkit/react";
import useSignerOrProvider from "../hooks/UseSignerOrProvider";
import useRequestAccetDecline from "../hooks/useRequestAccetDecline";


const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [userRequests, setUserRequests] = useState([]);
  const [showUserRequests, setShowUserRequests] = useState(false);
  const { readOnlyProvider, signer } = useSignerOrProvider();
  const { address } = useAppKitAccount();
  const { acceptDeeclineService, loading, error } = useRequestAccetDecline();



   const getStatusText = (statusNumber) => {
    const statusMap = {
      0: "Pending",
      1: "Accepted", 
      2: "Rejected",
      3: "InProgress",
      4: "Completed",
      5: "Disputed"
    };
    return statusMap[statusNumber] || "Unknown";
  };

  

  const fetchRequestsAndListings = async () => {

    console.log({readOnlyProvider});

    if (!readOnlyProvider) {
      console.log("Provider not available yet");
      return;
    }

    const contractAddress = import.meta.env.VITE_APP_SKILL_EXCHANGE;
    try {
      const contract = new ethers.Contract(contractAddress, ABI, readOnlyProvider);

      // Fetch all requests and listings
      const allRequests = await contract.getAllRequests();
      const allListings = await contract.getAllListings();

      console.log({allRequests});
      console.log({allListings})

      // Format requests and include skill from listings
      const formattedRequests = allRequests.map((request) => {

        console.log(request.status)

        // Find the corresponding listing for the request
        const listing = allListings.find(
          (listing) => Number(listing.id).toString() === Number(request.listingId).toString()
        );

        return {
          id: Number(request.id).toString(),
          title: request.description, // Assuming description is used as the title
          requester: request.requester,
          skill: listing ? listing.skillName : "Unknown Skill", // Get skill from listing
          deadline: new Date(Number(request.deadline) * 1000).toLocaleDateString(), // Convert timestamp to date
          description: request.description,
          status: getStatusText(Number(request.status))
           
        };
      });

      setRequests(formattedRequests);

      // Filter requests created by the user
      if (address) {
        const userRequests = formattedRequests.filter(
          (request) => request.requester.toLowerCase() === address.toLowerCase()
        );
        setUserRequests(userRequests);
      }
    } catch (err) {
      console.error("Error fetching requests and listings:", err);
      toast.error("Failed to fetch requests and listings");
    }
  };


  const handleRequestAcceptDecline = async (requestId, status) => {


console.log({status})
    let requestStatus;

    if(status === true) {
      requestStatus = status;
    }else {
      requestStatus = status;
    }


    if (!signer) {

      toast.error("Please connect your wallet");
      return;
    }
    try {

      
      await acceptDeeclineService(requestId, requestStatus);

      await fetchRequestsAndListings();

      
      toast.success("Error responding to request");
      // setShowRequestModal(false);
    } catch (err) {
      console.error("Error responding to request:", err);
      toast.error("Failed to respond to request");
    }

  };





  useEffect(() => {
    if (readOnlyProvider) {
      fetchRequestsAndListings();
    }
  }, [readOnlyProvider, address]);

  const toggleUserRequests = () => {
    setShowUserRequests(!showUserRequests);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-6 mb-8 shadow-lg">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Service Requests</h2>
            <Button
              onClick={toggleUserRequests}
              className="w-full sm:w-auto bg-white text-blue-600 hover:bg-gray-100"
            >
              {showUserRequests ? "Show All Requests" : "Show My Requests"}
            </Button>
          </div>
        </div>

        {/* Requests Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {(showUserRequests ? userRequests : requests).map((request) => (
            <RequestCard handleRequestAcceptDecline={handleRequestAcceptDecline} key={request.id} request={request} />
          ))}
        </div>
      </div>
    </div>
  );
};



export default Requests;




const RequestCard = ({ handleRequestAcceptDecline, request }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isProcessingDecline, setIsProcessingDecline] = useState(false);

  
  const statusColors = {
    Pending: "bg-yellow-100 text-yellow-800",
    Accepted: "bg-green-100 text-green-800",
    Rejected: "bg-red-100 text-red-800",
    InProgress: "bg-blue-100 text-blue-800",
    Completed: "bg-gray-100 text-gray-800",
    Disputed: "bg-purple-100 text-purple-800"
  };
  
  const handleAcceptAction = async (status) => {
    setIsProcessing(true);
    try {
      await handleRequestAcceptDecline(request.id, status);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDeleteAction = async (status) => {
    setIsProcessingDecline(true);
    try {
      await handleRequestAcceptDecline(request.id, status);
    } finally {
      setIsProcessingDecline(false);
    }
  };

  return (
    <Card className="flex flex-col h-full transition-transform transform hover:scale-105 hover:shadow-lg border border-gray-200">
    <div className="p-6 flex flex-col h-full">
      {/* Card Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-bold text-gray-900 truncate">
            {request.title}
          </h3>
          <p className="text-sm text-gray-500">Request #{request.id}</p>
        </div>
        <Badge className={`${statusColors[request.status]} px-3 py-1 text-sm font-semibold`}>
          {request.status}
        </Badge>
      </div>

      {/* Card Body */}
      <div className="space-y-4 mb-6">
        <div>
          <p className="text-sm text-gray-500 font-medium">Skill Required</p>
          <p className="text-sm text-gray-900 font-semibold">
            {request.skill}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500 font-medium">Requester</p>
          <p className="text-sm text-gray-900 font-semibold">
            {request.requester}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500 font-medium">Deadline</p>
          <p className="text-sm text-gray-900 font-semibold">
            {request.deadline}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500 font-medium">Description</p>
          <p className="text-sm text-gray-900 line-clamp-3">
            {request.description}
          </p>
        </div>
      </div>

      <div className="mt-auto flex space-x-4">
    <Button
      onClick={() => handleAcceptAction(true)}
      disabled={isProcessing || request.status !== "Pending"}
      className="w-full bg-green-500 hover:bg-green-600 text-white disabled:opacity-50"
    >
      {isProcessing ? "Processing..." : "Accept"}
    </Button>
    <Button
      onClick={() => handleDeleteAction(false)}
      disabled={isProcessingDecline || request.status !== "Pending"}
      className="w-full bg-red-500 hover:bg-red-600 text-white disabled:opacity-50"
    >
      {isProcessingDecline ? "Processing..." : "Decline"}
    </Button>
  </div>

      
    </div>
  </Card>    
  );
};