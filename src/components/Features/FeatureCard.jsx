export const FeatureCard = ({ title, description, skills = [], imageUrl }) => {
    return (
      <div className="rounded-lg overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transform transition-all duration-300 hover:scale-105">
        <div className="p-4">
          <h3 className="text-xl font-bold mb-4">{title}</h3>
          {imageUrl && (
            <div className="relative aspect-square rounded-lg overflow-hidden mb-4">
              <img
                src={imageUrl}
                alt={title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}
          <p className="text-gray-600 dark:text-gray-400 mb-4">{description}</p>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center rounded-full bg-purple-100 dark:bg-purple-900 px-2.5 py-0.5 text-xs font-medium text-purple-700 dark:text-purple-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  };
  