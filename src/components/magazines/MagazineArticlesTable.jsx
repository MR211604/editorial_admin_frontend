export default function MagazineArticlesTable({
  publishing,
  languageId,
  handleEdit,
  handleDelete,
}) {
  //Filtrando por el id del lenguaje
  const filteredArticles = publishing?.data?.details.filter(
    (detail) => detail.language_id === languageId,
  );

  return (
    <div className="table-responsive table-bordered">
      <table className="table table-striped">
        <thead className="table-dark">
          <tr className="text-center">
            <th>No.</th>
            <th>Titulo</th>
            <th>Operaciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredArticles?.map((article, index) => (
            <tr
              key={article.idPublishingDetail}
              className="align-middle text-center"
            >
              <td>{index + 1}</td>
              <td>{article.title}</td>
              <td>
                <div className="d-flex gap-2 justify-content-center">
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => handleEdit(article)}
                  >
                    <i className="bi bi-pencil-square"></i>
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(article)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
