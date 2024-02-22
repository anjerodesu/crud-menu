'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { db } from '@/components/db/FirebaseHelper'
import { push, ref } from 'firebase/database'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'

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

export default function AddNewItemForm() {
    const formSchema = z.object({
        category: z.string().min(3, {
            message: "Category must be at least 3 characters long",
        }).max(255),
        name: z.string().min(3, {
            message: "Name must be at least 3 characters long",
        }).max(255),
        price: z.coerce.number().positive({
            message: "Price must be a positive number",
        }),
        cost: z.coerce.number().positive({
            message: "Cost must be a positive number",
        }),
        stock: z.coerce.number().int().positive({
            message: "Stock must be a positive integer",
        }),
        options: z.array(
            z.object({
                label: z.string().min(3, {
                    message: "Label must be at least 3 characters long",
                }).max(255),
                value: z.coerce.number().positive({
                    message: "Value must be a positive number",
                })
            })
        ).optional()
    });
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

    /**
     * This is a counter for the number of options currently in the form.
     */
    const [counter, setCounter] = useState(0)
    const addNewInput = () => {
        setCounter(counter + 1);
    };

    return (
        <Form { ...form }>
            <form id={ menuFormID } onSubmit={ form.handleSubmit(onSubmitMenu) } className="space-y-4">
                <FormField
                    key="category"
                    control={ form.control }
                    name="category"
                    render={ ({field}) => (
                        <FormItem>
                            <FormLabel>Category</FormLabel>
                            <FormControl>
                                <Input key="category" placeholder="" { ...field } />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    ) }
                />
                <FormField
                    key="name"
                    control={ form.control }
                    name="name"
                    render={ ({field}) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input key="name" placeholder="" { ...field } />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    ) }
                />
                <FormField
                    key="price"
                    control={ form.control }
                    name="price"
                    render={ ({field}) => (
                        <FormItem>
                            <FormLabel>Price</FormLabel>
                            <FormControl>
                                <Input key="price" placeholder="" { ...field } />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    ) }
                />
                <FormField
                    key="cost"
                    control={ form.control }
                    name="cost"
                    render={ ({field}) => (
                        <FormItem>
                            <FormLabel>Cost</FormLabel>
                            <FormControl>
                                <Input key="cost" placeholder="" { ...field } />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    ) }
                />
                <FormField
                    key="stock"
                    control={ form.control }
                    name="stock"
                    render={ ({field}) => (
                        <FormItem>
                            <FormLabel>Stock</FormLabel>
                            <FormControl>
                                <Input key="stock" placeholder="" { ...field } />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    ) }
                />

                <Separator className="my-4" />
                <div className="flex justify-between">
                    <h2>Options</h2>
                    <Button variant="outline" onClick={ addNewInput } type="button">Add Option</Button>
                </div>
                { Array(counter).fill(1).map((_, index) => {
                    return (
                        <div key={ `options.${index}` }>
                            <FormField
                                key={ `options.${index}.label` }
                                control={ form.control }
                                name={ `options.${index}.label` }
                                render={ ({field}) => {
                                    return (
                                        <FormItem>
                                            <FormLabel>Label</FormLabel>
                                            <FormControl>
                                                <Input key={ `options.${index}.label` } placeholder="" { ...field } />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )
                                } }
                            />
                            <FormField
                                key={ `options.${index}.value` }
                                control={ form.control }
                                name={ `options.${index}.value` }
                                render={ ({field}) => {
                                    return (
                                        <FormItem>
                                            <FormLabel>Value</FormLabel>
                                            <FormControl>
                                                <Input key={ `options.${index}.value` } placeholder="" { ...field } />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )
                                } }
                            />
                        </div>
                    )
                }) }
            </form>
        </Form>
    )
}