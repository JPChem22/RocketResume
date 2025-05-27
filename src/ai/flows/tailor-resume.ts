// src/ai/flows/tailor-resume.ts
'use server';
/**
 * @fileOverview This file defines a Genkit flow for tailoring a resume to a specific job description.
 *
 * - tailorResume - A function that accepts a resume (as Data URI) and job description, and returns a tailored resume.
 * - TailorResumeInput - The input type for the tailorResume function.
 * - TailorResumeOutput - The return type for the tailorResume function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TailorResumeInputSchema = z.object({
  resumeDataUri: z
    .string()
    .describe("A document of the resume (.txt, .pdf, .docx, .doc), as a data URI that must include a MIME type and use Base64 encoding. Example format: 'data:<mime_type>;base64,<encoded_data>'."),
  jobDescription: z
    .string()
    .describe('The job description to tailor the resume to.'),
});
export type TailorResumeInput = z.infer<typeof TailorResumeInputSchema>;

const TailorResumeOutputSchema = z.object({
  tailoredResume: z
    .string()
    .describe('The tailored resume, optimized for the job description, with text extracted from the provided document.'),
});
export type TailorResumeOutput = z.infer<typeof TailorResumeOutputSchema>;

export async function tailorResume(input: TailorResumeInput): Promise<TailorResumeOutput> {
  // The Genkit prompt uses the media field to send the document Data URI to the model.
  // It is assumed that the configured AI model (googleai/gemini-2.0-flash) is capable
  // of processing the text content from the supported document types (.txt, .pdf, .docx, .doc)
  // when provided as a Data URI via the media field in the prompt.
  // Explicit parsing logic for different file types is NOT needed here if the model supports it.
  // If the model CANNOT directly process these document types via the media field,
  // you would need to add code here to:
  // 1. Parse the Data URI to get the base64 data and MIME type.
  // 2. Use appropriate libraries (e.g., pdf-parse, docx, mammoth) based on the MIME type
  //    to extract the text content.
  // 3. Pass the extracted text as a string to the prompt instead of the Data URI in the media field.

  const {output} = await tailorResumePrompt(input);
  return output!;
}

const tailorResumePrompt = ai.definePrompt({
  name: 'tailorResumePrompt',
  input: {schema: TailorResumeInputSchema},
  output: {schema: TailorResumeOutputSchema},
  prompt: `You are an expert resume tailoring AI. Your task is to revise the provided resume to align with the given job description, focusing on the summary, experience section, and skills section, while strategically incorporating keywords.

  The resume is provided as an uploaded document. Please extract the text content from this document first.
  Resume Document:
  {{media url=resumeDataUri}}

  Here is the job description:
  {{jobDescription}}

  Instructions:

Analyze both the resume and the job description thoroughly. Identify key skills, experiences, qualifications, and keywords in the job description. Note the candidate's existing skills and experiences from their resume.

Keyword Integration Strategy: As you revise the sections below, strategically weave in relevant keywords and phrases from the [Job Description Text] naturally. Avoid "keyword stuffing"; the language should remain professional and flow well.

Resume Summary:

If a summary section exists in the [Resume Text]: Rewrite the existing summary. It should be concise (3-4 sentences) and powerfully highlight the candidate's most relevant qualifications and experiences as they pertain to the specific requirements and keywords found in the [Job Description Text]. Synthesize the information from the rest of the resume to support this summary.
If no summary section exists in the [Resume Text]: Create a compelling professional summary (3-4 sentences). This summary should introduce the candidate, highlight their key skills and years of experience relevant to the [Job Description Text], and state their career objective in relation to the target role. Base this summary on the experiences and skills detailed in the [Resume Text] and tailor it directly to the [Job Description Text].
Experience Section Bullet Points:

For each position listed under the experience section in the [Resume Text], revise the existing bullet points or create new ones if the detail is insufficient.
Each bullet point should implicitly follow the STAR method (Situation, Task, Action, Result) to describe achievements and responsibilities.
Crucially, do NOT explicitly label or mention "STAR," "Situation," "Task," "Action," or "Result" in the output. Instead, craft achievement-oriented statements that naturally incorporate these elements.
Focus on:
Clearly describing the context or challenge (Situation/Task).
Detailing the specific actions taken by the candidate (Action).
Quantifying the outcomes or results of these actions whenever possible (Result). Use numbers, percentages, or specific examples to demonstrate impact.
Using strong action verbs to start each bullet point.
Ensuring the language and achievements highlighted are directly relevant to the requirements and preferences stated in the [Job Description Text], incorporating identified keywords where appropriate.
Skills Section:

Analyze the existing skills listed in the [Resume Text] and the skills required or preferred in the [Job Description Text].
Revise the skills section to include ONLY skills relevant to the [Job Description Text]. Remove any skills currently listed on the resume that are not relevant to the target job.
Identify skills mentioned in the [Job Description Text] that the candidate likely possesses based on their experience outlined in the [Job Description Text], even if not explicitly listed in their original skills section. Add these relevant skills to the skills section.
If the [Job Description Text] lists specific technical skills, software proficiencies, or certifications, ensure these are included in the revised skills section if they can be reasonably inferred from the candidate's overall experience or are present in the original resume.
Organize the skills clearly, perhaps by category if appropriate (e.g., Technical Skills, Soft Skills, Languages), but prioritize a simple list if categorization is not straightforward.
Ensure important keywords from the [Job Description Text] related to skills are present in this section.
Overall Tone and Formatting:

Maintain a professional and confident tone throughout the revised resume sections.
Ensure the output for the summary, bullet points, and skills section is clear, concise, and impactful.
Output:

Provide the tailored resume in the same format as uploaded but with the revised resume summary, the revised bullet points for each experience entry, the revised skills section, and the original form of the rest of the resume.`,
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
