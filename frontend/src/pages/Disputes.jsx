import { useState, useEffect } from "react";
import { MessageSquare } from "lucide-react";
import Badge from "../components/ui/Badge";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import useGetDispute from "./../hooks/useGetDispute";

const Disputes = () => {
    const { disputes, loading, error } = useGetDispute();

    if (loading) {
        return <div>Loading disputes...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="space-y-6 p-6">
            <h2 className="text-3xl font-bold">Smart Contract Disputes</h2>
            <div className="grid gap-6">
                {disputes.map((dispute) => (
                    <DisputeCard key={dispute.id} dispute={dispute} />
                ))}
            </div>
        </div>
    );
};

const DisputeCard = ({ dispute }) => {
    const statusColors = {
        Open: "red",
        "Under Review": "yellow",
        Resolved: "green",
    };

    const status = dispute.resolved ? "Resolved" : "Open";

    return (
        <Card>
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-xl font-semibold">Dispute #{dispute.id}</h3>
                    <p className="text-gray-600">
                        Agreement #{dispute.agreementId}
                    </p>
                </div>
                <Badge color={statusColors[status]}>{status}</Badge>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <p className="text-sm text-gray-500">Initiator</p>
                    <p className="font-semibold">{dispute.initiator}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-500">Respondent</p>
                    <p className="font-semibold">Provider/Requester</p>
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
    );
};

export default Disputes;