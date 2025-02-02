import { useState } from "react"
import { PlusCircle } from "lucide-react"
import Badge from "../components/ui/Badge"
import Card from "../components/ui/Card"
import Button from "../components/ui/Button"

const Requests = () => {
  const [requests, setRequests] = useState([
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
  ])

  const [showModal, setShowModal] = useState(false)

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
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Create New Service Request</h3>
              <div className="mt-2 px-7 py-3">
                <input type="text" placeholder="Title" className="mb-3 px-3 py-2 border rounded w-full" />
                <input type="text" placeholder="Skill Required" className="mb-3 px-3 py-2 border rounded w-full" />
                <input
                  type="number"
                  step="0.01"
                  placeholder="Budget (ETH)"
                  className="mb-3 px-3 py-2 border rounded w-full"
                />
                <input type="date" placeholder="Deadline" className="mb-3 px-3 py-2 border rounded w-full" />
                <textarea placeholder="Description" className="mb-3 px-3 py-2 border rounded w-full"></textarea>
              </div>
              <div className="items-center px-4 py-3">
                <Button onClick={() => setShowModal(false)} className="w-full">
                  Submit Request
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const RequestCard = ({ request }) => {
  const statusColors = {
    Open: "green",
    "In Progress": "blue",
    Completed: "gray",
  }

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
  )
}

export default Requests