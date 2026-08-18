export function createChunks(text, documentId, chunkSize = 500, overlap = 100) {
  if (!text || !documentId) {
    return [];
  }

  const cleanedText = text
    .replace(/\r\n/g, "\n")
    .replace(/\s+/g, " ")
    .trim();

  const chunks = [];

  let start = 0;
  let chunkIndex = 0;

  while (start < cleanedText.length) {
    const end = Math.min(start + chunkSize, cleanedText.length);

    const content = cleanedText.slice(start, end).trim();

    if (content) {
      chunks.push({
        documentId,
        content,
        chunkIndex,
      });

      chunkIndex++;
    }

    if (end >= cleanedText.length) {
      break;
    }

    start = end - overlap;
  }

  return chunks;
}
