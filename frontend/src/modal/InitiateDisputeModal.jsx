import { useState } from "react";
import { X } from "lucide-react";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";

const InitiateDisputeModal = ({ isOpen, onClose, onSubmit, isloading }) => {
  const [reason, setReason] = useState("");
  const [buttonClicked, setButttonClicked] = useState(false)

  const handleSubmit = () => {
    if (reason.trim() === "") return;
    setButttonClicked(true)
    onSubmit(reason);
    setReason("");
    if (!isloading && buttonClicked) {
        onClose();
    }
    
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6 max-w-md mx-auto bg-white rounded-2xl shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Initiate Dispute</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Reason for Dispute</label>
          <textarea
            className="mt-2 w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
            rows="4"
            placeholder="Enter reason for dispute..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </div>
        <div className="flex justify-end space-x-3">
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button variant="danger" onClick={handleSubmit}>Submit</Button>
        </div>
      </div>
    </Modal>
  );
};

export default InitiateDisputeModal;
