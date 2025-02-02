import { Briefcase, Users, FileCheck, AlertTriangle, TrendingUp, Clock } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

function Dashboard() {
  return (
    <div className="space-y-8 p-6 bg-gray-100 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard title="Active Listings" count={5} icon={Briefcase} color="bg-blue-600" />
        <DashboardCard title="Pending Requests" count={3} icon={Users} color="bg-green-600" />
        <DashboardCard title="Active Agreements" count={2} icon={FileCheck} color="bg-yellow-600" />
        <DashboardCard title="Open Disputes" count={1} icon={AlertTriangle} color="bg-red-600" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Recent Activity">
          <ul className="space-y-4">
            <ActivityItem title="New listing created" description="Web Development" time="2 hours ago" icon={TrendingUp} />
            <ActivityItem title="Service request received" description="Mobile App Design" time="5 hours ago" icon={Users} />
            <ActivityItem title="Agreement completed" description="Logo Design" time="1 day ago" icon={FileCheck} />
          </ul>
        </Card>
        <Card title="Upcoming Deadlines">
          <ul className="space-y-4">
            <DeadlineItem title="Finish website redesign" dueDate="2025-06-15" status="On Track" />
            <DeadlineItem title="Deliver logo concepts" dueDate="2025-06-18" status="At Risk" />
            <DeadlineItem title="Complete content writing" dueDate="2025-06-20" status="Completed" />
          </ul>
        </Card>
      </div>
      <Card title="Earnings Overview">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={earningsData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="amount" stroke="#2563EB" fill="#93C5FD" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}

function DashboardCard({ title, count, icon: Icon, color }) {
  return (
    <div className={`${color} rounded-xl shadow-lg p-6 text-white flex flex-col items-start`}>
      <div className="flex items-center justify-between w-full">
        <h3 className="text-lg font-semibold">{title}</h3>
        <Icon className="w-10 h-10 opacity-80" />
      </div>
      <p className="text-4xl font-bold mt-2">{count}</p>
    </div>
  );
}

function Card({ title, children }) {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">{title}</h3>
      {children}
    </div>
  );
}

function ActivityItem({ title, description, time, icon: Icon }) {
  return (
    <li className="flex items-center space-x-4">
      <Icon className="w-7 h-7 text-blue-500" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900">{title}</p>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <div className="text-sm text-gray-400">{time}</div>
    </li>
  );
}

function DeadlineItem({ title, dueDate, status }) {
  const statusColors = {
    "On Track": "text-green-600 bg-green-100",
    "At Risk": "text-yellow-600 bg-yellow-100",
    Completed: "text-blue-600 bg-blue-100",
  };

  return (
    <li className="flex items-center justify-between space-x-4">
      <div className="flex items-center space-x-3">
        <Clock className="w-6 h-6 text-gray-500" />
        <div>
          <p className="text-sm font-medium text-gray-900">{title}</p>
          <p className="text-sm text-gray-500">Due: {dueDate}</p>
        </div>
      </div>
      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${statusColors[status]}`}>{status}</span>
    </li>
  );
}

const earningsData = [
  { name: "Jan", amount: 4000 },
  { name: "Feb", amount: 3000 },
  { name: "Mar", amount: 5000 },
  { name: "Apr", amount: 2780 },
  { name: "May", amount: 1890 },
  { name: "Jun", amount: 2390 },
  { name: "Jul", amount: 3490 },
];

export default Dashboard;
