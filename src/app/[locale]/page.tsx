import { redirect } from 'next/navigation'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { LogoutButton } from '@/components/auth/logoutButton'
import { TopRightActions } from '@/components/ui/headerToggle'

export default async function Home() {
  const supabase = createServerComponentClient({ cookies })
  
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    redirect('/login')
  }

  // User profile from metadata if available
  const user = session.user
  const firstName = user.user_metadata?.firstname || user.email?.split('@')[0] || 'User'

  return (
    <main className="min-h-screen flex flex-col">
      <header className="bg-card shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-accent-main-600">Gleef</h1>
          <div className="flex items-center space-x-4">
            <TopRightActions />
            <LogoutButton />
          </div>
        </div>
      </header>
      
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Welcome, {firstName}!</h2>
            <p className="text-muted-foreground mb-6">
              You've successfully logged into the Gleef localization platform. From here, you can manage your localization keys and translate content directly in Figma.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-accent-main-100/50 rounded-lg p-4 text-center flex flex-col items-center">
                <div className="w-12 h-12 bg-accent-main-200 rounded-full flex items-center justify-center mb-2">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 12H15M12 16H15M9 12H9.01M9 16H9.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9 3C9 2.44772 9.44772 2 10 2H14C14.5523 2 15 2.44772 15 3V5H9V3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="font-medium mb-1">Manage Keys</h3>
                <p className="text-sm text-muted-foreground">Create and organize your localization keys</p>
              </div>
              
              <div className="bg-accent-main-100/50 rounded-lg p-4 text-center flex flex-col items-center">
                <div className="w-12 h-12 bg-accent-main-200 rounded-full flex items-center justify-center mb-2">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 5H15M9 3V5M10.5 19L15.5 9M13 15L20 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 15L9 12M7 17L4 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="font-medium mb-1">Auto-Translate</h3>
                <p className="text-sm text-muted-foreground">Generate translations with advanced AI</p>
              </div>
              
              <div className="bg-accent-main-100/50 rounded-lg p-4 text-center flex flex-col items-center">
                <div className="w-12 h-12 bg-accent-main-200 rounded-full flex items-center justify-center mb-2">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 3H9C7.89543 3 7 3.89543 7 5V19C7 20.1046 7.89543 21 9 21H15C16.1046 21 17 20.1046 17 19V5C17 3.89543 16.1046 3 15 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M7 17H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M7 7H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M7 12H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <h3 className="font-medium mb-1">Preview in Figma</h3>
                <p className="text-sm text-muted-foreground">Visualize translations directly in your designs</p>
              </div>
            </div>
          </div>
          
          <div className="bg-card rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Getting Started</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-accent-main-300 flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="font-medium">1</span>
                </div>
                <div>
                  <h3 className="font-medium">Install the Figma Plugin</h3>
                  <p className="text-muted-foreground mt-1">
                    Get the Gleef plugin from the Figma Community to connect your designs with our localization platform.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-accent-main-300 flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="font-medium">2</span>
                </div>
                <div>
                  <h3 className="font-medium">Create Your First Project</h3>
                  <p className="text-muted-foreground mt-1">
                    Set up a new localization project and define your source language and target languages.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-accent-main-300 flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="font-medium">3</span>
                </div>
                <div>
                  <h3 className="font-medium">Import or Create Keys</h3>
                  <p className="text-muted-foreground mt-1">
                    Add localization keys manually or import them from existing JSON files to get started quickly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}