import { Star } from "lucide-react";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";

const Reputation = () => {
  const userReputation = {
    overallRating: 4.8,
    totalReviews: 50,
    skillRatings: [
      { skill: "Smart Contract Development", rating: 4.9 },
      { skill: "DApp Frontend", rating: 4.7 },
      { skill: "Blockchain Architecture", rating: 4.5 },
    ],
    badges: ["Top Rated", "Rising Talent", "Quick Responder"],
    recentFeedback: [
      {
        client: "0x1234...5678",
        comment: "Excellent work on the smart contract! Delivered on time and exceeded expectations.",
        rating: 5,
      },
      { client: "0xabcd...efgh", comment: "Great communication and high-quality DApp frontend.", rating: 4.5 },
      {
        client: "0x2345...6789",
        comment: "Very professional and skilled in blockchain architecture. Would hire again.",
        rating: 5,
      },
    ],
  };

  return (
    <div className="space-y-6 p-6">
      <h2 className="text-3xl font-bold">On-Chain Reputation</h2>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <h3 className="text-xl font-semibold mb-4">Overall Rating</h3>
          <div className="flex items-center space-x-2">
            <Star className="w-8 h-8 text-yellow-400 fill-current" />
            <span className="text-4xl font-bold">{userReputation.overallRating}</span>
            <span className="text-gray-500">/ 5</span>
          </div>
          <p className="mt-2 text-sm text-gray-500">Based on {userReputation.totalReviews} on-chain reviews</p>
        </Card>
        <Card>
          <h3 className="text-xl font-semibold mb-4">Skill Ratings</h3>
          <ul className="space-y-2">
            {userReputation.skillRatings.map((skill, index) => (
              <li key={index} className="flex items-center justify-between">
                <span>{skill.skill}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${skill.rating * 20}%` }}></div>
                  </div>
                  <span>{skill.rating}</span>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>
      <Card>
        <h3 className="text-xl font-semibold mb-4">NFT Achievements</h3>
        <div className="flex flex-wrap gap-2">
          {userReputation.badges.map((badge, index) => (
            <Badge key={index} color="blue">
              {badge}
            </Badge>
          ))}
        </div>
      </Card>
      <Card>
        <h3 className="text-xl font-semibold mb-4">Recent Feedback</h3>
        <ul className="space-y-4">
          {userReputation.recentFeedback.map((feedback, index) => (
            <li key={index} className="border-b pb-4 last:border-b-0 last:pb-0">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold">{feedback.client}</p>
                  <p className="text-sm text-gray-500">{feedback.comment}</p>
                </div>
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="ml-1">{feedback.rating}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
};

export default Reputation;
