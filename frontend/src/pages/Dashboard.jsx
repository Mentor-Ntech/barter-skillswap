import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Activity, 
  BookOpen, 
  Star, 
  ShieldCheck, 
  Clock,
  ChevronRight,
  DollarSign,
  Trophy,
  AlertCircle
} from 'lucide-react';

const Overview = () => {
  const [stats, setStats] = useState({
    activeListings: 5,
    completedOrders: 12,
    reputation: 4.8,
    pendingDisputes: 0,
    totalEarnings: "2.5 ETH"
  });

  const [recentActivity] = useState([
    {
      id: 1,
      type: 'order_completed',
      title: 'Completed: Web Development Tutorial',
      time: '2 hours ago',
      amount: '0.5 ETH',
      status: 'success'
    },
    {
      id: 2,
      type: 'new_order',
      title: 'New Order: UI/UX Consultation',
      time: '5 hours ago',
      amount: '0.3 ETH',
      status: 'pending'
    },
    {
      id: 3,
      type: 'dispute_resolved',
      title: 'Dispute Resolved: Mobile App Development',
      time: '1 day ago',
      amount: '0.8 ETH',
      status: 'warning'
    }
  ]);

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's your overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={<BookOpen className="w-6 h-6 text-blue-600" />}
          label="Active Listings"
          value={stats.activeListings}
          link="/dashboard/listings"
          bgColor="bg-blue-50"
        />
        <StatCard
          icon={<Activity className="w-6 h-6 text-green-600" />}
          label="Completed Orders"
          value={stats.completedOrders}
          link="/dashboard/orders"
          bgColor="bg-green-50"
        />
        <StatCard
          icon={<Star className="w-6 h-6 text-yellow-600" />}
          label="Reputation Score"
          value={stats.reputation}
          link="/profile"
          bgColor="bg-yellow-50"
        />
        <StatCard
          icon={<DollarSign className="w-6 h-6 text-purple-600" />}
          label="Total Earnings"
          value={stats.totalEarnings}
          link="/dashboard/earnings"
          bgColor="bg-purple-50"
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <QuickActionCard
          title="Create New Listing"
          description="List a new skill or service"
          icon={<BookOpen className="w-6 h-6" />}
          link="/create-listing"
        />
        <QuickActionCard
          title="View Orders"
          description="Manage your current orders"
          icon={<Activity className="w-6 h-6" />}
          link="/dashboard/orders"
        />
        <QuickActionCard
          title="Check Reputation"
          description="View your badges and reviews"
          icon={<Trophy className="w-6 h-6" />}
          link="/profile/badges"
        />
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <ActivityItem key={activity.id} activity={activity} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value, link, bgColor }) => (
  <Link to={link} className="block">
    <div className={`${bgColor} rounded-lg p-6 transition-transform hover:scale-105`}>
      <div className="flex items-center justify-between mb-4">
        {icon}
        <ChevronRight className="w-5 h-5 text-gray-400" />
      </div>
      <p className="text-sm text-gray-600 mb-1">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  </Link>
);

const QuickActionCard = ({ title, description, icon, link }) => (
  <Link to={link}>
    <div className="bg-white rounded-lg shadow p-6 hover:bg-gray-50 transition-colors">
      <div className="flex items-center gap-4 mb-2">
        <div className="p-2 bg-blue-50 rounded-lg">
          {icon}
        </div>
        <div>
          <h3 className="font-semibold">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  </Link>
);

const ActivityItem = ({ activity }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'success':
        return <Check className="w-4 h-4 text-green-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'warning':
        return <AlertCircle className="w-4 h-4 text-orange-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-3">
        {getStatusIcon(activity.status)}
        <div>
          <p className="font-medium">{activity.title}</p>
          <p className="text-sm text-gray-500">{activity.time}</p>
        </div>
      </div>
      {activity.amount && (
        <span className="text-sm font-medium text-gray-900">{activity.amount}</span>
      )}
    </div>
  );
};

export default Overview;