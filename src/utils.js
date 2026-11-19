export function formatDate(iso) {
  if (!iso) return 'À venir'
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }).format(new Date(iso + 'T12:00:00'))
}

export function formatDateShort(iso) {
  if (!iso) return 'À venir'
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(new Date(iso + 'T12:00:00'))
}
