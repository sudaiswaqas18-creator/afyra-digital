export function cmsPageSlugFromPath(pathname = window.location.pathname): string {
  const path = pathname.replace(/\/+$/, '') || '/'
  if (path === '/') return 'home'
  if (path.startsWith('/solutions/')) {
    const slug = path.split('/')[2]
    return slug ? `solution:${slug}` : 'solutions'
  }
  if (path === '/solutions') return 'solutions'
  if (path === '/healthcare') return 'healthcare'
  if (path === '/programs') return 'programs'
  if (path === '/about') return 'about'
  if (path === '/insights') return 'insights'
  if (path === '/request-consultation' || path === '/contact') return 'request-consultation'
  return 'home'
}
