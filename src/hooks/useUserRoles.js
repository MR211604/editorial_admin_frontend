import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getRoles, createRol } from "../api/users/roles/rolService";

export const useUserRoles = (pagination, rows, search) => {
  const queryClient = useQueryClient();

  const { data: allRoles, isLoading: isAllRolesLoading } = useQuery({
    queryKey: ["roles", pagination, rows, search],
    queryFn: () => getRoles(pagination, rows, search),
  });

  const createRolMutation = useMutation({
    mutationFn: (rolData) => createRol(rolData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["roles"],
      });
    },
  });

  return {
    allRoles,
    isAllRolesLoading,

    createRol: createRolMutation.mutate,
    isCreating: createRolMutation.isLoading,
  };
};
