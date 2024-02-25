'use client'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { formUserAuthSchema } from '@/utils/formUserAuthSchema'
import { z } from 'zod'
import UserAuthForm, { loginFormID } from '@/components/UserAuthForm'
import { signInWithEmailAndPassword } from '@firebase/auth'
import { auth } from '@/components/db/FirebaseHelper'
import { ToastAction } from '@/components/ui/toast'
import { toast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Separator } from '@/components/ui/separator'

export interface UserFormValues {
    email: string;
    password: string;
}

export default function Login() {
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
        signInWithEmailAndPassword(auth, user.email, user.password).then((userCredential) => {
            const user = userCredential.user;
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
                    <CardTitle>Login</CardTitle>
                    <CardDescription>Login to use this menu</CardDescription>
                </CardHeader>
                <CardContent>
                    <UserAuthForm form={ form } handleSubmit={ onSubmitForm } />
                </CardContent>
                <CardFooter className="flex flex-col justify-center">
                    <Button form={ loginFormID } type="submit" className="w-full">
                        Login
                    </Button>

                    <Separator className="mt-6 mb-2" />
                    <div className="flex flex-col gap-y-2 w-full items-center">
                        <div className="text-sm text-gray-500">
                            Don&apos;t have an account yet?
                        </div>
                        <Button variant="secondary" asChild className="w-full">
                            <Link href={ `/register` }>
                                Register
                            </Link>
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </main>
    )
}
