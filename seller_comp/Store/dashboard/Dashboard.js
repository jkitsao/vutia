import React, { useState } from "react";
import NavPanel from "./NavPanel";
import Content from "./Content";
function Dashboard({ userDetails }) {
  const [manageTab, setManageTab] = useState(true);
  const [customersTab, setCustomersTab] = useState(false);
  const [settingsTab, setSettingsTab] = useState(false);

  //functios to set the correct tabs open

  const setManage = () => {
    setManageTab(true);
    setCustomersTab(false);
    setSettingsTab(false);
  };
  const setCustomer = () => {
    setManageTab(false);
    setCustomersTab(true);
    setSettingsTab(false);
  };
  const setSetings = () => {
    setManageTab(false);
    setCustomersTab(false);
    setSettingsTab(true);
  };

  return (
    <div className="flex">
      <div>
        <NavPanel
          setSetings={setSetings}
          setCustomer={setCustomer}
          setManage={setManage}
          userDetails={userDetails}
        />
      </div>
      <div className="p-4 w-full">
        <Content
          manage={manageTab}
          customers={customersTab}
          settings={settingsTab}
        />
      </div>
    </div>
  );
}

export default Dashboard;
