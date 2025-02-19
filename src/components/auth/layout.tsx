import { Pattern } from "@/components/auth/pattern"
import { TopRightActions } from "@/components/ui/header-top-right-actions"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <div className="hidden lg:flex lg:w-1/2 relative bg-muted overflow-hidden">
        <Pattern />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-muted-foreground/20" />
        <div className="absolute inset-0 flex items-center justify-center text-primary/40">
          <svg className="w-64 h-64" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M12 2L1 21h22L12 2zm0 3.5L19.5 19h-15L12 5.5z"
            />
          </svg>
        </div>
      </div>
      <main className="w-full lg:w-1/2 p-8 sm:p-12 flex flex-col justify-center relative">
        <div className="absolute top-8 right-8">
          <TopRightActions />
        </div>
        <div className="max-w-[440px] mx-auto w-full">{children}</div>
      </main>
    </div>
  )
}