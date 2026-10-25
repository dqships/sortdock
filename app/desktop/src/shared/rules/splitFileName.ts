/** Splits "report.final.pdf" into { baseName: "report.final", extension: "pdf" }. */
export function splitFileName(fileName: string): { baseName: string; extension: string } {
  const dotIndex = fileName.lastIndexOf(".");

  if (dotIndex <= 0 || dotIndex === fileName.length - 1) {
    return { baseName: fileName, extension: "" };
  }

  return {
    baseName: fileName.slice(0, dotIndex),
    extension: fileName.slice(dotIndex + 1),
  };
}
