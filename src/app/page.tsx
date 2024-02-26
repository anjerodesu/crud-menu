'use client'

import { auth, AuthState } from '@/components/db/FirebaseHelper'
import { onAuthStateChanged } from '@firebase/auth'
import Image from 'next/image'
import MenuItems from '@/app/components/MenuItems'
import LoginMessage from '@/app/components/LoginMessage'
import { useEffect, useState } from 'react'

export default function Home() {
    const [isLoading, setLoading] = useState(true)
    const [authState, setAuthState] = useState<AuthState>({
        isSignedIn: false,
        user: null,
    })

    useEffect(() => {
        setLoading(true)
        const unregisterAuthObserver = onAuthStateChanged(auth, (user) => {
            setAuthState({ user, isSignedIn: !!user })
            setLoading(false)
        })

        return () => unregisterAuthObserver()
    }, [])

    return (
        <main>
            {isLoading
                ? (
                    <div className="flex flex-col w-full min-h-screen items-center justify-center">
                        <Image src="/loading.svg" alt="loading" width={100} height={100} />
                    </div>
                )
                : authState.isSignedIn && authState.user ? (<MenuItems user={ authState.user } />) : (<LoginMessage />)
            }
        </main>
    );
}
