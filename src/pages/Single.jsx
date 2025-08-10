import { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";

export const Single = () => {
  // Obtiene el id de la URL (según la ruta "/single/:theId")
  const { theId } = useParams();
  // Obtiene el tipo que se envió desde el enlace (character o planet)
  const location = useLocation();
  const type = location.state?.type || "character";

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Selecciona el endpoint según el tipo
        const url =
          type === "planet"
            ? `https://dragonball-api.com/api/planets/${theId}`
            : `https://dragonball-api.com/api/characters/${theId}`;
        const resp = await fetch(url);
        if (!resp.ok) {
          throw new Error("Error al obtener los detalles");
        }
        const json = await resp.json();
        setData(json);
      } catch (error) {
        console.error(error);
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [theId, type]);

  if (loading) return <p className="text-center mt-3">Cargando...</p>;
  if (!data) return <p className="text-center mt-3">No se encontró información.</p>;

  // Ruta a la que volver: lista de planetas o lista de personajes
  const backTo = type === "planet" ? "/demo" : "/";

  return (
    <div className="container mt-3">
      <div className="card bg-warning p-3">
        <div className="row g-0">
          {/* Columna de imagen */}
          <div className="col-md-4 d-flex align-items-center justify-content-center">
            <img src={data.image} className="img-fluid rounded" alt={data.name} />
          </div>

          {/* Columna de texto */}
          <div className="col-md-8">
            <div className="card-body">
              <h2 className="card-title">{data.name}</h2>

              {type === "planet" ? (
                // Campos específicos de los planetas
                <>
                  <p><strong>¿Destruido?:</strong> {data.isDestroyed ? "Sí" : "No"}</p>
                  <p><strong>Descripción:</strong> {data.description}</p>
                  {data.characters?.length > 0 && (
                    <>
                      <h5 className="mt-3">Personajes originarios</h5>
                      <ul>
                        {data.characters.map((char) => (
                          <li key={char.id}>{char.name}</li>
                        ))}
                      </ul>
                    </>
                  )}
                </>
              ) : (
                // Campos específicos de los personajes
                <>
                  <p><strong>Raza:</strong> {data.race}</p>
                  <p><strong>Género:</strong> {data.gender}</p>
                  {data.ki && <p><strong>Ki:</strong> {data.ki}</p>}
                  {data.maxKi && <p><strong>Ki máximo:</strong> {data.maxKi}</p>}
                  {data.affiliation && <p><strong>Afiliación:</strong> {data.affiliation}</p>}
                  <p><strong>Descripción:</strong> {data.description}</p>
                  {data.originPlanet && (
                    <>
                      <h5 className="mt-3">Planeta de origen</h5>
                      <p>{data.originPlanet.name}</p>
                    </>
                  )}
                  {data.transformations?.length > 0 && (
                    <>
                      <h5 className="mt-3">Transformaciones</h5>
                      <ul>
                        {data.transformations.map((t) => (
                          <li key={t.id}>{t.name}</li>
                        ))}
                      </ul>
                    </>
                  )}
                </>
              )}

              {/* Botón de retorno alineado a la derecha al final del contenido */}
              <div className="mt-4 d-flex justify-content-end">
                <Link to={backTo} className="btn btn-secondary btn-details">
                  Volver a {type === "planet" ? "planetas" : "personajes"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
