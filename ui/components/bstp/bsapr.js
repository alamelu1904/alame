import React, { useState } from "react";
import { Modal, Button, Select, Input, Label } from "@/components/ui";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (status: string, comments: string) => void;
  params: any; // Accepting params as per the provided structure
}

const ApproveRejectModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  params,
}) => {
  // Extract action list values safely
  const statusOptions = params?.actionListVals?.actionlistVals || [];

  const [newStatus, setNewStatus] = useState("");
  const [comments, setComments] = useState("");
  const [error, setError] = useState("");

  const validateFields = () => {
    if (!newStatus || !comments.trim()) {
      setError("Both fields are mandatory.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = () => {
    if (!validateFields()) return;
    onSubmit(newStatus, comments);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6 w-96 bg-white rounded-lg shadow-lg">
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-xl font-semibold">Approve/Reject</h2>
          <button onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4">
          {/* New Status Dropdown */}
          <Label className="font-medium">
            New Status <span className="text-red-500">*</span>
          </Label>
          <Select
            className={`w-full mt-1 border p-2 rounded ${!newStatus && error ? "border-red-500" : ""}`}
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
          >
            <option value="">Select Status</option>
            {statusOptions.map((option: { paramDesc: string; paramValue: string }) => (
              <option key={option.paramValue} value={option.paramValue}>
                {option.paramDesc}
              </option>
            ))}
          </Select>
        </div>

        <div className="mt-4">
          {/* Processing Comments (Text Box) */}
          <Label className="font-medium">
            Processing Comments <span className="text-red-500">*</span>
          </Label>
          <Input
            className={`w-full mt-1 border p-2 rounded ${!comments.trim() && error ? "border-red-500" : ""}`}
            type="text"
            placeholder="Enter comments..."
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          />
        </div>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <div className="mt-6 flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </div>
      </div>
    </Modal>
  );
};

export default ApproveRejectModal;
