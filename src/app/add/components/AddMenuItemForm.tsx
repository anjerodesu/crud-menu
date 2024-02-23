'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { db } from '@/components/db/FirebaseHelper'
import { push, ref } from 'firebase/database'
import { useRouter } from 'next/navigation'
import { formSchema } from '@/utils/formSchema'
import MenuItemForm from '@/components/MenuItemForm'

export interface FormFieldOptions {
    label: string;
    value: number;
}

export interface FormFieldValues {
    category: string;
    name: string;
    price: number;
    cost: number;
    stock: number;
    options?: FormFieldOptions[];
}

export const menuFormID = 'menu-form'

export default function AddMenuItemForm() {
    type Menu = z.infer<typeof formSchema>
    const form = useForm<Menu>({
        resolver: zodResolver(formSchema),
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
        console.log('menu: ', menu)
        const menuItemsRef = ref(db, 'menuItems')
        const menuItemKey = push(menuItemsRef, menu).key
        if (menuItemKey) {
            console.log('menuItemKey: ', menuItemKey)
            router.push('/')
        }
    }

    return (
        <MenuItemForm form={ form } handleSubmit={ onSubmitMenu } />
    )
}