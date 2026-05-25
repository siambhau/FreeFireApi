import './index.css'
import { useState, useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import {
  Key, Shirt, Ban, Link2, ImageIcon, Ticket, User, Users,
  Shield, Unlock, Edit3, Tag, Package, Map, Globe,
  List, AlertTriangle, Phone, Copy, Check,
  Zap, Menu, ExternalLink, Send,
  Lock, Hash, Layers, Star, Server,
} from 'lucide-react'


function useInView(ref: React.RefObject<HTMLElement | null>) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.08 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return visible
}

function AnimSection({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const visible = useInView(ref)
  return (
    <div ref={ref} className={`in-view${visible ? ' visible' : ''} ${className}`}>
      {children}
    </div>
  )
}


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
        {copied ? <Check size={11} /> : <Copy size={11} />}
        {copied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  )
}

function InlineCode({ c }: { c: ReactNode }) {
  return <code className="inline-code">{c}</code>
}


function SecH({ id, num, icon, title }: { id: string; num: number; icon: ReactNode; title: string }) {
  return (
    <h2 className="sec-heading" id={id}>
      <span className="sec-heading-icon">{icon}</span>
      <span>{num}. {title}</span>
      <a className="anchor" href={`#${id}`} aria-label="Link to section">
        <Hash size={14} />
      </a>
    </h2>
  )
}

function SecBadges({ group, count, color }: { group: string; count: number; color: string }) {
  return (
    <div className="sec-badges">
      <span className="sec-badge route">
        <Server size={11} />
        {group}
      </span>
      <span className="sec-badge count" style={{ borderColor: color + '40', background: color + '0d', color }}>
        <Layers size={11} />
        {count} endpoint{count > 1 ? 's' : ''}
      </span>
    </div>
  )
}


function EpCard({ method, path, title, children }: { method: 'GET' | 'POST'; path: string; title?: string; children: ReactNode }) {
  return (
    <div className={`ep-card ep-card-${method.toLowerCase()}`}>
      <div className="ep-card-header">
        <span className={method === 'GET' ? 'method-get' : 'method-post'}>{method}</span>
        <span className="ep-path">{path}</span>
        {title && <><span className="ep-sep">—</span><span className="ep-title">{title}</span></>}
      </div>
      <div className="ep-card-body">{children}</div>
    </div>
  )
}

function EpLabel({ children }: { children: ReactNode }) {
  return <div className="ep-label">{children}</div>
}


interface Param { name: string; type: string; required: 'yes' | 'no' | 'alt'; description: string; values?: string; default?: string }
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
                <span className={p.required === 'yes' ? 'req-yes' : p.required === 'alt' ? 'req-alt' : 'req-no'}>
                  {p.required === 'yes' ? 'Required' : p.required === 'alt' ? 'Alt' : 'Optional'}
                </span>
              </td>
              {ext && <td style={{ color: 'var(--text-muted)', fontSize: 11, fontFamily: 'var(--mono)' }}>{p.values ?? '—'}</td>}
              {ext && <td style={{ color: 'var(--text-muted)', fontSize: 11, fontFamily: 'var(--mono)' }}>{p.default ?? '—'}</td>}
              <td style={{ color: 'var(--text-muted)', fontSize: 13 }}>{p.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}


function Coll({ title, children }: { title: string; children: ReactNode }) {
  return (
    <details className="coll">
      <summary>{title}</summary>
      <div className="coll-body">{children}</div>
    </details>
  )
}


const NAV = [
  { id: 's-base',    label: 'Base URL & Auth',   icon: <Globe size={15} />,         group: 'general' },
  { id: 's-groups',  label: 'All API Groups',     icon: <List size={15} />,          group: 'general' },
  { id: 's1',  label: 'Access To JWT',   icon: <Key size={15} />,           group: 'api', count: 2 },
  { id: 's2',  label: 'Add Item',        icon: <Shirt size={15} />,         group: 'api', count: 1 },
  { id: 's3',  label: 'Ban Check',       icon: <Ban size={15} />,           group: 'api', count: 1 },
  { id: 's4',  label: 'Bind Tools',      icon: <Link2 size={15} />,         group: 'api', count: 4 },
  { id: 's5',  label: 'Banner',          icon: <ImageIcon size={15} />,     group: 'api', count: 1 },
  { id: 's6',  label: 'EAT To JWT',      icon: <Ticket size={15} />,        group: 'api', count: 1 },
  { id: 's7',  label: 'Free Fire Info',  icon: <User size={15} />,          group: 'api', count: 2, free: true },
  { id: 's8',  label: 'Friends',         icon: <Users size={15} />,         group: 'api', count: 6 },
  { id: 's9',  label: 'Guild',           icon: <Shield size={15} />,        group: 'api', count: 4 },
  { id: 's10', label: 'JWT Decode',      icon: <Unlock size={15} />,        group: 'api', count: 1 },
  { id: 's11', label: 'Long Bio',        icon: <Edit3 size={15} />,         group: 'api', count: 1 },
  { id: 's12', label: 'Name Changer',    icon: <Tag size={15} />,           group: 'api', count: 1 },
  { id: 's13', label: 'Outfits',         icon: <Package size={15} />,       group: 'api', count: 1 },
  { id: 's14', label: 'Craftlands',      icon: <Map size={15} />,           group: 'api', count: 2 },
  { id: 's-regions', label: 'Regions',        icon: <Globe size={15} />,    group: 'ref' },
  { id: 's-errors',  label: 'Error Reference', icon: <AlertTriangle size={15} />, group: 'ref' },
  { id: 's-contact', label: 'Contact',         icon: <Phone size={15} />,   group: 'ref' },
]

function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [active, setActive] = useState('s-base')
  const obsRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const els = NAV.map(n => document.getElementById(n.id)).filter(Boolean) as HTMLElement[]
    obsRef.current = new IntersectionObserver(
      entries => {
        const vis = entries.filter(e => e.isIntersecting)
        if (vis.length > 0) {
          const top = vis.reduce((a, b) => a.boundingClientRect.top < b.boundingClientRect.top ? a : b)
          setActive(top.target.id)
        }
      },
      { rootMargin: '-56px 0px -55% 0px', threshold: 0 }
    )
    els.forEach(el => obsRef.current!.observe(el))
    return () => obsRef.current?.disconnect()
  }, [])

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    if (window.innerWidth < 920) onClose()
  }

  const general = NAV.filter(n => n.group === 'general')
  const api = NAV.filter(n => n.group === 'api')
  const ref = NAV.filter(n => n.group === 'ref')

  const Item = ({ n }: { n: typeof NAV[0] }) => (
    <button
      className={`sidebar-item${active === n.id ? ' active' : ''}`}
      onClick={() => go(n.id)}
    >
      <span className="sidebar-icon">{n.icon}</span>
      <span className="sidebar-label">{n.label}</span>
      {n.free && <span className="sidebar-free">FREE</span>}
      {n.count !== undefined && <span className="sidebar-count">{n.count}</span>}
    </button>
  )

  return (
    <>
      <div className={`sidebar-overlay${open ? ' open' : ''}`} onClick={onClose} />
      <nav className={`sidebar${open ? ' open' : ''}`}>
        <div className="sidebar-inner">
          <div className="sidebar-group">
            <div className="sidebar-group-label">General</div>
            {general.map(n => <Item key={n.id} n={n} />)}
          </div>
          <div className="sidebar-group">
            <div className="sidebar-group-label">API Groups</div>
            {api.map(n => <Item key={n.id} n={n} />)}
          </div>
          <div className="sidebar-group">
            <div className="sidebar-group-label">Reference</div>
            {ref.map(n => <Item key={n.id} n={n} />)}
          </div>
        </div>
      </nav>
    </>
  )
}


