import React from "react";
import { useVideoAPI, useAddVideoForm } from "../hooks";
import { prepareVideoPayload } from "../services/videoService";
import Form from "../components/Form";
import Input from "../components/Input";
import Button from "../components/Button";
import Card from "../components/Card";
import VideoThumbnail from "../components/VideoThumbnail";
import OptionItem from "../components/OptionItem";
import { useLevels } from "../hooks/useLevels";
import LevelsSelectorEdit from "../components/LevelsSelectorEdit";

const Add = () => {
  const { loading, error: uploadError, addVideo } = useVideoAPI();
  const {
    state,
    searchError,
    handleSearchVideo,
    setVideoUrl,
    setVideoName,
    setVIdeoLevel,
    handleAddOption,
    handleRemoveOption,
    setNewOption,
    toggleAddOptionsForm,
    validate,
    reset,
  } = useAddVideoForm();

  const { levels } = useLevels();

  const handleUpload = async () => {
    console.log(state);
    const validation = validate();
    if (!validation.isValid) {
      alert(validation.error);
      return;
    }

    try {
      const payload = prepareVideoPayload(state);
      console.log(payload);
      await addVideo(payload);
      reset();
    } catch (err) {
      console.error("Error al subir video:", err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-2 sm:px-0">
      <h2 className="text-2xl sm:text-3xl font-black text-fuchsia-400 mb-6 sm:mb-8">
        ➕ Agregar Video al Quiz
      </h2>

      {/* Sección 1: Buscar Video */}
      <Card
        gradient
        title="1️⃣ Buscar Video de YouTube"
        className="mb-6 sm:mb-8"
      >
        <Form onSubmit={handleSearchVideo} className="w-full">
          <Input
            value={state.videoUrl}
            onChange={setVideoUrl}
            type="text"
            placeholder="URL del video (ej: https://youtu.be/...)"
            label="URL del Video"
          />
          {searchError && (
            <p className="text-red-400 text-sm mt-2">❌ {searchError}</p>
          )}
          <Button type="submit" variant="primary" fullWidth className="mt-4">
            🔍 Buscar Video
          </Button>
        </Form>
      </Card>

      {/* Sección 2: Preview del Video */}
      {state.videoId && (
        <Card
          gradient
          title="2️⃣ Vista Previa del Video"
          className="mb-6 sm:mb-8"
        >
          <VideoThumbnail videoId={state.videoId} />
        </Card>
      )}

      {/* Sección 3: Nombre del Video */}
      {state.videoId && (
        <>
          <Card gradient title="3️⃣ Nombre del Video" className="mb-6 sm:mb-8">
            <Input
              value={state.videoName}
              onChange={setVideoName}
              type="text"
              placeholder="Artista - Canción"
              label="Nombre/Respuesta Correcta"
              error={!state.videoName ? "El nombre es requerido" : ""}
            />
          </Card>

          <Card
            gradient
            title="3️⃣.1️⃣ Nivel del Video"
            className="mb-6 sm:mb-8 relative"
          >
            <LevelsSelectorEdit onSelected={setVIdeoLevel} levels={levels} />
            <p>{state.levelSelected.toString()}</p>
          </Card>
        </>
      )}

      {/* Sección 4: Opciones */}
      {state.videoId && (
        <Card
          gradient
          title="4️⃣ Opciones de Respuesta"
          className="mb-6 sm:mb-8"
        >
          <div className="space-y-3 sm:space-y-4">
            <div>
              <p className="text-xs sm:text-sm text-slate-400 mb-3 font-semibold">
                Total de opciones: {state.options.length}
              </p>
              {state.options.length > 0 && (
                <div className="space-y-2">
                  {state.options.map((option) => (
                    <OptionItem
                      key={option}
                      text={option}
                      isCorrect={option === state.videoName}
                    />
                  ))}
                </div>
              )}
            </div>

            {state.showAddOptionsForm && (
              <Card className="bg-slate-700/50 border border-slate-600 space-y-3">
                <Input
                  value={state.newOption}
                  onChange={setNewOption}
                  type="text"
                  placeholder="Nueva opción"
                  label="Agregar Opción Personalizada"
                />
                <div className="flex gap-2">
                  <Button
                    onClick={handleAddOption}
                    variant="primary"
                    className="flex-1"
                  >
                    ✓ Agregar
                  </Button>
                  <Button
                    onClick={toggleAddOptionsForm}
                    variant="secondary"
                    className="flex-1"
                  >
                    ✕ Cancelar
                  </Button>
                </div>
              </Card>
            )}

            {!state.showAddOptionsForm && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  toggleAddOptionsForm();
                }}
                className="w-full border-2 border-dashed border-fuchsia-500/30 hover:border-fuchsia-500 text-fuchsia-400 font-semibold p-3 sm:p-4 rounded-lg transition"
              >
                + Agregar Opción Manual
              </button>
            )}
          </div>
        </Card>
      )}

      {/* Sección 5: Subir */}
      {state.videoId && state.videoName && state.options.length >= 3 && (
        <Card gradient className="mb-8">
          <div className="space-y-4">
            {uploadError && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                <p className="text-red-400 font-semibold">
                  ❌ Error: {uploadError.message}
                </p>
              </div>
            )}
            <Button
              onClick={handleUpload}
              variant="primary"
              disabled={loading}
              fullWidth
              className="text-lg"
            >
              {loading ? "Subiendo..." : "🚀 Subir Video"}
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default Add;
