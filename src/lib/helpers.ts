export function getYoutubeVideoId(url: string): string | null {
  if (!url || typeof url !== "string") return null;

  url = url.trim();

  try {
    const parsed = new URL(url);

    // Caso clásico: youtube.com/watch?v=
    const v = parsed.searchParams.get("v");
    if (v && v.length === 11) return v;

    // Caso: youtu.be/ID
    if (parsed.hostname.includes("youtu.be")) {
      const id = parsed.pathname.split("/")[1];
      if (id?.length === 11) return id;
    }

    // Caso: /embed/ID o /shorts/ID
    const pathParts = parsed.pathname.split("/");
    for (const part of pathParts) {
      if (part.length === 11) return part;
    }

    return null;
  } catch {
    return null;
  }
}

export async function getYoutubeVideoTitle(videoId: string | null) {
  const url = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log("Título del video:", data.title);
    console.log(data);
    return data.title;
  } catch (error) {
    console.error("Error al obtener el título:", error);
  }
}
