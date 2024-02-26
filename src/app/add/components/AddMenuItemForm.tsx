'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { auth, AuthState, db, menuItemsPath } from '@/components/db/FirebaseHelper'
import { push, ref } from 'firebase/database'
import { useRouter } from 'next/navigation'
import { formMenuItemSchema } from '@/utils/formMenuItemSchema'
import MenuItemForm, { FormFieldOptions, FormFieldValues } from '@/components/MenuItemForm'
import { useEffect, useState } from 'react'
import { onAuthStateChanged } from '@firebase/auth'
import Image from 'next/image'
import { ToastAction } from '@/components/ui/toast'
import { toast } from '@/components/ui/use-toast'

export default function AddMenuItemForm() {
    const [authState, setAuthState] = useState<AuthState>({
        isSignedIn: false,
        user: null,
    })

    type Menu = z.infer<typeof formMenuItemSchema>
    const form = useForm<Menu>({
        resolver: zodResolver(formMenuItemSchema),
        defaultValues: {
            category: '',
            name: '',
            price: 0,
            cost: 0,
            stock: 0,
            options: [] as FormFieldOptions[],
        } as FormFieldValues,
    })

    const router = useRouter()
    const onSubmitMenu = (menu: FormFieldValues) => {
        if (authState.user) {
            const menuItemsRef = ref(db, menuItemsPath(authState.user.uid))
            push(menuItemsRef, menu).then((newMenuItem) => {
                if (newMenuItem.key) {
                    router.push('/')
                }
            }).catch((error) => {
                toast({
                    title: "Error",
                    description: `The menu item could not be submitted. Please try again. Error: ${ error.message }`,
                    action: (
                        <ToastAction altText="Dismiss">Dismiss</ToastAction>
                    ),
                    variant: 'destructive'
                })
            })
        } else {
            toast({
                title: "Unknown error",
                description: "The menu item could not be submitted. Please try again.",
                action: (
                    <ToastAction altText="Dismiss">Dismiss</ToastAction>
                ),
                variant: 'destructive'
            })
        }
    }

    useEffect(() => {
        const unregisterAuthObserver = onAuthStateChanged(auth, (user) => {
            setAuthState({ user, isSignedIn: !!user })
        })

        return () => unregisterAuthObserver()
    }, [])

    return (
        <MenuItemForm form={ form } handleSubmit={ onSubmitMenu } />
    )
}