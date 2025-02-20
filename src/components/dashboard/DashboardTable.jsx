import React, {useEffect, useState} from 'react';
import useGetUsers from "../../hooks/useGetUsers.js";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "../ui/table.jsx";
import {toast} from "sonner";
import {TbPencil, TbTrash} from "react-icons/tb";
import {Button} from "../ui/button.jsx";
import {useUserContext} from "../../store/userContext.jsx";
import EditUserModal from "./EditUserModal.jsx";
import DeleteUserModal from "./DeleteUserModal.jsx";
import Pagination from "rc-pagination";
import TablePagination from "../TablePagination.jsx";

function DashboardTable() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const { data: { items, meta } = {}, isError, isLoading, currentPage, setCurrentPage, perPage } = useUserContext()
  const actionModalOpener = (user, setState) => {
    setState(true)
    setCurrentUser(user);
  }

  useEffect(() => {
    if(isError) {
      toast.error('Qandaydir xatolik yuz berdi iltimos keyinroq urinib ko\'ring')
    }
  }, [isError]);
  return (
    <div className='shadow-md px-3 py-2 rounded-xl bg-white'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Ismi</TableHead>
            <TableHead>Telefon raqami</TableHead>
            <TableHead>Manzili</TableHead>
            <TableHead className="text-right">Yaratilgan vaqti</TableHead>
            <TableHead className='text-right'>Amallar</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell className='text-center' colSpan={6}>Yuklanmoqda...</TableCell>
            </TableRow>
          ) : isError ? (
            <TableRow>
              <TableCell className='text-center' colSpan={6}>Qandaydir xatolik yuz berdi iltimos keyinroq urinib ko'ring</TableCell>
            </TableRow>
          ) : items && items.length <= 0 ? (
            <TableRow>
              <TableCell>Hech narsa topilmadi</TableCell>
            </TableRow>
          ) : (
            items.map(user => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.phone_number}</TableCell>
                <TableCell>{user.address}</TableCell>
                <TableCell className='text-right'>{user.createdAt}</TableCell>
                <TableCell className='flex items-center justify-end gap-2'>
                  <Button variant={'outline'} onClick={() => actionModalOpener(user, setIsEditModalOpen)}>
                    <TbPencil />
                  </Button>
                  <Button variant={'destructive'} onClick={() => actionModalOpener(user, setIsDeleteModalOpen)}>
                    <TbTrash />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      {isEditModalOpen && (
        <EditUserModal open={isEditModalOpen} setOpen={setIsEditModalOpen} user={currentUser} />
      )}
      {isDeleteModalOpen && (
        <DeleteUserModal open={isDeleteModalOpen} setOpen={setIsDeleteModalOpen} user={currentUser} />
      )}
      <TablePagination pageSize={perPage} current={Number(currentPage)} total={meta?.total_items} setCurrentPage={setCurrentPage} />
    </div>
  );
}

export default DashboardTable;