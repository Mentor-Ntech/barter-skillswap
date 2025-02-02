import { useState } from "react"
import { Check, X } from "lucide-react"
import Badge from "../components/ui/Badge"
import Card from "../components/ui/Card"
import Button from "../components/ui/Button"

const Agreements = () => {
  const [agreements, setAgreements] = useState([
    {
      id: 1,
      title: "Web3 Development Project",
      provider: "0x1234...5678",
      requester: "0xabcd...efgh",
      status: "Active",
      amount: 0.5,
      deadline: "2023-07-15",
    },
    {
      id: 2,
      title: "NFT Design",
      provider: "0x2345...6789",
      requester: "0xbcde...fghi",
      status: "Completed",
      amount: 0.2,
      deadline: "2023-06-30",
    },
    {
      id: 3,
      title: "Smart Contract Audit",
      provider: "0x3456...7890",
      requester: "0xcdef...ghij",
      status: "Disputed",
      amount: 0.3,
      deadline: "2023-07-10",
    },
  ])

  return (
    <div className="space-y-6 p-6">
      <h2 className="text-3xl font-bold">Smart Contract Agreements</h2>
      <div className="grid gap-6">
        {agreements.map((agreement) => (
          <AgreementCard key={agreement.id} agreement={agreement} />
        ))}
      </div>
    </div>
  )
}

const AgreementCard = ({ agreement }) => {
  const statusColors = {
    Active: "green",
    Completed: "blue",
    Disputed: "red",
  }

  return (
    <Card>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold">{agreement.title}</h3>
          <p className="text-gray-600">Agreement #{agreement.id}</p>
        </div>
        <Badge color={statusColors[agreement.status]}>{agreement.status}</Badge>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-500">Provider</p>
          <p className="font-semibold">{agreement.provider}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Requester</p>
          <p className="font-semibold">{agreement.requester}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Amount (ETH)</p>
          <p className="font-semibold">{agreement.amount} ETH</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Deadline</p>
          <p className="font-semibold">{agreement.deadline}</p>
        </div>
      </div>
      {agreement.status === "Active" && (
        <div className="flex justify-end space-x-2">
          <Button variant="secondary">
            <Check className="w-4 h-4 mr-2" />
            Confirm Completion
          </Button>
          <Button variant="danger">
            <X className="w-4 h-4 mr-2" />
            Initiate Dispute
          </Button>
        </div>
      )}
    </Card>
  )
}

export default Agreements