
'use client'

import { createClient } from '@/utils/supabase/client'
import { motion } from 'framer-motion'
import { LogIn } from 'lucide-react'

export default function AuthButton() {
    const supabase = createClient()

    const handleLogin = async () => {
        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${location.origin}/auth/callback`,
            },
        })
    }

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogin}
            className="flex items-center gap-3 bg-white text-gray-700 px-6 py-3 rounded-full font-semibold shadow-md hover:shadow-lg border border-gray-200 transition-all group"
        >
            <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google Logo"
                className="w-6 h-6"
            />
            <span>Sign in with Google</span>
            <LogIn className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
        </motion.button>
    )
}
