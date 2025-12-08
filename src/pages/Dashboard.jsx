import { useEffect } from "react";
import CardButton from "../components/dashboard/CardButton";
import DashboardCard from "../components/dashboard/DashboardCard";
import { useDashboardSummary } from "../hooks/useDashboardSummary";
import { env } from "../config/env";

/**
 * Formatea la métrica para la UI:
 * "..." mientras carga
 * 0 si el valor es null/undefined
 */

const formatMetric = (value, { isLoading }) => {
  if (isLoading) return "...";
  return value ?? 0;
};

export default function Dashboard() {
  const {
    data: dashboardSummary,
    isLoading,
    isError,
    error,
  } = useDashboardSummary();

  // Log de error si la petición falla
  useEffect(() => {
    if (isError) {
      console.error("No se pudo obtener el resumen del dashboard:", error);
    }
  }, [isError, error]);

  const booksCount = formatMetric(dashboardSummary?.books, { isLoading });
  const magazinesCount = formatMetric(dashboardSummary?.magazines, {
    isLoading,
  });

  return (
    <>
      <div>
        <h1>Panel de control</h1>
        <hr />
        <div className="d-flex flex-row gap-3">
          <DashboardCard
            className={"flex-grow-1"}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={100}
                height={100}
                fill="currentColor"
                className="bi bi-book"
                viewBox="0 0 16 16"
              >
                <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783" />
              </svg>
            }
            title="Libros"
            count={booksCount}
            buttonComponent={true}
          >
            <CardButton
              className="btn-primary"
              href={`${env.BASE_URL}dashboard/books`}
            >
              Ver libros
            </CardButton>
          </DashboardCard>
          <DashboardCard
            className={"flex-grow-1"}
            title="Revistas"
            count={magazinesCount}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={100}
                height={100}
                fill="currentColor"
                className="bi bi-journal"
                viewBox="0 0 16 16"
              >
                <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2" />
                <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z" />
              </svg>
            }
            buttonComponent={true}
          >
            <CardButton
              className="btn-primary"
              href={`${env.BASE_URL}dashboard/magazines`}
            >
              Ver revistas
            </CardButton>
          </DashboardCard>
        </div>
      </div>
    </>
  );
}
