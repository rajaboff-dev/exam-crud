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
import {Button} from "../ui/button.jsx";
import {Controller, useForm} from "react-hook-form";
import {Label} from "../ui/label.jsx";
import {Input} from "../ui/input.jsx";
import {useMutation} from "@tanstack/react-query";
import UserService from "../../services/UserService.js";
import {useState} from "react";
import {toast} from "sonner";
import {useUserContext} from "../../store/userContext.jsx";
import ErrorText from "../ErrorText.jsx";

function EditUserModal({ open, setOpen, user }) {
  const { control, handleSubmit } = useForm()
  const { refetch } = useUserContext()

  const editUserMutation = useMutation({
    mutationFn: UserService.updateUser,
    onSuccess: () => {
      toast.success("Muvafaqqiyatli o'zgartirildi")
      setOpen(false);
      refetch()
    },
    onError: (error) => {
      console.log(error);
    }
  })

  const handleEditUser = (payload) => {
    editUserMutation.mutate({
      payload,
      id: user.id
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>O'zgartirish</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form className='flex flex-col gap-2' id='new-user-form' onSubmit={handleSubmit(handleEditUser)}>
          <Controller
            control={control}
            name="name"
            defaultValue={user.name}
            rules={{
              required: 'Iltimos ism-familiyangizni kiriting',
            }}
            render={({ field: { onChange, value }, fieldState: { error }}) => {
              return (
                <div>
                  <Label>Ism va familiya</Label>
                  <Input value={value} onChange={onChange} placeholder='Ism va familiyangizni kiriting' />
                  <ErrorText>{error?.message}</ErrorText>
                </div>
              )
            }}
          />
          <Controller
            control={control}
            name="phone_number"
            defaultValue={user.phone_number}
            rules={{
              required: 'Iltimos telefon raqamingizni kiriting',
            }}
            render={({ field: { onChange, value }, fieldState: { error }}) => {
              return (
                <div>
                  <Label>Telefon raqam</Label>
                  <Input value={value} onChange={onChange} placeholder={'Telefon raqamingizni kiriting'} />
                  <ErrorText>{error?.message}</ErrorText>
                </div>
              )
            }}
          />
          <Controller
            control={control}
            name="address"
            defaultValue={user.address}
            rules={{
              required: 'Iltimos manzilingizni kiriting',
            }}
            render={({ field: { onChange, value }, fieldState: { error }}) => {
              return (
                <div>
                  <Label>Manzil</Label>
                  <Input value={value} onChange={onChange} placeholder={'Manzilingizni kiriting'} />
                  <ErrorText>{error?.message}</ErrorText>
                </div>
              )
            }}
          />
        </form>
        <DialogFooter>
          <Button onClick={() => setOpen(false)}>Bekor qilish</Button>
          <Button form='new-user-form'>O'zgartirish</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EditUserModal;