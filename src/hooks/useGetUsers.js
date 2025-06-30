import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../api/users/usersService";

export const useGetUsers = (pagination, rows) => {
  const { data: allUsers, isLoading: isAllUsersLoading } = useQuery({
    queryKey: ['users', pagination, rows],
    queryFn: () => getUsers(pagination, rows)
  });

  return {
    allUsers,
    isAllUsersLoading
  };
}