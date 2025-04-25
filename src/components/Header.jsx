import { useMemo } from "react";

export default function Header({ carrito, removeItemCarrito, increaseItem, decreaseItem, clearCarrito }) {
  //state derivado
  const carritoIsEmpty = useMemo(() => carrito.length === 0, [carrito]);
  const totalCarrito = useMemo(() => carrito.reduce((total, item) => total + item.quantity * item.price, 0), [carrito]);

  return (
    <>
      <header className="py-5 header">
        <div className="container-xl">
          <div className="row justify-content-center justify-content-md-between">
            <div className="col-8 col-md-3">
              <a href="index.html">
                <img className="img-fluid" src="/img/logo.svg" alt="imagen logo" />
              </a>
            </div>
            <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
              <div className="carrito">
                <img className="img-fluid" src="/img/carrito.png" alt="imagen carrito" />

                <div id="carrito" className="bg-white p-3">
                  {carritoIsEmpty ? (
                    <p className="text-center">El carrito esta vacio</p>
                  ) : (
                    <>
                      <table className="w-100 table">
                        <thead>
                          <tr>
                            <th>Imagen</th>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Cantidad</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {carrito.map((item) => (
                            <tr>
                              <td>
                                <img className="img-fluid" src={`/img/${item.image}.jpg`} alt="imagen guitarra" />
                              </td>
                              <td>{item.name}</td>
                              <td className="fw-bold">${item.price}</td>
                              <td className="flex align-items-start gap-4">
                                <button onClick={() => decreaseItem(item.id)} type="button" className="btn btn-dark">
                                  -
                                </button>
                                {item.quantity}
                                <button onClick={() => increaseItem(item.id)} type="button" className="btn btn-dark">
                                  +
                                </button>
                              </td>
                              <td>
                                <button
                                  onClick={() => removeItemCarrito(item.id)}
                                  className="btn btn-danger"
                                  type="button">
                                  X
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <p className="text-end">
                        Total pagar: <span className="fw-bold">${totalCarrito}</span>
                      </p>
                    </>
                  )}

                  <button onClick={clearCarrito} className="btn btn-dark w-100 mt-3 p-2">
                    Vaciar Carrito
                  </button>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}
