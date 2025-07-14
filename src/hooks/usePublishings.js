import { useQuery } from "@tanstack/react-query"
import { getPublishings } from "../api/publishings/publishingService";

//Pagination: la pagina actual
//Rows: cantidad de filas por pagina
//Publishing_type: tipo de publicacion (1: libros, 2: revistas, 3: manuales)

export const usePublishings = (pagination, rows, publishing_type, sorting, search, categoryFilter) => {
  const { data: allPublishings, isLoading: isAllPublishingsLoading } = useQuery({
    queryKey: ['publishings', pagination, rows, publishing_type, sorting, search, categoryFilter],
    queryFn: () => getPublishings(pagination, rows, publishing_type, sorting, search, categoryFilter)
  });

  return {
    allPublishings,
    isAllPublishingsLoading
  };
}