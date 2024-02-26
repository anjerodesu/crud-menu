import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import CancelCloseDialog from '@/components/CancelCloseDialog'
import AddMenuItemForm from '@/app/add/components/AddMenuItemForm'
import { Button } from '@/components/ui/button'
import { menuFormID } from '@/components/MenuItemForm'

export default function AddItem() {
    return (
        <main className="flex min-h-screen flex-col items-center gap-y-8 my-4 py-6">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Add Menu Item</CardTitle>
                    <CardDescription>Add more menu to your restaurant.</CardDescription>
                </CardHeader>
                <CardContent>
                    <AddMenuItemForm />
                </CardContent>
                <CardFooter className="flex justify-between">
                    <CancelCloseDialog title="Are you sure you want to leave?" description="This action cannot be undone. This will permanently delete the data you entered. Do you want to continue?" dialogButtonText="Cancel" cancelButtonText="No" confirmButtonText="Yes" />
                    <Button form={ menuFormID } type="submit">Submit</Button>
                </CardFooter>
            </Card>
        </main>
    )
}
