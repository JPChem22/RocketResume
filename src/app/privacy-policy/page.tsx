import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">Privacy Policy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p><strong>Last Updated: {new Date().toLocaleDateString()}</strong></p>
            
            <p>Welcome to ResumeRocket! We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.</p>

            <h2 className="text-xl font-semibold text-foreground pt-4">1. Information We Collect</h2>
            <p>We may collect personal information that you voluntarily provide to us when you use our services, such as:</p>
            <ul className="list-disc list-inside ml-4">
              <li>Resume content (text you upload or paste)</li>
              <li>Job description content (text you paste)</li>
              <li>Email address (if you contact us or for future account features)</li>
              <li>Payment information (processed by a third-party payment processor if you make a purchase)</li>
            </ul>
            <p>We also automatically collect certain information when you visit, use, or navigate the Site. This information does not reveal your specific identity but may include device and usage information, such as your IP address, browser and device characteristics, operating system, language preferences, referring URLs, device name, country, location, information about how and when you use our Site, and other technical information.</p>

            <h2 className="text-xl font-semibold text-foreground pt-4">2. How We Use Your Information</h2>
            <p>We use the information we collect or receive:</p>
            <ul className="list-disc list-inside ml-4">
              <li>To provide, operate, and maintain our services (e.g., tailor resumes, generate cover letters).</li>
              <li>To process your transactions and manage your orders.</li>
              <li>To improve our website, products, and services.</li>
              <li>To respond to user inquiries and offer support.</li>
              <li>To send you technical notices, updates, security alerts, and support messages.</li>
              <li>For compliance purposes, including enforcing our Terms of Service, or other legal rights.</li>
            </ul>
            <p>The AI models used to process your resume and job description data may be operated by third-party providers. We endevaour to ensure these providers adhere to strict privacy and security standards. Your data is used solely for the purpose of generating the requested documents and is not used to train general AI models beyond the scope of our service, unless explicitly stated or anonymized.</p>
            
            <h2 className="text-xl font-semibold text-foreground pt-4">3. Disclosure of Your Information</h2>
            <p>We do not sell, trade, rent, or otherwise share your personal information with third parties for their marketing purposes. We may disclose your information in the following situations:</p>
            <ul className="list-disc list-inside ml-4">
                <li><strong>With Service Providers:</strong> We may share your information with third-party vendors, service providers, contractors, or agents who perform services for us or on our behalf and require access to such information to do that work (e.g., payment processing, AI model providers).</li>
                <li><strong>For Legal Reasons:</strong> We may disclose your information if required to do so by law or in response to valid requests by public authorities.</li>
                <li><strong>To Protect Rights:</strong> We may disclose information where we believe it is necessary to investigate, prevent, or take action regarding potential violations of our policies, suspected fraud, situations involving potential threats to the safety of any person and illegal activities, or as evidence in litigation in which we are involved.</li>
            </ul>

            <h2 className="text-xl font-semibold text-foreground pt-4">4. Data Security</h2>
            <p>We implement a variety of security measures to maintain the safety of your personal information. However, no electronic transmission over the internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorized third parties will not be able to defeat our security and improperly collect, access, steal, or modify your information.</p>

            <h2 className="text-xl font-semibold text-foreground pt-4">5. Your Data Rights</h2>
            <p>Depending on your location, you may have certain rights regarding your personal information, such as the right to access, correct, or delete your data. Please contact us if you wish to exercise these rights.</p>
            
            <h2 className="text-xl font-semibold text-foreground pt-4">6. Changes to This Privacy Policy</h2>
            <p>We may update this Privacy Policy from time to time. The updated version will be indicated by an updated "Last Updated" date. We encourage you to review this Privacy Policy frequently to be informed of how we are protecting your information.</p>

            <h2 className="text-xl font-semibold text-foreground pt-4">7. Contact Us</h2>
            <p>If you have questions or comments about this Privacy Policy, please contact us at: [Your Contact Email Address or Link to Contact Form - e.g., support@resumerocket.com]</p>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
