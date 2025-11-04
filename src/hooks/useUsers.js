import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createUser,
  getUsers,
  toggleUserState,
  updateUser,
} from "../api/users/usersService";

export const useUsers = (pagination, rows, sorting, search) => {
  const queryClient = useQueryClient();

  const { data: allUsers, isLoading: isAllUsersLoading } = useQuery({
    queryKey: ["users", pagination, rows, sorting, search],
    queryFn: () => getUsers(pagination, rows, sorting, search),
  });

  const createUserMutation = useMutation({
    mutationFn: (userData) => createUser(userData),
    onSucces: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });

  const updateUserMutation = useMutation({
    mutationFn: (userData) => updateUser(userData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });

  const changeUserStatus = useMutation({
    mutationFn: ({ id }) => toggleUserState(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });

  return {
    allUsers,
    isAllUsersLoading,

    //Mutations
    createUser: createUserMutation.mutate,
    updateUserMutation: updateUserMutation.mutate,
    changeUserStatus: changeUserStatus.mutate,

    //Estados de las mutaciones
    isCreating: createUserMutation.isPending,
    isUpdating: updateUserMutation.isPending,
    isChangingStatus: changeUserStatus.isPending,

    //Errores
    createError: createUserMutation.error,
    updateError: updateUserMutation.error,
  };
};
