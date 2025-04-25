import { useState, useEffect } from "react";
import Guitar from "./components/Guitar";
import Header from "./components/Header";

import { db } from "./db/data";
function App() {
  const initialCarrito = () => {
    const carrito = localStorage.getItem("carrito")
    return carrito ? JSON.parse(carrito) : [];
  };
  const [data] = useState(db);
  const [carrito, setCarrito] = useState(initialCarrito);

  const maxItems = 10;

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  function addCarrito(item) {
    const indexItem = carrito.findIndex((itemCarrito) => itemCarrito.id === item.id);
    if (indexItem >= 0) {
      const updateCarrito = [...carrito];
      if (updateCarrito[indexItem].quantity < maxItems) {
        ++updateCarrito[indexItem].quantity;
        setCarrito(updateCarrito);
      }
    } else {
      item.quantity = 1;
      setCarrito([...carrito, item]);
    }
    /*    setCarrito((prevCarrito) => {
      const itemFound = prevCarrito.find((itemCarrito)=> itemCarrito.id === item.id);
      if(itemFound) return prevCarrito
      else return [...prevCarrito, item];
    });*/
  }

  function removeItemCarrito(id) {
    const updateCarrito = [...carrito];
    setCarrito(updateCarrito.filter((item) => item.id !== id));
  }

  function increaseItem(id) {
    const updateCarrito = carrito.map((item) => {
      if (item.id == id && item.quantity < maxItems) ++item.quantity;
      return item;
    });
    setCarrito(updateCarrito);
  }

  function decreaseItem(id) {
    const updateCarrito = carrito.filter((item) => {
      if (item.quantity === 1 && item.id === id) return false;
      if (item.id === id) --item.quantity;
      return true;
    });
    setCarrito(updateCarrito);
  }

  function clearCarrito() {
    setCarrito([]);
  }

  return (
    <>
      <Header
        carrito={carrito}
        removeItemCarrito={removeItemCarrito}
        increaseItem={increaseItem}
        decreaseItem={decreaseItem}
        clearCarrito={clearCarrito}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar) => (
            <Guitar key={guitar.id} setCarrito={setCarrito} guitar={guitar} addCarrito={addCarrito} />
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
