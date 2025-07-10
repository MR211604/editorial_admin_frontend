import { useQuery } from "@tanstack/react-query"
import { getRoles } from "../api/users/roles/rolService";


export const useUserRoles = (pagination, rows) => {
  const { data: allRoles, isLoading: isAllRolesLoading } = useQuery({
    queryKey: ['roles', pagination, rows],
    queryFn: () => getRoles(pagination, rows)
  });

  return {
    allRoles,
    isAllRolesLoading
  };
}