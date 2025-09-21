import { useQuery } from "@tanstack/react-query";
import { getDashboardSummary } from "../api/dashboard/dashboardService";

/**
 * Consulta y cachea el resumen del dashboard.
 * Usa React Query con una clave única y 5 min de refresco.
 */

export const useDashboardSummary = () => {
  return useQuery({
    queryKey: ["dashboard-summary"],
    queryFn: getDashboardSummary,
    staleTime: 5 * 60 * 1000,
  });
};
