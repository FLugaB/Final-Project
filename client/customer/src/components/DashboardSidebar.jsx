import { useState } from "react";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as IconName from "react-icons/fc";
import { IconContext } from "react-icons";

const DashboardSidebar = ({ role }) => {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  if (role === "Doctor") {
    const SidebarData = [
      {
        title: "Profile",
        path: "profile",
        icon: <IconName.FcBusinesswoman />,
        cName: "nav-text",
      },
      {
        title: "Consultation",
        path: "consultation-request",
        icon: <IconName.FcWebcam />,
        cName: "nav-text",
      },
      {
        title: "Logout",
        path: "/logout",
        icon: <IconName.FcDownLeft />,
        cName: "nav-text",
      },
    ];
    return (
      <>
        <div className="navbar">
          <Link to="#" className="menu-bars" onClick={showSidebar}>
            Menu
            <AiIcons.AiFillCaretRight />
          </Link>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiFillCaretLeft />
              </Link>
              <span className="mb-0 mt-2 soft-font">Doctor</span>
            </li>

            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div>
          <img src="../soft-logo.png" alt="" />
        </div>
      </>
    );
  } else {
    const SidebarData = [
      {
        title: "Profile",
        path: "profile",
        icon: <IconName.FcBusinesswoman />,
        cName: "nav-text",
      },
      {
        title: "History Order",
        path: "history",
        icon: <IconName.FcSurvey />,
        cName: "nav-text",
      },
      {
        title: "Cart",
        path: "cart",
        icon: <IconName.FcPaid />,
        cName: "nav-text",
      },
      {
        title: "Consultation",
        path: "consultation",
        icon: <IconName.FcWebcam />,
        cName: "nav-text",
      },
      {
        title: "Logout",
        path: "/logout",
        icon: <IconName.FcDownLeft />,
        cName: "nav-text",
      },
    ];
    return (
      <>
        <div className="navbar">
          <Link to="#" className="menu-bars" onClick={showSidebar}>
            Menu
            <AiIcons.AiFillCaretRight />
          </Link>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiFillCaretLeft />
              </Link>
              <span className="mb-0 mt-2 soft-font">Patient</span>
            </li>

            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div>
          <img src="../soft-logo.png" alt="" />
        </div>
      </>
    );
  }
};

export default DashboardSidebar;
