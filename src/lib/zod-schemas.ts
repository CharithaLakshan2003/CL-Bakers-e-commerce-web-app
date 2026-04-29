import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  birthday: z.string().optional(),
});

export const customCakeSchema = z.object({
  cakeType: z.string().min(1, 'Please select a cake type'),
  size: z.string().min(1, 'Please select a size'),
  flavor: z.string().min(1, 'Please select a flavor'),
  filling: z.string().min(1, 'Please select a filling'),
  frostingType: z.string().min(1, 'Please select a frosting type'),
  frostingColor: z.string().min(1, 'Please specify a frosting color'),
  eventDate: z.string().min(1, 'Please specify the event date'),
  deliveryMethod: z.enum(['PICKUP', 'DELIVERY']),
  budget: z.string().min(1, 'Please specify a budget'),
  designText: z.string().optional(),
});
