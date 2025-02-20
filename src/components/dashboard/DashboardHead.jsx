import React from 'react';
import AddUserModal from "./AddUserModal.jsx";
import {Input} from "../ui/input.jsx";
import useGetUsers from "../../hooks/useGetUsers.js";
import {useUserContext} from "../../store/userContext.jsx";
import {useNavigate} from "react-router-dom";

function DashboardHead() {
  const userContext = useUserContext()
  return (
    <div className='flex items-start flex-col'>
      <div className='flex items-center justify-between w-full'>
        <h1>Dashboard</h1>
        <AddUserModal/>
      </div>
      <div className='flex items-end justify-start gap-5'>
        <div>
          <h1>Ism</h1>
          <Input placeholder={'Ismi bo\'yicha qidirish'} onChange={(e) => userContext.setNameSearchValue(e.target.value)} value={userContext.nameSearchValue}/>
        </div>
        <div>
          <h1>Telefon raqam</h1>
          <Input placeholder={'Telefon raqami bo\'yicha qidirish'} onChange={(e) => userContext.setPhoneNumberSearchValue(e.target.value)} value={userContext.phoneNumberSearchValue}/>
        </div>
        <div>
          <h1>Manzil</h1>
          <Input placeholder={'Manzil bo\'yicha qidirish'} onChange={(e) => userContext.setAddressSearchValue(e.target.value)} value={userContext.addressSearchValue}/>
        </div>
      </div>
    </div>
  );
}

export default DashboardHead;