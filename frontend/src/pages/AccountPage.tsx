import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { clearAuthToken, clearUserData, getUserData } from '../api/auth'

// ── SectionCard ──────────────────────────────────────────
function SectionCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white rounded-2xl p-6 ${className}`}>
      {children}
    </div>
  )
}

// ── PageHeader ───────────────────────────────────────────
function PageHeader({ profile }: { profile: { fullName: string; avatar: string; role?: string } }) {
  const navigate = useNavigate()
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  function logout() {
    clearAuthToken()
    clearUserData()
    navigate('/login')
  }

  const userRole = profile.role || 'User'

  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>
        <p className="text-gray-500 mt-1">Manage your profile and security</p>
      </div>
      <div className="flex items-center gap-4">
        <button className="relative p-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.437L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <div className="flex items-center gap-3">
          <img
            src={mounted ? (profile.avatar || 'https://i.pravatar.cc/150?img=68') : 'https://i.pravatar.cc/150?img=68'}
            alt={profile.fullName}
            className="rounded-full object-cover w-[40px] h-[40px]"
          />
          <span className="font-medium text-gray-900">{profile.fullName}</span>
          <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">{userRole}</span>
        </div>
        <button onClick={logout} className="text-sm text-red-500 hover:underline">Logout</button>
      </div>
    </div>
  )
}

// ── PersonalInfoForm ─────────────────────────────────────
function PersonalInfoForm({ userData }: { userData: { fullName: string; email: string; phoneNumber?: string; role?: string; avatar?: string } }) {
  const [form, setForm] = useState({
    fullName: userData.fullName,
    email: userData.email,
    phone: userData.phoneNumber || '',
    dob: '',
    bio: '',
    avatar: userData.avatar || '',
  })
  const [saved, setSaved] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Load editable profile data (bio, dob, avatar) from localStorage if exists
    const stored = localStorage.getItem('profileData')
    if (stored) {
      const data = JSON.parse(stored)
      setForm(prev => ({ ...prev, bio: data.bio || '', dob: data.dob || '', avatar: data.avatar || '' }))
    }
    setMounted(true)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setSaved(false)
  }

  const handleSave = () => {
    // Save only editable fields to localStorage
    const profileData = {
      fullName: form.fullName,
      email: form.email,
      phone: form.phone,
      bio: form.bio,
      dob: form.dob,
      avatar: form.avatar,
    }
    localStorage.setItem('profileData', JSON.stringify(profileData))
    setSaved(true)
  }

  const handleCancel = () => {
    const stored = localStorage.getItem('profileData')
    if (stored) {
      const data = JSON.parse(stored)
      setForm(prev => ({ ...prev, bio: data.bio || '', dob: data.dob || '', avatar: data.avatar || '' }))
    }
    setSaved(false)
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setForm((prev) => ({ ...prev, avatar: reader.result as string }))
    reader.readAsDataURL(file)
  }

  return (
    <SectionCard>
      <h2 className="text-lg font-bold text-gray-900">Personal Information</h2>
      <p className="text-sm text-gray-500 mt-1 mb-6">Update your personal information and how others see you.</p>
      <div className="flex gap-8">
        <div className="flex flex-col items-center gap-2 min-w-[120px]">
          <div className="relative">
            <img
              src={mounted ? (form.avatar || 'https://i.pravatar.cc/150?img=68') : 'https://i.pravatar.cc/150?img=68'}
              alt="Profile"
              className="rounded-full object-cover w-[90px] h-[90px]"
            />
            <label className="absolute bottom-0 right-0 w-7 h-7 bg-green-700 rounded-full flex items-center justify-center cursor-pointer hover:bg-green-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
            </label>
          </div>
          <p className="font-semibold text-sm text-gray-900">{form.fullName}</p>
          <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">{userData.role || 'User'}</span>
          <p className="text-xs text-gray-500">{form.email}</p>
          <p className="text-xs text-gray-500">{form.phone || 'N/A'}</p>
        </div>
        <div className="flex-1 grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Full Name</label>
            <input type="text" name="fullName" value={form.fullName} onChange={handleChange} className="border border-gray-200 rounded-lg px-4 py-2 text-sm outline-none focus:border-green-500" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Email address</label>
            <input type="email" name="email" value={form.email} disabled className="border border-gray-200 rounded-lg px-4 py-2 text-sm outline-none focus:border-green-500 bg-gray-50 text-gray-600" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Phone Number</label>
            <input type="tel" name="phone" value={form.phone} disabled className="border border-gray-200 rounded-lg px-4 py-2 text-sm outline-none focus:border-green-500 bg-gray-50 text-gray-600" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Date of Birth</label>
            <input type="text" name="dob" value={form.dob} onChange={handleChange} className="border border-gray-200 rounded-lg px-4 py-2 text-sm outline-none focus:border-green-500" />
          </div>
          <div className="flex flex-col gap-1 col-span-2">
            <label className="text-sm font-medium text-gray-700">Bio</label>
            <textarea name="bio" value={form.bio} onChange={handleChange} rows={3} className="border border-gray-200 rounded-lg px-4 py-2 text-sm outline-none focus:border-green-500 resize-none" />
          </div>
          <div className="col-span-2 flex justify-end items-center gap-3 mt-2">
            {saved && <span className="text-sm text-green-600 font-medium">Changes saved!</span>}
            <button onClick={handleCancel} className="px-6 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
            <button onClick={handleSave} className="px-6 py-2 rounded-lg bg-green-700 text-white text-sm font-semibold hover:bg-green-800">Save Changes</button>
          </div>
        </div>
      </div>
    </SectionCard>
  )
}

// ── ProfilePreview ───────────────────────────────────────
function ProfilePreview({ profile }: { profile: { fullName: string; bio: string; avatar: string } }) {
  return (
    <SectionCard>
      <h2 className="text-lg font-bold text-gray-900">Profile Preview</h2>
      <p className="text-sm text-gray-500 mt-1 mb-6">This is how your profile will appear to other users</p>
      <div className="border border-gray-200 rounded-xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img src={profile.avatar || 'https://i.pravatar.cc/150?img=68'} alt={profile.fullName} className="rounded-full object-cover w-[56px] h-[56px]" />
          <div>
            <p className="font-semibold text-gray-900">{profile.fullName}</p>
            <p className="text-sm text-gray-500">{profile.bio}</p>
          </div>
        </div>
        <div className="flex gap-8 text-sm">
          <div className="flex flex-col gap-1">
            <span className="text-gray-500">Member since</span>
            <span className="font-semibold text-gray-900">📅 Jan, 2025</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-gray-500">Total transactions</span>
            <span className="font-bold text-gray-900">1,486</span>
          </div>
        </div>
      </div>
    </SectionCard>
  )
}

// ── AccountSummary ───────────────────────────────────────
const loginHistory = [
  { date: 'May 26, 2026', device: 'Chrome • Windows' },
  { date: 'May 22, 2026', device: 'Safari • iPhone' },
  { date: 'May 18, 2026', device: 'Chrome • Windows' },
]

function AccountSummary() {
  const [showHistory, setShowHistory] = useState(false)
  const [sessionTime, setSessionTime] = useState(0)
  const [securityScore, setSecurityScore] = useState(0)
  const [showScoreTips, setShowScoreTips] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => setSessionTime((prev) => prev + 1), 60000)
    const stored = localStorage.getItem('profileData')
    if (stored) {
      const data = JSON.parse(stored)
      let score = 40
      if (data.fullName) score += 10
      if (data.email) score += 15
      if (data.phone) score += 15
      if (data.bio) score += 10
      if (data.avatar) score += 10
      setSecurityScore(score)
    } else {
      setSecurityScore(40)
    }
    return () => clearInterval(timer)
  }, [])

  const formatSession = () => {
    if (sessionTime < 1) return 'Just started'
    if (sessionTime === 1) return 'Active for 1 min'
    return `Active for ${sessionTime} mins`
  }

  const scoreColor = securityScore >= 80 ? 'bg-green-500' : securityScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
  const scoreLabel = securityScore >= 80 ? 'Strong' : securityScore >= 60 ? 'Fair' : 'Weak'
  const scoreTextColor = securityScore >= 80 ? 'text-green-600' : securityScore >= 60 ? 'text-yellow-600' : 'text-red-600'

  return (
    <SectionCard>
      <h2 className="text-lg font-bold text-gray-900 mb-4">Account Summary</h2>
      <div className="flex flex-col gap-4">
        {[
          { label: 'Account Type', value: 'Administrator', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
          { label: 'Last Login', value: 'Today', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
          { label: 'Member Since', value: 'Jan, 2025', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
        ].map((item) => (
          <div key={item.label} className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
              </svg>
              {item.label}
            </div>
            <span className="text-sm font-bold text-gray-900">{item.value}</span>
          </div>
        ))}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Account Status
          </div>
          <span className="flex items-center gap-1 text-sm font-bold text-green-600">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>Active
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Session
          </div>
          <span className="text-sm font-bold text-green-600">{formatSession()}</span>
        </div>

        <div>
          <button onClick={() => setShowHistory(!showHistory)} className="text-xs text-green-700 font-semibold hover:underline">
            {showHistory ? 'Hide login history' : 'View login history'}
          </button>
          {showHistory && (
            <div className="mt-2 flex flex-col gap-2">
              {loginHistory.map((log, i) => (
                <div key={i} className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2">
                  <span className="text-xs text-gray-600">{log.device}</span>
                  <span className="text-xs text-gray-400">{log.date}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border-t border-gray-100 pt-4">
          <div className="flex items-center justify-between cursor-pointer" onClick={() => setShowScoreTips(!showScoreTips)}>
            <span className="text-sm text-gray-600 font-medium">Security Score</span>
            <span className={`text-sm font-bold ${scoreTextColor}`}>{securityScore}% • {scoreLabel}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div className={`${scoreColor} h-2 rounded-full transition-all duration-500`} style={{ width: `${securityScore}%` }} />
          </div>
          {showScoreTips && (
            <div className="mt-3 flex flex-col gap-2">
              {[
                { label: 'Profile photo added', done: true },
                { label: 'Phone number added', done: true },
                { label: 'Bio completed', done: true },
                { label: 'Two-factor authentication', done: false },
                { label: 'Email verified', done: false },
              ].map((tip, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${tip.done ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                    {tip.done ? '✓' : '○'}
                  </span>
                  <span className={`text-xs ${tip.done ? 'text-gray-700' : 'text-gray-400'}`}>{tip.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </SectionCard>
  )
}

// ── TransactionsCard ─────────────────────────────────────
const monthlyData = [
  { month: 'Jan', height: 42, count: 98, funding: 60, store: 38 },
  { month: 'Feb', height: 26, count: 62, funding: 40, store: 22 },
  { month: 'Mar', height: 35, count: 84, funding: 50, store: 34 },
  { month: 'Apr', height: 31, count: 74, funding: 45, store: 29 },
  { month: 'May', height: 44, count: 112, funding: 70, store: 42 },
  { month: 'Jun', height: 0, count: 0, funding: 0, store: 0 },
  { month: 'Jul', height: 0, count: 0, funding: 0, store: 0 },
  { month: 'Aug', height: 0, count: 0, funding: 0, store: 0 },
  { month: 'Sep', height: 0, count: 0, funding: 0, store: 0 },
  { month: 'Oct', height: 0, count: 0, funding: 0, store: 0 },
  { month: 'Nov', height: 0, count: 0, funding: 0, store: 0 },
  { month: 'Dec', height: 0, count: 0, funding: 0, store: 0 },
]

const weeklyData = [
  { month: 'Wk1', height: 30, count: 28, funding: 18, store: 10 },
  { month: 'Wk2', height: 44, count: 42, funding: 28, store: 14 },
  { month: 'Wk3', height: 35, count: 32, funding: 20, store: 12 },
  { month: 'Wk4', height: 25, count: 24, funding: 15, store: 9 },
]

function TransactionsCard() {
  const [view, setView] = useState<'monthly' | 'weekly'>('monthly')
  const [tooltip, setTooltip] = useState<number | null>(null)
  const [breakdown, setBreakdown] = useState<number | null>(null)

  const data = view === 'monthly' ? monthlyData : weeklyData
  const activeData = data.filter((d) => d.count > 0)
  const bestMonth = activeData.reduce((a, b) => (a.count > b.count ? a : b), activeData[0])
  const thisMonth = monthlyData[4]

  return (
    <SectionCard>
      <div className="flex items-start justify-between mb-2">
        <h2 className="text-lg font-bold text-gray-900">Total Transactions</h2>
        <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">+16%</span>
      </div>
      <p className="text-4xl font-bold text-red-600">1,486</p>
      <p className="text-sm text-gray-500 mt-1">across all time</p>
      <div className="flex gap-4 mt-3 mb-4">
        <div className="bg-red-50 rounded-lg px-3 py-2 flex-1">
          <p className="text-xs text-gray-500">This month</p>
          <p className="text-sm font-bold text-red-600">{thisMonth.count} transactions</p>
        </div>
        <div className="bg-green-50 rounded-lg px-3 py-2 flex-1">
          <p className="text-xs text-gray-500">Best month</p>
          <p className="text-sm font-bold text-green-600">{bestMonth?.month} ({bestMonth?.count})</p>
        </div>
      </div>
      <div className="flex gap-2 mb-4">
        <button onClick={() => { setView('monthly'); setBreakdown(null) }} className={`text-xs px-3 py-1 rounded-full font-medium transition-colors ${view === 'monthly' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-500'}`}>Monthly</button>
        <button onClick={() => { setView('weekly'); setBreakdown(null) }} className={`text-xs px-3 py-1 rounded-full font-medium transition-colors ${view === 'weekly' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-500'}`}>Weekly</button>
      </div>
      <div className="flex items-end gap-1 h-11 relative">
        {data.map((item, index) => (
          <div key={item.month} className="flex-1 flex flex-col items-center relative"
            onMouseEnter={() => item.count > 0 && setTooltip(index)}
            onMouseLeave={() => setTooltip(null)}
            onClick={() => item.count > 0 && setBreakdown(breakdown === index ? null : index)}
          >
            {tooltip === index && item.count > 0 && (
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap z-10">
                {item.count} transactions
              </div>
            )}
            {item.height > 0 ? (
              <div style={{ height: `${item.height}px` }} className={`w-full rounded-t-sm cursor-pointer transition-all ${breakdown === index ? 'bg-red-800' : item.month === bestMonth?.month ? 'bg-red-600' : 'bg-red-200'}`} />
            ) : (
              <div className="w-full border-t-2 border-dashed border-gray-300 mt-auto" />
            )}
          </div>
        ))}
      </div>
      <div className="flex gap-1 mt-2">
        {data.map((item) => (
          <div key={item.month} className="flex-1 text-center">
            <span className="text-[10px] text-gray-400">{item.month}</span>
          </div>
        ))}
      </div>
      {breakdown !== null && data[breakdown].count > 0 && (
        <div className="mt-4 bg-gray-50 rounded-xl p-4 border border-gray-200">
          <p className="text-sm font-bold text-gray-800 mb-3">{data[breakdown].month} Breakdown</p>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                <span className="text-xs text-gray-600">Wallet Funding</span>
              </div>
              <span className="text-xs font-semibold text-gray-800">{data[breakdown].funding}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${(data[breakdown].funding / data[breakdown].count) * 100}%` }} />
            </div>
            <div className="flex items-center justify-between mt-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                <span className="text-xs text-gray-600">Store Payments</span>
              </div>
              <span className="text-xs font-semibold text-gray-800">{data[breakdown].store}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: `${(data[breakdown].store / data[breakdown].count) * 100}%` }} />
            </div>
          </div>
        </div>
      )}
    </SectionCard>
  )
}

// ── HelpSupport ──────────────────────────────────────────
function HelpSupport({ onOpenChat }: { onOpenChat: () => void }) {
  return (
    <SectionCard>
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-bold text-gray-900">Help & support</h2>
          <p className="text-sm text-gray-500">Need help with your account?</p>
          <p className="text-sm text-gray-500">Our support team is here to help.</p>
          <button onClick={onOpenChat} className="mt-2 flex items-center gap-2 bg-green-700 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-green-800 w-fit">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Contact Support
          </button>
        </div>
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
      </div>
    </SectionCard>
  )
}

// ── ChatWidget ───────────────────────────────────────────
function ChatWidget({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState([
    { from: 'support', text: 'Hi! 👋 How can we help you today?' },
  ])
  const [input, setInput] = useState('')

  const handleSend = () => {
    if (!input.trim()) return
    setMessages((prev) => [...prev, { from: 'user', text: input }])
    setInput('')
    setTimeout(() => {
      setMessages((prev) => [...prev, { from: 'support', text: "Thanks for reaching out! Our team will get back to you shortly." }])
    }, 1000)
  }

  return (
    <>
      <button onClick={onClose} className="fixed bottom-6 right-6 w-14 h-14 bg-green-700 rounded-full flex items-center justify-center shadow-lg hover:bg-green-800 transition-colors z-50">
        {open ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>
      {open && (
        <div className="fixed bottom-24 right-6 w-80 bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border border-gray-200">
          <div className="bg-green-700 px-4 py-3 flex items-center gap-3">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <div>
              <p className="text-white text-sm font-semibold">Vale Support</p>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 bg-green-300 rounded-full"></span>
                <p className="text-green-200 text-xs">Online</p>
              </div>
            </div>
          </div>
          <div className="flex-1 p-4 flex flex-col gap-3 overflow-y-auto max-h-64">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[75%] px-3 py-2 rounded-2xl text-sm ${msg.from === 'user' ? 'bg-green-700 text-white rounded-tr-none' : 'bg-gray-100 text-gray-800 rounded-tl-none'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-200 p-3 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type a message..."
              className="flex-1 text-sm px-3 py-2 border border-gray-200 rounded-lg outline-none focus:border-green-500"
            />
            <button onClick={handleSend} className="w-8 h-8 bg-green-700 rounded-lg flex items-center justify-center hover:bg-green-800 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  )
}

// ── Main Page ────────────────────────────────────────────
export default function AccountPage() {
  const navigate = useNavigate()
  const [userData, setUserData] = useState<{ fullName: string; email: string; phoneNumber?: string; role?: string; avatar?: string } | null>(null)
  const [profile, setProfile] = useState({
    fullName: '',
    bio: '',
    avatar: '',
  })
  const [chatOpen, setChatOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load authenticated user data
    const authUser = getUserData()
    if (!authUser) {
      // Not logged in, redirect to login
      navigate('/login')
      return
    }
    
    setUserData(authUser)
    
    // Load editable profile data from localStorage
    const stored = localStorage.getItem('profileData')
    if (stored) {
      const data = JSON.parse(stored)
      setProfile({ fullName: authUser.fullName, bio: data.bio || '', avatar: data.avatar || '' })
    } else {
      setProfile({ fullName: authUser.fullName, bio: '', avatar: '' })
    }
    
    setLoading(false)
  }, [navigate])

  if (loading || !userData) {
    return <div className="min-h-screen bg-gray-100 p-8 flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <PageHeader profile={{ ...profile, role: userData.role }} />
      <div className="max-w-7xl mx-auto grid grid-cols-[1fr_340px] gap-6">
        <div className="flex flex-col gap-6">
          <PersonalInfoForm userData={userData} />
          <ProfilePreview profile={profile} />
        </div>
        <div className="flex flex-col gap-6">
          <AccountSummary />
          <TransactionsCard />
          <HelpSupport onOpenChat={() => setChatOpen(!chatOpen)} />
        </div>
      </div>
      <ChatWidget open={chatOpen} onClose={() => setChatOpen(!chatOpen)} />
    </div>
  )
}