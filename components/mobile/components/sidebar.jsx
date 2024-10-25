import { useState } from "react";
import { BsArrowLeftShort, BsChevronDown } from "react-icons/bs";
import { RiGraduationCapFill } from "react-icons/ri";
import { MdOutlineDashboard } from "react-icons/md";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { MdOutlineBook } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";

const LinkClasses =
  "text-gray-300 text-sm flex items-center gap-x-4 p-2 hover:bg-[#915eff] rounded-bl-xl rounded-tl-xl text-base";

// eslint-disable-next-line react/prop-types
export default function Sidebar({ isOpen, onToggle }) {
  const Menus = [
    { title: "Dashboard", icon: <MdOutlineDashboard />, path: "/dashboard" },
    {
      title: "Organisations",
      icon: <LiaChalkboardTeacherSolid />,
      path: "/organisations",
      spacing: false
    },
    {
      title: "Permissions",
      icon: <MdOutlineBook />,
      path: "/permissions",
      spacing: false
    }
  ];

  const [submenuOpen, setSubmenuOpen] = useState(
    Array(Menus.length).fill(false)
  );
  const { pathname } = useLocation();

  const toggleSubmenu = (index) => {
    setSubmenuOpen((prevState) => {
      const newSubmenuOpen = [...prevState];
      newSubmenuOpen[index] = !newSubmenuOpen[index];
      return newSubmenuOpen;
    });
  };

  const isMobile = window.innerWidth < 768;

  return (
    <div
      className={`fixed top-0 left-0 h-screen bg-[#522AAF] p-5 pr-0 pt-8 ${
        isOpen ? "w-60" : "w-20"
      } duration-300 z-50 sm:relative lg:z-auto lg:w-60`}
    >
      {isMobile && (
        <BsArrowLeftShort
          className={`bg-white text-[#522AAF] text-3xl rounded-full absolute -right-3 top-9 border border-[#522AAF] cursor-pointer ${
            !isOpen && "rotate-180"
          }`}
          onClick={onToggle}
        />
      )}
      <div className="inline-flex">
        <RiGraduationCapFill
          className={`text-black text-5xl rounded cursor-pointer block float-left mr-2 duration-500 ${
            isOpen && "rotate-[360deg]"
          }`}
        />
        <h1
          className={`text-white origin-left font-medium text-4xl  mr-4 duration-300 ${
            !isOpen && "scale-0"
          }`}
        >
          EduPlan
        </h1>
      </div>
      <ul className="mt-20">
        {Menus.map((menu, index) => (
          <div key={index}>
            <Link
              to={menu.path || "#"}
              className={classNames(
                pathname === menu.path ? "bg-[#915eff]" : "",
                LinkClasses,
                menu.spacing ? "mt-9" : "mt-2"
              )}
              onClick={() => menu.submenue && toggleSubmenu(index)}
            >
              <span className="text-2xl block float-left">
                {menu.icon ? menu.icon : <MdOutlineDashboard />}
              </span>
              <span
                className={`text-base font-medium flex-1 duration-200 ${
                  !isOpen && "hidden"
                }`}
              >
                {menu.title}
              </span>
              {menu.submenue && isOpen && (
                <BsChevronDown
                  className={`duration-300 ${
                    submenuOpen[index] && "rotate-180"
                  }`}
                />
              )}
            </Link>
            {menu.submenue && submenuOpen[index] && isOpen && (
              <ul>
                {menu.submenueItems.map((submenuItem, subIndex) => (
                  <Link
                    key={subIndex}
                    to={submenuItem.path}
                    className="text-gray-300 text-sm flex items-center gap-x-4 p-2 px-12 hover:bg-[#915eff] rounded-md"
                  >
                    {submenuItem.title}
                  </Link>
                ))}
              </ul>
            )}
          </div>
        ))}
      </ul>
    </div>
  );
}
