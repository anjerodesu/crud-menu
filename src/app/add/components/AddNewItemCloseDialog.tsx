import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function AddNewItemCloseDialog() {
    return (
        <>
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
        </>
    )
}
