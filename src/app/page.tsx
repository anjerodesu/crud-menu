'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { db } from '@/app/components/FirebaseHelper'
import { onValue, ref } from 'firebase/database'
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
    const [count, setCount] = useState(0);
    const [menuKeys, setMenuKeys] = useState<string[]>([])
    const [menuItems, setMenuItems] = useState<any>({})

    useEffect(() => {
        const id = setInterval(() => setCount((count) => count + 1), 1000);

        const menuItemsRef = ref(db, 'menuItems')
        onValue(menuItemsRef, (snapshot) => {
            const data = snapshot.val();
            console.log('data: ', data)
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
                            <TableRow key={menuItem.id}>
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
                                                    <MdEdit className="mr-2 h-4 w-4" />
                                                    <span>Edit</span>
                                                    <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
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
