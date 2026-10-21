export async function api(url, options = {}) {
  const response = await fetch(url, {...options, headers:{'Content-Type':'application/json',...options.headers}});
  let data;
  try { data = await response.json(); } catch { throw new Error('The server is unavailable. Please try again.'); }
  if (!response.ok) throw Object.assign(new Error(data.error || 'Unable to complete the request.'), {status:response.status});
  return data;
}
export function announceContentChange() { window.dispatchEvent(new Event('kesari-content-changed')); if ('BroadcastChannel' in window) { const c = new BroadcastChannel('kesari-content'); c.postMessage('refresh'); c.close(); } }
