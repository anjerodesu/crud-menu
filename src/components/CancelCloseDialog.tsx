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

interface CancelCloseDialogProps {
    title: string
    description: string
    dialogButtonText: string
    cancelButtonText: string
    confirmButtonText: string
    setOpenDialog: (open: boolean) => void
}

export default function CancelCloseDialog({ title, description, dialogButtonText, cancelButtonText, confirmButtonText, setOpenDialog }: CancelCloseDialogProps) {
    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline">{ dialogButtonText }</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{ title }</DialogTitle>
                        <DialogDescription>
                            { description }
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="sm:justify-start md:justify-end">
                        <DialogClose asChild>
                            <Button type="button" variant="outline">
                                { cancelButtonText }
                            </Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button onClick={() => setOpenDialog(false ) }>
                                { confirmButtonText }
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
