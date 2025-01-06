import React from 'react';
import { Scale, FileText, Shield, AlertCircle, Users } from 'lucide-react';

export const termsSections = [
  {
    icon: Scale,
    title: "Terms of Use",
    content: (
      <>
        <p>By accessing and using ScholarHub, you agree to these terms:</p>
        <ul>
          <li>Use the service for legitimate research purposes</li>
          <li>Maintain the confidentiality of your account</li>
          <li>Comply with all applicable laws and regulations</li>
          <li>Respect intellectual property rights</li>
        </ul>
      </>
    )
  },
  {
    icon: Users,
    title: "User Responsibilities",
    content: (
      <>
        <p>As a user of ScholarHub, you are responsible for:</p>
        <ul>
          <li>Maintaining accurate account information</li>
          <li>Protecting your login credentials</li>
          <li>Ensuring the legality of uploaded content</li>
          <li>Respecting other users' privacy and rights</li>
        </ul>
      </>
    )
  },
  {
    icon: AlertCircle,
    title: "Limitations of Liability",
    content: (
      <>
        <p>ScholarHub is provided "as is" and we:</p>
        <ul>
          <li>Make no warranties about service reliability</li>
          <li>Are not liable for data loss or damages</li>
          <li>Reserve the right to modify or terminate services</li>
          <li>May update these terms at any time</li>
        </ul>
      </>
    )
  }
];