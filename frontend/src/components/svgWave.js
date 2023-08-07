import Wave from "react-wavify";

export default function Wavify() {
  return (
    <Wave
      fill="url(#gradient)"
      className="svg-wave"
      options={{
        height: 20,
        amplitude: 50,
        speed: 0.15,
        points: 3,
      }}
    >
      <defs>
        <linearGradient id="gradient" gradientTransform="rotate(90)">
          <stop offset="10%" stopColor="#19A1D2" />
          <stop offset="90%" stopColor="#A2D3E5" />
        </linearGradient>
      </defs>
    </Wave>
  );
}
