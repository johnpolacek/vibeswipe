export function generatePRDPrompt(idea: { name: string; description: string }) {
  return `Please help me write a detailed Product Requirements Document (PRD) for the following startup idea. Ask any followup questions you need to clarify the requirements.

Project: ${idea.name}
Description: ${idea.description}

Please include the following sections:
1. Problem Statement
2. Target Users/Market
3. Solution Overview
4. Key Features & Requirements
5. User Stories
6. Success Metrics
7. Technical Requirements
8. MVP Scope
9. Future Considerations

Please be specific and actionable in your response, focusing on practical implementation details while maintaining the core vision of the idea.`
}

export function generateDevPrompt(idea: { name: string; description: string }) {
  return `I want to build the following startup idea as a full-stack web application:

Project: ${idea.name}
Description: ${idea.description}

Please help me with:
1. A recommended tech stack with modern, production-ready technologies
2. Initial project setup instructions
3. Core features to implement for an MVP
4. Basic architecture and data model
5. Key implementation considerations and potential challenges
6. Development roadmap broken down into phases

Please be specific and provide actionable steps I can follow to start building this project.`
}

export function copyToClipboard(text: string) {
  if (typeof window !== 'undefined') {
    navigator.clipboard.writeText(text)
  }
} 