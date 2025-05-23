import Svg, { G, Path } from 'react-native-svg';

export function HeartIcon() {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24">
      <Path
        fill="#fff"
        d="m12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53z"
      />
    </Svg>
  );
}

export function DownloadIcon() {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24">
      <Path
        fill="#fff"
        d="M8 17v-2h8v2zm8-7l-4 4l-4-4h2.5V7h3v3zM5 3h14a2 2 0 0 1 2 2v14c0 1.11-.89 2-2 2H5a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2m0 2v14h14V5z"
      />
    </Svg>
  );
}

export function CommentIcon() {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24">
      <Path
        fill="#fff"
        d="M12 3C6.5 3 2 6.58 2 11a7.22 7.22 0 0 0 2.75 5.5c0 .6-.42 2.17-2.75 4.5c2.37-.11 4.64-1 6.47-2.5c1.14.33 2.34.5 3.53.5c5.5 0 10-3.58 10-8s-4.5-8-10-8m0 14c-4.42 0-8-2.69-8-6s3.58-6 8-6s8 2.69 8 6s-3.58 6-8 6m5-5v-2h-2v2zm-4 0v-2h-2v2zm-4 0v-2H7v2z"
      />
    </Svg>
  );
}

export function PlayIcon() {
  return (
    <Svg width="40" height="40" viewBox="0 0 24 24">
      <Path
        fill="#fff"
        stroke="#fff"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
        d="M6.906 4.537A.6.6 0 0 0 6 5.053v13.894a.6.6 0 0 0 .906.516l11.723-6.947a.6.6 0 0 0 0-1.032z"
      />
    </Svg>
  );
}

export function PauseIcon() {
  return (
    <Svg width="40" height="40" viewBox="0 0 24 24">
      <Path
        fill="#fff"
        fill-rule="evenodd"
        d="M8 5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm7 0a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z"
        clip-rule="evenodd"
      />
    </Svg>
  );
}

export function SuccessIcon() {
  return (
    <Svg width="72" height="72" viewBox="0 0 24 24">
      <G fill="#00ee02">
        <Path d="M10.243 16.314L6 12.07l1.414-1.414l2.829 2.828l5.656-5.657l1.415 1.415z" />
        <Path
          fillRule="evenodd"
          d="M1 12C1 5.925 5.925 1 12 1s11 4.925 11 11s-4.925 11-11 11S1 18.075 1 12m11 9a9 9 0 1 1 0-18a9 9 0 0 1 0 18"
          clipRule="evenodd"
        />
      </G>
    </Svg>
  );
}

export function YouTubeIcon() {
  return (
    <Svg width="24" height="24" viewBox="0 0 72 72">
      <Path
        fill="#ea5a47"
        d="M63.874 21.906a7.31 7.31 0 0 0-5.144-5.177C54.193 15.505 36 15.505 36 15.505s-18.193 0-22.73 1.224a7.31 7.31 0 0 0-5.144 5.177C6.91 26.472 6.91 36 6.91 36s0 9.528 1.216 14.095a7.31 7.31 0 0 0 5.144 5.177C17.807 56.495 36 56.495 36 56.495s18.193 0 22.73-1.223a7.31 7.31 0 0 0 5.144-5.177C65.09 45.528 65.09 36 65.09 36s0-9.528-1.216-14.094"
      />
      <Path fill="#fff" d="M30.05 44.65L45.256 36L30.05 27.35Z" />
      <G fill="none" stroke="#000" stroke-miterlimit="10" stroke-width="2">
        <Path d="M63.874 21.906a7.31 7.31 0 0 0-5.144-5.177C54.193 15.505 36 15.505 36 15.505s-18.193 0-22.73 1.224a7.31 7.31 0 0 0-5.144 5.177C6.91 26.472 6.91 36 6.91 36s0 9.528 1.216 14.095a7.31 7.31 0 0 0 5.144 5.177C17.807 56.495 36 56.495 36 56.495s18.193 0 22.73-1.223a7.31 7.31 0 0 0 5.144-5.177C65.09 45.528 65.09 36 65.09 36s0-9.528-1.216-14.094" />
        <Path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M30.05 44.65L45.256 36L30.05 27.35Z"
        />
      </G>
    </Svg>
  );
}

export function CameraIcon({ color }: { color: string }) {
  return (
    <Svg width={24} height={24} viewBox="0 0 16 16">
      <Path
        fill={color}
        d="M3.5 3A2.5 2.5 0 0 0 1 5.5v5A2.5 2.5 0 0 0 3.5 13h5a2.5 2.5 0 0 0 2.5-2.5v-.127l2.035 1.405a1.25 1.25 0 0 0 1.96-1.028V5.252a1.25 1.25 0 0 0-1.96-1.028L11 5.629V5.5A2.5 2.5 0 0 0 8.5 3zM11 6.844l2.604-1.798a.25.25 0 0 1 .392.206v5.498a.25.25 0 0 1-.392.205L11 9.158zM2 5.5A1.5 1.5 0 0 1 3.5 4h5A1.5 1.5 0 0 1 10 5.5v5A1.5 1.5 0 0 1 8.5 12h-5A1.5 1.5 0 0 1 2 10.5z"
      ></Path>
    </Svg>
  );
}

export function ForwardIcon() {
  return (
    <Svg width={28} height={28} viewBox="0 0 24 24">
      <Path
        fill="none"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811zm9.75 0c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977z"
      ></Path>
    </Svg>
  );
}

export function BackwardIcon() {
  return (
    <Svg width={24} height={24} viewBox="0 0 512 512">
      <Path
        fill="#fff"
        d="M455.979 424.271A24.053 24.053 0 0 0 480 400.251V112.015a24 24 0 0 0-38.285-19.286L264 224.369V112.015a24 24 0 0 0-38.285-19.286L31.155 236.847a24 24 0 0 0 0 38.57l194.56 144.119A24 24 0 0 0 264 400.251V287.9l177.715 131.637a23.92 23.92 0 0 0 14.264 4.734M232 384.37L58.88 256.132L232 127.9ZM448 127.9v256.47L274.88 256.132Z"
      ></Path>
    </Svg>
  );
}
