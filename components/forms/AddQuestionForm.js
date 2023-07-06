import React, { useState } from "react";  // Importamos React y useState desde la biblioteca 'react'
import { Button, Input, Radio } from "antd";  // Importamos los componentes Button, Input y Radio desde la biblioteca 'antd'

// Utiliza la función setValues para actualizar el estado de los valores.
// Utiliza el operador spread (...) para copiar los valores actuales y luego sobrescribe el campo especificado con el valor del evento.
// El evento.target.value contiene el valor actualizado del campo de entrada.

// Renderizando el contenido del componente AddLessonForm.
// Incluye un formulario con campos de entrada para el título y el contenido de la lección.
// El valor de cada campo está vinculado al estado "values" y se actualiza utilizando la función handleInputChange.
// El botón de carga de video está asociado a la función handleVideo para manejar la selección de video.
// El botón de eliminación de video utiliza la función handleVideoRemove para eliminar el video seleccionado.
// El progreso de carga del video se muestra utilizando el componente Progress.
// El botón "Guardar" utiliza la función handleAddLesson para guardar la lección.
const AddQuestionForm = ({
  valuesQuestion,         // Valores del formulario de pregunta (probablemente un objeto)
  setValuesQuestion,      // Función para actualizar los valores del formulario de pregunta
  handleAddQuestion,      // Función para manejar la adición de la pregunta
  uploadingQuestion       // Booleano que indica si se está subiendo la pregunta
}) => {
  const [formErrors, setFormErrors] = useState({}); // Estado que almacena los errores del formulario
  // Definiendo la función handleInputChange que se ejecuta cuando se produce un cambio en el input.
  // Toma dos argumentos: el evento (e) y el campo (field).
  // Utiliza la función setValues para actualizar el estado de los valores.
  // Utiliza el operador spread (...) para copiar los valores actuales y luego sobrescribe el campo especificado con el valor del evento.
  // El evento.target.value contiene el valor actualizado del campo de entrada.

  // Renderizando el contenido del componente AddLessonForm.
  // Incluye un formulario con campos de entrada para el título y el contenido de la lección.
  // El valor de cada campo está vinculado al estado "values" y se actualiza utilizando la función handleInputChange.
  // El botón de carga de video está asociado a la función handleVideo para manejar la selección de video.
  // El botón de eliminación de video utiliza la función handleVideoRemove para eliminar el video seleccionado.
  // El progreso de carga del video se muestra utilizando el componente Progress.
  // El botón "Guardar" utiliza la función handleAddLesson para guardar la lección.
  const handleChangeTitle = (e) => {
    setValuesQuestion({ ...valuesQuestion, title: e.target.value }); // Función de cambio de título. Actualiza el estado 'valuesQuestion' con el nuevo valor del título ingresado en el evento 'e'.
  };

  const handleChangeContent = (e) => {
    setValuesQuestion({ ...valuesQuestion, content: e.target.value });
    // La función handleChangeContent se encarga de manejar el cambio de contenido en la pregunta.
    // Al recibir un evento (e), se actualiza el estado de valuesQuestion con el nuevo contenido.
  };

  const handleChangeAnswer = (e) => {
    const answerIndex = e.target.value.toString(); // Convertir a cadena
    // La función handleChangeAnswer se encarga de manejar el cambio de respuesta en la pregunta.
    // Al recibir un evento (e), se obtiene el valor seleccionado y se convierte a cadena.
    setValuesQuestion({ ...valuesQuestion, answer: answerIndex });
    // Se actualiza el estado de valuesQuestion con la nueva respuesta.
  };

  const handleChangeOption = (optionIndex, e) => {
    // Clonar el arreglo de opciones utilizando el operador spread
    const options = [...valuesQuestion.options];
    // Actualizar el valor de la opción en la posición optionIndex con el valor del evento
    options[optionIndex] = e.target.value;
    // Actualizar el estado de valuesQuestion con el nuevo arreglo de opciones
    setValuesQuestion({ ...valuesQuestion, options });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validar el formulario y obtener posibles errores
    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      // Si existen errores, establecer los errores en el estado formErrors
      setFormErrors(errors);
      return;
    }

    // Si no hay errores, ejecutar la función handleAddQuestion con el evento
    handleAddQuestion(e);
  };

  // Utiliza el operador spread (...) para copiar los valores actuales y luego sobrescribe el campo especificado con el valor del evento.
  // El evento.target.value contiene el valor actualizado del campo de entrada.

  // Renderizando el contenido del componente AddLessonForm.
  // Incluye un formulario con campos de entrada para el título y el contenido de la lección.
  // El valor de cada campo está vinculado al estado "values" y se actualiza utilizando la función handleInputChange.
  // El botón de carga de video está asociado a la función handleVideo para manejar la selección de video.
  // El botón de eliminación de video utiliza la función handleVideoRemove para eliminar el video seleccionado.
  // El progreso de carga del video se muestra utilizando el componente Progress.
  // El botón "Guardar" utiliza la función handleAddLesson para guardar la lección.

  const validateForm = () => {
    const errors = {}; // Objeto que almacenará los errores encontrados

    // Validar si el título está vacío o contiene solo espacios en blanco
    if (!valuesQuestion.title.trim()) {
      errors.title = "El título es requerido"; // Agregar un mensaje de error al objeto de errores
    }

    // Validar si alguna de las opciones está vacía o contiene solo espacios en blanco
    if (valuesQuestion.options.some((option) => !option.trim())) {
      errors.options = "Todas las opciones son requeridas"; // Agregar un mensaje de error al objeto de errores
    }

    // Validar si no se ha seleccionado una respuesta correcta
    if (!valuesQuestion.answer) {
      errors.answer = "Debe seleccionar la respuesta correcta"; // Agregar un mensaje de error al objeto de errores
    }

    return errors; // Devolver el objeto de errores
  };

  const isFormValid = () => {
    return (
      // Comprueba si el título tiene contenido después de eliminar los espacios en blanco
      valuesQuestion.title.trim() &&
      // Comprueba si todas las opciones tienen contenido después de eliminar los espacios en blanco
      valuesQuestion.options.every((option) => option.trim()) &&
      // Comprueba si hay una respuesta seleccionada
      valuesQuestion.answer
    );
  };

  // Utiliza la función setValues para actualizar el estado de los valores.
  // Utiliza el operador spread (...) para copiar los valores actuales y luego sobrescribe el campo especificado con el valor del evento.
  // El evento.target.value contiene el valor actualizado del campo de entrada.

  // Renderizando el contenido del componente AddLessonForm.
  // Incluye un formulario con campos de entrada para el título y el contenido de la lección.
  // El valor de cada campo está vinculado al estado "values" y se actualiza utilizando la función handleInputChange.
  // El botón de carga de video está asociado a la función handleVideo para manejar la selección de video.
  // El botón de eliminación de video utiliza la función handleVideoRemove para eliminar el video seleccionado.
  // El progreso de carga del video se muestra utilizando el componente Progress.
  // El botón "Guardar" utiliza la función handleAddLesson para guardar la lección.
  return (
    <div className="container pt-3">
      <form onSubmit={handleSubmit}>
        <Input
          type="text" // Tipo de entrada de texto: texto
          className="form-control square" // Clase CSS para estilizar el componente
          value={valuesQuestion.title} // Valor del campo de texto obtenido de la variable 'valuesQuestion.title'
          onChange={handleChangeTitle} // Función que se ejecutará cuando el valor del campo de texto cambie, definida en 'handleChangeTitle'
          placeholder="Pregunta" // Texto de marcador de posición (placeholder) que se muestra dentro del campo de texto
          autoFocus // Atributo booleano que indica si el campo de texto debe recibir automáticamente el enfoque al cargarse la página
          required // Atributo booleano que indica si el campo de texto es obligatorio antes de enviar el formulario
        />
        {/*
  Este bloque de código representa una expresión condicional en JSX.
  Si la variable formErrors.title existe y tiene un valor truthy,
  se mostrará un elemento <span> con la clase "text-danger" que contiene el valor de formErrors.title.
*/}
        {formErrors.title && <span className="text-danger">{formErrors.title}</span>}

        <textarea
          className="form-control mt-3" // Clase CSS para dar estilo al elemento
          cols="7" // Número de columnas del textarea
          rows="7" // Número de filas del textarea
          value={valuesQuestion.content} // Valor actual del textarea
          onChange={handleChangeContent} // Función para manejar el cambio en el contenido
          placeholder="Contenido" // Texto de marcador de posición
          required // Atributo HTML para indicar que el campo es obligatorio
        ></textarea>

        <h4>Opciones de respuesta:</h4>
        {valuesQuestion.options.map((option, index) => (
          <div key={option.id}>
            {/* Grupo de radio para seleccionar una opción */}
            <Radio.Group
              onChange={(e) => handleChangeAnswer(e)} // Manejar el cambio de respuesta
              value={valuesQuestion.answer.toString()} // Convertir a cadena el valor de la respuesta
            >
              {/* Opción representada por un botón de radio */}
              <Radio value={index.toString()}>{option}</Radio>
            </Radio.Group>
            {/* Campo de texto para editar la opción */}
            <Input
              type="text"
              value={option}
              onChange={(e) => handleChangeOption(index, e)} // Manejar el cambio en la opción
              placeholder={`Opción ${index + 1}`} // Mostrar el número de la opción como placeholder
              required // Campo requerido
            />
            {/*
          Este bloque de código representa una expresión condicional en JSX.
          Si la variable formErrors.options existe y tiene un valor truthy,
          se mostrará un elemento <span> con la clase "text-danger" que contiene el valor de formErrors.title.
        */}
            {formErrors.options && <span className="text-danger">{formErrors.options}</span>}
          </div>
        ))}

        {/*
          Este bloque de código representa una expresión condicional en JSX.
          Si la variable formErrors.answer existe y tiene un valor truthy,
          se mostrará un elemento <span> con la clase "text-danger" que contiene el valor de formErrors.title.
        */}
        {formErrors.answer && <span className="text-danger">{formErrors.answer}</span>}

        <Button
          className="col mt-3" // Clase CSS para el botón, se le asigna un estilo de columna con margen superior de 3
          size="large" // Tamaño grande para el botón
          type="primary" // Tipo de botón primario, normalmente se utiliza para acciones principales
          loading={uploadingQuestion} // Indica si el botón está en estado de carga, basado en el valor de la variable "uploadingQuestion"
          shape="round" // Forma redondeada para el botón
          htmlType="submit" // Tipo de botón de HTML, se utilizará como botón de envío dentro de un formulario
          disabled={!isFormValid()} // Deshabilita el botón si la función "isFormValid()" retorna falso, lo que significa que el formulario no es válido
        >
          Agregar Pregunta // Texto que se mostrará dentro del botón
        </Button>

      </form>
    </div>
  );
};
// Definiendo la función handleInputChange que se ejecuta cuando se produce un cambio en el input.
// Toma dos argumentos: el evento (e) y el campo (field).
// Utiliza la función setValues para actualizar el estado de los valores.
// Utiliza el operador spread (...) para copiar los valores actuales y luego sobrescribe el campo especificado con el valor del evento.
// El evento.target.value contiene el valor actualizado del campo de entrada.

// Renderizando el contenido del componente AddLessonForm.
// Incluye un formulario con campos de entrada para el título y el contenido de la lección.
// El valor de cada campo está vinculado al estado "values" y se actualiza utilizando la función handleInputChange.
// El botón de carga de video está asociado a la función handleVideo para manejar la selección de video.
// El botón de eliminación de video utiliza la función handleVideoRemove para eliminar el video seleccionado.
// El progreso de carga del video se muestra utilizando el componente Progress.
// El botón "Guardar" utiliza la función handleAddLesson para guardar la lección.
export default AddQuestionForm;
