'use client'

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from "zod"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import Link from 'next/link'

interface Option {
    label: string;
    value: string;
}

export default function AddItem() {
    const formSchema = z.object({
        category: z.string(),
        name: z.string().min(3, {
            message: "Name must be at least 3 characters long",

        }).max(255),
        price: z.number().positive(),
        cost: z.number().positive(),
        stock: z.number().int().positive(),
        options: z.array(
            z.object({
                label: z.string().min(3, {
                    message: "Label must be at least 3 characters long",
                }).max(255),
                value: z.string().min(2, {
                    message: "Value must be at least 2 characters long",
                }).max(255),
            })
        ),
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
            options: [{
                label: '',
                value: '',
            } as Option],
        },
    })

    const onSubmit = (data: Menu) => {
        console.log(data)
    }

    return (
        <main className="flex min-h-screen flex-col items-center gap-y-20 mt-8">
            <div>
                <h1 className="text-4xl font-bold">Add Menu Item</h1>
            </div>
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Create project</CardTitle>
                    <CardDescription>Deploy your new project in one-click.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form { ...form }>
                        <form id="menuForm" onSubmit={ form.handleSubmit(onSubmit) } className="space-y-8">
                            <FormField
                                control={ form.control }
                                name="category"
                                render={ ({field}) => (
                                    <FormItem>
                                        <FormLabel>Category</FormLabel>
                                        <FormControl>
                                            <Input placeholder="" { ...field } />
                                        </FormControl>
                                        <FormDescription>This is the category for this menu item.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                ) }
                            />
                        </form>
                    </Form>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Are you sure you want to leave?</DialogTitle>
                                <DialogDescription>
                                    This action cannot be undone. This will permanently delete the data you entered.
                                </DialogDescription>
                            </DialogHeader>
                            <DialogFooter className="sm:justify-start md:justify-end">
                                <DialogClose asChild>
                                    <Button type="button" variant="outline">
                                        No
                                    </Button>
                                </DialogClose>
                                <DialogClose asChild>
                                    <Button asChild>
                                        <Link href={'/'}>
                                            Yes
                                        </Link>
                                    </Button>
                                </DialogClose>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                    <Button form="menuForm" type="submit">Submit</Button>
                </CardFooter>
            </Card>
        </main>
    )
}
