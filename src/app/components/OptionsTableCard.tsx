import { MenuItemOption } from '@/app/components/MenuItems'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

interface OptionsTableCardProps {
    options: MenuItemOption[] | undefined
}

export default function OptionsTableCard({ options }: OptionsTableCardProps) {
    return (
        <>
            {options && options.length > 0
                ? (
                    <Table>
                        <TableCaption>Options</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Label</TableHead>
                                <TableHead>Value</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                        {options.map((option, index) => {
                            return (
                                <TableRow key={ index }>
                                    <TableCell>{ option.label }</TableCell>
                                    <TableCell>{ option.value }</TableCell>
                                </TableRow>
                            )
                        })}

                        </TableBody>
                    </Table>
                )
                : <p>No options available.</p>
            }
        </>
    )
}
