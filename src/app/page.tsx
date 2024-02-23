'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { db } from '@/components/db/FirebaseHelper'
import { onValue, ref, remove } from 'firebase/database'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table'
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { MdEdit, MdDelete } from "react-icons/md";
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from '@/components/ui/toast'

interface MenuItemOption {
    label: string
    value: number
}

interface MenuItem {
    id: number
    category: string
    name: string
    price: number
    cost: number
    stock: number
    options?: MenuItemOption[]
}

export default function Home() {
    const [_, setCount] = useState(0);
    const [menuKeys, setMenuKeys] = useState<string[]>([])
    const [menuItems, setMenuItems] = useState<any>({})
    const { toast } = useToast()

    const onDeleteButtonPressed = (menuItemID: string) => {
        console.log('Delete button pressed', menuItemID)
        const menuItemsRef = ref(db, `menuItems/${ _ }`)
         remove(menuItemsRef).then().catch((error: any) => {
            toast({
                title: "Error!",
                description: "The menu item could not be deleted. Please try again.",
                action: (
                    <ToastAction altText="Dismiss">Dismiss</ToastAction>
                ),
                variant: 'destructive'
            })
        })
    }

    useEffect(() => {
        const id = setInterval(() => setCount((count) => count + 1), 1000);

        const menuItemsRef = ref(db, 'menuItems')
        onValue(menuItemsRef, (snapshot) => {
            const data = snapshot.val();
            setMenuKeys(Object.keys(data))
            setMenuItems(data)
        });

        return () => clearInterval(id);
    }, [])

    return (
        <main className="flex min-h-screen flex-col items-center justify-start gap-y-6 my-6 py-4">
            <Table>
                <TableCaption>A list of menu items.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Cost</TableHead>
                        <TableHead>Stocks</TableHead>
                        <TableHead className="w-[200px]"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {menuKeys.map((menuKey) => {
                        const menuItem = menuItems[menuKey] as MenuItem
                        return (
                            <TableRow key={menuKey}>
                                <TableCell className="font-medium">{ menuItem.name }</TableCell>
                                <TableCell>{ menuItem.category }</TableCell>
                                <TableCell>{ menuItem.price }</TableCell>
                                <TableCell>{ menuItem.cost }</TableCell>
                                <TableCell>{ menuItem.stock }</TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="outline">Manage</Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-56">
                                            <DropdownMenuLabel>Update Menu</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuGroup>
                                                <DropdownMenuItem>
                                                    <Link href={ `/edit/${ menuKey }` } className="flex flex-row w-full items-center">
                                                        <MdEdit className="mr-2 h-4 w-4" />
                                                        <span>Edit</span>
                                                        <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => onDeleteButtonPressed(menuKey)} className="hover:cursor-pointer">
                                                    <MdDelete className="mr-2 h-4 w-4" />
                                                    <span>Delete</span>
                                                    <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                                                </DropdownMenuItem>
                                            </DropdownMenuGroup>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={6}>
                            <div className="flex flex-row w-full items-center justify-center">
                                <Button asChild>
                                    <Link href={'/add'}>
                                        Add Menu Item
                                    </Link>
                                </Button>
                            </div>
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </main>
    );
}
