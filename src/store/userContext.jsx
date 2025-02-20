import {createContext, useContext, useEffect, useMemo, useState} from "react";
import useGetUsers from "../hooks/useGetUsers.js";
import {useSearchParams} from "react-router-dom";

const UserContext = createContext()

const UserProvider = ({ children }) => {
  const [searchParams] = useSearchParams()
  const [currentPage, setCurrentPage] = useState(searchParams.get('page') || 1);
  const [perPage] = useState(1);
  const [nameSearchValue, setNameSearchValue] = useState("");
  const [phoneNumberSearchValue, setPhoneNumberSearchValue] = useState("");
  const [addressSearchValue, setAddressSearchValue] = useState("");
  const query = useMemo(() => {
    let q = {
      page: currentPage,
      limit: perPage,
    }
    if (nameSearchValue) q.name = nameSearchValue;
    if (phoneNumberSearchValue) q.phone_number = phoneNumberSearchValue;
    if (addressSearchValue) q.address = addressSearchValue;
    return q
  }, [currentPage, perPage, nameSearchValue, phoneNumberSearchValue, addressSearchValue])
  useEffect(() => {
    setCurrentPage(prevPage => (prevPage !== 1 ? 1 : prevPage));
  }, [nameSearchValue, phoneNumberSearchValue, addressSearchValue]);
  const { data, isLoading, isError, refetch } = useGetUsers({
    query
  });
  return <UserContext.Provider value={
    {
      data,
      isLoading,
      refetch,
      isError,
      currentPage,
      setCurrentPage,
      perPage,
      nameSearchValue,
      setNameSearchValue,
      phoneNumberSearchValue,
      setPhoneNumberSearchValue,
      addressSearchValue,
      setAddressSearchValue,
    }
  }>
    {children}
  </UserContext.Provider>;
}


const useUserContext = () => useContext(UserContext);

export {
  useUserContext,
  UserProvider,
}