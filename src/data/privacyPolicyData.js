export const privacyPolicyData = {
  title: "ConnectMasjid – Privacy Policy & Project Documentation",
  effectiveDate: "July 13, 2026",
  lastUpdated: "July 13, 2026",
  sections: [
    {
      id: "introduction",
      title: "1. Introduction",
      content: [
        "ConnectMasjid is a community-first digital platform designed to connect Muslims with their local masjids, providing accurate prayer timings, congregation (Jamaat) schedules, community announcements, and mosque management tools. By downloading, accessing, or using ConnectMasjid, you agree to the practices described in this Privacy Policy."
      ]
    },
    {
      id: "information-collected",
      title: "2. Information You Collect",
      subsections: [
        {
          title: "A. Personal Information Provided by You",
          items: [
            "Account Registration: When creating a user or mosque admin account, we collect your email address, phone number, and display name.",
            "Mosque Onboarding & Verification: If you register a mosque as an administrator, we collect mosque details (name, address, prayer timings, facilities) and verification documentation."
          ]
        },
        {
          title: "B. Location Information",
          items: [
            "Precise & Approximate Location: With your explicit permission, we collect your geographic location (latitude and longitude) to automatically detect nearby masjids, calculate accurate Qibla direction, and compute astronomical prayer times for your exact coordinates."
          ]
        },
        {
          title: "C. Device & Usage Data",
          items: [
            "Device Identifiers: We collect device model, operating system version, app version, and push notification tokens (Firebase Cloud Messaging tokens) to reliably deliver real-time prayer alerts and mosque notices.",
            "Usage Diagnostics: Anonymous diagnostic logs and error reports to help us maintain app stability and performance."
          ]
        }
      ]
    },
    {
      id: "how-information-used",
      title: "3. How You Use the Information",
      intro: "We use the collected information exclusively for providing and enhancing ConnectMasjid services:",
      items: [
        {
          title: "Prayer & Jamaat Synchronization",
          desc: "To display precise local prayer schedules and live Jamaat updates from your selected primary mosque."
        },
        {
          title: "Real-Time Notifications",
          desc: "To send Adhan alerts, Jamaat reminders, Friday (Jumuah) announcements, and community notices via push notifications."
        },
        {
          title: "Mosque Verification & Security",
          desc: "To verify mosque administrator identities via secure One-Time Password (OTP) verification and prevent unauthorized changes."
        },
        {
          title: "Community Connection",
          desc: "To allow community members to join, follow, and interact with their registered masjids."
        },
        {
          title: "App Improvement",
          desc: "To analyze performance bottlenecks, troubleshoot bugs, and optimize battery/network usage."
        }
      ]
    },
    {
      id: "third-party-services",
      title: "4. Third-Party Services",
      intro: "We partner with trusted, industry-standard service providers to power key functionalities. These third parties only process data required to fulfill their specific services:",
      partners: [
        {
          name: "Google Play Services & Firebase Cloud Messaging (Google LLC)",
          role: "Used for delivering reliable background push notifications and system alerts."
        },
        {
          name: "Geolocator / CartoDB / OpenStreetMap",
          role: "Used to render map tiles and calculate distances between your location and nearby masjids."
        },
        {
          name: "Brevo (Sendinblue)",
          role: "Used for sending secure email verification OTP codes and transactional administrative notifications."
        }
      ],
      footer: "Each third-party provider operates under strict data protection agreements and their respective privacy policies."
    },
    {
      id: "data-storage-security",
      title: "5. Data Storage and Security",
      intro: "We implement robust technical and organizational security controls to protect your data against unauthorized access, loss, or alteration:",
      items: [
        {
          title: "Encryption in Transit",
          desc: "All communications between your device and our servers are encrypted using industry-standard HTTPS / TLS 1.3 (SSL) protocols."
        },
        {
          title: "Secure Storage",
          desc: "User credentials, tokens, and verification codes are stored on secure cloud servers with strict firewall configurations and restricted administrative access."
        },
        {
          title: "Data Retention",
          desc: "We retain your account information only as long as your account remains active. Expired OTP verification codes and temporary logs are automatically purged by automated nightly maintenance tasks."
        }
      ]
    },
    {
      id: "user-rights",
      title: "6. User Rights",
      intro: "You maintain full control over your personal data:",
      items: [
        {
          title: "Right to Access & Update",
          desc: "You can view and edit your profile display name, email, and selected mosque directly inside the app under Profile Settings."
        },
        {
          title: "Right to Deletion",
          desc: "You can request the full deletion of your ConnectMasjid account and all associated personal data directly within the app or by contacting support. Upon account deletion, your memberships, tokens, and personal details are permanently erased."
        },
        {
          title: "Location & Notification Controls",
          desc: "You can enable or disable location permissions and push notifications at any time through your device’s system settings."
        }
      ]
    },
    {
      id: "childrens-privacy",
      title: "7. Children's Privacy",
      content: [
        "ConnectMasjid is designed as a safe, family-friendly community tool. We do not knowingly collect personal identifiable information from children under the age of 13 without verifiable parental consent. If we discover that a child under 13 has provided personal data without parental oversight, we will take immediate steps to delete such information from our servers."
      ]
    },
    {
      id: "changes-to-policy",
      title: "8. Changes to the Policy",
      content: [
        "We may update this Privacy Policy periodically to reflect new features, technical enhancements, or regulatory compliance updates. When significant changes occur, we will update the Last Updated date at the top of this document and notify users via an in-app notice or announcement. Continued use of the app after an update constitutes acceptance of the revised policy."
      ]
    },
    {
      id: "contact-information",
      title: "9. Contact Information",
      intro: "If you have any questions, privacy requests, or feedback regarding this Privacy Policy or your data rights, please contact our support team:",
      contacts: [
        { label: "Email Support", value: "noreplydeenconnects@gmail.com", href: "mailto:noreplydeenconnects@gmail.com" },
        { label: "Admin Contact", value: "amanullahpathan9854@gmail.com", href: "mailto:amanullahpathan9854@gmail.com" },
        { label: "Platform", value: "ConnectMasjid Community Support", href: "#support" }
      ]
    }
  ]
};
