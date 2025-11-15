// api/github-data.js  (fixed & complete)
const OWNER = 'freejasper';
const REPO  = 'engagement-invite-list';
const FILE  = 'data.json';
const PAT   = process.env.GITHUB_PAT;

export default async function handler(req, res) {
   console.log("PAT present?", !!process.env.GITHUB_PAT);

  if (req.method === 'GET') {
    const url = `https://api.github.com/repos/${OWNER}/${REPO}/contents/contents/${FILE}`;
    const gh  = await fetch(url, { headers: { Authorization: `Bearer ${PAT}`, Accept: "application/vnd.github+json" }});
    if (!gh.ok) return res.status(gh.status).json({ error: gh.statusText });

    const { content, sha } = await gh.json();
    const json = JSON.parse(Buffer.from(content, 'base64').toString());
    return res.json({ data: json, sha });
  }

  if (req.method === 'PUT') {
    const { data, sha, message = 'web update' } = req.body;
    const content = Buffer.from(JSON.stringify(data, null, 2)).toString('base64');

    const body = { message, content, sha };
    const url  = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${FILE}`;
    const gh   = await fetch(url, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${PAT}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    if (!gh.ok) return res.status(gh.status).json({ error: gh.statusText });

    const reply = await gh.json();
    return res.json({ ok: true, sha: reply.content.sha });
  }
  res.status(405).json({ error: 'method not allowed' });
}