
'use server';

import { z } from 'zod';

const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

export async function submitContactForm(data: unknown) {
  const validatedFields = contactFormSchema.safeParse(data);

  if (!validatedFields.success) {
    // Picking the first error to show. A more robust solution could show all.
    const firstError = Object.values(validatedFields.error.flatten().fieldErrors)[0]?.[0];

    return {
      success: false,
      message: firstError || 'Invalid data provided. Please check the form.',
    };
  }
  
  // Simulate a delay for sending data
  console.log("Form data received:", validatedFields.data);
  await new Promise(resolve => setTimeout(resolve, 1000));

  return {
    success: true,
    message: "Thank you for your message! We will be in touch shortly.",
  };
}
