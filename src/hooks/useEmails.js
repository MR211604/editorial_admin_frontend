import { useQuery } from "@tanstack/react-query";
import { getEmails } from "../api/emails/emailService";

export const useEmails = (pagination, rows, sorting, search) => {
  const { data: allEmails, isLoading: isAllEmailsLoading } = useQuery({
    queryKey: ["banners", pagination, rows, sorting, search],
    queryFn: () => getEmails(pagination, rows, sorting, search),
  });

  return {
    allEmails,
    isAllEmailsLoading,
  };
};
