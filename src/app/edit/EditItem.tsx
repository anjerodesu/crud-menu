import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import EditMenuItemForm from '@/app/edit/components/EditMenuItemForm'
import { menuFormID } from '@/components/MenuItemForm'

interface EditItemProps {
    params: {
        menuItemID: string
    }
}

export default function EditItem({ params }: EditItemProps) {
    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>Edit Menu Item</CardTitle>
                <CardDescription>Make updates to your menu.</CardDescription>
            </CardHeader>
            <CardContent>
                <EditMenuItemForm menuItemID={ params.menuItemID } />
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button form={ menuFormID } type="submit">Submit</Button>
            </CardFooter>
        </Card>
    )
}
