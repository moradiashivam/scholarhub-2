import React from 'react';
import { Shield, Lock, Eye, Database, Bell, Users } from 'lucide-react';

export const privacySections = [
  {
    icon: Shield,
    title: "Information We Collect",
    content: (
      <>
        <p>We collect information that you provide directly to us, including:</p>
        <ul>
          <li>Name and contact information</li>
          <li>Account credentials</li>
          <li>Research project data</li>
          <li>Usage information and preferences</li>
        </ul>
      </>
    )
  },
  {
    icon: Lock,
    title: "How We Use Your Information",
    content: (
      <>
        <p>Your information is used to:</p>
        <ul>
          <li>Provide and maintain the ScholarHub service</li>
          <li>Process and manage your research projects</li>
          <li>Improve and personalize your experience</li>
          <li>Communicate with you about service updates</li>
        </ul>
      </>
    )
  },
  {
    icon: Database,
    title: "Data Storage and Security",
    content: (
      <>
        <p>We implement robust security measures to protect your data:</p>
        <ul>
          <li>End-to-end encryption for sensitive data</li>
          <li>Regular security audits and updates</li>
          <li>Secure data backups</li>
          <li>Industry-standard security protocols</li>
        </ul>
      </>
    )
  }
];