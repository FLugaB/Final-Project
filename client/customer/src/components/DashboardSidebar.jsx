import { useState } from 'react';
import { Link } from 'react-router-dom'
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as IconName  from "react-icons/fc";
import { IconContext } from "react-icons";

const DashboardSidebar = () => {
    const [sidebar, setSidebar] = useState(false);

    const SidebarData = [
        {
          title: "Profile",
          path: "/",
          icon: <IconName.FcBusinesswoman />,
          cName: "nav-text"
        },
        {
          title: "History Order",
          path: "/reports",
          icon: <IconName.FcSurvey />,
          cName: "nav-text"
        },
        {
          title: "Cart",
          path: "/products",
          icon: <IconName.FcPaid />,
          cName: "nav-text"
        },
        {
          title: "Consultation",
          path: "/consultation",
          icon: <IconName.FcWebcam />,
          cName: "nav-text"
        },
        {
          title: "Schedule",
          path: "/",
          icon: <IconName.FcCalendar />,
          cName: "nav-text"
        },
        {
          title: "Logout",
          path: "/logout",
          icon: <IconName.FcDownLeft />,
          cName: "nav-text"
        }
      ];

    const showSidebar = () => setSidebar(!sidebar);
    return (
        <>
            <div className="navbar">
                <Link to="#" className="menu-bars" onClick={showSidebar}>
                    Menu<AiIcons.AiFillCaretRight />
                </Link>
                </div>
                <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
                <ul className="nav-menu-items" onClick={showSidebar}>
                    <li className="navbar-toggle">
                    <Link to="#" className="menu-bars">
                        <AiIcons.AiFillCaretLeft />
                    </Link>
                        <span className="mb-0 mt-2 soft-font" >Name</span>
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
        </>
    );
};

export default DashboardSidebar;