class ExtractPathError extends Error {
  name = 'ExtractError'
  message = 'Error while extracting path'
}

export function extractPageFromPath(path: string): string {
  const parts = path.split('/')
  if (parts.length < 2) {
    throw new ExtractPathError()
  }
  return parts[1]
}
