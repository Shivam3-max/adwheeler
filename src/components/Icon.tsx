type IconProps = { name: string; className?: string };

const PATHS: Record<string, React.ReactNode> = {
  bag: <path d="M6 8h12l-1 12H7L6 8Zm3 0V6a3 3 0 0 1 6 0v2" />,
  building: <path d="M4 21V5l8-2v18M12 21h8V9l-8-2M8 8v.01M8 12v.01M8 16v.01M16 12v.01M16 16v.01" />,
  cross: <path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6V3Z" />,
  fork: <path d="M6 3v7a2 2 0 0 0 4 0V3M8 12v9M17 3c-1.5 1-2 3-2 5s.5 3 2 3v10" />,
  flag: <path d="M5 21V4m0 0 9 2 5-1v9l-5 1-9-2" />,
  cap: <path d="M3 9l9-4 9 4-9 4-9-4Zm3 2v5c0 1.5 3 3 6 3s6-1.5 6-3v-5" />,
  gem: <path d="M6 4h12l3 5-9 11L3 9l3-5Zm-3 5h18M9 4l3 5 3-5M12 9v11" />,
  ticket: <path d="M4 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H6a2 2 0 0 1-2-2 2 2 0 0 0 0-4Zm10-2v2m0 4v2m0 4v0" />,
  shield: <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3Z" />,
  bolt: <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8Z" />,
  route: <path d="M6 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm12-10a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM8 17h6a4 4 0 0 0 0-8H9a4 4 0 0 1 0-8" />,
  chart: <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />,
  eye: <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Zm10 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />,
};

export default function Icon({ name, className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      width="24"
      height="24"
    >
      {PATHS[name] ?? PATHS.bolt}
    </svg>
  );
}
