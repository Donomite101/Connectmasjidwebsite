export const deleteAccountData = {
  title: "ConnectMasjid – Account Deletion & Data Retention Policy",
  effectiveDate: "July 13, 2026",
  lastUpdated: "July 13, 2026",
  intro: "At ConnectMasjid, we are committed to transparency, security, and full user autonomy. In accordance with Google Play and Apple App Store data safety mandates, any registered user or mosque administrator has the right to request full deletion of their account and associated data at any time.",
  methods: [
    {
      id: "in-app",
      title: "Method 1: Instant In-App Deletion (Recommended)",
      badge: "Fastest & Automated",
      description: "If you currently have the ConnectMasjid mobile app installed on your iOS or Android device, you can delete your account instantly without waiting for customer support:",
      steps: [
        "Open the ConnectMasjid mobile app on your smartphone.",
        "Ensure you are logged into the account you wish to delete.",
        "Navigate to the Profile tab (or tap your user profile/settings icon).",
        "Scroll down to the bottom of your profile settings and tap the red 'Delete Account' button right below the Log Out option.",
        "Confirm your decision in the popup alert. Your account, credentials, and personal data will be purged immediately, and you will be logged out to the welcome screen."
      ]
    },
    {
      id: "email-request",
      title: "Method 2: Email & Web Deletion Request",
      badge: "For Uninstalled Apps",
      description: "If you no longer have access to the mobile application or your device, you can submit a manual account deletion request via email:",
      steps: [
        "Send an email from your registered email address to support.connectmasjid@gmail.com with the subject line: 'Account Deletion Request'.",
        "In the email body, provide your registered display name, email address, or phone number associated with your account.",
        "Our security team will send a brief confirmation reply or verification code (OTP) to verify ownership and prevent unauthorized deletion.",
        "Once verified, your account and associated records will be permanently erased within 7 to 14 business days."
      ]
    }
  ],
  deletedData: {
    title: "What Data Will Be Deleted Immediately",
    intro: "Upon execution of an account deletion request (whether via the mobile app or through verified customer support), the following data categories are permanently deleted from our active production servers and databases:",
    items: [
      {
        title: "Account Credentials & Profile",
        desc: "Your display name, email address, phone number, verification flags, and hashed authentication records in the users table."
      },
      {
        title: "Connected Masjid Memberships",
        desc: "Your user affiliations, joined mosque links, and member roles inside our memberships database."
      },
      {
        title: "Prayer History & Tracking Logs",
        desc: "All personal daily prayer logs (prayer_logs), check-in history, Qaza counters, streaks, and personal statistics (prayer_tracking_summary)."
      },
      {
        title: "Notifications & Device Tokens",
        desc: "Firebase Cloud Messaging (FCM) push notification tokens, notification inbox messages, and local reminder schedules."
      },
      {
        title: "Community & Interaction Records",
        desc: "Your saved mosque likes, bookmarks (mosque_likes), and private Imam chat requests (imam_chat_requests)."
      }
    ]
  },
  retainedData: {
    title: "Data Retention & Legal Compliance",
    intro: "To preserve community continuity, prevent system abuse, and comply with strict legal reporting obligations, limited data is handled under the following retention guidelines:",
    items: [
      {
        title: "Public Mosque Schedules & Notices (Mosque Administrators)",
        desc: "If you are a registered Mosque Administrator who onboarded or updated a public masjid's prayer timings, Jumuah schedules, announcements, or mosque photos, those public mosque profiles and schedules remain active for the community so local worshippers are not disrupted. Your personal admin profile, membership, and identity are completely detached and deleted."
      },
      {
        title: "Anonymized & Aggregated Analytics",
        desc: "Completely de-identified statistical aggregates (such as total community check-ins in a city or region) that cannot be linked back to any individual user."
      },
      {
        title: "Encrypted Backup & Security Archives",
        desc: "To protect against catastrophic system failures and cybersecurity incidents, encrypted database snapshots are maintained on a strict 30-day rolling cycle. When your account is deleted from active production databases, any residual encrypted traces in system backup archives are automatically overwritten and permanently purged when the 30-day cycle completes."
      }
    ]
  },
  contact: {
    title: "Contact Information & Support",
    email: "support.connectmasjid@gmail.com",
    address: "ConnectMasjid Platform Support",
    responseWindow: "Within 24–48 hours for verification queries; full deletion within 7–14 business days for manual email requests (or instant when performed inside the app)."
  }
};
