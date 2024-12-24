import React from "react";
import { useGlobalState } from "../../store";

const HomeDash = () => {
  const [skills] = useGlobalState("skills");

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Skills Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="p-4 border rounded-lg shadow-lg bg-white text-gray-700"
          >
            <img
              src={
                skill.imgBase64 ||
                "https://www.shutterstock.com/image-vector/picture-icon-vector-260nw-1353828443.jpg"
              }
              alt={skill.title}
              className="w-full h-32 object-cover rounded-lg mb-2"
            />
            <h2 className="text-lg font-bold">{skill.title}</h2>
            <p className="text-gray-600">Price: {skill.price} CELO</p>
            <p className="text-gray-600">{skill.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeDash;