function Topbar({ onMenu }: { onMenu: () => void }) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])
  return (
    <header className={`topbar${scrolled ? ' scrolled' : ''}`}>
      <a className="topbar-brand" href="#">
        <div className="topbar-logo">
          <Zap size={18} strokeWidth={2.5} />
        </div>
        <span className="topbar-name">FF<span>API</span></span>
        <span className="topbar-ver">v5.0</span>
      </a>
      <div className="topbar-sep" />
      <div className="topbar-right">
        <div className="tb-status">
          <span className="tb-status-dot" />
          API Online
        </div>
        <a className="tb-btn" href="https://t.me/SiamBhau" target="_blank" rel="noreferrer">
          <Send size={13} />
          Telegram
        </a>
        <a className="tb-btn primary" href="https://t.me/SiamBhau?text=https%3A%2F%2Fsiambhau69.eu.cc%0A%0AHi%20%40SiamBhau%20%F0%9F%91%8B,%20I%20want%20to%20BUY%20a%20Premium%20API%20key%20for%20the%20Free%20Fire%20Centralized%20API.%20Please%20share%20your%20available%20plans,%20pricing%20%26%20payment%20methods.%20%F0%9F%92%8E" target="_blank" rel="noreferrer">
          <Key size={13} />
          Get API Key
        </a>
        <button className="hamburger" onClick={onMenu} aria-label="Menu">
          <Menu size={18} />
        </button>
      </div>
    </header>
  )
}


const GROUPS = [
  { id: 's1',  icon: <Key size={15} />,       name: 'Access To JWT',  route: '/accesstojwt',   count: 2 },
  { id: 's2',  icon: <Shirt size={15} />,     name: 'Add Item',       route: '/additem',        count: 1 },
  { id: 's3',  icon: <Ban size={15} />,       name: 'Ban Check',      route: '/bancheck',       count: 1 },
  { id: 's4',  icon: <Link2 size={15} />,     name: 'Bind Tools',     route: '/bind',           count: 4 },
  { id: 's5',  icon: <ImageIcon size={15} />, name: 'Banner',         route: '/banner',         count: 1 },
  { id: 's6',  icon: <Ticket size={15} />,    name: 'EAT To JWT',     route: '/eattojwt',       count: 1 },
  { id: 's7',  icon: <User size={15} />,      name: 'Free Fire Info', route: '/freefireinfo',   count: 2, free: true },
  { id: 's8',  icon: <Users size={15} />,     name: 'Friends',        route: '/friends',        count: 6 },
  { id: 's9',  icon: <Shield size={15} />,    name: 'Guild',          route: '/guild',          count: 4 },
  { id: 's10', icon: <Unlock size={15} />,    name: 'JWT Decode',     route: '/jwttokendecode', count: 1 },
  { id: 's11', icon: <Edit3 size={15} />,     name: 'Long Bio',       route: '/longbio',        count: 1 },
  { id: 's12', icon: <Tag size={15} />,       name: 'Name Changer',   route: '/namechanger',    count: 1 },
  { id: 's13', icon: <Package size={15} />,   name: 'Outfits',        route: '/outfits',        count: 1 },
  { id: 's14', icon: <Map size={15} />,       name: 'Craftlands',     route: '/craftlands',     count: 2 },
]


function S1() {
  return (
    <AnimSection>
      <div className="sec-wrap" id="s1">
        <SecH id="s1" num={1} icon={<Key size={18} />} title="Access To JWT" />
        <SecBadges group="/accesstojwt" count={2} color="#7c3aed" />
        <div className="desc-block">Generates a Free Fire <strong>JWT Bearer Token</strong> from a Garena Access Token, UID/Password combo, or in bulk.</div>

        <EpCard method="GET" path="/accesstojwt/token" title="JWT Token Generate">
          <EpLabel>Method 1 — Via Access Token</EpLabel>
          <CodeBlock>{`GET /accesstojwt/token?access_token=YOUR_ACCESS_TOKEN&key=YOUR_KEY`}</CodeBlock>
          <ParamTable params={[
            { name: 'access_token', type: 'string', required: 'yes', description: 'Garena OAuth Access Token' },
            { name: 'key',          type: 'string', required: 'yes', description: 'Your API Key' },
          ]} />
          <EpLabel>Method 2 — Via UID + Password</EpLabel>
          <CodeBlock>{`GET /accesstojwt/token?uid=4147917569&password=8415C426BBE3371DADD82F5B&key=YOUR_KEY`}</CodeBlock>
          <ParamTable params={[
            { name: 'uid',      type: 'string', required: 'yes', description: 'Free Fire Guest UID' },
            { name: 'password', type: 'string', required: 'yes', description: 'Account Password (hex format)' },
            { name: 'key',      type: 'string', required: 'yes', description: 'Your API Key' },
          ]} />
          <Coll title="View Success / Error Responses">
            <CodeBlock>{`{
  "success": true,
  "region": "BD",
  "status": "1",
  "BearerAuth": "eyJhbGciOiJSUzI1NiIs...",
  "uid": "2579249340",
  "open_id": "abc123def456",
  "platform_type": 4
}

{
  "region": "BD",
  "status": "1",
  "token": "eyJ...JWT...",
  "token_access": "eyJ...AccessToken...",
  "uid": "4147917569"
}

{
  "success": false,
  "error": "INVALID_TOKEN",
  "message": "AccessToken invalid."
}

{
  "success": false,
  "error": "INVALID_PLATFORM",
  "message": "Account registered on another platform"
}

{
  "uid": "4147917569",
  "error": "Failed to retrieve token"
}`}</CodeBlock>
          </Coll>
        </EpCard>

        <EpCard method="GET" path="/accesstojwt/get_jwt" title="Return JWT Only">
          <CodeBlock>{`GET /accesstojwt/get_jwt?access_token=YOUR_ACCESS_TOKEN&key=YOUR_KEY
GET /accesstojwt/get_jwt?guest_uid=UID&guest_password=PASSWORD&key=YOUR_KEY`}</CodeBlock>
          <ParamTable params={[
            { name: 'access_token',   type: 'string', required: 'alt', description: 'Garena Access Token' },
            { name: 'guest_uid',      type: 'string', required: 'alt', description: 'Guest UID (alternative auth)' },
            { name: 'guest_password', type: 'string', required: 'alt', description: 'Guest Password (used with guest_uid)' },
            { name: 'key',            type: 'string', required: 'yes', description: 'Your API Key' },
          ]} />
          <Coll title="View Success / Error Responses">
            <CodeBlock>{`{
  "success": true,
  "BearerAuth": "eyJhbGciOiJSUzI1NiIs..."
}

{
  "success": false,
  "message": "unregistered or banned account.",
  "detail": "jwt not found"
}

{
  "success": false,
  "message": "missing access_token (or guest_uid + guest_password)"
}`}</CodeBlock>
          </Coll>
        </EpCard>
      </div>
    </AnimSection>
  )
}


function S2() {
  return (
    <AnimSection>
      <div className="sec-wrap" id="s2">
        <SecH id="s2" num={2} icon={<Shirt size={18} />} title="Add Item" />
        <SecBadges group="/additem" count={1} color="#7c3aed" />
        <div className="desc-block">Equips items on a Free Fire account (outfit, gun skin, vehicle skin, vault items, etc.).</div>
        <EpCard method="GET" path="/additem/additem" title="Equip Item">
        <CodeBlock>{`GET /additem/additem?items=211050001,214050001,208050001&jwt=YOUR_JWT&key=YOUR_KEY`}</CodeBlock>
        <ParamTable params={[
          { name: 'items', type: 'string', required: 'yes', description: 'Comma-separated item IDs' },
          { name: 'jwt',   type: 'string', required: 'yes', description: 'Free Fire JWT Bearer Token' },
          { name: 'key',   type: 'string', required: 'yes', description: 'Your API Key' },
        ]} />
        <Coll title="View Success / Error Responses">
          <CodeBlock>{`{
  "status": "success",
  "message": "Items added successfully!",
  "items_count": 3,
  "items": [
    211050001,
    214050001,
    208050001
  ]
}

{
  "status": "error",
  "message": "Missing 'items' parameter."
}

{
  "status": "error",
  "message": "Missing 'jwt' parameter."
}

{
  "status": "error",
  "message": "Invalid item IDs. Provide comma-separated numbers."
}

{
  "status": "error",
  "message": "Failed to add items",
  "status_code": 401,
  "response": "Unauthorized"
}`}</CodeBlock>
        </Coll>
        </EpCard>
      </div>
    </AnimSection>
  )
}


