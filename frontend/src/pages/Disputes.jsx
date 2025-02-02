import { useState } from "react"
import { MessageSquare } from "lucide-react"
import Badge from "../components/ui/Badge"
import Card from "../components/ui/Card"
import Button from "../components/ui/Button"

const Disputes = () => {
  const [disputes, setDisputes] = useState([
    {
      id: 1,
      agreementId: 5,
      title: "Late Delivery Dispute",
      initiator: "0x1234...5678",
      respondent: "0xabcd...efgh",
      reason: "Smart contract deadline exceeded",
      status: "Open",
    },
    {
      id: 2,
      agreementId: 8,
      title: "Quality Issues",
      initiator: "0x2345...6789",
      respondent: "0xbcde...fghi",
      reason: "Delivered work does not meet agreed standards",
      status: "Under Review",
    },
  ])

  return (
    <div className="space-y-6 p-6">
      <h2 className="text-3xl font-bold">Smart Contract Disputes</h2>
      <div className="grid gap-6">
        {disputes.map((dispute) => (
          <DisputeCard key={dispute.id} dispute={dispute} />
        ))}
      </div>
    </div>
  )
}

const DisputeCard = ({ dispute }) => {
  const statusColors = {
    Open: "red",
    "Under Review": "yellow",
    Resolved: "green",
  }

  return (
    <Card>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold">{dispute.title}</h3>
          <p className="text-gray-600">
            Dispute #{dispute.id} | Agreement #{dispute.agreementId}
          </p>
        </div>
        <Badge color={statusColors[dispute.status]}>{dispute.status}</Badge>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-500">Initiator</p>
          <p className="font-semibold">{dispute.initiator}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Respondent</p>
          <p className="font-semibold">{dispute.respondent}</p>
        </div>
      </div>
      <div className="mb-4">
        <p className="text-sm text-gray-500">Reason for Dispute</p>
        <p>{dispute.reason}</p>
      </div>
      <div className="flex justify-end">
        <Button>
          <MessageSquare className="w-4 h-4 mr-2" />
          Submit Evidence
        </Button>
      </div>
    </Card>
  )
}

export default Disputes