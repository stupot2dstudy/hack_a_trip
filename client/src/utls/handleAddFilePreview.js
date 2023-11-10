// Función que se encarga de previsualizar la imagen seleccionada en el input file.
export const handleAddFilePreview = (e, setFile, setPreviewUrl) => {
    // Agregamos la clase 'active' al input.
    e.target.classList.add('active');

    const selectedFile = e.target.files[0];

    // Actualizar el estado con el archivo seleccionado.
    setFile(selectedFile);

    // Crear una URL para la previsualización de la imagen.
    const fileReader = new FileReader();

    fileReader.onload = () => {
        // Actualizar el estado con la URL de previsualización.
        setPreviewUrl(fileReader.result);
    };

    fileReader.readAsDataURL(selectedFile);
};
