import { useState, useCallback } from "react";
import {
  searchVideoFromUrl,
  validateVideoForm,
  getInitialFormState,
  type VideoFormState,
} from "../services/videoService";

export function useAddVideoForm() {
  const [state, setState] = useState<VideoFormState>(getInitialFormState());
  const [searchError, setSearchError] = useState<string | null>(null);

  // Buscar video por URL
  const handleSearchVideo = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setSearchError(null);

      try {
        const { videoId, videoTitle, options } = await searchVideoFromUrl(
          state.videoUrl,
        );

        setState((prev) => ({
          ...prev,
          videoId,
          videoName: videoTitle,
          options, // Usar las opciones generadas automáticamente
          videoUrl: "",
        }));
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Error desconocido";
        setSearchError(message);
      }
    },
    [state.videoUrl],
  );

  // Actualizar URL del video
  const setVideoUrl = useCallback((value: string) => {
    setState((prev) => ({ ...prev, videoUrl: value }));
  }, []);

  // Actualizar nombre del video
  const setVideoName = useCallback((value: string) => {
    setState((prev) => ({ ...prev, videoName: value }));
  }, []);

  // Actualizar nivel del video
  const setVIdeoLevel = useCallback((value: string) => {
    setState((prev) => ({ ...prev, levelSelected: value }));
  }, []);

  // Agregar opción
  const handleAddOption = useCallback(() => {
    if (!state.newOption.trim()) return;

    setState((prev) => ({
      ...prev,
      options: [...prev.options, prev.newOption],
      newOption: "",
      showAddOptionsForm: false,
    }));
  }, [state.newOption]);

  // Eliminar opción
  const handleRemoveOption = useCallback((optionToRemove: string) => {
    setState((prev) => ({
      ...prev,
      options: prev.options.filter((opt) => opt !== optionToRemove),
    }));
  }, []);

  // Actualizar nueva opción
  const setNewOption = useCallback((value: string) => {
    setState((prev) => ({ ...prev, newOption: value }));
  }, []);

  // Toggle formulario de agregar opción
  const toggleAddOptionsForm = useCallback(() => {
    setState((prev) => ({
      ...prev,
      showAddOptionsForm: !prev.showAddOptionsForm,
      newOption: "",
    }));
  }, []);

  // Validar formulario
  const validate = useCallback(() => {
    return validateVideoForm(state);
  }, [state]);

  // Reset del formulario
  const reset = useCallback(() => {
    setState(getInitialFormState());
    setSearchError(null);
  }, []);

  return {
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
  };
}
