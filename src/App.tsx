import './index.css'
import { useState } from 'react'
import type { ReactNode } from 'react'


function CodeBlock({ children }: { children: string }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(children).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }
  return (
    <div className="code-wrap">
      <pre className="code-block">{children}</pre>
      <button className={`copy-btn${copied ? ' copied' : ''}`} onClick={copy} title="Copy">
        {copied ? (
          <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor">
            <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z"/>
          </svg>
        ) : (
          <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor">
            <path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"/>
            <path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"/>
          </svg>
        )}
        {copied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  )
}

function InlineCode({ c }: { c: ReactNode }) {
  return <code className="inline-code">{c}</code>
}


function SecH({ id, num, emoji, title }: { id: string; num: number; emoji: string; title: string }) {
  return (
    <h2 className="sec-heading" id={id}>
      <a className="anchor-icon" href={`#${id}`} aria-hidden="true">🔗</a>
      {num}. {emoji} {title}
    </h2>
  )
}


function SecBadges({ group, count, color }: { group: string; count: number; color: string }) {
  return (
    <div className="sec-badges">
      <span className="sec-badge-group">
        <span className="badge-label">Group</span>
        <span className="badge-val" style={{ background: '#FF6B00' }}>{group}</span>
      </span>
      <span className="sec-badge-group">
        <span className="badge-label">Endpoints</span>
        <span className="badge-val" style={{ background: color }}>{count}</span>
      </span>
    </div>
  )
}


function EpH({ method, path, title }: { method: 'GET' | 'POST'; path: string; title?: string }) {
  return (
    <h3 className="ep-heading">
      <a className="anchor-icon" href="#" aria-hidden="true">🔗</a>
      <span className={method === 'GET' ? 'method-get' : 'method-post'}>{method}</span>
      <span className="ep-path">{path}</span>
      {title && <><span className="ep-title-sep">—</span><span className="ep-title-name">{title}</span></>}
    </h3>
  )
}


