export default function ServiceTabs({ activeTab, onTabChange }) {
  const tabs = ["All Services", "Personal Growth", "Career Ambitions"]
  
  return (
    <div className="flex justify-center gap-8 my-12">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`pb-2 px-4 ${
            activeTab === tab 
              ? "border-b-2 border-teal-600 text-teal-600" 
              : "text-gray-600 hover:text-teal-600"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}

