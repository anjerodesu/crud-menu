import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import AddNewItemCloseDialog from '@/app/add/components/AddNewItemCloseDialog'
import AddNewItemForm, { menuFormID } from '@/app/add/components/AddNewItemForm'
import { Button } from '@/components/ui/button'

export default function AddItem() {
    return (
        <main className="flex min-h-screen flex-col items-center gap-y-8 my-4 py-6">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Add Menu Item</CardTitle>
                    <CardDescription>Add more menu to your restaurant.</CardDescription>
                </CardHeader>
                <CardContent>
                    <AddNewItemForm />
                </CardContent>
                <CardFooter className="flex justify-between">
                    <AddNewItemCloseDialog />
                    <Button form={ menuFormID } type="submit">Submit</Button>
                </CardFooter>
            </Card>
        </main>
    )
}
