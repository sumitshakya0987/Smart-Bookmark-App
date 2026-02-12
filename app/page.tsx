
import { createClient } from '@/utils/supabase/server'
import AuthButton from '@/components/AuthButton'
import AddBookmark from '@/components/AddBookmark'
import BookmarkList from '@/components/BookmarkList'
import { Bookmark } from 'lucide-react'

export default async function Home() {
  const supabase = await createClient()
  let user = null;

  if (supabase) {
    const { data } = await supabase.auth.getUser()
    user = data.user
  }

  if (!supabase) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-6">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Smart Bookmark App</h1>
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 text-left">
            <h2 className="text-xl font-semibold mb-4 text-amber-600">Setup Required</h2>
            <p className="text-gray-600 mb-4">Please configure your Supabase credentials in <code className="bg-gray-100 px-1 py-0.5 rounded">.env.local</code>.</p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-100 flex flex-col items-center py-12 px-4 sm:px-6">
      <div className="max-w-6xl w-full">
        {user ? (
          <div className="space-y-8">
            <header className="flex justify-between items-center bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-sm border border-white/50">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-blue-600 rounded-xl shadow-lg shadow-blue-600/20 text-white">
                  <Bookmark size={24} fill="currentColor" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900 leading-tight">My Bookmarks</h1>
                  <p className="text-xs text-gray-500 font-medium">{user.email}</p>
                </div>
              </div>

              <form action="/auth/signout" method="post">
                <button
                  type="submit"
                  className="bg-gray-100 hover:bg-red-50 text-gray-600 hover:text-red-600 text-sm font-semibold py-2.5 px-5 rounded-xl transition-all border border-transparent hover:border-red-100"
                >
                  Sign Out
                </button>
              </form>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Add Bookmark Form (Sticky) */}
              <div className="lg:col-span-5 xl:col-span-4 sticky top-8 z-10">
                <AddBookmark />
              </div>

              {/* Right Column: Bookmark List */}
              <div className="lg:col-span-7 xl:col-span-8">
                <div className="flex items-center justify-between mb-4 ml-1">
                  <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                    <span>Recent Bookmarks</span>
                    <span className="text-xs font-normal text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                      Real-time
                    </span>
                  </h2>
                </div>
                <BookmarkList />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full opacity-20 blur-xl animate-pulse"></div>
              <div className="relative p-5 bg-white rounded-2xl shadow-xl">
                <Bookmark size={48} className="text-blue-600" />
              </div>
            </div>

            <div className="space-y-4 max-w-md">
              <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight">
                Smart <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Bookmarks</span>
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                The elegant way to manage your links. <br /> Private, real-time, and beautifully designed.
              </p>
            </div>

            <div className="pt-4">
              <AuthButton />
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
