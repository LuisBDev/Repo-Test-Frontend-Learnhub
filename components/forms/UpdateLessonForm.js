import { Button, Progress, Switch } from "antd";
import ReactPlayer from "react-player";

const UpdateLessonForm = ({
    current,
    setCurrent,
    handleUpdateLesson,
    uploading,
    uploadVideoButtonText,
    handleVideo,
    progress,
}) => {
    // Actualiza el título de la lección
    const handleTitleChange = (e) => {
        setCurrent({ ...current, title: e.target.value });
    };

    // Actualiza el contenido de la lección
    const handleContentChange = (e) => {
        setCurrent({ ...current, content: e.target.value });
    };

    return (
        <div className="container pt-3">
            <form onSubmit={handleUpdateLesson}>
                {/* Entrada para el título de la lección */}
                <input
                    type="text"
                    className="form-control square"
                    onChange={handleTitleChange}
                    value={current.title}
                    autoFocus
                    required
                />

                {/* Área de texto para el contenido de la lección */}
                <textarea
                    className="form-control mt-3"
                    cols="7"
                    rows="7"
                    onChange={handleContentChange}
                    value={current.content}
                ></textarea>

                <div>
                    {/* Reproductor de video si hay un video seleccionado */}
                    {!uploading && current.video && current.video.Location && (
                        <div className="pt-2 d-flex justify-content-center">
                            <ReactPlayer
                                url={current.video.Location}
                                width="410px"
                                height="240px"
                                controls
                            />
                        </div>
                    )}

                    {/* Botón para subir un video */}
                    <label className="btn btn-dark btn-block text-left mt-3">
                        {uploadVideoButtonText}
                        <input onChange={handleVideo} type="file" accept="video/*" hidden />
                    </label>
                </div>

                {/* Barra de progreso */}
                {progress > 0 && (
                    <Progress
                        className="d-flex justify-content-center pt-2"
                        percent={progress}
                        steps={10}
                    />
                )}

                <div className="d-flex justify-content-between">
                    {/* Etiqueta de vista previa */}
                    <span className="pt-3 badge">Vista previa</span>
                    {/* Interruptor para habilitar/deshabilitar la vista previa gratuita */}
                    <Switch
                        className="float-right mt-2"
                        disabled={uploading}
                        checked={current.free_preview}
                        name="fee_preview"
                        onChange={(v) => setCurrent({ ...current, free_preview: v })}
                    />
                </div>

                {/* Botón para guardar la lección */}
                <Button
                    onClick={handleUpdateLesson}
                    className="col mt-3"
                    size="large"
                    type="primary"
                    loading={uploading}
                    shape="round"
                >
                    Guardar
                </Button>
            </form>
        </div>
    );
};

export default UpdateLessonForm;
