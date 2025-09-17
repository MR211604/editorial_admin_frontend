export default function MagazineArticlesTable({ publishing, handleEdit }) {
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
          {publishing?.data.details.map((article, index) => (
            <tr key={article.id} className="align-middle text-center">
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
                  <button className="btn btn-danger btn-sm">
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
