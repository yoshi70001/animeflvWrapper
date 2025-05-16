export function debounce<F extends (...args: any[]) => any>(
  func: F,
  waitFor: number
): (...args: Parameters<F>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<F>): void => {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    
    timeout = setTimeout(() => func(...args), waitFor);
  };
}

export function generateTransitionNames(slug: string) {
  const encodedSlug = encodeURIComponent(slug);
  return {
    card: `anime-card-${encodedSlug}`,
    image: `anime-image-${encodedSlug}`,
    title: `anime-title-${encodedSlug}`,
  };
}