function S3() {
  return (
    <AnimSection>
      <div className="sec-wrap" id="s3">
        <SecH id="s3" num={3} icon={<Ban size={18} />} title="Ban Check" />
        <SecBadges group="/bancheck" count={1} color="#dc2626" />
        <div className="desc-block">Checks the ban status of a Free Fire player by UID.</div>
        <EpCard method="GET" path="/bancheck/bancheck" title="Check Ban Status">
          <CodeBlock>{`GET /bancheck/bancheck?uid=2579249340&key=YOUR_KEY`}</CodeBlock>
          <ParamTable params={[
            { name: 'uid', type: 'string', required: 'yes', description: 'Free Fire Player UID' },
            { name: 'key', type: 'string', required: 'yes', description: 'Your API Key' },
          ]} />
          <Coll title="View Success / Error Responses">
            <CodeBlock>{`{
  "nickname": "SiamBhau",
  "region": "BD",
  "ban_status": "Not banned",
  "ban_period": null
}

{
  "nickname": "HackerXYZ",
  "region": "IND",
  "ban_status": "Banned for 3 months",
  "ban_period": "3 months"
}

{
  "nickname": "Cheater99",
  "region": "SG",
  "ban_status": "Banned indefinitely",
  "ban_period": null
}

{
  "error": "ID NOT FOUND"
}

{
  "error": "UID parameter is required"
}

{
  "error": "Failed to retrieve ban status"
}`}</CodeBlock>
          </Coll>
        </EpCard>
      </div>
    </AnimSection>
  )
}


function S4() {
  return (
    <AnimSection>
      <div className="sec-wrap" id="s4">
        <SecH id="s4" num={4} icon={<Link2 size={18} />} title="Bind Tools" />
        <SecBadges group="/bind" count={4} color="#2563eb" />
        <div className="desc-block">Complete email bind toolkit — view bind info, change bound email (5-step OTP flow), unbind email (3-step), or cancel a pending bind request.</div>

        <EpCard method="GET" path="/bind/bind_info" title="View Email Bind Info">
          <CodeBlock>{`GET /bind/bind_info?access_token=YOUR_ACCESS_TOKEN&key=YOUR_KEY`}</CodeBlock>
          <ParamTable params={[
            { name: 'access_token', type: 'string', required: 'yes', description: 'Garena OAuth Access Token' },
            { name: 'key',          type: 'string', required: 'yes', description: 'Your API Key' },
          ]} />
          <Coll title="View Success Responses">
            <CodeBlock>{`{
  "status": "success",
  "status_code": 200,
  "data": {
    "current_email": "siamxus69@gmail.com",
    "pending_email": "",
    "countdown_seconds": 0,
    "countdown_human": "0",
    "raw_response": {
      "email": "siamxus69@gmail.com",
      "email_to_be": "",
      "request_exec_countdown": 0
    }
  },
  "summary": "Email confirmed: siamxus69@gmail.com"
}

{
  "status": "success",
  "status_code": 200,
  "data": {
    "current_email": "",
    "pending_email": "newmail@gmail.com",
    "countdown_seconds": 86400,
    "countdown_human": "1 Day 0 Hour 0 Min 0 Sec"
  },
  "summary": "Pending email confirmation: newmail@gmail.com - Confirms in: 1 Day 0 Hour 0 Min 0 Sec"
}

{
  "status": "success",
  "data": {
    "current_email": "",
    "pending_email": ""
  },
  "summary": "No recovery email set"
}`}</CodeBlock>
          </Coll>
        </EpCard>

        <EpCard method="POST" path="/bind/changebind" title="Change Bound Email (5-Step OTP Flow)">
          <div className="desc-block" style={{ margin: 0 }}>Changes a Garena account's bound email — requires OTP from old &amp; new email.</div>
          <CodeBlock>{`POST /bind/changebind  |  Content-Type: application/json  |  ?key=YOUR_KEY`}</CodeBlock>
          <div className="table-wrap">
            <table className="param-table">
              <thead><tr><th>Step</th><th>Required Body</th><th>Returns</th></tr></thead>
              <tbody>
                <tr><td><span className="p-name">1</span></td><td style={{fontSize:12,fontFamily:'var(--mono)'}}>access_token, old_email, step:1</td><td style={{fontSize:12,color:'var(--text-muted)'}}>OTP sent to old email</td></tr>
                <tr><td><span className="p-name">2</span></td><td style={{fontSize:12,fontFamily:'var(--mono)'}}>access_token, old_email, otp_old, step:2</td><td style={{fontSize:12,color:'var(--text-muted)'}}>identity_token</td></tr>
                <tr><td><span className="p-name">3</span></td><td style={{fontSize:12,fontFamily:'var(--mono)'}}>access_token, new_email, step:3</td><td style={{fontSize:12,color:'var(--text-muted)'}}>OTP sent to new email</td></tr>
                <tr><td><span className="p-name">4</span></td><td style={{fontSize:12,fontFamily:'var(--mono)'}}>access_token, new_email, otp_new, step:4</td><td style={{fontSize:12,color:'var(--text-muted)'}}>verifier_token</td></tr>
                <tr><td><span className="p-name">5</span></td><td style={{fontSize:12,fontFamily:'var(--mono)'}}>access_token, new_email, identity_token, verifier_token, step:5</td><td style={{fontSize:12,color:'var(--text-muted)'}}>Email change submitted</td></tr>
              </tbody>
            </table>
          </div>
          <Coll title="View Step Examples &amp; Responses">
            <CodeBlock>{`{
  "access_token": "YOUR_TOKEN",
  "old_email": "old@gmail.com",
  "step": 1
}

{
  "access_token": "YOUR_TOKEN",
  "old_email": "old@gmail.com",
  "otp_old": "123456",
  "step": 2
}

{
  "access_token": "YOUR_TOKEN",
  "new_email": "new@gmail.com",
  "step": 3
}

{
  "access_token": "YOUR_TOKEN",
  "new_email": "new@gmail.com",
  "otp_new": "654321",
  "step": 4
}

{
  "access_token": "YOUR_TOKEN",
  "new_email": "new@gmail.com",
  "identity_token": "FROM_STEP_2",
  "verifier_token": "FROM_STEP_4",
  "step": 5
}

{
  "success": true,
  "step": 1,
  "message": "OTP sent to old@gmail.com",
  "next": "Call step 2 with otp_old",
  "raw": {}
}

{
  "success": true,
  "step": 5,
  "message": "Email change request submitted successfully!"
}

{
  "success": false,
  "error": "access_token is required"
}

{
  "success": false,
  "error": "step is required (1-5)"
}

{
  "success": false,
  "error": "old_email and otp_old required for step 2"
}`}</CodeBlock>
          </Coll>
        </EpCard>

        <EpCard method="POST" path="/bind/unbind" title="Unbind Email (3-Step Flow)">
          <CodeBlock>{`POST /bind/unbind  |  Content-Type: application/json  |  ?key=YOUR_KEY`}</CodeBlock>
          <div className="table-wrap">
            <table className="param-table">
              <thead><tr><th>Step</th><th>Required Body</th><th>Returns</th></tr></thead>
              <tbody>
                <tr><td><span className="p-name">1</span></td><td style={{fontSize:12,fontFamily:'var(--mono)'}}>access_token, email, step:1</td><td style={{fontSize:12,color:'var(--text-muted)'}}>OTP sent to email</td></tr>
                <tr><td><span className="p-name">2</span></td><td style={{fontSize:12,fontFamily:'var(--mono)'}}>access_token, email, otp, step:2</td><td style={{fontSize:12,color:'var(--text-muted)'}}>identity_token</td></tr>
                <tr><td><span className="p-name">3</span></td><td style={{fontSize:12,fontFamily:'var(--mono)'}}>access_token, identity_token, step:3</td><td style={{fontSize:12,color:'var(--text-muted)'}}>Unbind submitted</td></tr>
              </tbody>
            </table>
          </div>
          <Coll title="View Step Examples &amp; Responses">
            <CodeBlock>{`{
  "access_token": "YOUR_TOKEN",
  "email": "bound@gmail.com",
  "step": 1
}

{
  "access_token": "YOUR_TOKEN",
  "email": "bound@gmail.com",
  "otp": "123456",
  "step": 2
}

{
  "access_token": "YOUR_TOKEN",
  "identity_token": "FROM_STEP_2",
  "step": 3
}

{
  "success": true,
  "step": 3,
  "message": "Unbind request created successfully!"
}

{
  "success": false,
  "error": "step must be 1 to 3"
}

{
  "success": false,
  "error": "email and otp required for step 2"
}`}</CodeBlock>
          </Coll>
        </EpCard>

        <EpCard method="POST" path="/bind/cancelbind" title="Cancel Pending Bind Request">
          <CodeBlock>{`POST /bind/cancelbind
Content-Type: application/json
?key=YOUR_KEY

{
  "access_token": "YOUR_TOKEN"
}`}</CodeBlock>
          <ParamTable params={[
            { name: 'access_token', type: 'string', required: 'yes', description: 'Garena Access Token' },
          ]} />
          <Coll title="View Success / Error Responses">
            <CodeBlock>{`{
  "success": true,
  "message": "Bind cancelled successfully!",
  "raw": {}
}

{
  "success": false,
  "error": "access_token is required"
}

{
  "success": false,
  "message": "Cancel failed"
}`}</CodeBlock>
          </Coll>
        </EpCard>
      </div>
    </AnimSection>
  )
}


