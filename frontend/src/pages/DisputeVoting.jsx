import React, { useState, useEffect } from 'react';
import { Shield, CheckCircle, AlertCircle, Users } from 'lucide-react';

const DisputeVoting = () => {
  const [disputes, setDisputes] = useState([]);
  const [isTrustedSigner, setIsTrustedSigner] = useState(false);
  const [loading, setLoading] = useState(true);

  // Mock data - replace with contract calls
  const mockDisputes = [
    {
      id: 1,
      listingId: 123,
      raisedBy: "0x1234...5678",
      description: "Service not delivered as promised",
      resolved: false,
      voteCounts: 3,
      requiredVotes: 5,
      hasVoted: false
    },
    // Add more disputes...
  ];

  const handleVote = async (disputeId, resolution) => {
    try {
      // Add contract interaction here
      console.log(`Voted on dispute ${disputeId} with resolution ${resolution}`);
    } catch (error) {
      console.error('Error voting on dispute:', error);
    }
  };

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dispute Resolution</h1>
        <p className="text-gray-600">Vote on active disputes as a trusted signer</p>
      </div>

      {/* Trusted Signer Status */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
        <div className="flex items-center gap-3">
          <Shield className="w-6 h-6 text-blue-600" />
          <div>
            <h2 className="font-semibold">Trusted Signer Status</h2>
            <p className="text-sm text-gray-600">
              {isTrustedSigner 
                ? "You are a trusted signer and can vote on disputes" 
                : "You are not a trusted signer"}
            </p>
          </div>
        </div>
      </div>

      {/* Voting Progress */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <StatCard
          icon={<AlertCircle className="w-6 h-6 text-orange-600" />}
          label="Active Disputes"
          value={disputes.filter(d => !d.resolved).length}
        />
        <StatCard
          icon={<CheckCircle className="w-6 h-6 text-green-600" />}
          label="Resolved Disputes"
          value={disputes.filter(d => d.resolved).length}
        />
        <StatCard
          icon={<Users className="w-6 h-6 text-blue-600" />}
          label="Required Votes"
          value="60%"
        />
      </div>

      {/* Disputes List */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium mb-4">Active Disputes</h3>
          
          <div className="space-y-4">
            {mockDisputes.map((dispute) => (
              <DisputeCard 
                key={dispute.id}
                dispute={dispute}
                onVote={handleVote}
                isTrustedSigner={isTrustedSigner}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const DisputeCard = ({ dispute, onVote, isTrustedSigner }) => {
  const progress = (dispute.voteCounts / dispute.requiredVotes) * 100;

  return (
    <div className="border rounded-lg p-4">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className="font-semibold">Dispute #{dispute.id}</h4>
          <p className="text-sm text-gray-600">Listing #{dispute.listingId}</p>
        </div>
        <div className="text-right">
          <span className="text-sm text-gray-600">
            {dispute.voteCounts}/{dispute.requiredVotes} votes
          </span>
        </div>
      </div>

      <p className="text-gray-700 mb-4">{dispute.description}</p>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
        <div 
          className="bg-blue-600 h-2.5 rounded-full" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Voting Buttons */}
      {isTrustedSigner && !dispute.hasVoted && !dispute.resolved && (
        <div className="flex gap-3">
          <button
            onClick={() => onVote(dispute.id, true)}
            className="flex-1 bg-green-50 text-green-700 px-4 py-2 rounded-lg hover:bg-green-100"
          >
            Support Resolution
          </button>
          <button
            onClick={() => onVote(dispute.id, false)}
            className="flex-1 bg-red-50 text-red-700 px-4 py-2 rounded-lg hover:bg-red-100"
          >
            Reject Resolution
          </button>
        </div>
      )}

      {dispute.hasVoted && (
        <p className="text-sm text-gray-600">You have already voted on this dispute</p>
      )}
    </div>
  );
};

const StatCard = ({ icon, label, value }) => (
  <div className="bg-white p-6 rounded-lg shadow">
    <div className="flex items-center gap-3 mb-2">
      {icon}
      <h3 className="font-semibold">{label}</h3>
    </div>
    <p className="text-3xl font-bold">{value}</p>
  </div>
);

export default DisputeVoting;
