import { useState } from "react"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"
import Card from "../components/ui/Card"
import Button from "../components/ui/Button"

const Escrow = () => {
  const [balance, setBalance] = useState(1.5)
  const [transactions, setTransactions] = useState([
    { id: 1, type: "Deposit", amount: 0.5, status: "Confirmed", date: "2023-06-01" },
    { id: 2, type: "Withdrawal", amount: 0.2, status: "Pending", date: "2023-06-05" },
    { id: 3, type: "Deposit", amount: 0.3, status: "Confirmed", date: "2023-06-10" },
  ])

  return (
    <div className="space-y-6 p-6">
      <h2 className="text-3xl font-bold">Smart Contract Escrow</h2>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <h3 className="text-xl font-semibold mb-4">Escrow Balance</h3>
          <p className="text-3xl font-bold">{balance.toFixed(4)} ETH</p>
          <div className="mt-4 flex space-x-2">
            <Button>
              <ArrowUpRight className="w-4 h-4 mr-2" />
              Deposit
            </Button>
            <Button variant="secondary">
              <ArrowDownRight className="w-4 h-4 mr-2" />
              Withdraw
            </Button>
          </div>
        </Card>
        <Card>
          <h3 className="text-xl font-semibold mb-4">Quick Transfer</h3>
          <form className="space-y-4">
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                Amount (ETH)
              </label>
              <input
                type="number"
                id="amount"
                step="0.0001"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Recipient Address
              </label>
              <input
                type="text"
                id="address"
                placeholder="0x..."
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <Button className="w-full">Initiate Transfer</Button>
          </form>
        </Card>
      </div>
      <Card>
        <h3 className="text-xl font-semibold mb-4">Transaction History</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount (ETH)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{transaction.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{transaction.amount.toFixed(4)} ETH</td>
                  <td className="px-6 py-4 whitespace-nowrap">{transaction.status}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{transaction.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

export default Escrow