import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser, getUsers,updateUser } from "../api/users/usersService";

export const useUsers = (pagination, rows) => {

  const queryClient = useQueryClient();

  const { data: allUsers, isLoading: isAllUsersLoading } = useQuery({
    queryKey: ['users', pagination, rows],
    queryFn: () => getUsers(pagination, rows)
  });

  const createUserMutation = useMutation({
    mutationFn: (userData) => createUser(userData),
    onSucces: () => {
      queryClient.invalidateQueries({
        queryKey: ['users']
      })
    }
  })

  const updateUserMutation = useMutation({
    mutationFn: (userData) => updateUser(userData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['users']
      })
    }
  })

  return {
    allUsers,
    isAllUsersLoading,

    //Mutations
    createUser: createUserMutation.mutate,
    updateUserMutation: updateUserMutation.mutate,

    //Estados de las mutaciones
    isCreating: createUserMutation.isPending,
    isUpdating: updateUserMutation.isPending,

    //Errores
    createError: createUserMutation.error,
    updateError: updateUserMutation.error,
  };
}