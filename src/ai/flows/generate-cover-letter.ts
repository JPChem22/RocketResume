'use server';
/**
 * @fileOverview Generates a cover letter based on a tailored resume and job description.
 *
 * - generateCoverLetter - A function that generates a cover letter.
 * - GenerateCoverLetterInput - The input type for the generateCoverLetter function.
 * - GenerateCoverLetterOutput - The return type for the generateCoverLetter function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCoverLetterInputSchema = z.object({
  tailoredResume: z
    .string()
    .describe('The tailored resume content.'),
  jobDescription: z.string().describe('The job description content.'),
});
export type GenerateCoverLetterInput = z.infer<typeof GenerateCoverLetterInputSchema>;

const GenerateCoverLetterOutputSchema = z.object({
  coverLetter: z.string().describe('The generated cover letter.'),
});
export type GenerateCoverLetterOutput = z.infer<typeof GenerateCoverLetterOutputSchema>;

export async function generateCoverLetter(input: GenerateCoverLetterInput): Promise<GenerateCoverLetterOutput> {
  return generateCoverLetterFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCoverLetterPrompt',
  input: {schema: GenerateCoverLetterInputSchema},
  output: {schema: GenerateCoverLetterOutputSchema},
  prompt: `You are an expert career advisor. Your job is to write a compelling cover letter based on a tailored resume and a job description.

Tailored Resume:
{{{tailoredResume}}}

Job Description:
{{{jobDescription}}}

Cover Letter: Instructions:

Objective: Write a compelling cover letter that highlights why the candidate, based on their [Tailored Resume Text], is an excellent fit for the role described in the [Job Description Text].

Structure of the Cover Letter:

Salutation:
If [Hiring Manager Name] is provided, use "Dear [Hiring Manager Name]," (e.g., "Dear Dr. Doe," or "Dear Hiring Team," if a specific name isn't available but company is).
If only [Company Name] is provided, "Dear Hiring Manager at [Company Name]," is acceptable.
If neither is known, use a general professional salutation like "Dear Hiring Manager,".
Introduction (First Paragraph):
Clearly state the specific position the candidate is applying for (as mentioned in the [Job Description Text]).
Mention where the candidate saw the job posting (if this information is typically included or can be generically phrased, e.g., "I am writing to express my keen interest in the [Job Title] position advertised on [Platform, e.g., LinkedIn/your company website].").
Briefly express strong interest and enthusiasm for the role and the company (if [Company Name] is known).
Body Paragraphs (Typically 2-3 Paragraphs):
This is the core of the letter. Connect the candidate's key qualifications, experiences, and skills from the [Tailored Resume Text] directly to the most important requirements and responsibilities outlined in the [Job Description Text].
Select 2-3 key qualifications or experiences from the tailored resume that are most impactful for this specific role. For each, explain how the candidate's background makes them suitable. Refer to specific achievements (which are now in STAR format in their resume) without explicitly saying "STAR".
Demonstrate a clear understanding of the employer's needs as stated in the job description.
Incorporate relevant keywords from the [Job Description Text] naturally.
Highlight how the candidate can contribute to the company's success or solve specific problems mentioned or implied in the job description.
Conclusion (Final Paragraph):
Reiterate strong interest in the position and the company.
Briefly mention enthusiasm for the opportunity to discuss their qualifications further in an interview.
Thank the hiring manager for their time and consideration.
Closing:
Use a professional closing like "Sincerely," or "Respectfully,".
Signature:
Leave space for a signature, then type the [Candidate Name] if provided. The [Candidate Name] should be taken from the uploaded resume. If not, type "[Candidate Name]".
Tone and Style:

Professional, confident, enthusiastic, and tailored.
Avoid generic phrases and clichés. Every sentence should serve a purpose.
Ensure the language is clear, concise, and error-free.
The length should be appropriate for a standard cover letter (around 3-4 paragraphs, not exceeding one page).
Focus on Connection: The primary goal is to bridge the [Tailored Resume Text] with the [Job Description Text], showing a direct match. Do not simply repeat the resume; expand on the most relevant points and explain their significance in the context of the new role.`,
});

const generateCoverLetterFlow = ai.defineFlow(
  {
    name: 'generateCoverLetterFlow',
    inputSchema: GenerateCoverLetterInputSchema,
    outputSchema: GenerateCoverLetterOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
