import { env } from "../config/env";

export function getImageURL(publishing) {
  if (publishing?.type?.name === "Revista") {
    return `${env.RESOURCE_URL}/revistas/${publishing?.category?.URL}/${publishing.cover}`;
  } else if (publishing?.type?.name === "Libro") {
    return `${env.RESOURCE_URL}/libros/${publishing?.category?.URL}/${publishing.cover}`;
  }
}
