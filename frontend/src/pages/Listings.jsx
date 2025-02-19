import { useState, useEffect, useCallback } from "react"
import { PlusCircle } from "lucide-react"
import { ethers } from "ethers"
import { toast } from "react-toastify"
import Badge from "../components/ui/Badge"
import Card from "../components/ui/Card"
import Button from "../components/ui/Button"
import useListSkill from "../hooks/UseListSkills"
import useSignerOrProvider from "../hooks/UseSignerOrProvider"
import ABI from "../abis/SkillExchange.json"
import RequestModal from "../modal/RequestModal";
import useRequestService from "../hooks/useRequestService"

const Listings = () => {
  const [listings, setListings] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);
  const { createListing, loading, error } = useListSkill();
  const { requestService } = useRequestService()
  const { readOnlyProvider, signer } = useSignerOrProvider();

  const [newListing, setNewListing] = useState({
    skill: "",
    description: "",
  });

  const fetchListings = useCallback(async () => {
    if (!signer && !readOnlyProvider) {
      console.log("Neither signer nor provider available");
      return;
    }

    const skillListingContractAddress = import.meta.env.VITE_APP_SKILL_EXCHANGE;
    try {
      // Use signer if available, otherwise fall back to readOnlyProvider
      const contractProvider = signer || readOnlyProvider;
      const contract = new ethers.Contract(
        skillListingContractAddress,
        ABI,
        contractProvider
      );
      
      // First check if the contract is properly instantiated
      if (!contract.address) {
        // throw new Error("Contract not properly initialized");
      }

      const listings = await contract.getAllListings();
      
      if (listings) {
        console.log({listings});
        setListings(listings);
      }
    } catch (err) {
      // console.error("Error fetching listings:", err);
      if (err.reason === "Not callable by address zero") {
        toast.error("Please connect your wallet to view listings");
      } else {
        toast.error("Failed to fetch listings: " + (err.reason || err.message));
      }
    }
  }, [readOnlyProvider, signer]);

  useEffect(() => {
    // Only fetch if we have either a signer or provider
    if (signer || readOnlyProvider) {
      fetchListings();
    }
  }, [signer, readOnlyProvider, fetchListings]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewListing((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!signer) {
      toast.error("Please connect your wallet");
      return;
    }
    console.log({createListing})
    try {
      await createListing(newListing.skill, newListing.description);
      setShowCreateModal(false);
      setNewListing({skill: "", description: "" });
      fetchListings();
    } catch (err) {
      console.error("Error creating listing:", err);
      toast.error("Failed to create listing");
    }
  };

  const handleRequestClick = (listing, setListings) => {
    setSelectedListing(listing, setListings);
    setShowRequestModal(true);
  };

  const handleRequestSubmit = async (listingId, description, deadline) => {
    if (!signer) {
      toast.error("Please connect your wallet");
      return;
    }
    try {
      await requestService(listingId, description, deadline)
      
      toast.success("Service requested successfully");
      setShowRequestModal(false);
    } catch (err) {
      // console.error("Error requesting service:", err);
      toast.error("Failed to request service");
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-6 mb-8 shadow-lg">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-3xl font-bold text-white">Listings</h2>
            <Button
              onClick={() => setShowCreateModal(true)}
              className="w-full sm:w-auto bg-blue-600 text-white hover:bg-gray-100"
            >
              <PlusCircle className="w-4 h-4 mr-2" />
              Create New Listing
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {listings.map((listing) => (
            <ListingCard
              key={listing.id}
              listing={listing}
              onRequestClick={handleRequestClick}
            />
          ))} 
        </div>

        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg w-full max-w-md overflow-hidden shadow-xl">
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Create New Listing
                </h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <input
                      type="text"
                      name="skill"
                      value={newListing.skill}
                      onChange={handleInputChange}
                      placeholder="Skill Required"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <textarea
                      name="description"
                      value={newListing.description}
                      onChange={handleInputChange}
                      placeholder="Description"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[120px]"
                      required
                    ></textarea>
                  </div>
                  <div className="flex gap-4">
                    <Button
                      type="button"
                      variant="secondary"
                      className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800"
                      onClick={() => setShowCreateModal(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="primary"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                      disabled={loading || !signer}
                    >
                      {loading ? "Creating..." : "Submit Listing"}
                    </Button>
                  </div>

                </form>
                
              </div>
            </div>
          </div>
        )}

        {showRequestModal && selectedListing && (
          <RequestModal
            listing={selectedListing}
            onClose={() => setShowRequestModal(false)}
            onSubmit={handleRequestSubmit}
          />
        )}
      </div>
    </div>
  );
};

const ListingCard = ({ listing, onRequestClick }) => {
  const statusColors = {
    Available: "bg-green-100 text-green-800",
    Sold: "bg-gray-100 text-gray-800",
  };

  return (
    <Card className="flex flex-col h-full transition-transform transform hover:scale-105 hover:shadow-lg">
      <div className="p-6 flex flex-col h-full">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-500">Listing #{Number(listing.id)}</p>
          </div>
          <Badge className={`${statusColors[listing.isAvailable]} px-3 py-1 text-sm font-semibold`}>
            {listing.isAvailable}
          </Badge>
        </div>

        <div className="space-y-4 mb-6">
          <div>
            <p className="text-sm text-gray-500 font-medium">Creator</p>
            <p className="text-sm text-gray-900 font-semibold truncate">
              {listing.userAddress}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Skill Required</p>
            <p className="text-sm text-gray-900 font-semibold">
              {listing.skillName}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Description</p>
            <p className="text-sm text-gray-900 line-clamp-3">
              {listing.description}
            </p>
          </div>
        </div>

        <div className="mt-auto flex gap-3">
          <Button
            variant="secondary"
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800"
          >
            View Details
          </Button>
          <Button
            variant="primary"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => onRequestClick(listing)}
          >
            Request
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default Listings;