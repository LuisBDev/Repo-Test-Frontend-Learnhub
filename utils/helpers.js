// Definimos una función llamada currencyFormatter que toma un objeto de datos como argumento
export const currencyFormatter = (data) => {
    // Multiplicamos el monto por 100 y luego lo dividimos por 100 para asegurarnos de que solo tenga dos decimales
    // Esto se hace para evitar problemas con los cálculos de redondeo en JavaScript
    // El resultado se asigna a la propiedad 'amount' del objeto 'data'
    return ((data.amount * 100) / 100).toLocaleString(data.currency, {
        // Usamos el método toLocaleString para formatear el número según las convenciones de formato regional
        // El primer argumento es el código de idioma o la región que se utilizará para el formato
        style: "currency",
        // El segundo argumento es el código de moneda que se utilizará para el formato
        currency: data.currency,
    });
};
