import {useQuery} from "@tanstack/react-query";
import UserService from "../services/UserService.js";

const useGetUsers = ({ query }) => useQuery({
    queryKey: ['users', query],
    queryFn: UserService.getUsers,
})

export default useGetUsers;