'use client'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'

interface MenuFormProps {
    form: any
    handleSubmit: any
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

export const menuFormID = 'menu-form'

export default function MenuForm({ form, handleSubmit } : MenuFormProps) {
    const [options, setOptions] = useState<FormFieldOptions[]>(form.getValues().options)
    const addNewInput = () => {
        setOptions([...options, { label: '', value: 0 }])
    }
    const fromKeys = Object.keys(form.getValues());

    useEffect(() => {
        const id = setInterval(() => {
            setOptions(form.getValues().options)
        }, 1000)
        return () => clearInterval(id)
    }, [form.getValues().options])

    return (
        <Form { ...form }>
            <form id={ menuFormID } onSubmit={ form.handleSubmit(handleSubmit) } className="space-y-4">
                { fromKeys.map((key: string) => (key !== 'options')
                    ? (
                        <FormField
                            key={ key }
                            control={ form.control }
                            name={ key }
                            render={ ({field}) => (
                                <FormItem>
                                    <FormLabel>{ key[0].toUpperCase() + key.slice(1) }</FormLabel>
                                    <FormControl>
                                        <Input key={ key } placeholder="" { ...field } />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            ) }
                        />
                    )
                    : (
                        <div key={ `${ key }` }>
                            <Separator className="my-4" />
                            <div className="flex justify-between">
                                <h2>Options</h2>
                                <Button variant="outline" onClick={ addNewInput } type="button">Add Option</Button>
                            </div>
                            { options && Array(options.length).fill(1).map((_, index) => {
                                return (
                                    <div key={ `${ key }.${ index }` }>
                                        <FormField
                                            key={ `${ key }.${ index }.label` }
                                            control={ form.control }
                                            name={ `${ key }.${ index }.label` }
                                            render={ ({field}) => {
                                                return (
                                                    <FormItem>
                                                        <FormLabel>Label</FormLabel>
                                                        <FormControl>
                                                            <Input key={ `${ key }.${ index }.label` } placeholder="" { ...field } />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )
                                            } }
                                        />
                                        <FormField
                                            key={ `${ key }.${ index }.value` }
                                            control={ form.control }
                                            name={ `${ key }.${ index }.value` }
                                            render={ ({field}) => {
                                                return (
                                                    <FormItem>
                                                        <FormLabel>Value</FormLabel>
                                                        <FormControl>
                                                            <Input key={ `${ key }.${ index }.value` } placeholder="" { ...field } />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )
                                            } }
                                        />
                                        <Separator className="my-4" />
                                    </div>
                                )
                            }) }
                        </div>
                    )
                ) }
            </form>
        </Form>
    )
}
