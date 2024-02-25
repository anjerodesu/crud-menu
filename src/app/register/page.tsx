'use client'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import UserAuthForm, { loginFormID } from '@/components/UserAuthForm'
import { z } from 'zod'
import { formUserAuthSchema } from '@/utils/formUserAuthSchema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { createUserWithEmailAndPassword } from '@firebase/auth'
import { auth } from '@/components/db/FirebaseHelper'
import { toast } from '@/components/ui/use-toast'
import { ToastAction } from '@/components/ui/toast'
import { UserFormValues } from '@/app/login/page'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'

export default function Register() {
    type UserAuth = z.infer<typeof formUserAuthSchema>
    const form = useForm<UserAuth>({
        resolver: zodResolver(formUserAuthSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const router = useRouter()
    const onSubmitForm = (user: UserFormValues) => {
        createUserWithEmailAndPassword(auth, user.email, user.password).then((userCredential) => {
            router.push('/')
        }).catch((error) => {
            toast({
                title: "Error!",
                description: `${ error.message } Error code: ${ error.code }`,
                action: (
                    <ToastAction altText="Dismiss">Dismiss</ToastAction>
                ),
                variant: 'destructive'
            })
        });
    }

    return (
        <main className="flex min-h-screen flex-col items-center gap-y-8 my-4 py-6">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Register</CardTitle>
                    <CardDescription>Register to use this menu</CardDescription>
                </CardHeader>
                <CardContent>
                    <UserAuthForm form={ form } handleSubmit={ onSubmitForm } />
                </CardContent>
                <CardFooter className="flex flex-col justify-center">
                    <Button form={ loginFormID } type="submit" className="w-full">
                        Register
                    </Button>

                    <Separator className="mt-6 mb-2" />
                    <div className="flex flex-col gap-y-2 w-full items-center">
                        <div className="text-sm text-gray-500">
                            Already have an account?
                        </div>
                        <Button variant="secondary" asChild className="w-full">
                            <Link href={ `/register` }>
                                Login
                            </Link>
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </main>
    )
}
