'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { auth, AuthState, db, menuItemsPath } from '@/components/db/FirebaseHelper'
import { onValue, ref, update } from 'firebase/database'
import { formMenuItemSchema } from '@/utils/formMenuItemSchema'
import MenuItemForm, { FormFieldOptions, FormFieldValues } from '@/components/MenuItemForm'
import { onAuthStateChanged } from '@firebase/auth'
import { toast } from '@/components/ui/use-toast'
import { ToastAction } from '@/components/ui/toast'

interface EditMenuItemFormProps {
    menuItemID: string
}

export default function EditMenuItemForm({ menuItemID }: EditMenuItemFormProps) {
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

    useEffect(() => {
        const unregisterAuthObserver = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthState({ user, isSignedIn: !!user })
                const menuItemsRef = ref(db, menuItemsPath(user.uid, menuItemID))
                onValue(menuItemsRef, (snapshot) => {
                    const data = snapshot.val();
                    if (data) {
                        updateForm(data)
                    }
                })
            }
        })

        return () => unregisterAuthObserver()
    }, [])

    const updateForm = (data: FormFieldValues) => {
        form.setValue('category', data.category)
        form.setValue('name', data.name)
        form.setValue('price', data.price)
        form.setValue('cost', data.cost)
        form.setValue('stock', data.stock)
        form.setValue('options', data.options)
    }

    const onSubmitMenu = (menu: FormFieldValues) => {
        if (authState.user) {
            console.log('uid, menuItemID', authState.user.uid, menuItemID)
            const menuItemsRef = ref(db, menuItemsPath(authState.user.uid, menuItemID))
            update(menuItemsRef, menu).then(() => {
                toast({
                    title: "Success!",
                    description: "The menu item has been updated successfully.",
                    action: (
                        <ToastAction altText="Dismiss">Dismiss</ToastAction>
                    ),
                })
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
                title: "Error",
                description: "The menu item could not be submitted. Please try again. Error: User not found.",
                action: (
                    <ToastAction altText="Dismiss">Dismiss</ToastAction>
                ),
                variant: 'destructive'
            })
        }
    }

    return (
        <MenuItemForm form={ form } handleSubmit={ onSubmitMenu } />
    )
}
