import React from "react";
const GradeSection = ({ currentGrade = 0 }) => {
  const isPassing = currentGrade >= 70;

  const fillPercentage = currentGrade >= 100 ? 100 : currentGrade;

  // Obtiene el elemento SVG del DOM utilizando el selector de clase '.donut-svg'.
  // Si el elemento existe, obtiene el ancho del contenedor padre y lo almacena en la variable "containerWidth".
  // Luego, calcula el ancho deseado como el mínimo entre "containerWidth" y 200 (ajustar los valores según CSS).
  // Finalmente, establece el atributo 'width' del elemento SVG con el valor del ancho deseado en píxeles.

  // Definiendo el componente "CompletionSection".
  // Recibe una prop "completionPercentage" con un valor predeterminado de 0.
  // Dentro del componente, se definen las variables "completeDashArray" e "incompleteDashArray" para los valores de los atributos "strokeDasharray" en el elemento SVG.

  // Utilizando el hook useEffect para ejecutar ciertas operaciones después de que el componente se haya montado.
  // Llama a la función "adjustSVGSize" para ajustar el tamaño del SVG cuando el componente se monta.
  // También agrega un event listener para escuchar el evento de redimensionamiento de la ventana y ejecutar la función "adjustSVGSize" en cada redimensionamiento.
  // Al desmontar el componente, se remueve el event listener para evitar fugas de memoria.

  // Renderizando el contenido del componente.
  // Se muestra un encabezado, un párrafo de explicación y el porcentaje de finalización del curso.
  // También se muestra un SVG que representa gráficamente el porcentaje de finalización del curso.
  // El SVG tiene varios elementos, como un círculo, texto y segmentos de gráfico de donut.

  // Finalmente, se exporta el componente "CompletionSection".
  return (
    <section className="text-dark-700 my-4 rounded raised-card">
      <div className="" aria-hidden="false">
        <div className="row w-100 m-0 p-4">
          <div className="col-12 col-sm-6 p-0 pr-sm-5.5">
            <h2>Progreso</h2>
            <p className="small">
              Esto representa su calificación ponderada en relación con la calificación requerida para aprobar el curso.
            </p>
          </div>
          <div className="col-12 col-sm-6 align-self-center p-0">
            {isPassing ? (
              <div className="sr-only">
                Tu progreso actual es {currentGrade}%.
              </div>
            ) : (
              <div className="sr-only">
                Tu progreso actual es {currentGrade}%. Una nota mínimo de 70% es necesario para pasar el curso.
              </div>
            )}
            <div className="grade-bar-wrapper">
              <svg width="100%" height="50px" className="grade-bar" aria-hidden="true">
                <rect width="100%" height="20px" fill="#ccc" rx="10" ry="10" />
                <rect width={`${fillPercentage}%`} height="20px" fill="#28a745" rx="10" ry="10" />
                <line x1={`${fillPercentage}%`} y1="0" x2={`${fillPercentage}%`} y2="20px" stroke="#1600a8" strokeWidth="2" />
                <text x={`${fillPercentage}%`} y="45px" dominantBaseline="middle" textAnchor="middle" fill="#000">{currentGrade}%</text>
                <line x1="70%" y1="0" x2="70%" y2="20px" stroke="#FFA200" strokeWidth="2" />
                <text x="70%" y="32px" dominantBaseline="middle" textAnchor="middle" fill="#000">70%</text>
              </svg>
            </div>

          </div>
        </div>
        <div className="row w-100 m-0 px-4"></div>
        <div className="row w-100 m-0 px-4 py-3 py-md-4 rounded-bottom bg-success-100">
          <div className="col-auto p-0">
            <span className="pgn__icon text-success-300 d-inline-flex align-bottom">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" focusable="false" aria-hidden="true">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor"></path>
              </svg>
            </span>
          </div>
          <div className="col-11 pl-2 px-0">
            {isPassing ? (
              <span className="h5 align-bottom">Tú has pasado el curso</span>
            ) : (
              <span className="h5 align-bottom">Tú no has pasado el curso</span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

// Si el elemento existe, obtiene el ancho del contenedor padre y lo almacena en la variable "containerWidth".
// Luego, calcula el ancho deseado como el mínimo entre "containerWidth" y 200 (ajustar los valores según CSS).
// Finalmente, establece el atributo 'width' del elemento SVG con el valor del ancho deseado en píxeles.

// Definiendo el componente "CompletionSection".
// Recibe una prop "completionPercentage" con un valor predeterminado de 0.
// Dentro del componente, se definen las variables "completeDashArray" e "incompleteDashArray" para los valores de los atributos "strokeDasharray" en el elemento SVG.

// Utilizando el hook useEffect para ejecutar ciertas operaciones después de que el componente se haya montado.
// Llama a la función "adjustSVGSize" para ajustar el tamaño del SVG cuando el componente se monta.
// También agrega un event listener para escuchar el evento de redimensionamiento de la ventana y ejecutar la función "adjustSVGSize" en cada redimensionamiento.
// Al desmontar el componente, se remueve el event listener para evitar fugas de memoria.

// Renderizando el contenido del componente.
// Se muestra un encabezado, un párrafo de explicación y el porcentaje de finalización del curso.
// También se muestra un SVG que representa gráficamente el porcentaje de finalización del curso.
// El SVG tiene varios elementos, como un círculo, texto y segmentos de gráfico de donut.

export default GradeSection;