import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

const dashboardLinks = [
  //{ title: "Home", url: "/homedash" },
  { title: "Skill", url: "/skill" },
  { title: "Barter", url: "/barter" },
  { title: "Activity", url: "/activity" },
];

const Sidebar = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleLinkClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className=" --flex-start ml">
      <div className="left">
        {dashboardLinks.map(({ title, url }, index) => (
          <div className="--flex-center  --dir-column" key={index}>
            <Link
              to={url}
              // className={index === activeIndex ? "active-link" : ""}
              onClick={() => handleLinkClick(index)}
            >
              {title}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;