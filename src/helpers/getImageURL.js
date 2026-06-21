import { env } from "../config/env";
import { BOOK_PUBLISHING, MAGAZINE_PUBLISHING } from "../constants/common";

export function getImageURL(publishing) {
  if (publishing?.type?.name === MAGAZINE_PUBLISHING) {
    return `${env.RESOURCE_URL}/revistas/${publishing?.category?.URL}/${publishing.cover}`;
  } else if (publishing?.type?.name === BOOK_PUBLISHING) {
    return `${env.RESOURCE_URL}/libros/${publishing?.category?.URL}/${publishing.cover}`;
  }
}