function S5() {
  return (
    <AnimSection>
      <div className="sec-wrap" id="s5">
        <SecH id="s5" num={5} icon={<ImageIcon size={18} />} title="Banner" />
        <SecBadges group="/banner" count={1} color="#FF6B00" />
        <div className="desc-block">Generates a Free Fire <strong>player profile banner</strong> as a PNG image — Avatar, Banner, Guild Name, Level.</div>
        <EpCard method="GET" path="/banner/profile" title="Generate Profile Banner">
          <CodeBlock>{`GET /banner/profile?uid=2579249340&region=BD&key=YOUR_KEY`}</CodeBlock>
          <ParamTable ext params={[
            { name: 'uid',    type: 'string', required: 'yes', values: '—', default: '—',  description: 'Free Fire Player UID' },
            { name: 'region', type: 'string', required: 'no',  values: '—', default: 'BD', description: 'Server Region Code' },
            { name: 'key',    type: 'string', required: 'yes', values: '—', default: '—',  description: 'Your API Key' },
          ]} />
          <Coll title="View Success / Error Responses">
            <CodeBlock>{`HTTP 200 OK
Content-Type: image/png
Cache-Control: public, max-age=300

[PNG Binary Image — Player Banner with Avatar + Name + Guild + Level]

{
  "error": "UID required"
}

{
  "error": "Info API Error: 500"
}

{
  "error": "Failed to generate banner"
}`}</CodeBlock>
          </Coll>
        </EpCard>
      </div>
    </AnimSection>
  )
}


function S6() {
  return (
    <AnimSection>
      <div className="sec-wrap" id="s6">
        <SecH id="s6" num={6} icon={<Ticket size={18} />} title="EAT To JWT" />
        <SecBadges group="/eattojwt" count={1} color="#16a34a" />
        <div className="desc-block">Decodes a Free Fire <strong>EAT (External Access Token)</strong> to extract account info and Garena Access Token.</div>
        <EpCard method="GET" path="/eattojwt/eat" title="EAT Token Decode">
          <CodeBlock>{`GET /eattojwt/eat?eat_token=YOUR_EAT_TOKEN&key=YOUR_KEY`}</CodeBlock>
          <ParamTable params={[
            { name: 'eat_token', type: 'string', required: 'yes', description: 'Free Fire EAT Token' },
            { name: 'key',       type: 'string', required: 'yes', description: 'Your API Key' },
          ]} />
          <Coll title="View Success / Error Responses">
            <CodeBlock>{`{
  "status": "success",
  "account_id": "2579249340",
  "account_nickname": "SiamBhau",
  "open_id": "abc123def456ghi789jkl012",
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "region": "BD"
}

{
  "error": "Invalid access token or session expired"
}

{
  "error": "eat_token parameter is required"
}

{
  "error": "Failed to extract data from Garena"
}`}</CodeBlock>
          </Coll>
        </EpCard>
      </div>
    </AnimSection>
  )
}


function S7() {
  return (
    <AnimSection>
      <div className="sec-wrap" id="s7">
        <SecH id="s7" num={7} icon={<User size={18} />} title="Free Fire Info" />
        <SecBadges group="/freefireinfo" count={2} color="#16a34a" />
        <div className="desc-block"><strong>FREE endpoints</strong> — Fetches full player profile and game stats. Player Info endpoint is open to all users with a free key.</div>

        <EpCard method="GET" path="/freefireinfo/bhau" title="Full Player Profile">
          <CodeBlock>{`GET /freefireinfo/bhau?uid=2579249340&region=BD&key=YOUR_KEY`}</CodeBlock>
          <ParamTable params={[
            { name: 'uid',    type: 'string', required: 'yes', description: 'Free Fire Player UID' },
            { name: 'region', type: 'string', required: 'yes', description: 'Server Region (BD, IND, SG…)' },
            { name: 'key',    type: 'string', required: 'yes', description: 'Your API Key' },
          ]} />
          <Coll title="View Full Success Response">
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
      "primeLevel": 8
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
      16, 3406, 8, 1,
      16, 1806, 8, 2,
      16, 4306, 8, 3,
      16, 706
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
    "nickname": "সিয়ামভাই10k",
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
}

{
  "error": "Invalid UID or Region. Please check and try again."
}

{
  "error": "Please provide UID."
}

{
  "error": "Please provide REGION."
}`}</CodeBlock>
          </Coll>
        </EpCard>

        <EpCard method="GET" path="/freefireinfo/stats" title="Player Game Stats">
          <CodeBlock>{`GET /freefireinfo/stats?uid=2579249340&region=BD&key=YOUR_KEY
GET /freefireinfo/stats?uid=2579249340&region=BD&gamemode=br&matchmode=RANKED&key=YOUR_KEY
GET /freefireinfo/stats?uid=2579249340&region=BD&gamemode=cs&matchmode=RANKED&key=YOUR_KEY`}</CodeBlock>
          <ParamTable ext params={[
            { name: 'uid',       type: 'string', required: 'yes', values: '—',                     default: '—',      description: 'Free Fire Player UID' },
            { name: 'region',    type: 'string', required: 'yes', values: 'Region codes',           default: '—',      description: 'Server Region' },
            { name: 'gamemode',  type: 'string', required: 'no',  values: 'br, cs',                 default: 'br',     description: 'Battle Royale or Clash Squad' },
            { name: 'matchmode', type: 'string', required: 'no',  values: 'CAREER, NORMAL, RANKED', default: 'CAREER', description: 'Match type' },
            { name: 'key',       type: 'string', required: 'yes', values: '—',                     default: '—',      description: 'Your API Key' },
          ]} />
          <Coll title="View BR / CS Stats Responses">
            <CodeBlock>{`{
  "success": true,
  "uid": "2579249340",
  "region": "BD",
  "gamemode": "br",
  "matchmode": "CAREER",
  "stats": {
    "rankingPoints": 4200,
    "rank": 220,
    "kills": 15800,
    "headshots": 6200,
    "winRate": 28,
    "gamesPlayed": 5200,
    "wins": 1456,
    "top10": 2800,
    "kd": 4.21,
    "longestKill": 423
  }
}

{
  "success": true,
  "uid": "2579249340",
  "region": "BD",
  "gamemode": "cs",
  "matchmode": "RANKED",
  "stats": {
    "rankingPoints": 3100,
    "cs_rank": 605,
    "kills": 8700,
    "headshots": 3900,
    "winRate": 58,
    "gamesPlayed": 1800,
    "wins": 1044,
    "kd": 3.87,
    "mvp": 420
  }
}`}</CodeBlock>
          </Coll>
        </EpCard>
      </div>
    </AnimSection>
  )
}


function S8() {
  return (
    <AnimSection>
      <div className="sec-wrap" id="s8">
        <SecH id="s8" num={8} icon={<Users size={18} />} title="Friends" />
        <SecBadges group="/friends" count={6} color="#2563eb" />
        <div className="desc-block">Complete friend management — add/remove, list friends, star/unstar, set/remove aliases.</div>

        <EpCard method="GET" path="/friends/friend_action" title="Add / Remove Friend">
          <CodeBlock>{`GET /friends/friend_action?jwt=YOUR_JWT&uid=TARGET_UID&action=add&key=YOUR_KEY
GET /friends/friend_action?jwt=YOUR_JWT&uid=TARGET_UID&action=remove&key=YOUR_KEY`}</CodeBlock>
          <ParamTable params={[
            { name: 'jwt',    type: 'string', required: 'yes', description: 'Free Fire JWT Bearer Token' },
            { name: 'uid',    type: 'string', required: 'yes', description: 'Target player UID' },
            { name: 'action', type: 'string', required: 'yes', description: 'add or remove' },
            { name: 'key',    type: 'string', required: 'yes', description: 'Your API Key' },
          ]} />
          <Coll title="View Responses">
            <CodeBlock>{`{
  "message": "Friend Request Sent Successfully",
  "response_status": 200
}

{
  "message": "Friend Removed Successfully",
  "response_status": 200
}

{
  "message": "Action Failed: ALREADY_FRIEND",
  "response_status": 400
}

{
  "message": "Invalid action. Use 'add' or 'remove'."
}

{
  "message": "JWT token is required as '?jwt=YOUR_TOKEN'"
}`}</CodeBlock>
          </Coll>
        </EpCard>

        <EpCard method="GET" path="/friends/list" title="Full Friends List">
          <CodeBlock>{`GET /friends/list?jwt=YOUR_JWT&key=YOUR_KEY`}</CodeBlock>
          <ParamTable params={[
            { name: 'jwt', type: 'string', required: 'yes', description: 'Free Fire JWT Bearer Token' },
            { name: 'key', type: 'string', required: 'yes', description: 'Your API Key (with friendslist access)' },
          ]} />
          <Coll title="View Responses">
            <CodeBlock>{`{
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
    },
    {
      "nickname": "RushPlayer",
      "user_id": "4567891230"
    }
  ]
}

