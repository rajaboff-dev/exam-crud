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
      <div className='flex items-end justify-start w-full gap-10'>
        <div className='w-1/6'>
          <h1>Ism</h1>
          <Input placeholder={'Ismi bo\'yicha qidirish'} onChange={(e) => userContext.setNameSearchValue(e.target.value)} value={userContext.nameSearchValue} className='bg-white'/>
        </div>
        <div className='w-1/6'>
          <h1>Telefon raqam</h1>
          <Input placeholder={'Telefon raqami bo\'yicha qidirish'} onChange={(e) => userContext.setPhoneNumberSearchValue(e.target.value)} value={userContext.phoneNumberSearchValue} className='bg-white'/>
        </div>
        <div className='w-1/6'>
          <h1>Manzil</h1>
          <Input placeholder={'Manzil bo\'yicha qidirish'} onChange={(e) => userContext.setAddressSearchValue(e.target.value)} value={userContext.addressSearchValue} className='bg-white'/>
        </div>
      </div>
    </div>
  );
}

export default DashboardHead;