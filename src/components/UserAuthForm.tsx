import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

interface UserAuthFormProps {
    form: any
    handleSubmit: any
}

export const loginFormID = 'login-form'

export default function UserAuthForm({ form, handleSubmit } : UserAuthFormProps) {
    const formKeys = Object.keys(form.getValues())

    const passwordProps = (key: string) => {
        if (key === 'password') {
            return {
                type: 'password',
                autoComplete: 'off'
            }
        }
    }

    return (
        <Form { ...form }>
            <form id={ loginFormID } onSubmit={ form.handleSubmit(handleSubmit) }  className="flex flex-col gap-y-4">
                { formKeys.map((key) => {
                    return (
                        <FormField
                            key={ key }
                            control={ form.control }
                            name={ key }
                            render={ ({field}) => (
                                <FormItem>
                                    <FormLabel>{ key[0].toUpperCase() + key.slice(1) }</FormLabel>
                                    <FormControl>
                                        <Input key={ key } { ...passwordProps(key) } placeholder="" { ...field } />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            ) }
                        />
                    )
                })}
            </form>
        </Form>
    )
}
