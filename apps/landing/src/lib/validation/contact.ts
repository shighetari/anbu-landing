import { z } from 'zod';

const optionalText = (maxLength: number) =>
  z
    .string()
    .max(maxLength, `Must be ${maxLength} characters or fewer`)
    .transform((value) => value.trim())
    .optional()
    .default('');

export const contactFormSchema = z
  .object({
    name: optionalText(80),
    email: z
      .string({ required_error: 'Email is required' })
      .trim()
      .min(1, 'Email is required')
      .email('Please provide a valid email address')
      .max(120, 'Email must be 120 characters or fewer'),
    company: optionalText(120),
    teamSize: optionalText(40),
    budget: optionalText(40),
    timeline: optionalText(40),
    projectType: optionalText(80),
    projectFocus: z
      .string({ required_error: 'Tell us about your project' })
      .trim()
      .min(10, 'Give us a short overview of your project')
      .max(2000, 'Project focus is limited to 2000 characters'),
  })
  .strict();

export type ContactFormPayload = z.infer<typeof contactFormSchema>;

export const normalizeContactPayload = (payload: ContactFormPayload) => {
  const sanitize = (value?: string) => {
    if (!value) return undefined;
    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : undefined;
  };

  return {
    ...payload,
    name: sanitize(payload.name),
    company: sanitize(payload.company),
    teamSize: sanitize(payload.teamSize),
    budget: sanitize(payload.budget),
    timeline: sanitize(payload.timeline),
    projectType: sanitize(payload.projectType),
    projectFocus: payload.projectFocus.trim(),
  };
};
