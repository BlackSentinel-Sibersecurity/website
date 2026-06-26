"use client";

const orbs = [
  { left: "10%", top: "15%", width: "350px", height: "350px", duration: "18s", delay: "0s", color: "#FF6600" },
  { left: "70%", top: "60%", width: "500px", height: "500px", duration: "25s", delay: "3s", color: "#FF8533" },
  { left: "40%", top: "80%", width: "300px", height: "300px", duration: "22s", delay: "1s", color: "#FF6600" },
  { left: "85%", top: "10%", width: "400px", height: "400px", duration: "20s", delay: "5s", color: "#FF8533" },
  { left: "25%", top: "45%", width: "250px", height: "250px", duration: "30s", delay: "2s", color: "#FF6600" },
  { left: "60%", top: "30%", width: "450px", height: "450px", duration: "17s", delay: "4s", color: "#FF8533" },
];

function Orb({ orb }: { orb: (typeof orbs)[number] }) {
  return (
    <div
      className="absolute rounded-full blur-3xl opacity-[0.04] animate-float"
      style={{
        left: orb.left,
        top: orb.top,
        width: orb.width,
        height: orb.height,
        animationDuration: orb.duration,
        animationDelay: orb.delay,
        background: `radial-gradient(circle, ${orb.color}, transparent)`,
      }}
    />
  );
}

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {orbs.map((orb, i) => (
        <Orb key={i} orb={orb} />
      ))}
    </div>
  );
}
