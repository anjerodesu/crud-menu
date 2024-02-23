import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import AddMenuItemForm, { menuFormID } from '@/app/add/components/AddMenuItemForm'
import CancelCloseDialog from '@/components/CancelCloseDialog'
import { Button } from '@/components/ui/button'
import EditMenuItemForm from '@/app/edit/components/EditMenuItemForm'

interface EditItemProps {
    params: {
        menuItemID: string
    }
}

export default function EditItem({ params }: EditItemProps) {
    return (
        <main className="flex min-h-screen flex-col items-center gap-y-8 my-4 py-6">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Edit Menu Item</CardTitle>
                    <CardDescription>Make updates to your menu.</CardDescription>
                </CardHeader>
                <CardContent>
                    <EditMenuItemForm menuItemID={ params.menuItemID } />
                </CardContent>
                <CardFooter className="flex justify-between">
                    <CancelCloseDialog title="Are you sure you want to leave?" description="This action cannot be undone. This will permanently delete the data you entered. Do you want to continue?" dialogButtonText="Cancel" cancelButtonText="No" confirmButtonText="Yes" />
                    <Button form={ menuFormID } type="submit">Submit</Button>
                </CardFooter>
            </Card>
        </main>
    )
}
