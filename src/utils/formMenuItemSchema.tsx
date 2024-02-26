import { z } from 'zod'

export const formMenuItemSchema = z.object({
    category: z.string().min(3, {
        message: "Category must be at least 3 characters long",
    }).max(255),
    name: z.string().min(3, {
        message: "Name must be at least 3 characters long",
    }).max(255),
    price: z.coerce.number().positive({
        message: "Price must be a positive number",
    }),
    cost: z.coerce.number().positive({
        message: "Cost must be a positive number",
    }),
    stock: z.coerce.number().int().positive({
        message: "Stock must be a positive integer",
    }),
    options: z.array(
        z.object({
            label: z.string().min(3, {
                message: "Label must be at least 3 characters long",
            }).max(255),
            value: z.coerce.number().positive({
                message: "Value must be a positive number",
            })
        })
    ).optional()
});