{
  "success": false,
  "error": "jwt parameter is required"
}

{
  "success": false,
  "error": "Connection timeout",
  "friends_count": 0,
  "friends_list": []
}`}</CodeBlock>
          </Coll>
        </EpCard>

        <EpCard method="GET" path="/friends/addstar" title="Star a Friend">
          <CodeBlock>{`GET /friends/addstar?jwt=YOUR_JWT&uid=TARGET_UID&key=YOUR_KEY`}</CodeBlock>
          <ParamTable params={[
            { name: 'jwt', type: 'string', required: 'yes', description: 'Your JWT Token (region auto-detected)' },
            { name: 'uid', type: 'string', required: 'yes', description: "Friend's UID to star" },
            { name: 'key', type: 'string', required: 'yes', description: 'Your API Key' },
          ]} />
          <Coll title="View Responses">
            <CodeBlock>{`{
  "status": "success",
  "message": "UID 1234567890 successfully starred ⭐",
  "response_hex": "0a..."
}

{
  "error": "jwt parameter is required"
}

{
  "error": "uid parameter is required and must be a number"
}

{
  "error": "Invalid JWT: ...",
  "uid": 1234567890,
  "region": "BD"
}

{
  "error": "FF server returned 401"
}`}</CodeBlock>
          </Coll>
        </EpCard>

        <EpCard method="GET" path="/friends/removestar" title="Unstar a Friend">
          <CodeBlock>{`GET /friends/removestar?jwt=YOUR_JWT&uid=TARGET_UID&key=YOUR_KEY`}</CodeBlock>
          <ParamTable params={[
            { name: 'jwt', type: 'string', required: 'yes', description: 'Your JWT Token' },
            { name: 'uid', type: 'string', required: 'yes', description: "Friend's UID to unstar" },
            { name: 'key', type: 'string', required: 'yes', description: 'Your API Key' },
          ]} />
          <Coll title="View Response">
            <CodeBlock>{`{
  "status": "success",
  "message": "UID 1234567890 successfully unstarred ✅"
}`}</CodeBlock>
          </Coll>
        </EpCard>

        <EpCard method="GET" path="/friends/setalias" title="Set Friend Alias / Nickname">
          <CodeBlock>{`GET /friends/setalias?jwt=YOUR_JWT&uid=TARGET_UID&alias=BestBro&key=YOUR_KEY`}</CodeBlock>
          <ParamTable params={[
            { name: 'jwt',   type: 'string', required: 'yes', description: 'Your JWT Token' },
            { name: 'uid',   type: 'string', required: 'yes', description: "Friend's UID" },
            { name: 'alias', type: 'string', required: 'yes', description: 'New alias (max 12 characters)' },
            { name: 'key',   type: 'string', required: 'yes', description: 'Your API Key' },
          ]} />
          <Coll title="View Responses">
            <CodeBlock>{`{
  "status": "success",
  "message": "Alias 'BestBro' set for UID 1234567890 ✅"
}

{
  "error": "alias parameter is required"
}

{
  "error": "Alias too long! Max 12 characters (got 18)"
}`}</CodeBlock>
          </Coll>
        </EpCard>

        <EpCard method="GET" path="/friends/removealias" title="Remove Friend Alias">
          <CodeBlock>{`GET /friends/removealias?jwt=YOUR_JWT&uid=TARGET_UID&key=YOUR_KEY`}</CodeBlock>
          <ParamTable params={[
            { name: 'jwt', type: 'string', required: 'yes', description: 'Your JWT Token' },
            { name: 'uid', type: 'string', required: 'yes', description: "Friend's UID" },
            { name: 'key', type: 'string', required: 'yes', description: 'Your API Key' },
          ]} />
          <Coll title="View Response">
            <CodeBlock>{`{
  "status": "success",
  "message": "Alias removed for UID 1234567890 ✅"
}`}</CodeBlock>
          </Coll>
        </EpCard>
      </div>
    </AnimSection>
  )
}


function S9() {
  return (
    <AnimSection>
      <div className="sec-wrap" id="s9">
        <SecH id="s9" num={9} icon={<Shield size={18} />} title="Guild" />
        <SecBadges group="/guild" count={4} color="#FF6B00" />
        <div className="desc-block">Complete guild/clan management — read info, join, leave, or <strong>create a new guild</strong> programmatically.</div>

        <EpCard method="GET" path="/guild/info" title="Guild / Clan Information">
          <CodeBlock>{`GET /guild/info?clan_id=3048889605&key=YOUR_KEY`}</CodeBlock>
          <ParamTable params={[
            { name: 'clan_id', type: 'string', required: 'yes', description: 'Free Fire Guild/Clan ID' },
            { name: 'key',     type: 'string', required: 'yes', description: 'Your API Key (with guildinfo access)' },
          ]} />
          <Coll title="View Response">
            <CodeBlock>{`{
  "id": 3048889605,
  "clan_name": "BhauGuild",
  "level": 5,
  "region": "BD",
  "welcome_message": "Welcome to BhauGuild! Only pro players allowed.",
  "score": 98500,
  "rank": 12,
  "xp": 850000,
  "balance": 50000,
  "energy": 100,
  "upgrades": 15,
  "achievements": 8,
  "total_playtime": 9820000,
  "guild_details": {
    "region": "BD",
    "clan_id": 3048889605,
    "members_online": 8,
    "total_members": 30,
    "reward_time": 1750000000,
    "expire_time": 1752000000
  }
}

{
  "error": "clan_id parameter is required"
}

{
  "error": "Invalid clan_id"
}

{
  "error": "JWT token generation failed"
}

{
  "error": "FF server error: 500"
}`}</CodeBlock>
          </Coll>
        </EpCard>

        <EpCard method="GET" path="/guild/join" title="Join a Guild">
          <CodeBlock>{`GET /guild/join?clan_id=3048889605&jwt=YOUR_JWT&key=YOUR_KEY
GET /guild/join?clan_id=3048889605&uid=YOUR_UID&pass=YOUR_PASSWORD&key=YOUR_KEY`}</CodeBlock>
          <ParamTable params={[
            { name: 'clan_id',  type: 'string', required: 'yes', description: 'Target Guild/Clan ID' },
            { name: 'jwt',      type: 'string', required: 'alt', description: 'Your JWT (preferred auth)' },
            { name: 'uid+pass', type: 'string', required: 'alt', description: 'UID + Password (alternative to JWT)' },
            { name: 'key',      type: 'string', required: 'yes', description: 'Your API Key' },
          ]} />
          <Coll title="View Response">
            <CodeBlock>{`{
  "success": true,
  "action": "Join Guild",
  "clan_id": "3048889605",
  "uid": "2579249340",
  "name": "SiamBhau",
  "region": "BD",
  "login_method": "jwt",
  "server_response": ""
}

{
  "success": false,
  "error": "clan_id required"
}

