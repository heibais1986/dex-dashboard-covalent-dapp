// Cloudflare Pages Worker for Next.js
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // Handle API routes
    if (url.pathname.startsWith('/api/')) {
      return new Response('API routes not supported in static export', { status: 404 });
    }
    
    // Handle static files
    return env.ASSETS.fetch(request);
  }
};