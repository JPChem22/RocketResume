
// src/ai/flows/tailor-resume.ts
'use server';
/**
 * @fileOverview This file defines a Genkit flow for tailoring a resume to a specific job description.
 *
 * - tailorResume - A function that accepts a resume (as PDF data URI) and job description, and returns a tailored resume.
 * - TailorResumeInput - The input type for the tailorResume function.
 * - TailorResumeOutput - The return type for the tailorResume function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TailorResumeInputSchema = z.object({
  resumeDataUri: z
    .string()
    .describe("A PDF document of the resume, as a data URI that must include a MIME type (application/pdf) and use Base64 encoding. Expected format: 'data:application/pdf;base64,<encoded_data>'."),
  jobDescription: z
    .string()
    .describe('The job description to tailor the resume to.'),
});
export type TailorResumeInput = z.infer<typeof TailorResumeInputSchema>;

const TailorResumeOutputSchema = z.object({
  tailoredResume: z
    .string()
    .describe('The tailored resume, optimized for the job description, with text extracted from the provided PDF.'),
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

  The resume is provided as an uploaded document. Please extract the text content from this document first.
  Resume Document:
  {{media url=resumeDataUri}}

  Here is the job description:
  {{jobDescription}}

  After extracting the text from the resume document, please provide a tailored resume that emphasizes the skills and experience from the extracted text that are most relevant to the job description. Do not add any new information that is not present in the original resume document.`,
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
