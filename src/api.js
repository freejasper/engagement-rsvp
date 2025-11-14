// src/api.js  – safe to bundle
const API = import.meta.env.VITE_API_URL || '/api/github-data';

export async function loadList() {
  const r = await fetch(API);               // no secret header
  if (!r.ok) throw new Error(r.statusText);
  return r.json();
}

export async function saveList(data, sha) {
  const r = await fetch(API, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data, sha, message: 'web update' })
  });
  if (!r.ok) throw new Error(r.statusText);
  return r.json();
}