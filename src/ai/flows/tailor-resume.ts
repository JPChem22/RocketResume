// src/ai/flows/tailor-resume.ts
'use server';
/**
 * @fileOverview This file defines a Genkit flow for tailoring a resume to a specific job description.
 *
 * - tailorResume - A function that accepts a resume and job description, and returns a tailored resume.
 * - TailorResumeInput - The input type for the tailorResume function.
 * - TailorResumeOutput - The return type for the tailorResume function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TailorResumeInputSchema = z.object({
  resumeText: z
    .string()
    .describe('The text content of the resume to be tailored.'),
  jobDescription: z
    .string()
    .describe('The job description to tailor the resume to.'),
});
export type TailorResumeInput = z.infer<typeof TailorResumeInputSchema>;

const TailorResumeOutputSchema = z.object({
  tailoredResume: z
    .string()
    .describe('The tailored resume, optimized for the job description.'),
});
export type TailorResumeOutput = z.infer<typeof TailorResumeOutputSchema>;

export async function tailorResume(input: TailorResumeInput): Promise<TailorResumeOutput> {
  return tailorResumeFlow(input);
}

const tailorResumePrompt = ai.definePrompt({
  name: 'tailorResumePrompt',
  input: {schema: TailorResumeInputSchema},
  output: {schema: TailorResumeOutputSchema},
  prompt: `You are an expert resume writer. Your goal is to tailor a resume to a specific job description, highlighting the most relevant skills and experience.

  Here is the resume:
  {{resumeText}}

  Here is the job description:
  {{jobDescription}}

  Please provide a tailored resume that emphasizes the skills and experience that are most relevant to the job description. Do not add any new information that is not already in the resume.`,
});

const tailorResumeFlow = ai.defineFlow(
  {
    name: 'tailorResumeFlow',
    inputSchema: TailorResumeInputSchema,
    outputSchema: TailorResumeOutputSchema,
  },
  async input => {
    const {output} = await tailorResumePrompt(input);
    return output!;
  }
);
