import {
    Search,
    Users,
    FileText,
    MessageSquare,
    BarChart3,
    Shield,
    Clock,
    Award,
    Briefcase,
    Building2,
    LayoutDashboard,
    Plus
  } from "lucide-react";

    export const jobSeekerFeatures = [
        {
          icon: Search,
          title: "Smart Job Discovery",
          description:
            "AI-powered filters help you find the most relevant jobs in seconds.",
          color: "from-[#3B82F6] to-indigo-600"
        },
        {
          icon: Briefcase,
          title: "One-Click Applications",
          description:
            "Apply instantly to multiple jobs with your saved professional profile.",
          color: "from-purple-500 to-pink-500"
        },
        {
          icon: Shield,
          title: "Secure & Private Profile",
          description:
            "Your personal data stays protected with enterprise-grade security.",
          color: "from-green-500 to-emerald-600"
        },
        {
            icon: FileText,
            title: "Resume Builder",
            description:
              "Create and manage a professional resume directly on the platform.",
            color: "from-orange-500 to-red-500"
          },
          {
            icon: MessageSquare,
            title: "Direct Recruiter Chat",
            description:
              "Connect and communicate with recruiters in real-time.",
            color: "from-cyan-500 to-[#2563EB]"
          },
          {
            icon: Award,
            title: "Verified Skill Badges",
            description:
              "Earn skill certifications and showcase achievements to employers.",
            color: "from-yellow-500 to-amber-600"
          }
      ];
      export const employerFeatures = [
        {
          icon: Plus,
          title: "Post Jobs Instantly",
          description:
            "Create and publish job listings in minutes with our intuitive interface.",
          color: "from-indigo-500 to-purple-600"
        },
        {
          icon: Users,
          title: "Access Talent Pool",
          description:
            "Browse thousands of qualified candidates with advanced filters.",
          color: "from-[#3B82F6] to-cyan-600"
        },
        {
          icon: LayoutDashboard,
          title: "Smart Hiring Dashboard",
          description:
            "Manage applications, shortlist candidates, and track progress easily.",
          color: "from-pink-500 to-rose-600"
        },
        {
          icon: MessageSquare,
          title: "Direct Candidate Chat",
          description:
            "Communicate instantly with applicants to speed up hiring decisions.",
          color: "from-emerald-500 to-green-600"
        },
        {
          icon: BarChart3,
          title: "Hiring Analytics",
          description:
            "Get insights on job performance, applicant quality, and engagement.",
          color: "from-orange-500 to-amber-600"
        },
        {
          icon: Clock,
          title: "Faster Recruitment",
          description:
            "Reduce hiring time with automated workflows and smart matching.",
          color: "from-gray-600 to-gray-800"
        },
        {
          icon: Building2,
          title: "Company Branding",
          description:
            "Showcase your company culture, mission, and values to attract top talent.",
          color: "from-teal-500 to-[#1A2B3E]"
        }
      ];
      export const NAVIGATION_MENU = [
        {
          id: "employer-dashboard",
          label: "Dashboard",
          path: "/employer-dashboard",
          icon: LayoutDashboard,
          role: "employer"
        },
        {
          id: "post-job",
          label: "Post Job",
          path: "/post-job",
          icon: Plus,
          role: "employer"
        },
        {
          id: "manage-jobs",
          label: "Manage Jobs",
          path: "/manage-jobs",
          icon: Briefcase,
          role: "employer"
        },
        {
          id: "company-profile",
          label: "Company Profile",
          path: "/company-profile",
          icon: Building2,
          role: "employer"
        }
      ];

      export const CATEGORIES = [
        { id: "engineering", value: "Engineering", label: "Engineering" },
        { id: "design", value: "Design", label: "Design" },
        { id: "marketing", value: "Marketing", label: "Marketing" },
        { id: "sales", value: "Sales", label: "Sales" },
        { id: "it-software", value: "IT & Software", label: "IT & Software" },
        { id: "customer-service", value: "Customer Service", label: "Customer Service" },
        { id: "product", value: "Product", label: "Product" },
        { id: "operations", value: "Operations", label: "Operations" },
        { id: "finance", value: "Finance", label: "Finance" },
        { id: "hr", value: "Human Resources", label: "Human Resources" },
        { id: "other", value: "Other", label: "Other" }
      ];


      export const JOB_TYPES = [
        { id: "remote", value: "Remote", label: "Remote" },
        { id: "full-time", value: "Full-Time", label: "Full-Time" },
        { id: "part-time", value: "Part-Time", label: "Part-Time" },
        { id: "contract", value: "Contract", label: "Contract" },
        { id: "internship", value: "Internship", label: "Internship" }
      ];

      export const SALARY_RANGES = [
        { id: "under-1000", value: "Less than $1000", label: "Less than $1000" },
        { id: "1000-15000", value: "$1000 - $15,000", label: "$1000 - $15,000" },
        { id: "above-15000", value: "More than $15,000", label: "More than $15,000" }
      ];