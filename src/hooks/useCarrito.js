import { useMemo } from "react";
import { useState, useEffect } from "react";
import { db } from "../db/data";

export default function useCarrito() {
    const initialCarrito = () => {
        const carrito = localStorage.getItem("carrito");
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

    const carritoIsEmpty = useMemo(() => carrito.length === 0, [carrito]);
    const totalCarrito = useMemo(
        () => carrito.reduce((total, item) => total + item.quantity * item.price, 0),
        [carrito]
    );

    return {
        data,
        setCarrito,
        carrito,
        addCarrito,
        removeItemCarrito,
        increaseItem,
        decreaseItem,
        clearCarrito,
        carritoIsEmpty,
        totalCarrito
    };
}
