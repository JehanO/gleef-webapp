import { Button } from "@/components/ui/button"
import { Github } from "lucide-react"
import Image from "next/image"

export function OAuthButtons() {
  return (
    <div className="flex flex-col gap-3 w-full">
      <Button variant="outline" className="w-full">
        <Image 
          src="/google.svg" 
          alt="Google" 
          width={20} 
          height={20} 
          className="mr-2" 
        />
        Continue with Google
      </Button>
      
      <Button variant="outline" className="w-full">
        <Github className="mr-2 h-5 w-5" />
        Continue with GitHub
      </Button>
      
      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
    </div>
  )
}
