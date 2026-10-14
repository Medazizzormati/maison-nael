export async function getJson(path) {
  const r = await fetch('/api' + path, { headers: { Accept: 'application/json' } })
  if (!r.ok) throw new Error(String(r.status))
  return r.json()
}
export async function postJson(path, body) {
  const r = await fetch('/api' + path, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
  const data = await r.json().catch(() => ({}))
  if (!r.ok) throw Object.assign(new Error('request failed'), { status: r.status, data })
  return data
}
