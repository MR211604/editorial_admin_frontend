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
    changeUserStatus: changeUserStatus.mutate,

    //Estados de las mutaciones
    isCreating: createUserMutation.isPending,
    isChangingStatus: changeUserStatus.isPending,

    //Errores
    createError: createUserMutation.error,
  };
};

export const useUpdateUser = (id) => {
  const queryClient = useQueryClient();
  const updateUserMutation = useMutation({
    mutationFn: (userData) => updateUser(id, userData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });

  return {
    updateUser: updateUserMutation.mutate,
    isUpdating: updateUserMutation.isPending,
    updateError: updateUserMutation.error,
  };
};
