import React from 'react';
import DashboardHead from "../components/dashboard/DashboardHead.jsx";
import DashboardTable from "../components/dashboard/DashboardTable.jsx";
import {UserProvider} from "../store/userContext.jsx";

function Dashboard() {
  return (
    <div className='px-10 py-5 flex flex-col gap-5'>
      <UserProvider>
        <DashboardHead />
        <DashboardTable />
      </UserProvider>
    </div>
  );
}

export default Dashboard;