// /api/github-data.js
const OWNER = 'freejasper';
const REPO  = 'engagement-invite-list';
const FILE  = 'data.json';
const PAT   = process.env.GITHUB_PAT;      // <— we’ll add this in Vercel dashboard

export default async function handler(req, res) {
  // 1.  READ ------------------------------------------------------------------
  if (req.method === 'GET') {
    const url = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${FILE}`;
    const gh  = await fetch(url, { headers: { Authorization: `token ${PAT}` }});
    if (!gh.ok) return res.status(gh.status).json({ error: gh.statusText });

    const { content, sha } = await gh.json();
    const json = JSON.parse(Buffer.from(content, 'base64').toString());
    return res.json({ data: json, sha });   // send SHA so caller can write back
  }

  // 2.  WRITE -----------------------------------------------------------------
  if (req.method === 'PUT') {
    const { data, sha, message = 'update via api' } = req.body;
    const content = Buffer.from(JSON.stringify(data, null, 2)).toString('base64');

    const body = { message, content, sha };   // sha = mandatory for update
    const url  = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${FILE}`;
    const gh   = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `token ${PAT}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    if (!gh.ok) return res.status(gh.status).json({ error: gh.statusText });

    return res.json({ ok: true });
  }
  res.status(405).end();
}