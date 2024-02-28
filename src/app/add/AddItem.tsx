import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import AddMenuItemForm from '@/app/add/components/AddMenuItemForm'
import { Button } from '@/components/ui/button'
import { menuFormID } from '@/components/MenuItemForm'

interface AddItemProps {
    params: {
        setOpenDialog: (open: boolean) => void
    }
}

export default function AddItem({ params }: AddItemProps) {
    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>Add Menu Item</CardTitle>
                <CardDescription>Add more menu to your restaurant.</CardDescription>
            </CardHeader>
            <CardContent>
                <AddMenuItemForm setOpenDialog={ params.setOpenDialog } />
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button form={ menuFormID } type="submit">Submit</Button>
            </CardFooter>
        </Card>
    )
}
