'use server';

import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { registerSchema } from '@/lib/zod-schemas';
import * as z from 'zod';

export async function registerUser(data: z.infer<typeof registerSchema>) {
  try {
    // Validate the input using zod
    const parsed = registerSchema.safeParse(data);
    if (!parsed.success) {
      return { success: false, error: 'Invalid data provided' };
    }

    const { name, email, password } = parsed.data;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { success: false, error: 'User with this email already exists' };
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: 'CUSTOMER',
        loyaltyPoints: 50, // Welcome bonus
      },
    });

    return { success: true };
  } catch (error: any) {
    console.error('Registration error:', error);
    return { success: false, error: error.message || 'Something went wrong' };
  }
}
