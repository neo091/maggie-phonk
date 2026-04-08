/**
 * Lista de artistas y títulos de canciones Phonk comunes
 */
const PHONK_OPTIONS = [
  "Soudiere",
  "Soda Stereo",
  "Peder Hellberg",
  "Dyathon",
  "Blade Runner Intro",
  "Tokyo Ghoul No More",
  "Homecoming",
  "UK Drill Beat",
  "Phonkadelic",
  "Dark Phonk Energy (slowed)",
  "Toxic Beats",
  "Night Drive",
  "Cyber Runner",
  "Phonk Prophet",
  "Deep Shadows",
  "Retro Synth",
  "Neon Lights",
  "Dark City",
  "Street Pulse",
  "Urban Legend",
  "Phonk Master",
  "Midnight Chase",
  "Digital Ghost",
  "Synth Wave",
  "Retro Wave",
  "Phonk Vibes",
  "Dark Matter",
  "Shadow Zone",
  "Digital Dreams",
  "Cyber Phonk (slowed)",
  "Night Mode",
  "Phonk King",
  "Dark Ritual",
  "Synth Waves",
  "Electric Dream",
  "Phonk Wizard",
  "Shadow Dancer",
  "Digital Nomad",
  "Retro Future",
  "Neon Dreams",
  "Neon Dreams (slowed)",
];

/**
 * Obtiene un elemento aleatorio de un array
 */
function getRandomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Genera opciones únicas excluyendo la respuesta correcta
 */
export function generateOptions(
  correctAnswer: string,
  count: number = 2,
): string[] {
  const options: Set<string> = new Set();

  while (options.size < count) {
    const option = getRandomElement(PHONK_OPTIONS);
    // Evitar duplicados y la respuesta correcta
    if (option !== correctAnswer && !options.has(option)) {
      options.add(option);
    }
  }

  return Array.from(options);
}

/**
 * Crea un array de opciones con la respuesta correcta en posición aleatoria
 */
export function createShuffledOptions(correctAnswer: string): string[] {
  const generatedOptions = generateOptions(correctAnswer, 2);
  const allOptions = [correctAnswer, ...generatedOptions];

  // Shuffle usando Fisher-Yates
  for (let i = allOptions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allOptions[i], allOptions[j]] = [allOptions[j], allOptions[i]];
  }

  return allOptions;
}
