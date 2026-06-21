import { memo } from "react";

const AuthorMultiselect = memo(
  ({
    allAuthors,
    availableAuthors,
    search,
    setSearch,
    selectedAuthorsData,
    setSelectedAuthorsData,
  }) => {
    const isAuthorSelected = (authorId) =>
      selectedAuthorsData.some((author) => author.idAuthor === +authorId);

    const handleSelectChange = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const handleSearchChange = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setSearch(e.target.value);
    };

    const addAuthor = (authorId) => {
      const allAuthorsData = allAuthors?.data || [];
      let author = allAuthorsData.find((a) => a.idAuthor === +authorId);
      setSelectedAuthorsData((prev) => [...prev, author]);
    };

    const removeAuthor = (authorId) => {
      setSelectedAuthorsData((prev) =>
        prev.filter((a) => a.idAuthor !== +authorId),
      );
    };

    const handleClick = (authorId) => {
      const isSelected = selectedAuthorsData.some(
        (a) => a.idAuthor === +authorId,
      );

      if (isSelected) {
        removeAuthor(authorId);
      } else {
        addAuthor(authorId);
      }
    };

    return (
      <div className="card">
        <div className="card-body bg-light">
          <div className="row">
            <div className="col-md-12">
              <label className="form-label">Seleccionar Autores</label>

              <div className="mb-2">
                <input
                  type="text"
                  className="form-control"
                  autoFocus
                  placeholder="Buscar autores por nombre..."
                  value={search}
                  onChange={handleSearchChange}
                />
              </div>

              <select
                multiple
                className="form-select"
                style={{ marginBottom: "0.5rem", height: "15rem" }}
                value={[]}
                onChange={handleSelectChange}
              >
                {availableAuthors.map((author) => (
                  <option
                    key={author.idAuthor}
                    value={author.idAuthor}
                    onClick={() => handleClick(author.idAuthor)}
                    style={{
                      backgroundColor: isAuthorSelected(author.idAuthor)
                        ? "#007bff"
                        : "transparent",
                      color: isAuthorSelected(author.idAuthor)
                        ? "white"
                        : "inherit",
                    }}
                  >
                    {author.name} {author.lastname}
                  </option>
                ))}
              </select>
              <div className="form-text">
                Manten presionado Ctrl o Cmd para seleccionar varios autores.
              </div>

              {selectedAuthorsData.length > 0 && (
                <div className="mt-2">
                  <small className="text-muted">Autores seleccionados:</small>
                  <div className="d-flex flex-wrap gap-1 mt-1">
                    {selectedAuthorsData.map((author) => (
                      <span key={author.idAuthor} className="badge bg-primary">
                        {author.name} {author.lastname}
                        <button
                          type="button"
                          className="btn-close btn-close-white ms-1"
                          style={{ fontSize: "10px" }}
                          onClick={() => removeAuthor(author.idAuthor)}
                        ></button>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  },
);

export default AuthorMultiselect;