{
  "success": false,
  "error": "Provide jwt OR (uid + pass)"
}`}</CodeBlock>
          </Coll>
        </EpCard>

        <EpCard method="GET" path="/guild/leave" title="Leave a Guild">
          <CodeBlock>{`GET /guild/leave?clan_id=3048889605&jwt=YOUR_JWT&key=YOUR_KEY`}</CodeBlock>
          <ParamTable params={[
            { name: 'clan_id', type: 'string', required: 'yes', description: 'Guild/Clan ID to leave' },
            { name: 'jwt',     type: 'string', required: 'alt', description: 'Your JWT Token' },
            { name: 'uid',     type: 'string', required: 'alt', description: 'UID (alternative)' },
            { name: 'pass',    type: 'string', required: 'alt', description: 'Password (if using UID)' },
            { name: 'key',     type: 'string', required: 'yes', description: 'Your API Key' },
          ]} />
          <Coll title="View Response">
            <CodeBlock>{`{
  "success": true,
  "action": "Leave Guild",
  "clan_id": "3048889605",
  "uid": "2579249340",
  "region": "BD",
  "login_method": "jwt"
}

{
  "success": false,
  "error": "clan_id parameter is required"
}`}</CodeBlock>
          </Coll>
        </EpCard>

        <EpCard method="POST" path="/guild/create" title="Create a New Guild">
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
          <ParamTable params={[
            { name: 'guild_name',    type: 'string',  required: 'yes', description: 'Guild display name' },
            { name: 'slogan',        type: 'string',  required: 'yes', description: 'Short slogan / tagline' },
            { name: 'payment',       type: 'integer', required: 'yes', description: '1 (Coins) / 2 (Diamonds)' },
            { name: 'auto_approval', type: 'integer', required: 'yes', description: '1 (OFF) / 2 (ON)' },
            { name: 'avatar',        type: 'integer', required: 'yes', description: '10 (Lion) / 11 (Wolf)' },
            { name: 'tags',          type: 'int[]',   required: 'yes', description: 'Tag IDs 1–14, must include 13 or 14' },
            { name: 'min_level',     type: 'integer', required: 'no',  description: 'Minimum player level' },
            { name: 'min_br_rank',   type: 'integer', required: 'no',  description: 'Minimum BR rank' },
            { name: 'min_cs_rank',   type: 'integer', required: 'no',  description: 'Minimum CS rank' },
            { name: 'location',      type: 'integer', required: 'no',  description: 'Region code (default 59999)' },
          ]} />
          <Coll title="View Success / Error Responses">
            <CodeBlock>{`{
  "status": "success",
  "message": "Guild 'MyGuild' created successfully!",
  "guild_id": 3055551234,
  "guild_name": "MyGuild",
  "region": "BD"
}

{
  "error": "Authorization header required. Format: Bearer <jwt_token>"
}

{
  "error": "guild_name is required"
}

{
  "error": "payment must be 1 (Coins) or 2 (Diamonds)"
}

{
  "error": "tags must include 13 (Casual) or 14 (Competition)"
}

{
  "error": "Only one activity tag (1/2/3) allowed, got: [1, 2]"
}`}</CodeBlock>
          </Coll>
        </EpCard>
      </div>
    </AnimSection>
  )
}


function S10() {
  return (
    <AnimSection>
      <div className="sec-wrap" id="s10">
        <SecH id="s10" num={10} icon={<Unlock size={18} />} title="JWT Decode" />
        <SecBadges group="/jwttokendecode" count={1} color="#7c3aed" />
        <div className="desc-block">Decodes a Free Fire JWT Bearer Token and exposes the full payload.</div>
        <EpCard method="GET" path="/jwttokendecode/decode" title="Decode JWT Token">
          <CodeBlock>{`GET /jwttokendecode/decode?token=YOUR_JWT_TOKEN&key=YOUR_KEY`}</CodeBlock>
          <ParamTable params={[
            { name: 'token', type: 'string', required: 'yes', description: 'Free Fire JWT Bearer Token' },
            { name: 'key',   type: 'string', required: 'yes', description: 'Your API Key' },
          ]} />
          <Coll title="View Success / Error Responses">
            <CodeBlock>{`{
  "status": "success",
  "decoded": {
    "account_id": "2579249340",
    "nickname": "SiamBhau",
    "lock_region": "BD",
    "open_id": "abc123def456",
    "platform_type": 4,
    "iat": 1748000000,
    "exp": "2026-05-29 13:11:47 UTC",
    "iss": "freefire-game-server",
    "sub": "game-auth"
  }
}

{
  "status": "error",
  "message": "Missing token parameter"
}

{
  "status": "error",
  "message": "Invalid JWT token"
}

{
  "status": "error",
  "message": "Token has expired"
}`}</CodeBlock>
          </Coll>
        </EpCard>
      </div>
    </AnimSection>
  )
}


function S11() {
  return (
    <AnimSection>
      <div className="sec-wrap" id="s11">
        <SecH id="s11" num={11} icon={<Edit3 size={18} />} title="Long Bio" />
        <SecBadges group="/longbio" count={1} color="#FF6B00" />
        <div className="desc-block">Sets a bio that <strong>exceeds the in-game character limit</strong>. Supports 3 authentication methods.</div>
        <EpCard method="GET" path="/longbio/bio_upload" title="Upload Long Bio">
          <EpLabel>Method 1 — Via JWT (fastest)</EpLabel>
          <CodeBlock>{`GET /longbio/bio_upload?bio=FF+Pro+Player+SiamBhau&jwt=YOUR_JWT&key=YOUR_KEY`}</CodeBlock>
          <EpLabel>Method 2 — Via UID + Password</EpLabel>
          <CodeBlock>{`GET /longbio/bio_upload?bio=BIO_TEXT&uid=YOUR_UID&pass=YOUR_PASS&key=YOUR_KEY`}</CodeBlock>
          <EpLabel>Method 3 — Via Access Token</EpLabel>
          <CodeBlock>{`GET /longbio/bio_upload?bio=BIO_TEXT&access=YOUR_ACCESS_TOKEN&key=YOUR_KEY`}</CodeBlock>
          <ParamTable params={[
            { name: 'bio',      type: 'string', required: 'yes', description: 'Bio text to set' },
            { name: 'jwt',      type: 'string', required: 'alt', description: 'JWT — one of three auth methods' },
            { name: 'uid+pass', type: 'string', required: 'alt', description: 'UID + Password combo' },
            { name: 'access',   type: 'string', required: 'alt', description: 'Garena Access Token' },
            { name: 'key',      type: 'string', required: 'yes', description: 'Your API Key' },
          ]} />
          <Coll title="View Success / Error Responses">
            <CodeBlock>{`{
  "Owner": "SiamBhau",
  "status": "Success",
  "login_method": "Direct JWT",
  "code": 200,
  "bio": "FF Pro Player SiamBhau",
  "uid": "2579249340",
  "name": "SiamBhau",
  "region": "BD",
  "generated_jwt": "eyJ..."
}

{
  "Owner": "SiamBhau",
  "status": "Success",
  "login_method": "UID/Pass Login",
  "code": 200,
  "bio": "FF Pro Player SiamBhau",
  "uid": "2579249340",
  "name": "SiamBhau",
  "region": "BD"
}

{
  "status": "Error",
  "code": 400,
  "error": "Missing 'bio' parameter"
}

{
  "status": "Error",
  "code": 400,
  "error": "Provide JWT, or UID/Pass, or Access Token"
}

{
  "status": "Unauthorized (Invalid JWT)",
  "code": 401
}

{
  "status": "Guest Login Failed (Check UID/Pass)",
  "code": 401
}`}</CodeBlock>
          </Coll>
        </EpCard>
      </div>
    </AnimSection>
  )
}


function S12() {
  return (
    <AnimSection>
      <div className="sec-wrap" id="s12">
        <SecH id="s12" num={12} icon={<Tag size={18} />} title="Name Changer" />
        <SecBadges group="/namechanger" count={1} color="#2563eb" />
        <div className="desc-block">Changes the in-game name of a Free Fire account using a JWT token.</div>
        <EpCard method="GET" path="/namechanger/name" title="Change In-Game Name">
          <CodeBlock>{`GET /namechanger/name?token=YOUR_JWT&name=SiamBhau&key=YOUR_KEY`}</CodeBlock>
          <ParamTable params={[
            { name: 'token', type: 'string', required: 'yes', description: 'Free Fire JWT Bearer Token' },
            { name: 'name',  type: 'string', required: 'yes', description: 'New in-game name' },
            { name: 'key',   type: 'string', required: 'yes', description: 'Your API Key' },
          ]} />
          <Coll title="View Success / Error Responses">
            <CodeBlock>{`{
  "Owner": "SiamBhau",
  "status": "success",
  "raw_content": "0a020801",
  "text": ""
}

