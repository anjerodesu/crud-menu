import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'

interface MenuFormProps {
    form: any
    handleSubmit: any
}

export const menuFormID = 'menu-form'

export default function MenuForm({ form, handleSubmit } : MenuFormProps) {
    const [options, setOptions] = useState(form.getValues().options)
    const addNewInput = () => {
        console.log('addNewInput')
        setOptions([...options, { label: '', value: 0 }])
    }


    const [_, setCount] = useState(0);
    useEffect(() => {
        const id = setInterval(() => setCount((count) => count + 1), 1000);
        setOptions(form.getValues().options)
        return () => clearInterval(id);
    }, [form])

    return (
        <Form { ...form }>
            <form id={ menuFormID } onSubmit={ form.handleSubmit(handleSubmit) } className="space-y-4">
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
                    <h2>Options { options.length }</h2>
                    <Button variant="outline" onClick={ addNewInput } type="button">Add Option</Button>
                </div>
                { Array(options.length).fill(1).map((_, index) => {
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
