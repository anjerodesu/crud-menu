import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function LoginMessage() {
    return (
        <main className="flex min-h-screen flex-col items-center gap-y-8 my-4 py-6">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>You must login to use this menu</CardDescription>
                </CardHeader>
                <CardContent>
                    To be able to create, edit, and delete menu items, you must login to your account or register.
                </CardContent>
                <CardFooter className="flex justify-center">
                    <Button asChild className="w-full">
                        <Link href={ `/login` }>
                            Login
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        </main>
    )
}
