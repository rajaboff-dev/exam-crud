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

function AddUserModal() {
  const [isOpen, setIsOpen] = useState(false);
  const { control, handleSubmit, reset} = useForm()
  const { refetch } = useUserContext()

  const addUserMutation = useMutation({
    mutationFn: UserService.addUser,
    onSuccess: () => {
      toast.success("Muvafaqqiyatli qo'shildi")
      setIsOpen(false);
      reset()
      refetch()
    },
    onError: (error) => {
      console.log(error);
    }
  })

  const handleAddUser = (payload) => {
    payload.createdAt = new Date(Date.now()).toLocaleDateString("uz-UZ");
    console.log(payload);
    addUserMutation.mutate(payload);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button color="primary">Qo'shish</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Qo'shish</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form className='flex flex-col gap-2' id='new-user-form' onSubmit={handleSubmit(handleAddUser)}>
          <Controller
            control={control}
            name="name"
            defaultValue=''
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
            defaultValue=''
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
            defaultValue=''
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
          <Button>Bekor qilish</Button>
          <Button form='new-user-form'>Qo'shish</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddUserModal;