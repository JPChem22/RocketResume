'use client';

import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Rocket, FileText, Download, AlertCircle, Loader2, UploadCloud } from 'lucide-react';
import { tailorResume, TailorResumeInput } from '@/ai/flows/tailor-resume';
import { generateCoverLetter, GenerateCoverLetterInput } from '@/ai/flows/generate-cover-letter';
import { useToast } from "@/hooks/use-toast";

export default function AppPage() {
  const [resumeText, setResumeText] = useState<string>('');
  const [jobDescription, setJobDescription] = useState<string>('');
  const [tailoredResume, setTailoredResume] = useState<string>('');
  const [coverLetter, setCoverLetter] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [resumeFileName, setResumeFileName] = useState<string | null>(null);

  const { toast } = useToast();

  const handleResumeFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
        setResumeFileName(file.name);
        const text = await file.text();
        setResumeText(text);
        setError(null); 
      } else {
        setError('Please upload a .txt file for your resume. PDF/DOCX upload coming soon!');
        setResumeFileName(null);
        setResumeText('');
        toast({
          title: "Invalid File Type",
          description: "Please upload a .txt file. PDF/DOCX support is planned for a future update.",
          variant: "destructive",
        });
      }
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!resumeText || !jobDescription) {
      setError('Please provide both your resume content and the job description.');
      toast({
        title: "Missing Information",
        description: "Both resume and job description are required.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setError(null);
    setTailoredResume('');
    setCoverLetter('');

    try {
      toast({
        title: "Processing Request...",
        description: "Our AI is tailoring your resume. This may take a moment.",
      });
      const tailorInput: TailorResumeInput = { resumeText, jobDescription };
      const tailoredOutput = await tailorResume(tailorInput);
      setTailoredResume(tailoredOutput.tailoredResume);

      toast({
        title: "Resume Tailored!",
        description: "Now generating your cover letter...",
      });
      const coverLetterInput: GenerateCoverLetterInput = {
        tailoredResume: tailoredOutput.tailoredResume,
        jobDescription,
      };
      const coverLetterOutput = await generateCoverLetter(coverLetterInput);
      setCoverLetter(coverLetterOutput.coverLetter);
      
      toast({
        title: "Success!",
        description: "Your tailored resume and cover letter are ready.",
        variant: "default",
      });

    } catch (err) {
      console.error(err);
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred.';
      setError(`Failed to generate documents: ${errorMessage}`);
      toast({
        title: "Generation Failed",
        description: `An error occurred: ${errorMessage}`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const downloadTextFile = (content: string, filename: string) => {
    if (!content) {
      toast({ title: "Nothing to download", description: "Content is empty.", variant: "destructive" });
      return;
    }
    const element = document.createElement("a");
    const file = new Blob([content], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast({ title: "Download Started", description: `${filename} is downloading.` });
  };
  
  // Client-side Date for "Generated on" to avoid hydration mismatch
  const [currentDate, setCurrentDate] = useState<string | null>(null);
  useEffect(() => {
    setCurrentDate(new Date().toLocaleDateString());
  }, [tailoredResume, coverLetter]);


  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-primary/5 via-background to-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Card className="max-w-5xl mx-auto shadow-2xl">
          <CardHeader className="text-center">
            <Rocket className="h-12 w-12 text-primary mx-auto mb-2" />
            <CardTitle className="text-3xl font-bold">Resume & Cover Letter Generator</CardTitle>
            <CardDescription>
              Upload your resume, paste the job description, and let our AI craft tailored documents for you. Cost: $1.50 per generation.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <Label htmlFor="resumeUpload" className="text-lg font-semibold flex items-center gap-2">
                    <UploadCloud className="h-5 w-5 text-primary" />
                    Upload Your Resume (.txt file)
                  </Label>
                  <Input
                    id="resumeUpload"
                    type="file"
                    accept=".txt"
                    onChange={handleResumeFileChange}
                    className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 py-4"
                    required
                  />
                  {resumeFileName && <p className="text-sm text-muted-foreground">Uploaded: {resumeFileName}</p>}
                  {resumeText && (
                     <Textarea
                        placeholder="Your resume content will appear here after upload (or paste here)..."
                        value={resumeText}
                        onChange={(e) => setResumeText(e.target.value)}
                        rows={10}
                        className="mt-2 border-dashed"
                        aria-label="Resume Content"
                      />
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="jobDescription" className="text-lg font-semibold flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Paste Job Description
                  </Label>
                  <Textarea
                    id="jobDescription"
                    placeholder="Paste the full job description here..."
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    rows={resumeText ? 10 : 17} // Adjust height based on resume text area
                    required
                    className="shadow-sm"
                    aria-label="Job Description"
                  />
                </div>
              </div>

              {error && (
                <Alert variant="destructive" className="shadow-md">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full text-lg py-6 bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg transform hover:scale-102 transition-transform"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Rocket className="mr-2 h-5 w-5" />
                    Generate Documents ($1.50)
                  </>
                )}
              </Button>
            </form>

            {(tailoredResume || coverLetter) && (
              <Tabs defaultValue="resume" className="mt-12">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="resume">Tailored Resume</TabsTrigger>
                  <TabsTrigger value="coverLetter">Generated Cover Letter</TabsTrigger>
                </TabsList>
                <TabsContent value="resume">
                  <Card className="mt-4 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>Your Tailored Resume</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => downloadTextFile(tailoredResume, 'tailored_resume.txt')}
                          disabled={!tailoredResume}
                          className="shadow"
                        >
                          <Download className="mr-2 h-4 w-4" /> Download .txt
                        </Button>
                      </CardTitle>
                      {currentDate && <CardDescription>Generated on {currentDate}</CardDescription>}
                    </CardHeader>
                    <CardContent>
                      <Textarea
                        value={tailoredResume}
                        onChange={(e) => setTailoredResume(e.target.value)}
                        rows={20}
                        className="font-mono text-sm shadow-inner bg-muted/30"
                        aria-label="Tailored Resume Output"
                        placeholder="Your tailored resume will appear here..."
                      />
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="coverLetter">
                  <Card className="mt-4 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>Your Generated Cover Letter</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => downloadTextFile(coverLetter, 'cover_letter.txt')}
                          disabled={!coverLetter}
                          className="shadow"
                        >
                          <Download className="mr-2 h-4 w-4" /> Download .txt
                        </Button>
                      </CardTitle>
                      {currentDate && <CardDescription>Generated on {currentDate}</CardDescription>}
                    </CardHeader>
                    <CardContent>
                      <Textarea
                        value={coverLetter}
                        onChange={(e) => setCoverLetter(e.target.value)}
                        rows={20}
                        className="font-mono text-sm shadow-inner bg-muted/30"
                        aria-label="Generated Cover Letter Output"
                        placeholder="Your generated cover letter will appear here..."
                      />
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            )}
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
