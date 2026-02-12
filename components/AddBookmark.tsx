
'use client'

import { createClient } from '@/utils/supabase/client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Link as LinkIcon, Type } from 'lucide-react'

export default function AddBookmark() {
    const [title, setTitle] = useState('')
    const [url, setUrl] = useState('')
    const [loading, setLoading] = useState(false)
    const supabase = createClient()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        const {
            data: { user },
        } = await supabase.auth.getUser()

        if (user) {
            await supabase.from('bookmarks').insert({
                title,
                url,
                user_id: user.id,
            })

            setTitle('')
            setUrl('')
        }
        setLoading(false)
    }

    return (
        <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
            className="mb-8 p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-white/50 shadow-xl"
        >
            <h3 className="text-xl font-bold mb-6 text-gray-800 flex items-center gap-2">
                <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                    <Plus size={20} />
                </div>
                Add New Bookmark
            </h3>
            <div className="flex flex-col gap-5">
                <div className="relative group">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-500 mb-1 ml-1">Title</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
                            <Type size={18} />
                        </div>
                        <input
                            id="title"
                            type="text"
                            placeholder="e.g. My Favorite Blog"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-gray-900 placeholder:text-gray-400"
                            required
                        />
                    </div>
                </div>
                <div className="relative group">
                    <label htmlFor="url" className="block text-sm font-medium text-gray-500 mb-1 ml-1">URL</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
                            <LinkIcon size={18} />
                        </div>
                        <input
                            id="url"
                            type="url"
                            placeholder="https://example.com"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-gray-900 placeholder:text-gray-400"
                            required
                        />
                    </div>
                </div>
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={loading}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 font-semibold shadow-lg shadow-blue-500/30 transition-all mt-2"
                >
                    {loading ? 'Adding...' : 'Add Bookmark'}
                </motion.button>
            </div>
        </motion.form>
    )
}
