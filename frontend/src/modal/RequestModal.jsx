import React, { useState } from "react";
import Button from "../components/ui/Button";

const RequestModal = ({ listing, onClose, onSubmit }) => {
  const [requestDescription, setRequestDescription] = useState("");
  const [deadline, setDeadline] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Convert the deadline date to seconds (Unix timestamp)
    const deadlineInSeconds = Math.floor(new Date(deadline).getTime() / 1000);

    // Validate the deadline
    if (isNaN(deadlineInSeconds) || deadlineInSeconds <= Math.floor(Date.now() / 1000)) {
      alert("Invalid deadline. Please select a future date.");
      return;
    }

    // Call the onSubmit function with the listing ID, description, and deadline in seconds
    onSubmit(listing.id, requestDescription, deadlineInSeconds);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-md overflow-hidden shadow-xl">
        <div className="p-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Request Service
          </h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={requestDescription}
                onChange={(e) => setRequestDescription(e.target.value)}
                placeholder="Describe your request"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none min-h-[120px]"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deadline
              </label>
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div className="flex gap-4">
              <Button
                type="button"
                variant="secondary"
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                Submit Request
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RequestModal;