// components/auth/pattern.tsx
export function Pattern() {
    return (
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 800 800"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="grid"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M0 60L60 0M45 60L60 45M15 60L60 15M0 45L45 0M0 15L15 0"
              stroke="currentColor"
              strokeWidth="0.5"
              strokeOpacity="0.15"
              fill="none"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    )
  }