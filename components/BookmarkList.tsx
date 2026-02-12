
'use client'

import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'
import { Bookmark } from '@/types'
import { motion, AnimatePresence } from 'framer-motion'
import { Trash2, ExternalLink } from 'lucide-react'

export default function BookmarkList() {
    const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
    const supabase = createClient()

    useEffect(() => {
        let channel: any;

        const fetchAndSubscribe = async () => {
            const { data, error } = await supabase
                .from('bookmarks')
                .select('*')
                .order('created_at', { ascending: false })

            if (error) {
                console.error('Error fetching bookmarks:', error)
            } else {
                setBookmarks(data || [])
            }

            channel = supabase
                .channel('realtime_bookmarks')
                .on(
                    'postgres_changes',
                    {
                        event: '*',
                        schema: 'public',
                        table: 'bookmarks',
                    },
                    (payload) => {
                        if (payload.eventType === 'INSERT') {
                            setBookmarks((prev) => [payload.new as Bookmark, ...prev])
                        } else if (payload.eventType === 'DELETE') {
                            setBookmarks((prev) => prev.filter((bookmark) => bookmark.id !== payload.old.id))
                        } else if (payload.eventType === 'UPDATE') {
                            setBookmarks((prev) => prev.map((item) => item.id === payload.new.id ? payload.new as Bookmark : item))
                        }
                    }
                )
                .subscribe()
        }

        fetchAndSubscribe()

        return () => {
            if (channel) {
                supabase.removeChannel(channel)
            }
        }
    }, [])

    const handleDelete = async (id: string) => {
        const { error } = await supabase.from('bookmarks').delete().match({ id })
        if (error) {
            console.error("Error deleting:", error)
        }
    }

    return (
        <div className="space-y-4 w-full">
            <AnimatePresence mode='popLayout'>
                {bookmarks.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-center py-12 bg-white/50 rounded-2xl border border-dashed border-gray-300"
                    >
                        <p className="text-gray-500 font-medium">No bookmarks yet.</p>
                        <p className="text-sm text-gray-400 mt-1">Add one above to get started!</p>
                    </motion.div>
                ) : (
                    bookmarks.map((bookmark, index) => (
                        <motion.div
                            layout
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            key={bookmark.id}
                            className="flex justify-between items-center p-5 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-blue-100 transition-all group"
                        >
                            <div className="flex flex-col overflow-hidden mr-4">
                                <a
                                    href={bookmark.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors truncate flex items-center gap-2"
                                >
                                    {bookmark.title}
                                    <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity -translate-y-[1px]" />
                                </a>
                                <span className="text-xs text-gray-400 truncate mt-1 bg-gray-50 px-2 py-1 rounded-md w-fit group-hover:bg-blue-50 group-hover:text-blue-400 transition-colors">
                                    {bookmark.url}
                                </span>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.1, backgroundColor: '#fee2e2' }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleDelete(bookmark.id)}
                                className="text-gray-300 hover:text-red-500 p-2.5 rounded-xl transition-colors"
                                aria-label="Delete bookmark"
                            >
                                <Trash2 size={20} />
                            </motion.button>
                        </motion.div>
                    ))
                )}
            </AnimatePresence>
        </div>
    )
}
