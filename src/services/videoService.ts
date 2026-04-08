import { getYoutubeVideoId, getYoutubeVideoTitle } from "../lib/helpers";
import { createShuffledOptions } from "./optionsGenerator";

export interface VideoData {
  videoId: string;
  question: string;
  options: string[];
  answer: string;
  nivel_id: string;
}

export interface VideoFormState {
  videoUrl: string;
  videoName: string;
  options: string[];
  videoId: string | null;
  newOption: string;
  showAddOptionsForm: boolean;
  levelSelected: string;
}

/**
 * Busca información del video desde una URL
 */
export async function searchVideoFromUrl(url: string) {
  if (!url.trim()) {
    throw new Error("URL del video es requerida");
  }

  const videoId = getYoutubeVideoId(url);
  if (!videoId) {
    throw new Error("URL de YouTube inválida");
  }

  const videoTitle = await getYoutubeVideoTitle(videoId);
  if (!videoTitle) {
    throw new Error("No se pudo obtener el título del video");
  }

  // Generar 3 opciones automáticamente (incluyendo la correcta)
  const options = createShuffledOptions(videoTitle);

  return {
    videoId,
    videoTitle,
    options,
  };
}

/**
 * Valida que el formulario tenga datos completos
 */
export function validateVideoForm(state: VideoFormState): {
  isValid: boolean;
  error?: string;
} {
  if (!state.videoId) {
    return { isValid: false, error: "Selecciona un video" };
  }

  if (!state.videoName.trim()) {
    return { isValid: false, error: "El nombre del video es requerido" };
  }

  if (state.options.length < 3) {
    return { isValid: false, error: "Se requieren al menos 3 opciones" };
  }

  if (!state.options.includes(state.videoName)) {
    return {
      isValid: false,
      error: "La respuesta correcta debe estar en las opciones",
    };
  }

  if (!state.levelSelected.trim()) {
    return {
      isValid: false,
      error: "Selecciona un nivel",
    };
  }

  return { isValid: true };
}

/**
 * Prepara los datos para enviar al API
 */
export function prepareVideoPayload(state: VideoFormState): VideoData {
  return {
    videoId: state.videoId || "",
    question: "¿Qué canción Phonk es esta?",
    options: state.options,
    answer: state.videoName,
    nivel_id: state.levelSelected,
  };
}

/**
 * Resetea el estado del formulario
 */
export function getInitialFormState(): VideoFormState {
  return {
    videoUrl: "",
    videoName: "",
    options: [],
    videoId: null,
    newOption: "",
    showAddOptionsForm: false,
    levelSelected: "",
  };
}
