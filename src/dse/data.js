export const officialDates = 'https://www.hkeaa.edu.hk/en/hkdse/Event_timetable/'
export const officialSubjects = 'https://www.hkeaa.edu.hk/tc/hkdse/assessment/subject_information/'
// Family-selected countdown target, not an official published timetable.
export const examStart = '2028-04-06'
export const checkedOn = '2026-11-04'

export const subjects = [
  { id: 'chinese', name: '中國語文', en: 'Chinese Language', mark: '文', group: '核心科目', color: 'peach', description: '閱讀、寫作與指定篇章', url: 'https://dse.best/chinese' },
  { id: 'english', name: '英國語文', en: 'English Language', mark: 'Aa', group: '核心科目', color: 'blue', description: '閱讀、寫作、聆聽與口試', url: 'https://dse.best/english' },
  { id: 'mathematics', name: '數學', en: 'Mathematics', mark: 'π', group: '核心科目', color: 'green', description: '必修部分與解題練習', url: 'https://dse.best/math' },
  { id: 'citizenship', name: '公民與社會發展', en: 'Citizenship & Social Development', mark: '社', group: '核心科目', color: 'sand', description: '課程框架與考核資訊', url: officialSubjects },
  { id: 'physics', name: '物理', en: 'Physics', mark: 'Φ', group: '選修科目', color: 'lavender', description: '力學、電磁學與實驗分析', url: 'https://dse.best/physics' },
  { id: 'chemistry', name: '化學', en: 'Chemistry', mark: 'H₂', group: '選修科目', color: 'mint', description: '化學反應、計算與實驗', url: 'https://dse.best/chemistry' },
  { id: 'biology', name: '生物', en: 'Biology', mark: '葉', group: '選修科目', color: 'green', description: '生命系統與數據分析', url: 'https://dse.best/biology' },
  { id: 'm2', name: '數學延伸 M2', en: 'Algebra & Calculus', mark: '∫', group: '選修科目', color: 'blue', description: '代數、微積分與推理', url: officialSubjects },
  { id: 'ict', name: '資訊及通訊科技', en: 'ICT', mark: '</>', group: '選修科目', color: 'sand', description: '資訊處理、編程與系統', url: officialSubjects },
  { id: 'economics', name: '經濟', en: 'Economics', mark: '↗', group: '選修科目', color: 'peach', description: '微觀、宏觀與應用分析', url: officialSubjects },
]

export const resources = [
  { id: 'official-subjects', title: '考評局學科資料', detail: '課程、考核模式與各科官方資料', category: '考試資訊', url: officialSubjects, source: '考評局' },
  { id: 'dates', title: '2027 重要日期', detail: '報考、考試與放榜日程', category: '考試資訊', url: officialDates, source: '考評局' },
  { id: 'papers', title: '歷屆試題與資源', detail: '從參考站的科目入口查找試題', category: '歷屆試題', url: 'https://dse.best/', source: 'dse.best' },
  { id: 'physics-papers', title: '物理試題索引', detail: '按年份及課題查找物理練習', category: '歷屆試題', url: 'https://dse.best/physics', source: 'dse.best' },
  { id: 'chem-papers', title: '化學試題索引', detail: '按科目查找化學備試資料', category: '歷屆試題', url: 'https://dse.best/chemistry', source: 'dse.best' },
  { id: 'chinese-texts', title: '中文指定篇章', detail: '到參考站查閱篇章知識與練習', category: '學科資源', url: 'https://dse.best/12p', source: 'dse.best' },
  { id: 'vocab', title: '英文詞彙庫', detail: '英文詞彙與溫習資源', category: '學科資源', url: 'https://dse.best/vocab', source: 'dse.best' },
  { id: 'speaking', title: '英文口試練習', detail: '個人短講練習入口', category: '學科資源', url: 'https://dse.best/individual-response', source: 'dse.best' },
  { id: 'cutoffs', title: '歷年等級分界參考', detail: '非官方彙整；與大學收生分數不同', category: '考試資訊', url: 'https://dse.best/cutoff', source: 'dse.best' },
  { id: 'jupas', title: 'JUPAS 官方資訊', detail: '課程搜尋、申請程序與最新公布', category: '升學資訊', url: 'https://www.jupas.edu.hk/tc/', source: 'JUPAS' },
  { id: 'jupas-calc', title: 'JUPAS 計算機參考', detail: '外部工具；結果不是取錄保證', category: '升學資訊', url: 'https://dse.best/jupas/calculator', source: 'dse.best' },
  { id: 'fields', title: '學科範疇探索', detail: '了解不同大學學科與課程方向', category: '升學資訊', url: 'https://dse.best/jupas/field', source: 'dse.best' },
  { id: 'mc', title: '選擇題答案檢查', detail: '參考站的 MC 核對工具', category: '延伸工具', url: 'https://dse.best/mc-checker', source: 'dse.best' },
  { id: 'study-spots', title: '自修地點地圖', detail: '找一個適合自己的溫習位置', category: '延伸工具', url: 'https://dse.best/study-spots', source: 'dse.best' },
  { id: 'writing-en', title: '英文寫作批改參考', detail: '外部 AI 工具；使用前查看其私隱條款', category: '延伸工具', url: 'https://dse.best/grader/english', source: 'dse.best' },
  { id: 'writing-zh', title: '中文寫作批改參考', detail: '外部 AI 工具；使用前查看其私隱條款', category: '延伸工具', url: 'https://dse.best/grader/chinese', source: 'dse.best' },
]

export const milestones = [
  { date: '2026-11-16', end: '2026-12-04', title: '遲報名／更改報考科目', type: '報考安排', tentative: true },
  { date: '2026-11-30', title: '退考申請截止', type: '報考安排' },
  { date: '2027-03-09', end: '2027-03-18', title: '英國語文口試', type: '考試日程', tentative: true },
  { date: '2027-04-06', end: '2027-05-03', title: '甲類科目筆試', type: '考試日程', tentative: true },
  { date: '2027-07-14', title: 'DSE 成績公布', type: '放榜安排', tentative: true },
]

export function daysUntil(date, now = new Date()) {
  const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Hong_Kong', year: 'numeric', month: '2-digit', day: '2-digit' }).format(now)
  return Math.max(0, Math.round((Date.parse(date + 'T00:00:00+08:00') - Date.parse(today + 'T00:00:00+08:00')) / 86400000))
}

export function bestScore(grades, count = 5) {
  const points = { '5**': 7, '5*': 6, '5': 5, '4': 4, '3': 3, '2': 2, '1': 1, U: 0 }
  const valid = grades.filter(g => g in points).map(g => points[g]).sort((a, b) => b - a)
  return { score: valid.slice(0, count).reduce((a, b) => a + b, 0), count: Math.min(valid.length, count) }
}
