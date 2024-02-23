'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { db } from '@/components/db/FirebaseHelper'
import { onValue, ref, update } from 'firebase/database'
import { useRouter } from 'next/navigation'
import { formSchema } from '@/utils/formSchema'
import MenuItemForm from '@/components/MenuItemForm'

interface EditMenuItemFormProps {
    menuItemID: string
}

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

export default function EditMenuItemForm({ menuItemID }: EditMenuItemFormProps) {
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
    const updateForm = (data: FormFieldValues) => {
        form.setValue('category', data.category)
        form.setValue('name', data.name)
        form.setValue('price', data.price)
        form.setValue('cost', data.cost)
        form.setValue('stock', data.stock)
        form.setValue('options', data.options)
    }

    const [_, setCount] = useState(0);
    useEffect(() => {
        const id = setInterval(() => setCount((count) => count + 1), 1000);

        const menuItemsRef = ref(db, `menuItems/${ menuItemID }`)
        onValue(menuItemsRef, (snapshot) => {
            const data = snapshot.val();
            updateForm(data)
        });

        return () => clearInterval(id);
    }, [menuItemID])

    const router = useRouter()
    const onSubmitMenu = (menu: FormFieldValues) => {
        console.log('menu: ', menu)
        const menuItemsRef = ref(db, `menuItems/${ menuItemID }`)
        update(menuItemsRef, menu).then(() => {
            console.log('Data saved successfully!')
            router.push('/')
        }).catch((error) => {
            console.error('Error saving data: ', error)
        })
    }

    return (
        <MenuItemForm form={ form } handleSubmit={ onSubmitMenu } />
    )
}
