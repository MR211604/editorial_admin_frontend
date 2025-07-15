import { useQuery } from "@tanstack/react-query";
import { getPrivileges } from "../api/users/privileges/privilegesService";

export const useUserPrivileges = (page, limit) => {
  const { data: allUserPrivileges, isLoading: isAllUserPrivilegesLoading } = useQuery({
    queryKey: ['userPrivileges', page, limit],
    queryFn: () => getPrivileges(page, limit),
  })

  return { allUserPrivileges, isAllUserPrivilegesLoading };
};
