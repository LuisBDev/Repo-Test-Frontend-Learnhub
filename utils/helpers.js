// Definimos una función llamada currencyFormatter que toma un objeto de datos como argumento
// Definiendo una función llamada currencyFormatter que acepta un objeto de datos como argumento y devuelve un valor formateado como una cadena de moneda.

// En la función, multiplicamos el valor de 'amount' en el objeto de datos por 100 y luego lo dividimos por 100 para asegurarnos de que solo tenga dos decimales. Esto se hace para evitar problemas con los cálculos de redondeo en JavaScript.

// Utilizamos el método toLocaleString para formatear el número según las convenciones de formato regional. Pasamos el código de idioma o región en el primer argumento y el código de moneda en el segundo argumento.

// El resultado formateado se devuelve como una cadena de moneda.

// Exportando la función currencyFormatter.
export const currencyFormatter = (data) => {
    // Multiplicamos el monto por 100 y luego lo dividimos por 100 para asegurarnos de que solo tenga dos decimales
    // Esto se hace para evitar problemas con los cálculos de redondeo en JavaScript
    // El resultado se asigna a la propiedad 'amount' del objeto 'data'
    return ((data.amount * 100) / 100).toLocaleString(data.currency, {
        // Usamos el método toLocaleString para formatear el número según las convenciones de formato regional
        // El primer argumento es el código de idioma o la región que se utilizará para el formato
        style: "currency",
        // El segundo argumento es el código de moneda que se utilizará para el formato
        // Este componente se utiliza para mostrar cada curso en la lista de cursos del usuario.

        // Renderizando el contenido de cada curso mediante el uso de props.
        // Muestra la imagen del curso utilizando el componente Avatar de Ant Design.
        // Elige la imagen del curso de la ubicación proporcionada o muestra una imagen predeterminada si no hay imagen disponible.
        // Muestra el nombre del curso como un enlace que redirige a la página de detalle del curso.
        // Muestra el número de lecciones del curso y el nombre del instructor.

        // Definiendo el componente UserIndex.

        // Accediendo al estado global de la aplicación utilizando el hook useContext y desestructurando el estado "user" desde el objeto "state" del contexto.

        // Utilizando el hook useState para crear una variable de estado llamada "courses" y "loading".
        // "courses" se inicializa como un arreglo vacío para almacenar los cursos del usuario.
        // "loading" se inicializa como falso para indicar que no se está cargando ningún dato en este momento.

        // Utilizando el hook useEffect para realizar operaciones después de que el componente se haya montado.
        // Define la función fetchCourses, que se utiliza para cargar los cursos del usuario.
        // Llama a la función loadCourses para obtener los cursos del usuario.
        // Llama a fetchCourses cuando el componente se monta para cargar los cursos del usuario.
        currency: data.currency,
    });
};

// Utilizamos el método toLocaleString para formatear el número según las convenciones de formato regional. Pasamos el código de idioma o región en el primer argumento y el código de moneda en el segundo argumento.

// El resultado formateado se devuelve como una cadena de moneda.

// Exportando la función currencyFormatter.
