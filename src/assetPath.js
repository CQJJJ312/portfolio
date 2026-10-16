// A single base for public assets, including paths supplied by project data.
export function assetPath(path) {
  if (!path || /^(?:https?:|data:|blob:)/i.test(path)) return path;
  return (import.meta.env?.BASE_URL || '/') + path.replace(/^\/+/, '');
}

export function resolveMedia(item) {
  return { ...item, src: assetPath(item.src), ...(item.poster ? { poster: assetPath(item.poster) } : {}) };
}
