import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "../ui/dialog.jsx";
import {useMutation} from "@tanstack/react-query";
import UserService from "../../services/UserService.js";
import {toast} from "sonner";
import {useUserContext} from "../../store/userContext.jsx";
import {Button} from "../ui/button.jsx";

function DeleteUserModal({ open, setOpen, user }) {
  const { refetch } = useUserContext()

  const deleteUserMutation = useMutation({
    mutationFn: UserService.deleteUser,
    onSuccess: () => {
      toast.success("Muvafaqiyatli o'chirildi");
      setOpen(false);
      refetch();
    },
    onError: (e) => {
      toast.error(e.message)
    }
  })

  const handleDeleteUser = (id) => {
    delete deleteUserMutation.mutate({
      id
    })
  }

  console.log(user)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>O'chirish</DialogTitle>
          <DialogDescription>Rostan ham foydalanuvchini o'chirmoqchimisiz?</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={() => setOpen(false)} variant={'secondary'}>Bekor qilish</Button>
          <Button onClick={() => handleDeleteUser(user.id)} variant={'destructive'}>O'chirish</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteUserModal;