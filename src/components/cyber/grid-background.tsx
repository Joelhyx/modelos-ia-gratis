export function GridBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-void">
      <div className="grid-bg absolute inset-0 opacity-80" />
      <div className="absolute -top-48 left-1/2 h-[540px] w-[860px] -translate-x-1/2 rounded-full bg-neon-violet/20 blur-[150px]" />
      <div className="absolute right-[-12%] top-1/3 h-[380px] w-[380px] rounded-full bg-neon-pink/10 blur-[120px]" />
      <div className="absolute bottom-[-15%] left-[-8%] h-[440px] w-[440px] rounded-full bg-neon-cyan/10 blur-[140px]" />
      <div className="scanlines absolute inset-0 opacity-60" />
      <div className="vignette absolute inset-0" />
    </div>
  )
}
