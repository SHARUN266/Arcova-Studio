"use client"

/**
 * Generates a clean initials-based avatar.
 * If an `src` image URL is provided, it shows the photo instead.
 * Falls back to initials derived from the name.
 */

interface InitialsAvatarProps {
  name: string
  src?: string
  size?: "sm" | "md" | "lg"
  className?: string
}

// Deterministic color palette for initials — visually distinct, premium feel
const AVATAR_COLORS = [
  "from-violet-600 to-purple-700",
  "from-amber-500 to-orange-600",
  "from-emerald-500 to-teal-600",
  "from-rose-500 to-pink-600",
  "from-sky-500 to-blue-600",
  "from-fuchsia-500 to-purple-600",
]

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

function getColorIndex(name: string): number {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  return Math.abs(hash) % AVATAR_COLORS.length
}

const sizeClasses = {
  sm: "w-8 h-8 text-xs",
  md: "w-12 h-12 text-sm",
  lg: "w-14 h-14 text-base",
}

export function InitialsAvatar({
  name,
  src,
  size = "lg",
  className = "",
}: InitialsAvatarProps) {
  const initials = getInitials(name)
  const colorGradient = AVATAR_COLORS[getColorIndex(name)]

  // If a real photo is provided, show it
  if (src) {
    return (
      <div
        className={`${sizeClasses[size]} rounded-full overflow-hidden border border-white/10 flex-shrink-0 ${className}`}
      >
        <img
          src={src}
          alt={name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
    )
  }

  // Otherwise, show deterministic gradient + initials
  return (
    <div
      className={`${sizeClasses[size]} rounded-full bg-gradient-to-br ${colorGradient} flex items-center justify-center font-bold text-white tracking-wider border border-white/10 flex-shrink-0 select-none ${className}`}
      aria-label={name}
    >
      {initials}
    </div>
  )
}
