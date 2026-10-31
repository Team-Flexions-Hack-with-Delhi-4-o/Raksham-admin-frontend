import { RESOURCES } from '../features/legal-resources/mockData'

// No backend contract exists for legal resources yet, so this serves sample data.
// Swap the body for a real request (via VITE_API_BASE_URL) once one is documented.
export function listResources() {
  return RESOURCES
}