{
  "Owner": "SiamBhau",
  "status": "failed",
  "raw_content": "...",
  "text": "BR_NAME_ALREADY_USED"
}

{
  "error": "token and name are required"
}`}</CodeBlock>
          </Coll>
        </EpCard>
      </div>
    </AnimSection>
  )
}


function S13() {
  return (
    <AnimSection>
      <div className="sec-wrap" id="s13">
        <SecH id="s13" num={13} icon={<Package size={18} />} title="Outfits" />
        <SecBadges group="/outfits" count={1} color="#FF6B00" />
        <div className="desc-block">Renders a player's equipped outfit, character, and weapon as a <strong>1024 x 1024 PNG image</strong>.</div>
        <EpCard method="GET" path="/outfits/outfit" title="Generate Outfit Image">
          <CodeBlock>{`GET /outfits/outfit?uid=2579249340&region=BD&key=YOUR_KEY`}</CodeBlock>
          <ParamTable ext params={[
            { name: 'uid',    type: 'string', required: 'yes', values: '—', default: '—',  description: 'Free Fire Player UID' },
            { name: 'region', type: 'string', required: 'no',  values: '—', default: 'BD', description: 'Server Region' },
            { name: 'key',    type: 'string', required: 'yes', values: '—', default: '—',  description: 'Your API Key' },
          ]} />
          <Coll title="View Success / Error Responses">
            <CodeBlock>{`HTTP 200 OK
Content-Type: image/png

[PNG Binary Image — 1024x1024px]
Outfit slots: Head, Body, Legs, Shoes, Backpack, Mask, Arm + Character + Weapon skin

{
  "error": "uid parameter is required"
}

{
  "error": "Failed to fetch player info"
}`}</CodeBlock>
          </Coll>
        </EpCard>
      </div>
    </AnimSection>
  )
}


function S14() {
  return (
    <AnimSection>
      <div className="sec-wrap" id="s14">
        <SecH id="s14" num={14} icon={<Map size={18} />} title="Craftlands" />
        <SecBadges group="/craftlands" count={2} color="#16a34a" />
        <div className="desc-block">Fetches Free Fire <strong>Craftland custom map</strong> information by map code.</div>

        <EpCard method="GET" path="/craftlands/info" title="Craftland Map Info (Quick)">
          <CodeBlock>{`GET /craftlands/info?map_code=ABC123&region=BD&lang=en&key=YOUR_KEY`}</CodeBlock>
          <ParamTable ext params={[
            { name: 'map_code', type: 'string', required: 'yes', values: '—', default: '—',  description: 'Craftland map code (with or without #)' },
            { name: 'region',   type: 'string', required: 'no',  values: '—', default: 'BD', description: 'Region code' },
            { name: 'lang',     type: 'string', required: 'no',  values: '—', default: 'en', description: 'Language code' },
            { name: 'key',      type: 'string', required: 'yes', values: '—', default: '—',  description: 'Your API Key' },
          ]} />
          <Coll title="View Response">
            <CodeBlock>{`{
  "code": 0,
  "status": "success",
  "msg": "",
  "data": {
    "map_info": {
      "workshop_code": "#ABC123",
      "author_name": "MapMaker01",
      "map_name": "Sniper Arena",
      "description": "Best 1v1 sniper map for Free Fire",
      "team_count": 2,
      "game_mode": 12,
      "subscribe_count": 15890,
      "like_count": 8420,
      "estimated_play_time": "300 seconds",
      "tags": [1, 4, 13]
    },
    "game_info": {
      "title": "Free Fire Craftland",
      "game_name": "Free Fire",
      "region": "BD",
      "language": "en",
      "android_download": "https://play.google.com/store/apps/details?id=com.dts.freefireth",
      "ios_download": "https://apps.apple.com/app/garena-free-fire/id1300146617",
      "ugc_url": "https://ff.garena.com/craftland"
    },
    "images": {
      "backgrounds": [],
      "game_icon": "...",
      "share_image": "..."
    },
    "timestamps": {
      "start_time": 1750000000,
      "end_time": 1755000000,
      "start_time_formatted": "2025-06-15 12:30:00",
      "end_time_formatted": "2025-08-12 12:30:00"
    }
  }
}

{
  "code": 400,
  "status": "error",
  "msg": "map_code is required",
  "data": null
}

{
  "code": 503,
  "status": "error",
  "msg": "Network error: ...",
  "data": null
}

{
  "code": 500,
  "status": "error",
  "msg": "Server error: ...",
  "data": null
}`}</CodeBlock>
          </Coll>
        </EpCard>

        <EpCard method="GET" path="/craftlands/map_details" title="Full Craftland Map Details">
          <div className="desc-block" style={{ margin: '0 0 12px' }}>Returns enriched map info — tags resolved to <strong>human-readable names</strong>, game-mode names, download links.</div>
          <CodeBlock>{`GET /craftlands/map_details?map_code=ABC123&region=BD&lang=en&key=YOUR_KEY`}</CodeBlock>
          <ParamTable ext params={[
            { name: 'map_code', type: 'string', required: 'yes', values: '—', default: '—',  description: 'Craftland map code' },
            { name: 'region',   type: 'string', required: 'no',  values: '—', default: 'BD', description: 'Region code' },
            { name: 'lang',     type: 'string', required: 'no',  values: '—', default: 'en', description: 'Language code' },
            { name: 'key',      type: 'string', required: 'yes', values: '—', default: '—',  description: 'Your API Key' },
          ]} />
          <Coll title="View Success / Error Responses">
            <CodeBlock>{`{
  "code": 0,
  "status": "success",
  "data": {
    "basic_info": {
      "workshop_code": "#ABC123",
      "map_name": "Sniper Arena",
      "author": "MapMaker01",
      "description": "Best 1v1 sniper map for Free Fire",
      "short_description": "Sniper 1v1"
    },
    "gameplay_info": {
      "team_count": 2,
      "group_mode": 1,
      "game_mode": {
        "id": 12,
        "name": "Sniper Only"
      },
      "mode_template": {
        "id": 5,
        "name": "Free For All"
      },
      "round_count": 3,
      "map_id": 901,
      "estimated_play_time": "300 - 600 seconds"
    },
    "social_info": {
      "subscribe_count": 15890,
      "like_count": 8420,
      "map_cover_url": "https://..."
    },
    "tags": [
      {
        "id": 1,
        "key": "tag_action",
        "name": "Action",
        "type": 1
      },
      {
        "id": 4,
        "key": "tag_pvp",
        "name": "PvP",
        "type": 2
      },
      {
        "id": 13,
        "key": "tag_casual",
        "name": "Casual",
        "type": 3
      }
    ],
    "download_info": {
      "android": "https://play.google.com/store/apps/details?id=com.dts.freefireth",
      "ios": "https://apps.apple.com/app/garena-free-fire/id1300146617",
      "ugc_portal": "https://ff.garena.com/craftland"
    },
    "region_info": {
      "region": "BD",
      "language": "en",
      "region_lang": "en_BD"
    }
  }
}

{
  "error": "map_code is required"
}