interface Param { name: string; type: string; required: '✅' | '❌' | '⚡'; description: string; values?: string; default?: string }
function ParamTable({ params, ext }: { params: Param[]; ext?: boolean }) {
  return (
    <div className="table-wrap">
      <table className="param-table">
        <thead>
          <tr>
            <th>Parameter</th><th>Type</th><th style={{ textAlign: 'center' }}>Required</th>
            {ext && <th>Values</th>}{ext && <th>Default</th>}
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {params.map((p, i) => (
            <tr key={i}>
              <td><span className="p-name">{p.name}</span></td>
              <td><span className="p-type">{p.type}</span></td>
              <td style={{ textAlign: 'center' }}>
                <span className={p.required === '✅' ? 'req-yes' : p.required === '⚡' ? 'req-alt' : 'req-no'}>{p.required}</span>
              </td>
              {ext && <td style={{ color: 'var(--muted)', fontSize: 11, fontFamily: 'var(--mono)' }}>{p.values ?? '—'}</td>}
              {ext && <td style={{ color: 'var(--muted)', fontSize: 11, fontFamily: 'var(--mono)' }}>{p.default ?? '—'}</td>}
              <td style={{ color: 'var(--muted)', fontSize: 13 }}>{p.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Coll({ title, children }: { title: string; children: ReactNode }) {
  const [o, setO] = useState(false)
  return (
    <details className="coll" open={o} onToggle={e => setO((e.target as HTMLDetailsElement).open)}>
      <summary>{title}</summary>
      <div className="coll-body">{children}</div>
    </details>
  )
}


function TableOfContents() {
  const cards = [
    { href: '#s1', emoji: '🔑', name: 'Access To JWT',  route: '/accesstojwt',   badge: '2-endpoints-FF6B00' },
    { href: '#s2', emoji: '🎽', name: 'Add Item',        route: '/additem',        badge: '1-endpoint-8250df' },
    { href: '#s3', emoji: '🚫', name: 'Ban Check',       route: '/bancheck',       badge: '1-endpoint-cf222e' },
    { href: '#s4', emoji: '🔗', name: 'Bind Tools',      route: '/bind',           badge: '4-endpoints-0969da' },
    { href: '#s5', emoji: '🖼️', name: 'Banner',          route: '/banner',         badge: '1-endpoint-FF6B00' },
    { href: '#s6', emoji: '🎫', name: 'EAT To JWT',      route: '/eattojwt',       badge: '1-endpoint-1a7f37' },
    { href: '#s7', emoji: '👤', name: 'Free Fire Info',  route: '/freefireinfo',   badge: '2-endpoints-1a7f37', free: true },
    { href: '#s8', emoji: '👥', name: 'Friends',         route: '/friends',        badge: '6-endpoints-0969da' },
    { href: '#s9', emoji: '🏰', name: 'Guild',           route: '/guild',          badge: '4-endpoints-FF6B00' },
    { href: '#s10', emoji: '🔓', name: 'JWT Decode',     route: '/jwttokendecode', badge: '1-endpoint-8250df' },
    { href: '#s11', emoji: '✏️', name: 'Long Bio',       route: '/longbio',        badge: '1-endpoint-FF6B00' },
    { href: '#s12', emoji: '🏷️', name: 'Name Changer',  route: '/namechanger',    badge: '1-endpoint-0969da' },
    { href: '#s13', emoji: '👗', name: 'Outfits',        route: '/outfits',        badge: '1-endpoint-FF6B00' },
    { href: '#s14', emoji: '🗺️', name: 'Craftlands',    route: '/craftlands',     badge: '2-endpoints-1a7f37' },
  ]
  const rows: (typeof cards)[] = []
  for (let i = 0; i < cards.length; i += 3) rows.push(cards.slice(i, i + 3))

  const nav = [
    { href: '#s-base', emoji: '🌐', label: 'Base URL & Auth' },
    { href: '#s-groups', emoji: '📋', label: 'All Groups' },
    { href: '#s-regions', emoji: '🌍', label: 'Regions' },
    { href: '#s-errors', emoji: '⚠️', label: 'Errors' },
    { href: '#s-contact', emoji: '📞', label: 'Contact' },
  ]

  return (
    <div className="toc-box">
      <div className="toc-box-header">
        <h2>📑 Table of Contents</h2>
        <span>Click any card to jump</span>
      </div>
      <div className="toc-box-body">
        <table className="toc-table">
          <tbody>
            {rows.map((row, ri) => (
              <tr key={ri}>
                {row.map(c => (
                  <td key={c.href}>
                    <a href={c.href}>
                      <span className="toc-emoji">{c.emoji}</span>
                      <span className="toc-card-name">
                        {c.name}
                        {c.free && <> <span style={{ fontSize: 10, background: '#dafbe1', color: '#1a7f37', borderRadius: 10, padding: '1px 5px', border: '1px solid #a8e7c3', fontWeight: 700 }}>FREE</span></>}
                      </span>
                      <span className="toc-card-route">{c.route}</span>
                      <img src={`https://img.shields.io/badge/${c.badge}?style=flat-square`} alt="" height={16} style={{ marginTop: 2 }} />
                    </a>
                  </td>
                ))}
                {row.length < 3 && Array.from({ length: 3 - row.length }).map((_, i) => <td key={i} />)}
              </tr>
            ))}
          </tbody>
        </table>
        <table className="toc-nav-table">
          <tbody>
            <tr>
              {nav.map(n => (
                <td key={n.href}>
                  <a href={n.href}>
                    <span className="nav-emoji">{n.emoji}</span>
                    <span>{n.label}</span>
                  </a>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}



function S1() {
  return (
    <section id="s1">
      <SecH id="s1" num={1} emoji="🔑" title="Access To JWT" />
      <SecBadges group="/accesstojwt" count={2} color="#8250df" />
      <div className="desc-block">Generates a Free Fire <b>JWT Bearer Token</b> from a Garena Access Token or UID/Password combo.</div>

      <EpH method="GET" path="/accesstojwt/token" title="JWT Token Generate" />
      <div className="sub-method">▸ Method 1: Via Access Token</div>
      <CodeBlock>{`GET /accesstojwt/token?access_token=YOUR_ACCESS_TOKEN&key=YOUR_KEY`}</CodeBlock>
      <ParamTable params={[
        { name: 'access_token', type: 'string', required: '✅', description: 'Garena OAuth Access Token' },
        { name: 'key', type: 'string', required: '✅', description: 'Your API Key' },
      ]} />
      <div className="sub-method">▸ Method 2: Via UID + Password</div>
      <CodeBlock>{`GET /accesstojwt/token?uid=4147917569&password=8415C426BBE3371DADD82F5B&key=YOUR_KEY`}</CodeBlock>
      <ParamTable params={[
        { name: 'uid', type: 'string', required: '✅', description: 'Free Fire Guest UID' },
        { name: 'password', type: 'string', required: '✅', description: 'Account Password (hex format)' },
        { name: 'key', type: 'string', required: '✅', description: 'Your API Key' },
      ]} />
      <Coll title="✅ Success / ❌ Error Responses">
        <CodeBlock>{`// ✅ Access-Token Method
{
  "success": true,
  "region": "BD",
  "BearerAuth": "eyJhbGciOiJSUzI1NiIs...",
  "uid": "2579249340"
}

// ✅ UID+Password Method
{
  "region": "BD",
  "token": "eyJ...JWT...",
  "token_access": "eyJ...AccessToken...",
  "uid": "4147917569"
}

// ❌ Error — Invalid Token
{
  "success": false,
  "error": "INVALID_TOKEN",
  "message": "AccessToken invalid."
}

// ❌ Error — Wrong Platform
{
  "success": false,
  "error": "INVALID_PLATFORM",
  "message": "Account registered on another platform"
}`}</CodeBlock>
      </Coll>

      <EpH method="GET" path="/accesstojwt/get_jwt" title="Return JWT Only" />
      <CodeBlock>{`GET /accesstojwt/get_jwt?access_token=YOUR_ACCESS_TOKEN&key=YOUR_KEY
GET /accesstojwt/get_jwt?guest_uid=UID&guest_password=PASSWORD&key=YOUR_KEY`}</CodeBlock>
      <ParamTable params={[
        { name: 'access_token', type: 'string', required: '⚡', description: 'Garena Access Token' },
        { name: 'guest_uid', type: 'string', required: '⚡', description: 'Guest UID (alternative auth)' },
        { name: 'guest_password', type: 'string', required: '⚡', description: 'Guest Password' },
        { name: 'key', type: 'string', required: '✅', description: 'Your API Key' },
      ]} />
      <Coll title="✅ Success / ❌ Error Responses">
        <CodeBlock>{`// ✅ Success
{
  "success": true,
  "BearerAuth": "eyJhbGciOiJSUzI1NiIs..."
}

// ❌ Error — Banned / Unregistered
{
  "success": false,
  "message": "unregistered or banned account."
}

// ❌ Error — Missing Parameters
{
  "success": false,
  "message": "missing access_token (or guest_uid + guest_password)"
}`}</CodeBlock>
      </Coll>
    </section>
  )
}

function S2() {
  return (
    <section id="s2">
      <SecH id="s2" num={2} emoji="🎽" title="Add Item" />
      <SecBadges group="/additem" count={1} color="#8250df" />
      <div className="desc-block">Equips items on a Free Fire account (outfit, gun skin, vehicle skin, vault items, etc.).</div>
      <EpH method="GET" path="/additem/additem" title="Equip Item" />
      <CodeBlock>{`GET /additem/additem?items=211050001,214050001,208050001&jwt=YOUR_JWT&key=YOUR_KEY`}</CodeBlock>
      <ParamTable params={[
        { name: 'items', type: 'string', required: '✅', description: 'Comma-separated item IDs' },
        { name: 'jwt', type: 'string', required: '✅', description: 'Free Fire JWT Bearer Token' },
        { name: 'key', type: 'string', required: '✅', description: 'Your API Key' },
      ]} />
      <Coll title="✅ Success / ❌ Error Responses">
        <CodeBlock>{`// ✅ Success
{
  "status": "success",
  "message": "Items added successfully!",
  "items_count": 3
}

// ❌ Error — Missing Parameter
{
  "status": "error",
  "message": "Missing 'items' parameter."
}

// ❌ Error — Unauthorized
{
  "status": "error",
  "message": "Failed to add items",
  "status_code": 401
}`}</CodeBlock>
      </Coll>
    </section>
  )
}

function S3() {
  return (
    <section id="s3">
      <SecH id="s3" num={3} emoji="🚫" title="Ban Check" />
      <SecBadges group="/bancheck" count={1} color="#cf222e" />
      <div className="desc-block">Checks the ban status of a Free Fire player by UID.</div>
      <EpH method="GET" path="/bancheck/bancheck" title="Check Ban Status" />
      <CodeBlock>{`GET /bancheck/bancheck?uid=2579249340&key=YOUR_KEY`}</CodeBlock>
      <ParamTable params={[
        { name: 'uid', type: 'string', required: '✅', description: 'Free Fire Player UID' },
        { name: 'key', type: 'string', required: '✅', description: 'Your API Key' },
      ]} />
      <Coll title="✅ Success / ❌ Error Responses">
        <CodeBlock>{`// ✅ Not Banned
{
  "nickname": "SiamBhau",
  "region": "BD",
  "ban_status": "Not banned",
  "ban_period": null
}

// ✅ Banned
{
  "nickname": "HackerXYZ",
  "region": "IND",
  "ban_status": "Banned for 3 months",
  "ban_period": "3 months"
}

// ❌ Error — Not Found
{
  "error": "ID NOT FOUND"
}

// ❌ Error — Missing UID
{
  "error": "UID parameter is required"
}`}</CodeBlock>
      </Coll>
    </section>
  )
}

function S4() {
  return (
    <section id="s4">
      <SecH id="s4" num={4} emoji="🔗" title="Bind Tools" />
      <SecBadges group="/bind" count={4} color="#0969da" />
      <div className="desc-block">Complete email bind toolkit — view bind info, change bound email (5-step OTP flow), unbind email (3-step), or cancel a pending bind request.</div>

      <EpH method="GET" path="/bind/bind_info" title="View Email Bind Info" />
      <CodeBlock>{`GET /bind/bind_info?access_token=YOUR_ACCESS_TOKEN&key=YOUR_KEY`}</CodeBlock>
      <ParamTable params={[
        { name: 'access_token', type: 'string', required: '✅', description: 'Garena OAuth Access Token' },
        { name: 'key', type: 'string', required: '✅', description: 'Your API Key' },
      ]} />
      <Coll title="✅ Success Responses">
        <CodeBlock>{`// ✅ Email Confirmed
{
  "status": "success",
  "data": {
    "current_email": "siamxus69@gmail.com"
  },
  "summary": "Email confirmed"
}

// ✅ Pending Email Change
{
  "status": "success",
  "data": {
    "pending_email": "newmail@gmail.com",
    "countdown_human": "1 Day 0 Hour"
  }
}

// ✅ No Email Set
{
  "status": "success",
  "data": {
    "current_email": "",
    "pending_email": ""
  },
  "summary": "No recovery email set"
}`}</CodeBlock>
      </Coll>

      <EpH method="POST" path="/bind/changebind" title="Change Bound Email — 5-Step OTP Flow" />
      <CodeBlock>{`POST /bind/changebind?key=YOUR_KEY
Content-Type: application/json`}</CodeBlock>
      <div className="table-wrap">
        <table className="step-table">
          <thead><tr><th>Step</th><th>Required Body</th><th>Returns</th></tr></thead>
          <tbody>
            {[
              ['1', 'access_token, old_email, step:1', 'OTP sent to old email'],
              ['2', 'access_token, old_email, otp_old, step:2', 'identity_token'],
              ['3', 'access_token, new_email, step:3', 'OTP sent to new email'],
              ['4', 'access_token, new_email, otp_new, step:4', 'verifier_token'],
              ['5', 'access_token, new_email, identity_token, verifier_token, step:5', '✅ Email change submitted'],
            ].map(([s, b, r]) => (
              <tr key={s}><td>{s}</td><td style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--muted)' }}>{b}</td><td style={{ fontSize: 12, color: 'var(--muted)' }}>{r}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
      <Coll title="✅ Success / ❌ Error Responses">
        <CodeBlock>{`// ✅ Step 1 — OTP Sent
{
  "success": true,
  "step": 1,
  "message": "OTP sent to old@gmail.com"
}

// ✅ Step 5 — Email Changed
{
  "success": true,
  "step": 5,
  "message": "Email change request submitted successfully!"
}

// ❌ Error — Missing Token
{
  "success": false,
  "error": "access_token is required"
}`}</CodeBlock>
      </Coll>

      <EpH method="POST" path="/bind/unbind" title="Unbind Email — 3-Step Flow" />
      <CodeBlock>{`POST /bind/unbind?key=YOUR_KEY
Content-Type: application/json`}</CodeBlock>
      <div className="table-wrap">
        <table className="step-table">
          <thead><tr><th>Step</th><th>Required Body</th><th>Returns</th></tr></thead>
          <tbody>
            {[
              ['1', 'access_token, email, step:1', 'OTP sent to email'],
              ['2', 'access_token, email, otp, step:2', 'identity_token'],
              ['3', 'access_token, identity_token, step:3', '✅ Unbind submitted'],
            ].map(([s, b, r]) => (
              <tr key={s}><td>{s}</td><td style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--muted)' }}>{b}</td><td style={{ fontSize: 12, color: 'var(--muted)' }}>{r}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
      <Coll title="✅ Success / ❌ Error Responses">
        <CodeBlock>{`// ✅ Step 3 — Unbind Submitted
{
  "success": true,
  "step": 3,
  "message": "Unbind request created successfully!"
}

// ❌ Error — Invalid Step
{
  "success": false,
  "error": "step must be 1 to 3"
}`}</CodeBlock>
      </Coll>

      <EpH method="POST" path="/bind/cancelbind" title="Cancel Pending Bind Request" />
      <CodeBlock>{`POST /bind/cancelbind?key=YOUR_KEY
Content-Type: application/json

{
  "access_token": "YOUR_TOKEN"
}`}</CodeBlock>
      <Coll title="✅ Success / ❌ Error Responses">
        <CodeBlock>{`// ✅ Success
{
  "success": true,
  "message": "Bind cancelled successfully!"
}

// ❌ Error — Missing Token
{
  "success": false,
  "error": "access_token is required"
}`}</CodeBlock>
      </Coll>
    </section>
  )
}

function S5() {
  return (
    <section id="s5">
      <SecH id="s5" num={5} emoji="🖼️" title="Banner" />
      <SecBadges group="/banner" count={1} color="#FF6B00" />
      <div className="desc-block">Generates a Free Fire <b>player profile banner</b> as a PNG image — Avatar, Banner, Guild Name, Level.</div>
      <EpH method="GET" path="/banner/profile" title="Generate Profile Banner" />
      <CodeBlock>{`GET /banner/profile?uid=2579249340&region=BD&key=YOUR_KEY`}</CodeBlock>
      <ParamTable params={[
        { name: 'uid', type: 'string', required: '✅', description: 'Free Fire Player UID' },
        { name: 'region', type: 'string', required: '❌', description: 'Server Region Code (default: BD)' },
        { name: 'key', type: 'string', required: '✅', description: 'Your API Key' },
      ]} />
      <Coll title="✅ Success / ❌ Error Responses">
        <CodeBlock>{`// ✅ Success — Image Response
HTTP 200 OK  |  Content-Type: image/png
[PNG Binary — Player Banner with Avatar + Name + Guild + Level]
// Use as: <img src="API_URL" />

// ❌ Error — Missing UID
{
  "error": "UID required"
}

// ❌ Error — Generation Failed
{
  "error": "Failed to generate banner"
}`}</CodeBlock>
      </Coll>
    </section>
  )
}

function S6() {
  return (
    <section id="s6">
      <SecH id="s6" num={6} emoji="🎫" title="EAT To JWT" />
      <SecBadges group="/eattojwt" count={1} color="#1a7f37" />
      <div className="desc-block">Decodes a Free Fire <b>EAT (External Access Token)</b> to extract account info and Garena Access Token.</div>
      <EpH method="GET" path="/eattojwt/eat" title="EAT Token Decode" />
      <CodeBlock>{`GET /eattojwt/eat?eat_token=YOUR_EAT_TOKEN&key=YOUR_KEY`}</CodeBlock>
      <ParamTable params={[
        { name: 'eat_token', type: 'string', required: '✅', description: 'Free Fire EAT Token' },
        { name: 'key', type: 'string', required: '✅', description: 'Your API Key' },
      ]} />
      <Coll title="✅ Success / ❌ Error Responses">
        <CodeBlock>{`// ✅ Success
{
  "status": "success",
  "account_id": "2579249340",
  "account_nickname": "SiamBhau",
  "open_id": "abc123def456ghi789",
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "region": "BD"
}

// ❌ Error — Expired Token
{
  "error": "Invalid access token or session expired"
}

// ❌ Error — Missing Parameter
{
  "error": "eat_token parameter is required"
}`}</CodeBlock>
      </Coll>
    </section>
  )
}

function S7() {
  return (
    <section id="s7">
      <SecH id="s7" num={7} emoji="👤" title="Free Fire Info" />
      <div className="sec-badges">
        <span className="sec-badge-group"><span className="badge-label">Group</span><span className="badge-val" style={{ background: '#FF6B00' }}>/freefireinfo</span></span>
        <span className="sec-badge-group"><span className="badge-label">Endpoints</span><span className="badge-val" style={{ background: '#1a7f37' }}>2</span></span>
        <span className="sec-badge-group"><span className="badge-label">✨</span><span className="badge-val" style={{ background: '#1a7f37' }}>FREE TIER</span></span>
      </div>
      <div className="desc-block"><b>✨ This group is FREE</b> — request a complimentary key on Telegram. Returns complete profile info and game stats for Free Fire accounts.</div>

      <EpH method="GET" path="/freefireinfo/bhau" title="Full Player Profile" />
      <CodeBlock>{`GET /freefireinfo/bhau?uid=2579249340&region=BD&key=YOUR_KEY`}</CodeBlock>
      <ParamTable params={[
        { name: 'uid', type: 'string', required: '✅', description: 'Free Fire Player UID' },
        { name: 'region', type: 'string', required: '✅', description: 'Server Region (BD, IND, SG…)' },
        { name: 'key', type: 'string', required: '✅', description: 'Your API Key' },
      ]} />
      <Coll title="✅ Full Success Response">
        <CodeBlock>{`{
  "basicInfo": {
    "accountId": "2579249340",
    "accountType": 1,
    "nickname": "SiamBhau⸙",
    "region": "BD",
    "level": 68,
    "exp": 2464867,
    "bannerId": 901000011,
    "headPic": 902028017,
    "rank": 318,
    "rankingPoints": 3097,
    "badgeCnt": 8,
    "badgeId": 1001000096,
    "seasonId": 51,
    "liked": 61695,
    "lastLoginAt": "1777636197",
    "csRank": 322,
    "csRankingPoints": 117,
    "weaponSkinShows": [
      907193902,
      912037001
    ],
    "pinId": 910000009,
    "maxRank": 318,
    "csMaxRank": 322,
    "accountPrefers": {},
    "createAt": "1606659627",
    "title": 904090025,
    "externalIconInfo": {
      "status": "ExternalIconStatus_NOT_IN_USE",
      "showType": "ExternalIconShowType_FRIEND"
    },
    "releaseVersion": "OB53",
    "showBrRank": true,
    "showCsRank": true,
    "socialHighLightsWithBasicInfo": {},
    "primeInfo": {
      "primeLevel": 1
    }
  },
  "profileInfo": {
    "avatarId": 102000022,
    "skinColor": 50,
    "clothes": [
      205000051,
      211000579,
      214000022,
      211001035,
      203001159,
      204000581
    ],
    "equipedSkills": [
      16,
      3406,
      8,
      1,
      16,
      1806,
      8,
      2,
      16,
      4306,
      8,
      3,
      16,
      706
    ],
    "isSelected": true,
    "isSelectedAwaken": true,
    "unlockType": "UnlockType_LINK",
    "unlockTime": 1650796023,
    "isMarkedStar": true
  },
  "clanBasicInfo": {
    "clanId": "3048889605",
    "clanName": "Jᴜɴɪᴏʀ.Exper",
    "captainId": "6201276150",
    "clanLevel": 1,
    "capacity": 45,
    "memberNum": 32
  },
  "captainBasicInfo": {
    "accountId": "6201276150",
    "accountType": 1,
    "nickname": "সিয়ামভাই10k",
    "region": "BD",
    "level": 34,
    "exp": 68014,
    "bannerId": 901041021,
    "headPic": 902041014,
    "rank": 301,
    "rankingPoints": 1000,
    "badgeId": 1001000096,
    "seasonId": 51,
    "liked": 14028,
    "lastLoginAt": "1772468427",
    "csRank": 301,
    "weaponSkinShows": [
      907102812
    ],
    "pinId": 910040001,
    "maxRank": 301,
    "csMaxRank": 301,
    "accountPrefers": {},
    "createAt": "1651754222",
    "title": 904090015,
    "externalIconInfo": {
      "status": "ExternalIconStatus_NOT_IN_USE",
      "showType": "ExternalIconShowType_FRIEND"
    },
    "releaseVersion": "OB52",
    "socialHighLightsWithBasicInfo": {},
    "primeInfo": {}
  },
  "petInfo": {
    "id": 1300000126,
    "level": 4,
    "exp": 541,
    "isSelected": true,
    "skinId": 1310000262,
    "selectedSkillId": 1315000001,
    "isMarkedStar": true
  },
  "socialInfo": {
    "accountId": "2579249340",
    "gender": "Gender_MALE",
    "language": "Language_EN",
    "signature": "[b][c][FFFFFF] New Player Gonab :(",
    "rankShow": "RankShow_BR"
  },
  "diamondCostRes": {
    "diamondCost": 390
  },
  "creditScoreInfo": {
    "creditScore": 100,
    "rewardState": "REWARD_STATE_UNCLAIMED",
    "periodicSummaryEndTime": "1777586454"
  },
  "Owner": {
    "Owner": "SiamBhau",
    "Telegram": "t.me/SiamBhau"
  }
}`}</CodeBlock>
      </Coll>
      <Coll title="❌ Error Responses">
        <CodeBlock>{`// ❌ Error — Invalid UID or Region
{
  "error": "Invalid UID or Region. Please check and try again."
}

// ❌ Error — Missing UID
{
  "error": "Please provide UID."
}

// ❌ Error — Missing Region
{
  "error": "Please provide REGION."
}`}</CodeBlock>
      </Coll>

      <EpH method="GET" path="/freefireinfo/stats" title="Player Game Stats" />
      <CodeBlock>{`GET /freefireinfo/stats?uid=2579249340&region=BD&key=YOUR_KEY
GET /freefireinfo/stats?uid=2579249340&region=BD&gamemode=br&matchmode=RANKED&key=YOUR_KEY
GET /freefireinfo/stats?uid=2579249340&region=BD&gamemode=cs&matchmode=RANKED&key=YOUR_KEY`}</CodeBlock>
      <ParamTable ext params={[
        { name: 'uid', type: 'string', required: '✅', values: '—', default: '—', description: 'Free Fire Player UID' },
        { name: 'region', type: 'string', required: '✅', values: 'Region codes', default: '—', description: 'Server Region' },
        { name: 'gamemode', type: 'string', required: '❌', values: 'br, cs', default: 'br', description: 'Battle Royale or Clash Squad' },
        { name: 'matchmode', type: 'string', required: '❌', values: 'CAREER, NORMAL, RANKED', default: 'CAREER', description: 'Match type' },
        { name: 'key', type: 'string', required: '✅', values: '—', default: '—', description: 'Your API Key' },
      ]} />
      <Coll title="✅ BR / CS Stats Responses">
        <CodeBlock>{`// ✅ BR Career Stats
{
  "success": true,
  "uid": "2579249340",
  "region": "BD",
  "gamemode": "br",
  "stats": {
    "rankingPoints": 4200,
    "kills": 15800,
    "headshots": 6200,
    "winRate": 28,
    "kd": 4.21
  }
}

// ✅ CS Ranked Stats
{
  "success": true,
  "uid": "2579249340",
  "region": "BD",
  "gamemode": "cs",
  "stats": {
    "rankingPoints": 3100,
    "kills": 8700,
    "winRate": 58,
    "mvp": 420
  }
}`}</CodeBlock>
      </Coll>
    </section>
  )
}

function S8() {
  return (
    <section id="s8">
      <SecH id="s8" num={8} emoji="👥" title="Friends" />
      <SecBadges group="/friends" count={6} color="#0969da" />
      <div className="desc-block">Complete friend management — add/remove, list friends, star/unstar, set/remove aliases.</div>

      <EpH method="GET" path="/friends/friend_action" title="Add / Remove Friend" />
      <CodeBlock>{`GET /friends/friend_action?jwt=YOUR_JWT&uid=TARGET_UID&action=add&key=YOUR_KEY
GET /friends/friend_action?jwt=YOUR_JWT&uid=TARGET_UID&action=remove&key=YOUR_KEY`}</CodeBlock>
      <ParamTable params={[
        { name: 'jwt', type: 'string', required: '✅', description: 'Free Fire JWT Bearer Token' },
        { name: 'uid', type: 'string', required: '✅', description: 'Target player UID' },
        { name: 'action', type: 'string', required: '✅', description: '"add" or "remove"' },
        { name: 'key', type: 'string', required: '✅', description: 'Your API Key' },
      ]} />
      <Coll title="✅ Success / ❌ Error Responses">
        <CodeBlock>{`// ✅ Friend Request Sent
{
  "message": "Friend Request Sent Successfully",
  "response_status": 200
}

// ✅ Friend Removed
{
  "message": "Friend Removed Successfully",
  "response_status": 200
}

// ❌ Error — Already Friend
{
  "message": "Action Failed: ALREADY_FRIEND"
}`}</CodeBlock>
      </Coll>

      <EpH method="GET" path="/friends/list" title="Full Friends List" />
      <CodeBlock>{`GET /friends/list?jwt=YOUR_JWT&key=YOUR_KEY`}</CodeBlock>
      <ParamTable params={[
        { name: 'jwt', type: 'string', required: '✅', description: 'Free Fire JWT Bearer Token' },
        { name: 'key', type: 'string', required: '✅', description: 'Your API Key (with friendslist access)' },
      ]} />
      <Coll title="✅ Success Response">
        <CodeBlock>{`// ✅ Success
{
  "success": true,
  "friends_count": 5,
  "friends_list": [
    {
      "nickname": "ProGamer01",
      "user_id": "1234567890"
    },
    {
      "nickname": "SnipeKing",
      "user_id": "9876543210"
    }
  ]
}`}</CodeBlock>
      </Coll>

      <EpH method="GET" path="/friends/addstar" title="⭐ Star a Friend" />
      <CodeBlock>{`GET /friends/addstar?jwt=YOUR_JWT&uid=TARGET_UID&key=YOUR_KEY`}</CodeBlock>
      <ParamTable params={[
        { name: 'jwt', type: 'string', required: '✅', description: 'Your JWT Token' },
        { name: 'uid', type: 'string', required: '✅', description: "Friend's UID to star" },
        { name: 'key', type: 'string', required: '✅', description: 'Your API Key' },
      ]} />
      <Coll title="✅ Success / ❌ Error Responses">
        <CodeBlock>{`// ✅ Success
{
  "status": "success",
  "message": "UID 1234567890 successfully starred ⭐"
}

// ❌ Error — Invalid UID
{
  "error": "uid parameter is required and must be a number"
}`}</CodeBlock>
      </Coll>

      <EpH method="GET" path="/friends/removestar" title="Unstar a Friend" />
      <CodeBlock>{`GET /friends/removestar?jwt=YOUR_JWT&uid=TARGET_UID&key=YOUR_KEY`}</CodeBlock>
      <ParamTable params={[
        { name: 'jwt', type: 'string', required: '✅', description: 'Your JWT Token' },
        { name: 'uid', type: 'string', required: '✅', description: "Friend's UID to unstar" },
        { name: 'key', type: 'string', required: '✅', description: 'Your API Key' },
      ]} />
      <Coll title="✅ Success Response">
        <CodeBlock>{`// ✅ Success
{
  "status": "success",
  "message": "UID 1234567890 successfully unstarred ✅"
}`}</CodeBlock>
      </Coll>

      <EpH method="GET" path="/friends/setalias" title="Set Friend Alias" />
      <CodeBlock>{`GET /friends/setalias?jwt=YOUR_JWT&uid=TARGET_UID&alias=BestBro&key=YOUR_KEY`}</CodeBlock>
      <ParamTable params={[
        { name: 'jwt', type: 'string', required: '✅', description: 'Your JWT Token' },
        { name: 'uid', type: 'string', required: '✅', description: "Friend's UID" },
        { name: 'alias', type: 'string', required: '✅', description: 'New alias (max 12 chars)' },
        { name: 'key', type: 'string', required: '✅', description: 'Your API Key' },
      ]} />
      <Coll title="✅ Success / ❌ Error Responses">
        <CodeBlock>{`// ✅ Success
{
  "status": "success",
  "message": "Alias 'BestBro' set for UID 1234567890 ✅"
}

// ❌ Error — Alias Too Long
{
  "error": "Alias too long! Max 12 characters"
}`}</CodeBlock>
      </Coll>

      <EpH method="GET" path="/friends/removealias" title="Remove Friend Alias" />
      <CodeBlock>{`GET /friends/removealias?jwt=YOUR_JWT&uid=TARGET_UID&key=YOUR_KEY`}</CodeBlock>
      <ParamTable params={[
        { name: 'jwt', type: 'string', required: '✅', description: 'Your JWT Token' },
        { name: 'uid', type: 'string', required: '✅', description: "Friend's UID" },
        { name: 'key', type: 'string', required: '✅', description: 'Your API Key' },
      ]} />
      <Coll title="✅ Success Response">
        <CodeBlock>{`// ✅ Success
{
  "status": "success",
  "message": "Alias removed for UID 1234567890 ✅"
}`}</CodeBlock>
      </Coll>
    </section>
  )
}

function S9() {
  return (
    <section id="s9">
      <SecH id="s9" num={9} emoji="🏰" title="Guild" />
      <SecBadges group="/guild" count={4} color="#FF6B00" />
      <div className="desc-block">Complete guild/clan management — read guild info, join, leave, or <b>create a new guild</b> programmatically.</div>

      <EpH method="GET" path="/guild/info" title="Guild / Clan Information" />
      <CodeBlock>{`GET /guild/info?clan_id=3048889605&key=YOUR_KEY`}</CodeBlock>
      <ParamTable params={[
        { name: 'clan_id', type: 'string', required: '✅', description: 'Free Fire Guild/Clan ID' },
        { name: 'key', type: 'string', required: '✅', description: 'Your API Key (with guildinfo access)' },
      ]} />
      <Coll title="✅ Success Response">
        <CodeBlock>{`// ✅ Success
{
  "id": 3048889605,
  "clan_name": "BhauGuild",
  "level": 5,
  "region": "BD",
  "welcome_message": "Welcome to BhauGuild!",
  "score": 98500,
  "rank": 12,
  "guild_details": {
    "members_online": 8,
    "total_members": 30
  }
}`}</CodeBlock>
      </Coll>

      <EpH method="GET" path="/guild/join" title="Join a Guild" />
      <CodeBlock>{`GET /guild/join?clan_id=3048889605&jwt=YOUR_JWT&key=YOUR_KEY`}</CodeBlock>
      <ParamTable params={[
        { name: 'clan_id', type: 'string', required: '✅', description: 'Target Guild/Clan ID' },
        { name: 'jwt', type: 'string', required: '⚡', description: 'Your JWT (preferred)' },
        { name: 'uid + pass', type: 'string', required: '⚡', description: 'UID + Password (alternative)' },
        { name: 'key', type: 'string', required: '✅', description: 'Your API Key' },
      ]} />
      <Coll title="✅ Success / ❌ Error Responses">
        <CodeBlock>{`// ✅ Success
{
  "success": true,
  "action": "Join Guild",
  "clan_id": "3048889605",
  "uid": "2579249340"
}

// ❌ Error — Missing Clan ID
{
  "success": false,
  "error": "clan_id required"
}`}</CodeBlock>
      </Coll>

      <EpH method="GET" path="/guild/leave" title="Leave a Guild" />
      <CodeBlock>{`GET /guild/leave?clan_id=3048889605&jwt=YOUR_JWT&key=YOUR_KEY`}</CodeBlock>
      <ParamTable params={[
        { name: 'clan_id', type: 'string', required: '✅', description: 'Current Guild/Clan ID' },
        { name: 'jwt', type: 'string', required: '⚡', description: 'Your JWT' },
        { name: 'key', type: 'string', required: '✅', description: 'Your API Key' },
      ]} />
      <Coll title="✅ Success Response">
        <CodeBlock>{`// ✅ Success
{
  "success": true,
  "action": "Leave Guild",
  "clan_id": "3048889605",
  "uid": "2579249340"
}`}</CodeBlock>
      </Coll>

      <EpH method="POST" path="/guild/create" title="Create a New Guild" />
      <CodeBlock>{`POST /guild/create?key=YOUR_KEY
Authorization: Bearer YOUR_JWT
Content-Type: application/json

{
  "guild_name": "MyGuild",
  "slogan": "Best Guild BD",
  "payment": 1,
  "auto_approval": 2,
  "avatar": 10,
  "tags": [1, 4, 13],
  "min_level": 20
}`}</CodeBlock>
      <div className="table-wrap">
        <table className="param-table">
          <thead><tr><th>Body Field</th><th>Type</th><th style={{ textAlign: 'center' }}>Required</th><th>Allowed Values</th><th>Description</th></tr></thead>
          <tbody>
            {[
              ['guild_name','string','✅','—','Guild display name'],
              ['slogan','string','✅','—','Short slogan'],
              ['payment','integer','✅','1 (Coins) / 2 (Diamonds)','Payment currency'],
              ['auto_approval','integer','✅','1 (OFF) / 2 (ON)','Auto-approve members'],
              ['avatar','integer','✅','10 (Lion) / 11 (Wolf)','Guild avatar'],
              ['tags','array','✅','1–14 (must include 13 or 14)','Activity tags'],
              ['min_level','integer','❌','—','Minimum player level'],
            ].map(([f,t,r,v,d]) => (
              <tr key={String(f)}>
                <td><span className="p-name">{f}</span></td>
                <td><span className="p-type">{t}</span></td>
                <td style={{ textAlign: 'center' }}><span className={r === '✅' ? 'req-yes' : 'req-no'}>{r}</span></td>
                <td style={{ fontSize: 11, fontFamily: 'var(--mono)', color: 'var(--muted)' }}>{v}</td>
                <td style={{ fontSize: 13, color: 'var(--muted)' }}>{d}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Coll title="✅ Success / ❌ Error Responses">
        <CodeBlock>{`// ✅ Success
{
  "status": "success",
  "message": "Guild 'MyGuild' created successfully!",
  "guild_id": 3055551234
}

// ❌ Error — Missing Auth Header
{
  "error": "Authorization header required. Format: Bearer <jwt_token>"
}

// ❌ Error — Invalid Tags
{
  "error": "tags must include 13 (Casual) or 14 (Competition)"
}`}</CodeBlock>
      </Coll>
    </section>
  )
}

function S10() {
  return (
    <section id="s10">
      <SecH id="s10" num={10} emoji="🔓" title="JWT Decode" />
      <SecBadges group="/jwttokendecode" count={1} color="#8250df" />
      <div className="desc-block">Decodes a Free Fire JWT Bearer Token and exposes the full payload.</div>
      <EpH method="GET" path="/jwttokendecode/decode" title="Decode JWT" />
      <CodeBlock>{`GET /jwttokendecode/decode?token=YOUR_JWT_TOKEN&key=YOUR_KEY`}</CodeBlock>
      <ParamTable params={[
        { name: 'token', type: 'string', required: '✅', description: 'Free Fire JWT Bearer Token' },
        { name: 'key', type: 'string', required: '✅', description: 'Your API Key' },
      ]} />
      <Coll title="✅ Success / ❌ Error Responses">
        <CodeBlock>{`// ✅ Success
{
  "status": "success",
  "decoded": {
    "account_id": "2579249340",
    "nickname": "SiamBhau",
    "lock_region": "BD",
    "exp": "2026-05-29 13:11:47 UTC",
    "iss": "freefire-game-server"
  }
}

// ❌ Error — Missing Token
{
  "status": "error",
  "message": "Missing token parameter"
}

// ❌ Error — Expired Token
{
  "status": "error",
  "message": "Token has expired"
}`}</CodeBlock>
      </Coll>
    </section>
  )
}

function S11() {
  return (
    <section id="s11">
      <SecH id="s11" num={11} emoji="✏️" title="Long Bio" />
      <SecBadges group="/longbio" count={1} color="#FF6B00" />
      <div className="desc-block">Sets a bio that <b>exceeds the in-game character limit</b>. Supports 3 auth methods.</div>
      <EpH method="GET" path="/longbio/bio_upload" title="Upload Long Bio" />
      <div className="sub-method">▸ Method 1: Via JWT <em style={{ fontWeight: 400 }}>(fastest)</em></div>
      <CodeBlock>{`GET /longbio/bio_upload?bio=FF+Pro+Player+SiamBhau&jwt=YOUR_JWT&key=YOUR_KEY`}</CodeBlock>
      <div className="sub-method">▸ Method 2: Via UID + Password</div>
      <CodeBlock>{`GET /longbio/bio_upload?bio=BIO_TEXT&uid=YOUR_UID&pass=YOUR_PASS&key=YOUR_KEY`}</CodeBlock>
      <div className="sub-method">▸ Method 3: Via Access Token</div>
      <CodeBlock>{`GET /longbio/bio_upload?bio=BIO_TEXT&access=YOUR_ACCESS_TOKEN&key=YOUR_KEY`}</CodeBlock>
      <ParamTable params={[
        { name: 'bio', type: 'string', required: '✅', description: 'Bio text to set' },
        { name: 'jwt', type: 'string', required: '⚡', description: 'JWT — one of three auth methods' },
        { name: 'uid + pass', type: 'string', required: '⚡', description: 'UID + Password combo' },
        { name: 'access', type: 'string', required: '⚡', description: 'Garena Access Token' },
        { name: 'key', type: 'string', required: '✅', description: 'Your API Key' },
      ]} />
      <Coll title="✅ Success / ❌ Error Responses">
        <CodeBlock>{`// ✅ Success
{
  "Owner": "SiamBhau",
  "status": "Success",
  "login_method": "Direct JWT",
  "code": 200
}

// ❌ Error — Missing Bio
{
  "status": "Error",
  "code": 400,
  "error": "Missing 'bio' parameter"
}

// ❌ Error — Unauthorized
{
  "status": "Unauthorized (Invalid JWT)",
  "code": 401
}`}</CodeBlock>
      </Coll>
    </section>
  )
}

function S12() {
  return (
    <section id="s12">
      <SecH id="s12" num={12} emoji="🏷️" title="Name Changer" />
      <SecBadges group="/namechanger" count={1} color="#0969da" />
      <div className="desc-block">Changes the in-game name of a Free Fire account.</div>
      <EpH method="GET" path="/namechanger/name" title="Change In-Game Name" />
      <CodeBlock>{`GET /namechanger/name?token=YOUR_JWT&name=SiamBhau&key=YOUR_KEY`}</CodeBlock>
      <ParamTable params={[
        { name: 'token', type: 'string', required: '✅', description: 'Free Fire JWT Bearer Token' },
        { name: 'name', type: 'string', required: '✅', description: 'New in-game name' },
        { name: 'key', type: 'string', required: '✅', description: 'Your API Key' },
      ]} />
      <Coll title="✅ Success / ❌ Error Responses">
        <CodeBlock>{`// ✅ Success
{
  "Owner": "SiamBhau",
  "status": "success",
  "raw_content": "0a020801"
}

// ❌ Error — Name Already Used
{
  "Owner": "SiamBhau",
  "status": "failed",
  "text": "BR_NAME_ALREADY_USED"
}

// ❌ Error — Missing Parameters
{
  "error": "token and name are required"
}`}</CodeBlock>
      </Coll>
    </section>
  )
}

function S13() {
  return (
    <section id="s13">
      <SecH id="s13" num={13} emoji="👗" title="Outfits" />
      <SecBadges group="/outfits" count={1} color="#FF6B00" />
      <div className="desc-block">Renders a player's equipped outfit + character + weapon as a <b>1024 × 1024 PNG image</b>.</div>
      <EpH method="GET" path="/outfits/outfit" title="Generate Outfit Image" />
      <CodeBlock>{`GET /outfits/outfit?uid=2579249340&region=BD&key=YOUR_KEY`}</CodeBlock>
      <ParamTable ext params={[
        { name: 'uid', type: 'string', required: '✅', values: '—', default: '—', description: 'Free Fire Player UID' },
        { name: 'region', type: 'string', required: '❌', values: '—', default: 'BD', description: 'Server Region' },
        { name: 'key', type: 'string', required: '✅', values: '—', default: '—', description: 'Your API Key' },
      ]} />
      <Coll title="✅ Success / ❌ Error Responses">
        <CodeBlock>{`// ✅ Success — Image Response
HTTP 200 OK  |  Content-Type: image/png
[PNG Binary — 1024×1024px outfit image]
// Use as: <img src="API_URL" />

// ❌ Error — Missing UID
{
  "error": "uid parameter is required"
}

// ❌ Error — Fetch Failed
{
  "error": "Failed to fetch player info"
}`}</CodeBlock>
      </Coll>
    </section>
  )
}

function S14() {
  return (
    <section id="s14">
      <SecH id="s14" num={14} emoji="🗺️" title="Craftlands" />
      <SecBadges group="/craftlands" count={2} color="#1a7f37" />
      <div className="desc-block">Fetches Free Fire <b>Craftland custom map</b> information by map code.</div>

      <EpH method="GET" path="/craftlands/info" title="Craftland Map Info (Quick)" />
      <CodeBlock>{`GET /craftlands/info?map_code=ABC123&region=BD&lang=en&key=YOUR_KEY`}</CodeBlock>
      <ParamTable ext params={[
        { name: 'map_code', type: 'string', required: '✅', values: '—', default: '—', description: 'Craftland map code (with or without #)' },
        { name: 'region', type: 'string', required: '❌', values: '—', default: 'BD', description: 'Region code' },
        { name: 'lang', type: 'string', required: '❌', values: '—', default: 'en', description: 'Language code' },
        { name: 'key', type: 'string', required: '✅', values: '—', default: '—', description: 'Your API Key' },
      ]} />
      <Coll title="✅ Success Response">
        <CodeBlock>{`// ✅ Success
{
  "code": 0,
  "status": "success",
  "data": {
    "map_info": {
      "workshop_code": "#ABC123",
      "author_name": "MapMaker01",
      "map_name": "Sniper Arena",
      "like_count": 8420
    }
  }
}`}</CodeBlock>
      </Coll>

      <EpH method="GET" path="/craftlands/map_details" title="Full Craftland Map Details" />
      <div className="desc-block" style={{ marginBottom: 10 }}>Returns enriched map info — tags resolved to <b>human-readable names</b>, game-mode + template names, download links.</div>
      <CodeBlock>{`GET /craftlands/map_details?map_code=ABC123&region=BD&lang=en&key=YOUR_KEY`}</CodeBlock>
      <ParamTable ext params={[
        { name: 'map_code', type: 'string', required: '✅', values: '—', default: '—', description: 'Craftland map code' },
        { name: 'region', type: 'string', required: '❌', values: '—', default: 'BD', description: 'Region code' },
        { name: 'lang', type: 'string', required: '❌', values: '—', default: 'en', description: 'Language code' },
        { name: 'key', type: 'string', required: '✅', values: '—', default: '—', description: 'Your API Key' },
      ]} />
      <Coll title="✅ Success Response">
        <CodeBlock>{`// ✅ Success
{
  "code": 0,
  "status": "success",
  "data": {
    "basic_info": {
      "map_name": "Sniper Arena",
      "author": "MapMaker01"
    },
    "gameplay_info": {
      "game_mode": {
        "id": 12,
        "name": "Sniper Only"
      }
    },
    "tags": [
      { "id": 1, "name": "Action" },
      { "id": 4, "name": "PvP" }
    ],
    "social_info": {
      "subscribe_count": 15890,
      "like_count": 8420
    }
  }
}`}</CodeBlock>
      </Coll>
      <Coll title="❌ Error Responses">
        <CodeBlock>{`// ❌ Error — Missing Map Code
{
  "error": "map_code is required"
}

// ❌ Error — Not Found
{
  "error": "API returned status 404"
}`}</CodeBlock>
      </Coll>
    </section>
  )
}


export default function App() {
  return (
    <div className="readme-wrap">
      <div className="readme-body">

        {}
        <div style={{ marginLeft: -40, marginRight: -40, marginTop: -32, marginBottom: 0 }}>
          <img
            src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=220&section=header&text=Free%20Fire%20Centralized%20API&fontSize=44&fontColor=fff&animation=twinkling&fontAlignY=35&desc=Powerful%20Premium%20API%20by%20SiamBhau&descSize=18&descAlignY=55&descColor=FF6B00"
            width="100%" alt="Free Fire Centralized API" style={{ display: 'block' }}
          />
        </div>

        {}
        <div style={{ textAlign: 'center', margin: '18px 0 14px' }}>
          <img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=700&size=20&pause=800&color=FF6B00&center=true&vCenter=true&multiline=true&width=800&height=75&lines=Free+Fire+Centralized+API+System+v5.0;14+Groups+%E2%80%A2+29+Endpoints+%E2%80%A2+Player+Info+is+FREE+%F0%9F%92%8E" alt="Typing SVG" />
        </div>

        {}
        <div className="hero">
          <div className="hero-badges">
            <a href="http://siambhau69.eu.cc" target="_blank" rel="noreferrer">
              <img src="https://img.shields.io/badge/%F0%9F%9F%A2%20API-Online%20%26%20Running-00C851?style=for-the-badge&labelColor=222" alt="API Online" />
            </a>
            <a href="https://t.me/SiamBhau?text=https%3A%2F%2Fsiambhau69.eu.cc%0A%0AHi%20%40SiamBhau%20👋,%20I'd%20like%20to%20get%20a%20FREE%20API%20key%20for%20the%20Free%20Fire%20Info%20endpoints.%20Could%20you%20please%20activate%20one%20for%20me%3F%20🙏" target="_blank" rel="noreferrer">
              <img src="https://img.shields.io/badge/%E2%9C%A8%20Free%20Key-Free%20Fire%20Info-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white&labelColor=222" alt="Free Key" />
            </a>
            <a href="https://t.me/SiamBhau?text=https%3A%2F%2Fsiambhau69.eu.cc%0A%0AHi%20%40SiamBhau%20👋,%20I%20want%20to%20BUY%20a%20Premium%20API%20key%20for%20the%20Free%20Fire%20Centralized%20API.%20Please%20share%20your%20available%20plans,%20pricing%20%26%20payment%20methods.%20💎" target="_blank" rel="noreferrer">
              <img src="https://img.shields.io/badge/%F0%9F%92%8E%20Premium%20Key-Buy%20Now-FF6B00?style=for-the-badge&logo=telegram&logoColor=white&labelColor=222" alt="Premium Key" />
            </a>
          </div>
          <div className="hero-badges" style={{ marginTop: 6 }}>
            <img src="https://img.shields.io/badge/Version-5.0-FF6B00?style=for-the-badge&labelColor=222" alt="v5.0" />
            <img src="https://img.shields.io/badge/Game-Free%20Fire-FF0000?style=for-the-badge&logo=firefoxbrowser&logoColor=white&labelColor=222" alt="Free Fire" />
            <img src="https://img.shields.io/badge/Built%20With-Python%20Flask-3776AB?style=for-the-badge&logo=python&logoColor=white&labelColor=222" alt="Flask" />
            <img src="https://img.shields.io/badge/Groups-14-8250df?style=for-the-badge&logo=apachespark&logoColor=white&labelColor=222" alt="14 Groups" />
            <img src="https://img.shields.io/badge/Endpoints-29-1a7f37?style=for-the-badge&labelColor=222" alt="29 Endpoints" />
          </div>
          <div style={{ margin: '14px 0' }}>
            <a href="http://siambhau69.eu.cc" target="_blank" rel="noreferrer">
              <img src="https://skillicons.dev/icons?i=python,flask,docker,linux,sqlite&theme=light" alt="Tech Stack" />
            </a>
          </div>
          <blockquote>
            <img src="https://img.shields.io/badge/⚡-PREMIUM-FF6B00?style=flat-square&labelColor=222" alt="PREMIUM" style={{ verticalAlign: 'middle', marginRight: 8 }} />
            The most complete <b>Centralized REST API for Free Fire</b> — Player Info, JWT Generator, Ban Check, Guild Tools, Friend Actions, Bind/Unbind, Outfit Renderer, Craftlands and more. <b>29 endpoints across 14 groups</b>, all in one place.
          </blockquote>
        </div>

        <hr className="divider" />

        {}
        <TableOfContents />

        <hr className="divider" />

        {}
        <section id="s-base">
          <h2 className="sec-heading">
            <a className="anchor-icon" href="#s-base" aria-hidden="true">🔗</a>
            🌐 Base URL &amp; Authentication
          </h2>
          <CodeBlock>{`Base URL:  http://siambhau69.eu.cc`}</CodeBlock>
          <div className="auth-note">
            <img src="https://img.shields.io/badge/🔑-API%20Key%20Required-FF6B00?style=flat-square&labelColor=555" alt="" />
            <span><b>Every request requires a valid API Key.</b> Contact <a href="https://t.me/SiamBhau" target="_blank" rel="noreferrer"><b>@SiamBhau</b></a> on Telegram to purchase.</span>
          </div>
          <p style={{ color: 'var(--muted)', fontSize: 13, margin: '8px 0 4px' }}>
            Add the <InlineCode c="key" /> query parameter to every request:
          </p>
          <CodeBlock>{`http://siambhau69.eu.cc/<group>/<endpoint>?param=VALUE&key=YOUR_KEY`}</CodeBlock>
          <Coll title="🔐 Authentication Error Responses (HTTP 403)">
            <CodeBlock>{`// ❌ Error — Key Required
{
  "error": "API key required. Use ?key=YOUR_KEY | Contact: t.me/SiamBhau"
}

// ❌ Error — Invalid Key
{
  "error": "Invalid API key. | Contact: t.me/SiamBhau"
}

// ❌ Error — Inactive Key
{
  "error": "Key is inactive. Contact admin. | Contact: t.me/SiamBhau"
}

// ❌ Error — Expired Key
{
  "error": "Key expired on 30-06-2025. | Contact: t.me/SiamBhau"
}

// ❌ Error — No Access
{
  "error": "Key has no access to 'bancheck' endpoint. | Contact: t.me/SiamBhau"
}`}</CodeBlock>
          </Coll>
        </section>

        <hr className="divider" />

        {}
        <section id="s-groups">
          <h2 className="sec-heading">
            <a className="anchor-icon" href="#s-groups" aria-hidden="true">🔗</a>
            📋 All API Groups
          </h2>
          <CodeBlock>{`GET http://siambhau69.eu.cc/`}</CodeBlock>
          <Coll title="📄 View Full Response (14 Groups)">
            <CodeBlock>{`{
  "API": "Free Fire Centralized API System",
  "Version": "5.0",
  "Owner": "SiamBhau",
  "Groups": {
    "Access To JWT"  : "/accesstojwt",
    "Add Item"       : "/additem",
    "Ban Check"      : "/bancheck",
    "Bind Tools"     : "/bind",
    "Banner"         : "/banner",
    "EAT To JWT"     : "/eattojwt",
    "Free Fire Info" : "/freefireinfo",
    "Friends"        : "/friends",
    "Guild"          : "/guild",
    "JWT Decode"     : "/jwttokendecode",
    "Long Bio"       : "/longbio",
    "Name Changer"   : "/namechanger",
    "Outfits"        : "/outfits",
    "Craftlands"     : "/craftlands"
  }
}`}</CodeBlock>
          </Coll>
        </section>

        <hr className="divider" />

        {}
        <S1 /><hr className="divider" />
        <S2 /><hr className="divider" />
        <S3 /><hr className="divider" />
        <S4 /><hr className="divider" />
        <S5 /><hr className="divider" />
        <S6 /><hr className="divider" />
        <S7 /><hr className="divider" />
        <S8 /><hr className="divider" />
        <S9 /><hr className="divider" />
        <S10 /><hr className="divider" />
        <S11 /><hr className="divider" />
        <S12 /><hr className="divider" />
        <S13 /><hr className="divider" />
        <S14 /><hr className="divider" />

        {}
        <section id="s-regions">
          <h2 className="sec-heading">
            <a className="anchor-icon" href="#s-regions" aria-hidden="true">🔗</a>
            🌍 Supported Regions
          </h2>
          <div className="table-wrap">
            <table className="regions-table">
              <thead><tr><th>Code</th><th>Region</th><th>Location</th></tr></thead>
              <tbody>
                {[
                  ['BD','🇧🇩 Bangladesh','South Asia'],['IND','🇮🇳 India','South Asia'],
                  ['PK','🇵🇰 Pakistan','South Asia'],['SG','🇸🇬 Singapore','Southeast Asia'],
                  ['ID','🇮🇩 Indonesia','Southeast Asia'],['TH','🇹🇭 Thailand','Southeast Asia'],
                  ['VN','🇻🇳 Vietnam','Southeast Asia'],['TW','🇹🇼 Taiwan','East Asia'],
                  ['BR','🇧🇷 Brazil','South America'],['SAC','🌎 South America','South America'],
                  ['US','🇺🇸 United States','North America'],['NA','🌎 North America','North America'],
                  ['ME','🌍 Middle East','Middle East'],['RU','🇷🇺 Russia','CIS'],
                  ['CIS','🌍 CIS Countries','CIS'],['EUROPE','🇪🇺 Europe','Europe'],
                ].map(([code, region, loc]) => (
                  <tr key={code}>
                    <td><span className="code-cell">{code}</span></td>
                    <td>{region}</td>
                    <td style={{ color: 'var(--muted)' }}>{loc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <hr className="divider" />

        {}
        <section id="s-errors">
          <h2 className="sec-heading">
            <a className="anchor-icon" href="#s-errors" aria-hidden="true">🔗</a>
            ⚠️ Error Reference
          </h2>
          <div className="table-wrap">
            <table className="error-table">
              <thead><tr><th>HTTP Status</th><th>Badge</th><th>Description</th></tr></thead>
              <tbody>
                {[
                  ['200','200-Success-1a7f37','Request completed successfully'],
                  ['400','400-Bad%20Request-FF6B00','Missing or invalid parameter'],
                  ['401','401-Unauthorized-cf222e','Invalid JWT or login failed'],
                  ['403','403-Forbidden-cf222e','Invalid / expired / no-access API key'],
                  ['404','404-Not%20Found-8250df','Player or data not found'],
                  ['500','500-Server%20Error-cf222e','Internal error or upstream failure'],
                  ['502','502-Bad%20Gateway-cf222e','Free Fire server error'],
                  ['504','504-Timeout-FF6B00','Request timeout'],
                ].map(([status, badge, desc]) => (
                  <tr key={status}>
                    <td><span className="status-code" style={{ color: status==='200'?'var(--green)':['400','504'].includes(status)?'var(--orange2)':status==='404'?'var(--purple)':'var(--red)' }}>{status}</span></td>
                    <td><img src={`https://img.shields.io/badge/${badge}?style=flat-square`} alt={status} /></td>
                    <td style={{ color: 'var(--muted)' }}>{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <hr className="divider" />

        {}
        <section id="s-contact" className="contact-sec">
          <h2 className="sec-heading" style={{ justifyContent: 'center' }}>
            <a className="anchor-icon" href="#s-contact" aria-hidden="true">🔗</a>
            📞 Contact
          </h2>
          <div className="contact-badges">
            <a href="https://t.me/SiamBhau" target="_blank" rel="noreferrer">
              <img src="https://img.shields.io/badge/Telegram-@SiamBhau-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white&labelColor=222" alt="Telegram" />
            </a>
            <a href="https://facebook.com/SiamBhau69" target="_blank" rel="noreferrer">
              <img src="https://img.shields.io/badge/Facebook-SiamBhau69-1877F2?style=for-the-badge&logo=facebook&logoColor=white&labelColor=222" alt="Facebook" />
            </a>
            <a href="http://siambhau69.eu.cc" target="_blank" rel="noreferrer">
              <img src="https://img.shields.io/badge/API-siambhau69.eu.cc-FF6B00?style=for-the-badge&logo=server&logoColor=white&labelColor=222" alt="API" />
            </a>
          </div>
          <div className="contact-note">
            💬 <b>For API keys, pricing, custom endpoints, or any questions — message on Telegram!</b>
          </div>
          <p className="copyright">© SiamBhau · Free Fire Centralized API · Premium Access Only · Unauthorized resale is prohibited.</p>
        </section>

        {}
        <div style={{ marginTop: 32, marginLeft: -40, marginRight: -40, marginBottom: -48 }}>
          <img
            src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=120&section=footer&text=Free%20Fire%20API%20by%20SiamBhau&fontSize=20&fontColor=fff&animation=twinkling&fontAlignY=65"
            width="100%" alt="Footer" style={{ display: 'block' }}
          />
        </div>

      </div>
    </div>
  )
}
