import '../styles/loading.css'

export default function LoadingSVG() {
  return (
    <div className="loading-container">
        <div className='loading-wrapper'>
      <svg>
        <circle
          fill="none"
          stroke="black"
          stroke-width="4"
          stroke-miterlimit="10"
          cx="50"
          cy="50"
          r="48"
        />
        <line
          fill="none"
          stroke-linecap="round"
          stroke="black"
          stroke-width="4"
          stroke-miterlimit="10"
          x1="50"
          y1="50"
          x2="85"
          y2="50.5"
        >
          <animateTransform
            attributeName="transform"
            dur="2s"
            type="rotate"
            from="0 50 50"
            to="360 50 50"
            repeatCount="indefinite"
          />
        </line>
        <line
          fill="none"
          stroke-linecap="round"
          stroke="black"
          stroke-width="4"
          stroke-miterlimit="10"
          x1="50"
          y1="50"
          x2="49.5"
          y2="74"
        >
          <animateTransform
            attributeName="transform"
            dur="15s"
            type="rotate"
            from="0 50 50"
            to="360 50 50"
            repeatCount="indefinite"
          />
        </line>
      </svg>
      <div>Loading...</div>
      </div>
    </div>
  );
}
