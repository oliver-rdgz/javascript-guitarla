import Guitar from "./components/Guitar";
import Header from "./components/Header";
import useCarrito from "./hooks/useCarrito";

function App() {
  const {
    carrito,
    data,
    addCarrito,
    removeItemCarrito,
    increaseItem,
    decreaseItem,
    clearCarrito,
    carritoIsEmpty,
    totalCarrito
  } = useCarrito();

  return (
    <>
      <Header
        carrito={carrito}
        removeItemCarrito={removeItemCarrito}
        increaseItem={increaseItem}
        decreaseItem={decreaseItem}
        clearCarrito={clearCarrito}
        carritoIsEmpty={carritoIsEmpty}
        totalCarrito={totalCarrito}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar) => (
            <Guitar key={guitar.id} guitar={guitar} addCarrito={addCarrito} />
          ))}
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
      </footer>
    </>
  );
}

export default App;
