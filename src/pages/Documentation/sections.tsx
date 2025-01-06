import React from 'react';
import { BookOpen, Code, Terminal, FileText, Settings, Shield } from 'lucide-react';

export const sections = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    icon: BookOpen,
    content: (
      <>
        <h2>Quick Start Guide</h2>
        <p>
          Welcome to ScholarHub! This guide will help you get started with managing your research projects effectively.
        </p>

        <h3>Installation</h3>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <pre><code>{`git clone https://github.com/scholarhub/scholarhub.git
cd scholarhub
npm install`}</code></pre>
        </div>

        <h3>Configuration</h3>
        <p>
          Create a <code>.env</code> file in the root directory and add your configuration:
        </p>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <pre><code>{`PORT=3000
NODE_ENV=development
DB_HOST=localhost
DB_NAME=scholarhub`}</code></pre>
        </div>
      </>
    )
  },
  {
    id: 'project-management',
    title: 'Project Management',
    icon: FileText,
    content: (
      <>
        <h2>Managing Research Projects</h2>
        <p>
          Learn how to organize and track your research projects effectively using ScholarHub's project management features.
        </p>

        <h3>Creating a Project</h3>
        <ol>
          <li>Navigate to the Projects section</li>
          <li>Click "New Project" button</li>
          <li>Fill in project details:
            <ul>
              <li>Title</li>
              <li>Description</li>
              <li>Start date</li>
              <li>Expected completion date</li>
              <li>Tags</li>
            </ul>
          </li>
        </ol>

        <h3>Project Milestones</h3>
        <p>
          Track progress by adding milestones to your project:
        </p>
        <ul>
          <li>Create specific, measurable goals</li>
          <li>Set deadlines for each milestone</li>
          <li>Monitor progress with the built-in tracking tools</li>
        </ul>
      </>
    )
  },
  {
    id: 'reference-management',
    title: 'Reference Management',
    icon: Code,
    content: (
      <>
        <h2>Managing References</h2>
        <p>
          Organize your research references efficiently with ScholarHub's reference management system.
        </p>

        <h3>Adding References</h3>
        <p>
          You can add references in several ways:
        </p>
        <ul>
          <li>Manual entry</li>
          <li>DOI import</li>
          <li>BibTeX import</li>
          <li>PDF metadata extraction</li>
        </ul>

        <h3>Organizing References</h3>
        <p>
          Keep your references organized using:
        </p>
        <ul>
          <li>Custom folders</li>
          <li>Tags</li>
          <li>Smart collections</li>
          <li>Search filters</li>
        </ul>
      </>
    )
  },
  {
    id: 'api-reference',
    title: 'API Reference',
    icon: Terminal,
    content: (
      <>
        <h2>API Documentation</h2>
        <p>
          Integrate ScholarHub with your applications using our REST API.
        </p>

        <h3>Authentication</h3>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <pre><code>{`POST /api/auth/login

{
  "email": "user@example.com",
  "password": "your-password"
}`}</code></pre>
        </div>

        <h3>Projects API</h3>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <pre><code>{`GET /api/projects
POST /api/projects
GET /api/projects/:id
PUT /api/projects/:id
DELETE /api/projects/:id`}</code></pre>
        </div>
      </>
    )
  },
  {
    id: 'security',
    title: 'Security',
    icon: Shield,
    content: (
      <>
        <h2>Security Features</h2>
        <p>
          Learn about ScholarHub's security features and best practices for protecting your research data.
        </p>

        <h3>Data Protection</h3>
        <ul>
          <li>End-to-end encryption</li>
          <li>Regular automated backups</li>
          <li>Two-factor authentication</li>
          <li>Role-based access control</li>
        </ul>

        <h3>Compliance</h3>
        <p>
          ScholarHub is compliant with:
        </p>
        <ul>
          <li>GDPR</li>
          <li>HIPAA</li>
          <li>FERPA</li>
        </ul>
      </>
    )
  },
  {
    id: 'configuration',
    title: 'Configuration',
    icon: Settings,
    content: (
      <>
        <h2>System Configuration</h2>
        <p>
          Configure ScholarHub to match your research workflow and requirements.
        </p>

        <h3>Environment Variables</h3>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <pre><code>{`# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_NAME=scholarhub

# Authentication
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=24h`}</code></pre>
        </div>

        <h3>Custom Settings</h3>
        <p>
          Customize your experience through the settings panel:
        </p>
        <ul>
          <li>Theme preferences</li>
          <li>Notification settings</li>
          <li>Default project views</li>
          <li>Citation formats</li>
        </ul>
      </>
    )
  }
];