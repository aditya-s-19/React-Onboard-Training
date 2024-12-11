interface LoadingAnimationProps {
  size?: number;
  color?: string;
}

const LoadingAnimation = ({ size = 150, color = "#0064FF" }: LoadingAnimationProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width={size} height={size} style={{ margin: "auto" }}>
      <circle fill={color} stroke={color} strokeWidth="15" r="15" cx="40" cy="65">
        <animate
          attributeName="cy"
          calcMode="spline"
          dur="2s"
          values="65;135;65;"
          keySplines=".5 0 .5 1;.5 0 .5 1"
          repeatCount="indefinite"
          begin="-.4s"
        />
      </circle>
      <circle fill={color} stroke={color} strokeWidth="15" r="15" cx="100" cy="65">
        <animate
          attributeName="cy"
          calcMode="spline"
          dur="2s"
          values="65;135;65;"
          keySplines=".5 0 .5 1;.5 0 .5 1"
          repeatCount="indefinite"
          begin="-.2s"
        />
      </circle>
      <circle fill={color} stroke={color} strokeWidth="15" r="15" cx="160" cy="65">
        <animate
          attributeName="cy"
          calcMode="spline"
          dur="2s"
          values="65;135;65;"
          keySplines=".5 0 .5 1;.5 0 .5 1"
          repeatCount="indefinite"
          begin="0s"
        />
      </circle>
    </svg>
  );
};

export default LoadingAnimation;