{
  "error": "API returned status 404"
}`}</CodeBlock>
          </Coll>
        </EpCard>
      </div>
    </AnimSection>
  )
}


export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="docs-layout">
      <Topbar onMenu={() => setSidebarOpen(o => !o)} />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="docs-main">
        <div className="docs-content">

          <div className="hero animate-fadeup">
            <div className="hero-bg-shape" />
            <div className="hero-bg-shape2" />
            <div className="hero-tag">
              <Zap size={11} />
              Premium REST API
            </div>
            <h1 className="hero-title">
              Free Fire <span className="accent">Centralized API</span>
            </h1>
            <p className="hero-desc">
              The most complete REST API for Free Fire — Player Info, JWT Generator, Ban Check, Guild Tools,
              Friend Actions, Outfits, Craftlands and more. 29 endpoints across 14 groups, all in one place.
            </p>
            <div className="hero-cta">
              <a className="hero-btn primary" href="https://t.me/SiamBhau?text=https%3A%2F%2Fsiambhau69.eu.cc%0A%0AHi%20%40SiamBhau%20%F0%9F%91%8B,%20I%20want%20to%20BUY%20a%20Premium%20API%20key%20for%20the%20Free%20Fire%20Centralized%20API.%20Please%20share%20your%20available%20plans,%20pricing%20%26%20payment%20methods.%20%F0%9F%92%8E" target="_blank" rel="noreferrer">
                <Key size={14} />
                Get Premium Key
              </a>
              <a className="hero-btn secondary" href="https://t.me/SiamBhau?text=https%3A%2F%2Fsiambhau69.eu.cc%0A%0AHi%20%40SiamBhau%20%F0%9F%91%8B,%20I'd%20like%20to%20get%20a%20FREE%20API%20key%20for%20the%20Free%20Fire%20Info%20endpoints.%20Could%20you%20please%20activate%20one%20for%20me%3F%20%F0%9F%99%8F" target="_blank" rel="noreferrer">
                <Star size={14} />
                Free Key (Player Info)
              </a>
              <a className="hero-btn secondary" href="http://siambhau69.eu.cc" target="_blank" rel="noreferrer">
                <ExternalLink size={14} />
                Base URL
              </a>
            </div>
            <div className="hero-stats">
              {[
                { num: '14', label: 'API Groups' },
                { num: '29', label: 'Endpoints' },
                { num: '16', label: 'Regions' },
                { num: 'v5', label: 'Version' },
              ].map(s => (
                <div key={s.label} className="hero-stat">
                  <div className="hero-stat-num">{s.num}</div>
                  <div className="hero-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <AnimSection>
            <div className="section-label">
              <Layers size={13} />
              All API Groups
            </div>
            <div className="groups-grid">
              {GROUPS.map(g => (
                <a key={g.id} className="group-card" href={`#${g.id}`}>
                  {g.free && <span className="group-card-free">FREE</span>}
                  <div className="group-card-icon">{g.icon}</div>
                  <div className="group-card-name">{g.name}</div>
                  <div className="group-card-route">{g.route}</div>
                  <div className="group-card-count">{g.count} endpoint{g.count > 1 ? 's' : ''}</div>
                </a>
              ))}
            </div>
          </AnimSection>

          <AnimSection>
            <div className="sec-wrap" id="s-base">
              <h2 className="sec-heading" id="s-base-h">
                <span className="sec-heading-icon"><Globe size={18} /></span>
                Base URL &amp; Authentication
                <a className="anchor" href="#s-base"><Hash size={14} /></a>
              </h2>
              <CodeBlock>{`Base URL:  http://siambhau69.eu.cc`}</CodeBlock>
              <div className="auth-note">
                <span className="auth-note-icon"><Lock size={16} /></span>
                <div>
                  <strong>Every request requires a valid API Key.</strong> Contact{' '}
                  <a href="https://t.me/SiamBhau" target="_blank" rel="noreferrer"><strong>@SiamBhau</strong></a>{' '}
                  on Telegram to purchase or get a free key for Player Info endpoints.
                </div>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: 13, margin: '12px 0 6px' }}>
                Add the <InlineCode c="key" /> query parameter to every request:
              </p>
              <CodeBlock>{`http://siambhau69.eu.cc/<group>/<endpoint>?param=VALUE&key=YOUR_KEY`}</CodeBlock>
              <Coll title="Authentication Error Responses (HTTP 403)">
                <CodeBlock>{`{
  "error": "API key required. Use ?key=YOUR_KEY | Contact: t.me/SiamBhau"
}

{
  "error": "Invalid API key. | Contact: t.me/SiamBhau"
}

{
  "error": "Key is inactive. Contact admin. | Contact: t.me/SiamBhau"
}

{
  "error": "Key expired on 30-06-2025. | Contact: t.me/SiamBhau"
}

{
  "error": "Key has no access to 'bancheck' endpoint. | Contact: t.me/SiamBhau"
}`}</CodeBlock>
              </Coll>
            </div>
          </AnimSection>

          <AnimSection>
            <div className="sec-wrap" id="s-groups">
              <h2 className="sec-heading">
                <span className="sec-heading-icon"><List size={18} /></span>
                All API Groups
                <a className="anchor" href="#s-groups"><Hash size={14} /></a>
              </h2>
              <CodeBlock>{`GET http://siambhau69.eu.cc/`}</CodeBlock>
              <Coll title="View Full Response (14 Groups)">
                <CodeBlock>{`{
  "API": "Free Fire Centralized API System",
  "Version": "5.0",
  "Owner": "SiamBhau",
  "Telegram": "t.me/SiamBhau",
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
            </div>
          </AnimSection>

          <S1 /><S2 /><S3 /><S4 /><S5 /><S6 /><S7 />
          <S8 /><S9 /><S10 /><S11 /><S12 /><S13 /><S14 />

          <AnimSection>
            <div className="sec-wrap" id="s-regions">
              <h2 className="sec-heading">
                <span className="sec-heading-icon"><Globe size={18} /></span>
                Supported Regions
                <a className="anchor" href="#s-regions"><Hash size={14} /></a>
              </h2>
              <div className="table-wrap">
                <table className="regions-table">
                  <thead><tr><th>Code</th><th>Region</th><th>Location</th></tr></thead>
                  <tbody>
                    {[
                      ['BD','Bangladesh','South Asia'],['IND','India','South Asia'],
                      ['PK','Pakistan','South Asia'],['SG','Singapore','Southeast Asia'],
                      ['ID','Indonesia','Southeast Asia'],['TH','Thailand','Southeast Asia'],
                      ['VN','Vietnam','Southeast Asia'],['TW','Taiwan','East Asia'],
                      ['BR','Brazil','South America'],['SAC','South America','South America'],
                      ['US','United States','North America'],['NA','North America','North America'],
                      ['ME','Middle East','Middle East'],['RU','Russia','CIS'],
                      ['CIS','CIS Countries','CIS'],['EUROPE','Europe','Europe'],
                    ].map(([code, region, loc]) => (
                      <tr key={code}>
                        <td><span className="code-cell">{code}</span></td>
                        <td style={{ fontWeight: 500 }}>{region}</td>
                        <td style={{ color: 'var(--text-muted)' }}>{loc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </AnimSection>

          <AnimSection>
            <div className="sec-wrap" id="s-errors">
              <h2 className="sec-heading">
                <span className="sec-heading-icon"><AlertTriangle size={18} /></span>
                Error Reference
                <a className="anchor" href="#s-errors"><Hash size={14} /></a>
              </h2>
              <div className="table-wrap">
                <table className="error-table">
                  <thead>
                    <tr>
                      <th style={{ textAlign: 'center' }}>HTTP Status</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { code: '200', cls: 'status-200', desc: 'Request completed successfully' },
                      { code: '400', cls: 'status-400', desc: 'Missing or invalid parameter' },
                      { code: '401', cls: 'status-401', desc: 'Invalid JWT or login failed' },
                      { code: '403', cls: 'status-403', desc: 'Invalid / expired / no-access API key' },
                      { code: '404', cls: 'status-404', desc: 'Player or data not found' },
                      { code: '500', cls: 'status-500', desc: 'Internal error or upstream failure' },
                      { code: '502', cls: 'status-502', desc: 'Free Fire server error' },
                      { code: '504', cls: 'status-504', desc: 'Request timeout' },
                    ].map(r => (
                      <tr key={r.code}>
                        <td style={{ textAlign: 'center' }}>
                          <span className={`status-code ${r.cls}`}>{r.code}</span>
                        </td>
                        <td style={{ color: 'var(--text-muted)' }}>{r.desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </AnimSection>

          <AnimSection>
            <div className="sec-wrap" id="s-contact">
              <div className="contact-wrap">
                <div className="contact-title">Get in Touch</div>
                <p className="contact-desc">For API keys, pricing, custom endpoints, or any questions — reach out on Telegram.</p>
                <div className="contact-links">
                  <a className="contact-link tg" href="https://t.me/SiamBhau" target="_blank" rel="noreferrer">
                    <Send size={15} />
                    @SiamBhau on Telegram
                  </a>
                  <a className="contact-link fb" href="https://facebook.com/SiamBhau69" target="_blank" rel="noreferrer">
                    <ExternalLink size={15} />
                    Facebook — SiamBhau69
                  </a>
                  <a className="contact-link web" href="http://siambhau69.eu.cc" target="_blank" rel="noreferrer">
                    <Server size={15} />
                    siambhau69.eu.cc
                  </a>
                </div>
                <p className="copyright">
                  &copy; SiamBhau &middot; Free Fire Centralized API &middot; v5.0 &middot; Unauthorized resale is prohibited.
                </p>
              </div>
            </div>
          </AnimSection>

        </div>
      </main>
    </div>
  )
}

