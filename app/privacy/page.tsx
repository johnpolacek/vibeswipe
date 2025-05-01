import { Heading } from "@/components/typography/heading"

export default function PrivacyPage() {
  return (
    <div className="container py-12">
      <div className="mx-auto max-w-3xl text-sm text-pretty">
        <div className="mb-12 text-center">
          <Heading variant="h2" className="mb-8">
            Privacy Policy
          </Heading>
        </div>

        <div className="prose prose-gray max-w-none">
          <h2 className="text-xl font-semibold mb-4">1. Introduction</h2>
          <p className="mb-6">
            This Privacy Policy describes how VibeSwipe ("we," "our," or "us") collects, uses, and shares your information when you use our service. BY USING VIBESWIPE, YOU ACCEPT AND AGREE TO THIS
            PRIVACY POLICY IN ITS ENTIRETY. IF YOU DO NOT AGREE TO THIS PRIVACY POLICY, DO NOT USE THE SERVICE.
          </p>

          <h2 className="text-xl font-semibold mb-4">2. Information We Collect</h2>
          <div className="mb-6">
            <p className="mb-4">We may collect the following types of information:</p>
            <ul className="list-disc pl-6">
              <li className="mb-2">Account Information: Email address, username, and authentication data when you create an account</li>
              <li className="mb-2">Usage Data: Your interactions with project ideas, including swipes, likes ("vibes"), and matches</li>
              <li className="mb-2">Device Information: IP address, browser type, device type, operating system, and other technical identifiers</li>
              <li className="mb-2">User Content: Any project ideas, comments, or other content you submit to the platform</li>
              <li className="mb-2">Communication Data: Information from your interactions with our support channels</li>
            </ul>
            <p className="mt-4 text-gray-600">
              NOTICE: WE MAKE NO GUARANTEES ABOUT THE SECURITY OR PRIVACY OF ANY INFORMATION YOU PROVIDE. YOU ACKNOWLEDGE THAT ANY INFORMATION YOU SHARE IS PROVIDED AT YOUR OWN RISK.
            </p>
          </div>

          <h2 className="text-xl font-semibold mb-4">3. How We Use Your Information</h2>
          <div className="mb-6">
            <p className="mb-4">We may use your information for purposes including:</p>
            <ul className="list-disc pl-6">
              <li className="mb-2">Providing and maintaining the Service</li>
              <li className="mb-2">Matching you with relevant project ideas</li>
              <li className="mb-2">Analyzing usage patterns and improving the Service</li>
              <li className="mb-2">Communicating with you about the Service</li>
              <li className="mb-2">Enforcing our Terms of Service</li>
              <li className="mb-2">Marketing and promotional purposes</li>
            </ul>
            <p className="mt-4 text-gray-600">YOU ACKNOWLEDGE AND AGREE THAT WE MAY USE YOUR INFORMATION IN ANY WAY WE SEE FIT, WITHOUT ANY OBLIGATION TO YOU OR ANY THIRD PARTY.</p>
          </div>

          <h2 className="text-xl font-semibold mb-4">4. Information Sharing and Disclosure</h2>
          <div className="mb-6">
            <p className="mb-4">We may share your information with:</p>
            <ul className="list-disc pl-6">
              <li className="mb-2">Service providers and business partners</li>
              <li className="mb-2">Law enforcement or government agencies when required</li>
              <li className="mb-2">Other users as part of the normal operation of the Service</li>
              <li className="mb-2">Third parties in connection with a merger, acquisition, or similar transaction</li>
            </ul>
            <p className="mt-4 text-gray-600">WE RESERVE THE RIGHT TO SHARE, SELL, OR TRANSFER YOUR INFORMATION AT OUR SOLE DISCRETION, WITHOUT NOTICE OR LIABILITY TO YOU.</p>
          </div>

          <h2 className="text-xl font-semibold mb-4">5. Data Retention and Deletion</h2>
          <p className="mb-6">
            We may retain your information indefinitely, even after you delete your account. WE MAKE NO GUARANTEES ABOUT OUR ABILITY OR OBLIGATION TO DELETE YOUR INFORMATION FROM OUR SYSTEMS. You
            acknowledge that some information may remain in our systems even after deletion due to backups or technical limitations.
          </p>

          <h2 className="text-xl font-semibold mb-4">6. Third-Party Services</h2>
          <p className="mb-6">
            Our Service may contain links to or integrate with third-party services. WE ARE NOT RESPONSIBLE FOR THE PRIVACY PRACTICES OR CONTENT OF ANY THIRD-PARTY SERVICES. You acknowledge that your
            use of such services is subject to their respective privacy policies and terms of service.
          </p>

          <h2 className="text-xl font-semibold mb-4">7. Data Security</h2>
          <p className="mb-6">
            While we implement reasonable security measures, NO METHOD OF TRANSMISSION OR STORAGE IS 100% SECURE. YOU ACKNOWLEDGE AND AGREE THAT WE MAKE NO WARRANTIES OR GUARANTEES ABOUT THE SECURITY
            OF YOUR INFORMATION. You transmit any information to us at your own risk.
          </p>

          <h2 className="text-xl font-semibold mb-4">8. Children's Privacy</h2>
          <p className="mb-6">
            The Service is not intended for use by children under the age of 13. We do not knowingly collect information from children under 13. If you become aware that a child has provided us with
            personal information, please contact us.
          </p>

          <h2 className="text-xl font-semibold mb-4">9. International Data Transfers</h2>
          <p className="mb-6">
            Your information may be transferred to and processed in countries other than your own. BY USING THE SERVICE, YOU CONSENT TO THE TRANSFER OF YOUR INFORMATION TO ANY COUNTRY WHERE WE OR OUR
            SERVICE PROVIDERS MAINTAIN FACILITIES.
          </p>

          <h2 className="text-xl font-semibold mb-4">10. Changes to This Privacy Policy</h2>
          <p className="mb-6">
            WE RESERVE THE RIGHT TO MODIFY THIS PRIVACY POLICY AT ANY TIME, WITHOUT NOTICE TO YOU. Your continued use of the Service after any changes indicates your acceptance of the modified Privacy
            Policy.
          </p>

          <h2 className="text-xl font-semibold mb-4">11. Contact Information</h2>
          <p className="mb-6">
            For questions about this Privacy Policy, please contact us through our Discord channel. HOWEVER, WE MAKE NO GUARANTEES ABOUT OUR RESPONSE TIME OR ABILITY TO ADDRESS YOUR CONCERNS.
          </p>

          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500">
              DISCLAIMER: THIS PRIVACY POLICY IS PROVIDED "AS IS" WITHOUT ANY WARRANTIES, EXPRESS OR IMPLIED. VIBESWIPE RESERVES THE RIGHT TO COLLECT, USE, AND SHARE YOUR INFORMATION IN ANY MANNER
              CONSISTENT WITH THIS POLICY OR AS REQUIRED BY LAW, WITHOUT LIABILITY TO YOU OR ANY THIRD PARTY.
            </p>
          </div>

          <p className="text-sm text-gray-500 mt-8">Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  )
}
