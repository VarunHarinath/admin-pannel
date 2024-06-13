import React, { useState } from "react";
import { navigation, navsFooter } from "../../constants";

const SideBar = ({ isOpen, toggleSidebar }) => {
  return (
    <>
      <div
        className={`fixed inset-0 bg-gray-950 bg-opacity-50 z-40 transition-opacity duration-300 sm:hidden ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleSidebar}
      ></div>
      <nav
        className={`fixed top-0 left-0 h-full bg-gray-950 space-y-8 w-64 sm:w-64 transform transition-transform duration-300 z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          <div className="h-20 flex items-center px-8">
            <button className="sm:hidden text-gray-300" onClick={toggleSidebar}>
              ✕
            </button>
          </div>
          <div className="flex-1 flex flex-col h-full overflow-auto">
            <ul className="px-4 text-sm font-medium flex-1">
              {navigation.map((item, idx) => (
                <li key={idx}>
                  <a
                    href={item.href}
                    className="flex items-center gap-x-2 text-gray-300 p-2 rounded-lg hover:bg-gray-800 active:bg-gray-700 duration-150"
                  >
                    <div className="text-gray-500">{item.icon}</div>
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
            <div>
              <ul className="px-4 pb-4 text-sm font-medium">
                {navsFooter.map((item, idx) => (
                  <li key={idx}>
                    <a
                      href={item.href}
                      className="flex items-center gap-x-2 text-gray-300 p-2 rounded-lg hover:bg-gray-800 active:bg-gray-700 duration-150"
                    >
                      <div className="text-gray-500">{item.icon}</div>
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="py-4 px-4">
                <div className="flex items-center gap-x-4">
                  <img
                    src="https://randomuser.me/api/portraits/women/79.jpg"
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <span className="block text-gray-100 text-sm font-semibold">
                      Alivika Tony
                    </span>
                    <p className="block mt-px text-gray-300 text-xs cursor-pointer">
                      View profile
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default SideBar;
