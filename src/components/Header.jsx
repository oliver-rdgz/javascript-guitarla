import {Fragment} from "react";
export default function Header(){
  const name = "Oliver";
  const deuda = "100";
  return(
    <Fragment>
      <p>Hola soy {name} y debo {deuda}</p>
      <p>Dame plata</p>
    </Fragment>
  )
}