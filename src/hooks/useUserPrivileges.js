import { useQuery } from "@tanstack/react-query";
import { getPrivilegeById, getPrivileges } from "../api/users/privileges/privilegesService";

export const useUserPrivileges = (page, limit) => {
  const { data: allUserPrivileges, isLoading: isAllUserPrivilegesLoading } = useQuery({
    queryKey: ['userPrivileges', page, limit],
    queryFn: () => getPrivileges(page, limit),
  })

  return { allUserPrivileges, isAllUserPrivilegesLoading };
};

export const useUserPrivilege = (id) => {
  const { data: userPrivilege, isLoading: isUserPrivilegeLoading } = useQuery({
    queryKey: ['userPrivilege', id],
    queryFn: () => getPrivilegeById(id),
    enabled: !!id, // Solo ejecutar si id está definido
  });

  return { userPrivilege, isUserPrivilegeLoading };
}