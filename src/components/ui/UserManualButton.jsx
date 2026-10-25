import { env } from "../../config/env";

export default function UserManualButton({ fileName, moduleName }) {
  const resourcePath = env.RESOURCE_URL.replace(/\/+$/, "");

  return (
    <a
      className="btn btn-outline-primary mb-3"
      href={`${resourcePath}/manuales_cms/${fileName}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Abrir manual de ${moduleName} en PDF`}
    >
      <i className="bi bi-file-earmark-pdf me-2" aria-hidden="true" />
      Manual de {moduleName}
    </a>
  );
}
