import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"

// components/ui/oauth-buttons.tsx
export function OAuthButtons() {
    return (
      <div className="grid grid-cols-2 gap-3">
        <Button 
          variant="outline" 
          className="w-full bg-background"
          onClick={() => {/* TODO: Google auth */}}
        >
          <Icons.google className="mr-2 h-4 w-4" />
          Google
        </Button>
        <Button 
          variant="outline"
          className="w-full bg-background"
          onClick={() => {/* TODO: Github auth */}}
        >
          <Icons.gitHub className="mr-2 h-4 w-4" />
          Github
        </Button>
      </div>
    )
  }