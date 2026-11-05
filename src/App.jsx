import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, ArrowRight, Search, LayoutDashboard, BookOpen, CalendarDays, Library, Timer, GraduationCap, Bookmark, Plus, X, Menu, Play, Pause, RotateCcw, ExternalLink, ChevronRight, CheckCircle2, Sun, Calculator, Focus, Trash2, LogOut } from 'lucide-react'
import { subjects, resources, milestones, officialDates, officialSubjects, checkedOn, examStart, daysUntil, bestScore } from './dse/data'

const navigation = [ ['home', '學習總覽', LayoutDashboard], ['subjects', '學科資源', BookOpen], ['papers', '歷屆試題', Library], ['schedule', '考試日程', CalendarDays], ['tools', '學習工具', Timer], ['admissions', '升學資訊', GraduationCap], ['saved', '我的收藏', Bookmark] ]
const external = { target: '_blank', rel: 'noopener noreferrer' }
const validSaved = v => Array.isArray(v) && v.every(x => typeof x === 'string')
const validTasks = v => Array.isArray(v) && v.every(x => x && typeof x.id === 'string' && typeof x.text === 'string' && typeof x.done === 'boolean')
function useLocal(key, fallback, validate) {
  const [value, set] = useState(() => { try { const data = JSON.parse(localStorage.getItem(key)); return validate(data) ? data : fallback } catch { return fallback } })
  useEffect(() => { try { localStorage.setItem(key, JSON.stringify(value)) } catch { /* Remain usable in memory if storage is unavailable. */ } }, [key, value])
  return [value, set]
}
function Icon({ icon: Component, ...props }) { return <Component size={20} strokeWidth={1.7} {...props} /> }
function readPage() { return navigation.some(([id]) => id === location.hash.slice(1)) ? location.hash.slice(1) : 'home' }
function hkDay(now) { return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Hong_Kong', year: 'numeric', month: '2-digit', day: '2-digit' }).format(now) }

export default function App() {
  const [page, setPage] = useState(readPage)
  const [menu, setMenu] = useState(false)
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('全部')
  const [saved, setSaved] = useLocal('questech-dse-saved-v1', [], validSaved)
  const [tasks, setTasks] = useLocal('questech-dse-tasks-v1', [], validTasks)
  const [taskText, setTaskText] = useState('')
  const [now, setNow] = useState(() => new Date())
  const searchInput = useRef(null)
  useEffect(() => {
    const changed = () => { setPage(readPage()); setQuery(''); setFilter('全部'); setMenu(false); window.scrollTo({ top: 0 }) }
    const shortcuts = e => { if (e.key === '/' && !/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)) { e.preventDefault(); searchInput.current?.focus() } }
    window.addEventListener('hashchange', changed); window.addEventListener('keydown', shortcuts)
    const interval = setInterval(() => setNow(new Date()), 30000)
    return () => { window.removeEventListener('hashchange', changed); window.removeEventListener('keydown', shortcuts); clearInterval(interval) }
  }, [])
  const go = id => { location.hash = id; setMenu(false); if (id === page) setQuery('') }
  const toggleSave = id => setSaved(old => old.includes(id) ? old.filter(x => x !== id) : [...old, id])
  const matches = item => `${item.name ?? ''} ${item.en ?? ''} ${item.title ?? ''} ${item.description ?? ''} ${item.detail ?? ''}`.toLowerCase().includes(query.trim().toLowerCase())
  const title = navigation.find(([id]) => id === page)?.[1]
  const savedItems = [...subjects.map(s => ({ ...s, title: s.name, detail: s.description, source: s.url.includes('hkeaa') ? '考評局' : 'dse.best' })), ...resources].filter(r => saved.includes(r.id))
  const today = new Intl.DateTimeFormat('zh-HK', { month: 'long', day: 'numeric', weekday: 'long', timeZone: 'Asia/Hong_Kong' }).format(now)
  const hour = Number(new Intl.DateTimeFormat('en-GB', { hour: 'numeric', hourCycle: 'h23', timeZone: 'Asia/Hong_Kong' }).format(now))
  const saveButton = (id, name) => <button className={`save-button ${saved.includes(id) ? 'is-saved' : ''}`} onClick={() => toggleSave(id)} aria-label={`${saved.includes(id) ? '取消收藏' : '收藏'}${name}`} aria-pressed={saved.includes(id)}><Bookmark size={17} fill={saved.includes(id) ? 'currentColor' : 'none'} /></button>
  const resourceList = list => <div className="resource-list">{list.filter(matches).map(r => <article className="resource-row" key={r.id}><span className="resource-symbol"><ExternalLink size={18} /></span><a href={r.url} {...external}><strong>{r.title}</strong><small>{r.detail}</small></a><span className="source-tag">{r.source}</span>{saveButton(r.id, r.title)}</article>)}{list.filter(matches).length === 0 && <Empty text="沒有符合的資源，試試其他關鍵字。" />}</div>
  const subjectGrid = list => <div className="subject-grid">{list.filter(matches).map(s => <article className="subject-card" key={s.id}><div className="subject-card-top"><span className={`subject-mark ${s.color}`}>{s.mark}</span>{saveButton(s.id, s.name)}</div><a href={s.url} {...external}><h3>{s.name}</h3><span className="english-label">{s.en}</span><p>{s.description}</p><span className="subject-link">查看資源 <ArrowUpRight size={16} /></span></a></article>)}{list.filter(matches).length === 0 && <Empty text="找不到這個科目，試試中文或英文名稱。" />}</div>
  const addTask = e => { e.preventDefault(); const text = taskText.trim(); if (text) { setTasks(old => [...old, { id: crypto.randomUUID(), text: text.slice(0, 120), done: false }]); setTaskText('') } }
  const toolNames = ['番茄鐘 專注計時', 'Best 5 Best 6 分數計算機'].filter(s => s.toLowerCase().includes(query.trim().toLowerCase()))
  return <div className="app-shell">
    {menu && <button className="menu-overlay" aria-label="關閉導覽" onClick={() => setMenu(false)} />}
    <aside className={`sidebar ${menu ? 'is-open' : ''}`}>
      <a href="#home" className="brand"><span className="brand-symbol">q<span>.</span></span><span>QuestTech<small>FAMILY DSE SPACE</small></span></a>
      <div className="workspace-label"><span className="online-dot" /> 家庭備試空間 <span>2027</span></div>
      <p className="nav-caption">WORKSPACE</p>
      <nav aria-label="主要導覽">{navigation.map(([id, name, icon]) => <a key={id} href={`#${id}`} className={`nav-item ${page === id ? 'active' : ''}`} aria-current={page === id ? 'page' : undefined} onClick={() => setMenu(false)}><Icon icon={icon} /><span>{name}</span>{id === 'saved' && saved.length > 0 && <b>{saved.length}</b>}{id === page && <span className="nav-dot" />}</a>)}</nav>
      <div className="sidebar-bottom"><div className="quiet-note"><span className="little-spark">✳</span><strong>一步一步，也在前進。</strong><p>把今天能做的事，做好就好。</p></div><a href={officialSubjects} {...external} className="official-link">考評局官方資訊 <ArrowUpRight size={15} /></a><div className="sidebar-foot">為專注而設計 <span>v0.1</span></div></div>
    </aside>
    <div className="main-shell"><header className="topbar"><div className="breadcrumb"><button className="mobile-menu icon-button" aria-label="開啟導覽" onClick={() => setMenu(!menu)}><Menu size={22} /></button><span>家庭備試空間</span><ChevronRight size={14} /><strong>{query.trim() ? '搜尋結果' : title}</strong></div><div className="header-right"><span className="year-label">HKDSE 2027</span><span className="avatar">Q</span><form action="/family/logout" method="post"><button className="icon-button" type="submit" aria-label="退出家庭空間" title="退出家庭空間"><LogOut size={17} /></button></form></div></header>
    <main id="main-content"><div className="page-heading"><div><p className="eyebrow">{page === 'home' ? today : 'YOUR DSE, ALL IN ONE PLACE'}</p><h1>{query.trim() ? '找到下一步' : page === 'home' ? `${hour < 12 ? '早晨' : '你好'}，今天也向目標靠近一點` : title}<span className="heading-dot">.</span></h1><p className="heading-subtitle">{query.trim() ? `搜尋「${query}」的學科與資源` : page === 'home' ? '少一點尋找，多一點專注。你的 DSE 資訊與工具，都在這裡。' : '把需要的資訊整理好，讓每一次溫習更有方向。'}</p></div><span className="heading-stamp"><Sun size={29} />STAY CURIOUS</span></div>
    <div className="search-box"><Search size={20} /><input ref={searchInput} aria-label="搜尋學科、試題或工具" placeholder="搜尋學科、試題或工具…" value={query} onChange={e => setQuery(e.target.value)} />{query ? <button className="icon-button" aria-label="清除搜尋" onClick={() => setQuery('')}><X size={17} /></button> : <kbd>/</kbd>}</div>
    {query.trim() ? <><Section title="學科" count={subjects.filter(matches).length} />{subjectGrid(subjects)}<Section title="工具與資源" count={resources.filter(matches).length + toolNames.length} />{toolNames.map(s => <button className="search-tool-link" key={s} onClick={() => go('tools')}>{s}<ArrowRight size={18} /></button>)}{resourceList(resources)}</> : <>
    {page === 'home' && <>
      <div className="overview-grid"><section className="countdown-card"><div className="countdown-copy"><span className="pill light"><span className="status-dot" /> HKDSE 2027</span><p>距離 DSE 筆試開始</p><div className="big-number">{daysUntil(examStart, now)}<span>天</span></div><a href={officialDates} {...external}>2027 年 4 月 6 日起・考評局日程 <ArrowUpRight size={14} /></a></div><div className="countdown-art" aria-hidden="true"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="art-sun">✳</div><div className="art-caption">ONE DAY<br />AT A TIME.</div><span className="art-circle" /></div></section>
      <section className="focus-card"><div className="mini-heading"><Focus size={18} /><span>給自己一段專注時間</span><span className="tiny-badge">FOCUS</span></div><div className="focus-time">25<span>:00</span></div><p>先放下其他事，從一個番茄鐘開始。</p><button className="primary-button" onClick={() => go('tools')}><Play size={15} fill="currentColor" /> 開始專注 <ArrowRight size={16} /></button></section></div>
      <Section title="常用工具" subtitle="從溫習到升學，少走一點彎路。" /><div className="quick-grid">{[[Calculator, '分數計算', 'Best 5 / Best 6', 'tools', 'mint'], [CalendarDays, '考試時間表', '掌握重要日程', 'schedule', 'sand'], [Library, '歷屆試題', '按科目查找練習', 'papers', 'blue'], [GraduationCap, 'JUPAS 升學', '探索下一站', 'admissions', 'lavender']].map(([icon, name, desc, target, color]) => <button key={name} className="quick-card" onClick={() => go(target)}><span className={`quick-icon ${color}`}><Icon icon={icon} /></span><div><strong>{name}</strong><small>{desc}</small></div><ArrowUpRight size={17} /></button>)}</div>
      <Section title="學科資源" subtitle="回到你正在努力的那一科。" action="全部學科" onAction={() => go('subjects')} />{subjectGrid(subjects.filter(s => ['chinese', 'english', 'mathematics', 'physics', 'chemistry', 'm2'].includes(s.id)))}
      <div className="bottom-grid"><section className="white-panel"><div className="panel-heading"><h2>我的溫習清單 <span className="count-badge">{tasks.filter(t => t.done).length}/{tasks.length}</span></h2><CheckCircle2 size={19} /></div>{tasks.length === 0 && <p className="task-empty">今天想完成哪件小事？加進清單，從這裡開始。</p>}<ul className="task-list">{tasks.map(t => <li key={t.id}><label><input type="checkbox" checked={t.done} onChange={() => setTasks(old => old.map(x => x.id === t.id ? { ...x, done: !x.done } : x))} /><span className={t.done ? 'completed' : ''}>{t.text}</span></label><button className="icon-button" aria-label={`移除${t.text}`} onClick={() => setTasks(old => old.filter(x => x.id !== t.id))}><Trash2 size={14} /></button></li>)}</ul><form className="task-form" onSubmit={addTask}><input aria-label="新增溫習事項" placeholder="加一項今天的目標…" maxLength={120} value={taskText} onChange={e => setTaskText(e.target.value)} /><button type="submit" aria-label="新增目標" disabled={!taskText.trim()}><Plus size={18} /></button></form></section><section className="white-panel next-dates"><div className="panel-heading"><h2>接下來的重要日子</h2><CalendarDays size={18} /></div>{milestones.filter(m => (m.end || m.date) >= hkDay(now)).slice(0, 2).map(m => <div className="next-date" key={m.title}><div className="date-block"><small>{Number(m.date.slice(5, 7))}月</small><strong>{m.date.slice(8)}</strong></div><div><strong>{m.title}</strong><small>{m.end ? `至 ${m.end.replaceAll('-', '/')} ` : ''}{m.tentative ? '・暫定' : '・官方公布'}</small></div></div>)}<button className="text-button" onClick={() => go('schedule')}>查看完整日程 <ArrowRight size={15} /></button></section></div>
      <div className="bookmark-strip"><Bookmark size={18} /><strong>隨手收藏，下次更快找到。</strong><span>{saved.length ? `已收藏 ${saved.length} 項資源` : '點擊卡片右上角的書籤，建立你的常用清單。'}</span><button onClick={() => go('saved')}>我的收藏 <ArrowRight size={15} /></button></div>
    </>}
    {page === 'subjects' && <><div className="filter-row">{['全部', '核心科目', '選修科目'].map(f => <button className={filter === f ? 'selected' : ''} key={f} onClick={() => setFilter(f)}>{f}</button>)}</div><p className="info-note">資源卡片連往考評局或 dse.best；試題與筆記由來源網站提供。</p>{subjectGrid(subjects.filter(s => filter === '全部' || s.group === filter))}<a className="official-banner" href={officialSubjects} {...external}><BookOpen size={23} /><div><strong>其他學科與完整考核資訊</strong><p>到考評局查看所有甲類科目的官方資料。</p></div><ArrowUpRight /></a></>}
    {page === 'papers' && <><div className="callout"><Library size={25} /><div><strong>按學科找試題，按需要練習。</strong><p>首版整理外部試題索引，不託管試卷。年份、答案與下載情況請在來源網站確認。</p></div></div><Section title="試題學科入口" />{subjectGrid(subjects)}<Section title="官方考核資料" />{resourceList(resources.filter(r => r.id === 'official-subjects'))}</>}
    {page === 'schedule' && <><div className="callout"><CalendarDays size={25} /><div><strong>2027 DSE 重要日期</strong><p>按考評局資料整理，核對於 {checkedOn}。「暫定」安排可能調整，各科時間及考場以准考證為準。</p></div><a href={officialDates} {...external}>核對原文 <ArrowUpRight size={16} /></a></div><div className="timeline">{milestones.map(m => <article key={m.title} className="timeline-row"><span className="timeline-dot" /><div className="timeline-date">{m.date.replaceAll('-', '/')} {m.end && <small>— {m.end.replaceAll('-', '/')}</small>}</div><div><span className="muted-label">{m.type}</span><h3>{m.title}</h3></div><span className={`pill ${m.tentative ? 'tentative' : 'confirmed'}`}>{m.tentative ? '暫定' : '已公布'}</span></article>)}</div><a className="official-banner" href="https://www.hkeaa.edu.hk/tc/hkdse/admin/exam_timetable/" {...external}><CalendarDays /><div><strong>查看各科考試時間表</strong><p>前往考評局查看最新版本及更新通告。</p></div><ArrowUpRight /></a></>}
    {page === 'tools' && <><div className="tools-grid"><FocusTimer /><ScoreCalculator /></div><Section title="更多備試工具" subtitle="外部資源會在新分頁開啟。" />{resourceList(resources.filter(r => r.category === '延伸工具'))}</>}
    {page === 'admissions' && <><div className="callout"><GraduationCap size={27} /><div><strong>先了解課程，再看自己的選擇。</strong><p>不同院校的計分比重及科目要求不同。Best 5／Best 6 只作一般加總，不等同任何課程的收生分數。</p></div></div>{resourceList(resources.filter(r => r.category === '升學資訊'))}<div className="admission-note">{[['01', '從興趣出發', '先看學科內容、修讀方向與課程結構。'], ['02', '核對課程要求', '以當年度 JUPAS 及院校公布為準。'], ['03', '整理申請排序', '綜合個人成績與志願，整理適合自己的選擇。']].map(([n, t, d]) => <div key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></div>)}</div></>}
    {page === 'saved' && <><p className="info-note">收藏保存在目前的瀏覽器，不會同步到其他裝置。</p>{savedItems.length ? resourceList(savedItems) : <Empty text="還沒有收藏。到學科資源或工具列表，點一下書籤就能加進來。" action="瀏覽學科資源" onAction={() => go('subjects')} />}</>}
    {['papers', 'subjects'].includes(page) && <><Section title="其他學習資源" />{resourceList(resources.filter(r => ['學科資源', '考試資訊'].includes(r.category)))}</>}
    </>}
    <footer><span><b>QuestTech</b> · 家庭專用 DSE 備試空間</span><span>收藏與清單只存於本機 <span className="footer-dot">·</span> 資訊以官方最新公布為準</span></footer></main></div>
  </div>
}
function Section({ title, subtitle, action, onAction, count }) { return <div className="section-heading"><div><h2>{title}{count !== undefined && <span className="count-badge">{count}</span>}</h2>{subtitle && <p>{subtitle}</p>}</div>{action && <button className="text-button" onClick={onAction}>{action}<ArrowRight size={15} /></button>}</div> }
function Empty({ text, action, onAction }) { return <div className="empty-state"><Bookmark size={28} /><p>{text}</p>{action && <button className="primary-button" onClick={onAction}>{action}<ArrowRight size={15} /></button>}</div> }
function FocusTimer() {
  const [minutes, setMinutes] = useState(25)
  const [seconds, setSeconds] = useState(1500)
  const [endAt, setEndAt] = useState(null)
  const [finished, setFinished] = useState(false)
  const total = minutes * 60
  useEffect(() => {
    if (!endAt) return
    const interval = setInterval(() => { const remain = Math.max(0, Math.ceil((endAt - Date.now()) / 1000)); setSeconds(remain); if (remain === 0) { setEndAt(null); setFinished(true) } }, 250)
    return () => clearInterval(interval)
  }, [endAt])
  const change = m => { setMinutes(m); setSeconds(m * 60); setEndAt(null); setFinished(false) }
  return <section className="white-panel timer-panel"><div className="panel-heading"><h2><Timer size={20} /> 專注計時</h2><span className="pill confirmed">站內工具</span></div><div className="timer-tabs">{[[25, '專注 25 分'], [5, '休息 5 分'], [50, '深度 50 分']].map(([m, label]) => <button className={m === minutes ? 'selected' : ''} key={m} onClick={() => change(m)}>{label}</button>)}</div><div className="timer-face" style={{ '--progress': `${(total - seconds) / total * 360}deg` }}><div><span>{String(Math.floor(seconds / 60)).padStart(2, '0')}<small>:{String(seconds % 60).padStart(2, '0')}</small></span><p role="status">{finished ? '這一段努力，完成了。' : endAt ? '專注在眼前這一件事。' : '準備好了，就開始吧。'}</p></div></div><div className="timer-actions"><button className="primary-button" onClick={() => { if (endAt) { setSeconds(Math.max(0, Math.ceil((endAt - Date.now()) / 1000))); setEndAt(null) } else { const remain = seconds || total; setSeconds(remain); setFinished(false); setEndAt(Date.now() + remain * 1000) } }}>{endAt ? <Pause size={17} /> : <Play size={17} />}{endAt ? '暫停' : finished ? '再來一次' : '開始計時'}</button><button className="secondary-button" aria-label="重設計時" onClick={() => change(minutes)}><RotateCcw size={17} /></button></div><label className="custom-timer">操卷／自訂時間<input type="number" min="1" max="300" value={minutes} aria-label="自訂計時分鐘" onChange={e => { const value = Number(e.target.value); if (Number.isInteger(value) && value >= 1 && value <= 300) change(value) }} />分鐘</label><p className="small-note">切換頁面會重設計時；本頁保持開啟即可。時間以本機時鐘計算。</p></section>
}
function ScoreCalculator() {
  const [grades, setGrades] = useState(['', '', '', '', '', '', ''])
  const [best, setBest] = useState(5)
  const labels = ['中國語文', '英國語文', '數學', '選修科目一', '選修科目二', '選修科目三', '其他／M1／M2']
  const result = bestScore(grades, best)
  return <section className="white-panel score-panel"><div className="panel-heading"><h2><Calculator size={20} /> Best 5 / Best 6</h2><span className="pill confirmed">站內工具</span></div><p className="small-note">一般 7 分制：5**＝7、5*＝6、5＝5，其餘按等級計分。</p><div className="timer-tabs">{[5, 6].map(n => <button className={best === n ? 'selected' : ''} key={n} onClick={() => setBest(n)}>Best {n}</button>)}</div><div className="grade-inputs">{grades.map((g, i) => <label key={i}>{labels[i]}<select aria-label={`${labels[i]}成績`} value={g} onChange={e => setGrades(old => old.map((x, j) => i === j ? e.target.value : x))}>{['', 'U', '1', '2', '3', '4', '5', '5*', '5**'].map(v => <option key={v} value={v}>{v || '選擇等級'}</option>)}</select></label>)}</div><div className="score-result"><div><span>BEST {best} 總分</span><p>{result.count < best ? `已輸入 ${result.count} 科，尚需 ${best - result.count} 科` : `按最高 ${best} 科加總`}</p></div><strong>{result.count >= best ? result.score : '—'}<small> / {best * 7}</small></strong></div><p className="small-note">公民科不納入本計算。未套用院校加權、核心科門檻或科目組合限制；不代表取錄機會。</p></section>
}
