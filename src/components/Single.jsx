import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

export const Single = () => {
  const { theId } = useParams();
  const location = useLocation();
  // Si no nos pasan type, asumimos que es personaje
  const type = location.state?.type || "character";
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Endpoint según el tipo recibido
        const url =
          type === "planet"
            ? `https://dragonball-api.com/api/planets/${theId}`
            : `https://dragonball-api.com/api/characters/${theId}`;
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error("Fallo al obtener el detalle");
        }
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [theId, type]);

  if (loading) return <p className="text-center">Cargando...</p>;
  if (!data) return <p className="text-center">No se encontró información</p>;

  // Tarjeta de detalle de un planeta
  if (type === "planet") {
    return (
      <div className="container mt-3">
        <div className="card bg-warning p-3">
          <div className="row g-0">
            <div className="col-md-4 d-flex align-items-center justify-content-center">
              <img src={data.image} className="img-fluid rounded" alt={data.name} />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h2 className="card-title">{data.name}</h2>
                <p><strong>¿Destruido?:</strong> {data.isDestroyed ? "Sí" : "No"}</p>
                <p><strong>Descripción:</strong> {data.description}</p>
                {data.characters && data.characters.length > 0 && (
                  <>
                    <h5 className="mt-3">Personajes originarios</h5>
                    <ul>
                      {data.characters.map((char) => (
                        <li key={char.id}>{char.name}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Tarjeta de detalle de un personaje
  return (
    <div className="container mt-3">
      <div className="card bg-warning p-3">
        <div className="row g-0">
          <div className="col-md-4 d-flex align-items-center justify-content-center">
            <img src={data.image} className="img-fluid rounded" alt={data.name} />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h2 className="card-title">{data.name}</h2>
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
              {data.transformations && data.transformations.length > 0 && (
                <>
                  <h5 className="mt-3">Transformaciones</h5>
                  <ul>
                    {data.transformations.map((trans) => (
                      <li key={trans.id}>{trans.name}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
