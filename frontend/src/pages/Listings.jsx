import { useState } from "react";
import { PlusCircle } from "lucide-react";
import Badge from "../components/ui/Badge";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

const Listings = () => {
  const [listings, setListings] = useState([
    {
      id: 1,
      title: "Smart Contract Development",
      creator: "0x1234...5678",
      skill: "Solidity",
      price: 0.5,
      status: "Available",
    },
    {
      id: 2,
      title: "Decentralized App Design",
      creator: "0xabcd...efgh",
      skill: "React, Node.js",
      price: 1.0,
      status: "Sold",
    },
    {
      id: 3,
      title: "Tokenomics Consultation",
      creator: "0x2345...6789",
      skill: "Token Economics",
      price: 0.3,
      status: "Available",
    },
  ]);

  const [showModal, setShowModal] = useState(false);

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Listings</h2>
        <Button onClick={() => setShowModal(true)}>
          <PlusCircle className="w-4 h-4 mr-2" />
          Create New Listing
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {listings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Create New Listing</h3>
              <div className="mt-2 px-7 py-3">
                <input type="text" placeholder="Title" className="mb-3 px-3 py-2 border rounded w-full" />
                <input type="text" placeholder="Skill Required" className="mb-3 px-3 py-2 border rounded w-full" />
                <input
                  type="number"
                  step="0.01"
                  placeholder="Price (ETH)"
                  className="mb-3 px-3 py-2 border rounded w-full"
                />
                <textarea placeholder="Description" className="mb-3 px-3 py-2 border rounded w-full"></textarea>
              </div>
              <div className="items-center px-4 py-3">
                <Button onClick={() => setShowModal(false)} className="w-full">
                  Submit Listing
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ListingCard = ({ listing }) => {
  const statusColors = {
    Available: "green",
    Sold: "gray",
  };

  return (
    <Card className="p-4 border rounded-md shadow-md">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold">{listing.title}</h3>
          <p className="text-gray-600">Listing #{listing.id}</p>
        </div>
        <Badge color={statusColors[listing.status]}>{listing.status}</Badge>
      </div>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-500">Creator</p>
          <p className="font-semibold">{listing.creator}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Skill Required</p>
          <p className="font-semibold">{listing.skill}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Price (ETH)</p>
          <p className="font-semibold">{listing.price} ETH</p>
        </div>
      </div>
      <div className="flex justify-end">
        <Button variant="secondary">View Details</Button>
      </div>
    </Card>
  );
};

export default Listings;
