import { useCSSVariable } from "utils/hooks/useCSSVariable";
import { motion } from "framer-motion";
import { redoSVGVariants, undoSVGVariants } from "utils/animations";

export const plus = () => {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 5V19"
        style={{ stroke: "var(--less-white)" }}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 12H19"
        style={{ stroke: "var(--less-white)" }}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const close = () => {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18 5.91L6 18.09"
        style={{ stroke: "var(--less-white)" }}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 5.91L18 18.09"
        style={{ stroke: "var(--less-white)" }}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const burger = (open) => {
  return open ? (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18 5.91L6 18.09"
        style={{ stroke: "var(--less-white)" }}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 5.91L18 18.09"
        style={{ stroke: "var(--less-white)" }}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ) : (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 6H19"
        style={{ stroke: "var(--less-white)" }}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 18H19"
        style={{ stroke: "var(--less-white)" }}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 12H19"
        style={{ stroke: "var(--less-white)" }}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const loadingSvg = () => {
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
      style={{
        shapeRendering: "auto",
        display: "block",
        background: "rgba(255, 255, 255, 0)",
      }}
      width="100"
      height="100"
    >
      <g>
        <g transform="translate(80,50)">
          <g transform="rotate(0)">
            <circle fillOpacity="1" fill="#f7941d" r="7" cy="0" cx="0">
              <animateTransform
                repeatCount="indefinite"
                dur="1.7241379310344827s"
                keyTimes="0;1"
                values="1.68 1.68;1 1"
                begin="-1.5086206896551722s"
                type="scale"
                attributeName="transform"
              ></animateTransform>
              <animate
                begin="-1.5086206896551722s"
                values="1;0"
                repeatCount="indefinite"
                dur="1.7241379310344827s"
                keyTimes="0;1"
                attributeName="fill-opacity"
              ></animate>
            </circle>
          </g>
        </g>
        <g transform="translate(71.21320343559643,71.21320343559643)">
          <g transform="rotate(45)">
            <circle fillOpacity="0.875" fill="#f7941d" r="7" cy="0" cx="0">
              <animateTransform
                repeatCount="indefinite"
                dur="1.7241379310344827s"
                keyTimes="0;1"
                values="1.68 1.68;1 1"
                begin="-1.2931034482758619s"
                type="scale"
                attributeName="transform"
              ></animateTransform>
              <animate
                begin="-1.2931034482758619s"
                values="1;0"
                repeatCount="indefinite"
                dur="1.7241379310344827s"
                keyTimes="0;1"
                attributeName="fill-opacity"
              ></animate>
            </circle>
          </g>
        </g>
        <g transform="translate(50,80)">
          <g transform="rotate(90)">
            <circle fillOpacity="0.75" fill="#f7941d" r="7" cy="0" cx="0">
              <animateTransform
                repeatCount="indefinite"
                dur="1.7241379310344827s"
                keyTimes="0;1"
                values="1.68 1.68;1 1"
                begin="-1.0775862068965516s"
                type="scale"
                attributeName="transform"
              ></animateTransform>
              <animate
                begin="-1.0775862068965516s"
                values="1;0"
                repeatCount="indefinite"
                dur="1.7241379310344827s"
                keyTimes="0;1"
                attributeName="fill-opacity"
              ></animate>
            </circle>
          </g>
        </g>
        <g transform="translate(28.786796564403577,71.21320343559643)">
          <g transform="rotate(135)">
            <circle fillOpacity="0.625" fill="#f7941d" r="7" cy="0" cx="0">
              <animateTransform
                repeatCount="indefinite"
                dur="1.7241379310344827s"
                keyTimes="0;1"
                values="1.68 1.68;1 1"
                begin="-0.8620689655172413s"
                type="scale"
                attributeName="transform"
              ></animateTransform>
              <animate
                begin="-0.8620689655172413s"
                values="1;0"
                repeatCount="indefinite"
                dur="1.7241379310344827s"
                keyTimes="0;1"
                attributeName="fill-opacity"
              ></animate>
            </circle>
          </g>
        </g>
        <g transform="translate(20,50.00000000000001)">
          <g transform="rotate(180)">
            <circle fillOpacity="0.5" fill="#f7941d" r="7" cy="0" cx="0">
              <animateTransform
                repeatCount="indefinite"
                dur="1.7241379310344827s"
                keyTimes="0;1"
                values="1.68 1.68;1 1"
                begin="-0.6465517241379309s"
                type="scale"
                attributeName="transform"
              ></animateTransform>
              <animate
                begin="-0.6465517241379309s"
                values="1;0"
                repeatCount="indefinite"
                dur="1.7241379310344827s"
                keyTimes="0;1"
                attributeName="fill-opacity"
              ></animate>
            </circle>
          </g>
        </g>
        <g transform="translate(28.78679656440357,28.786796564403577)">
          <g transform="rotate(225)">
            <circle fillOpacity="0.375" fill="#f7941d" r="7" cy="0" cx="0">
              <animateTransform
                repeatCount="indefinite"
                dur="1.7241379310344827s"
                keyTimes="0;1"
                values="1.68 1.68;1 1"
                begin="-0.43103448275862066s"
                type="scale"
                attributeName="transform"
              ></animateTransform>
              <animate
                begin="-0.43103448275862066s"
                values="1;0"
                repeatCount="indefinite"
                dur="1.7241379310344827s"
                keyTimes="0;1"
                attributeName="fill-opacity"
              ></animate>
            </circle>
          </g>
        </g>
        <g transform="translate(49.99999999999999,20)">
          <g transform="rotate(270)">
            <circle fillOpacity="0.25" fill="#f7941d" r="7" cy="0" cx="0">
              <animateTransform
                repeatCount="indefinite"
                dur="1.7241379310344827s"
                keyTimes="0;1"
                values="1.68 1.68;1 1"
                begin="-0.21551724137931033s"
                type="scale"
                attributeName="transform"
              ></animateTransform>
              <animate
                begin="-0.21551724137931033s"
                values="1;0"
                repeatCount="indefinite"
                dur="1.7241379310344827s"
                keyTimes="0;1"
                attributeName="fill-opacity"
              ></animate>
            </circle>
          </g>
        </g>
        <g transform="translate(71.21320343559643,28.78679656440357)">
          <g transform="rotate(315)">
            <circle fillOpacity="0.125" fill="#f7941d" r="7" cy="0" cx="0">
              <animateTransform
                repeatCount="indefinite"
                dur="1.7241379310344827s"
                keyTimes="0;1"
                values="1.68 1.68;1 1"
                begin="0s"
                type="scale"
                attributeName="transform"
              ></animateTransform>
              <animate
                begin="0s"
                values="1;0"
                repeatCount="indefinite"
                dur="1.7241379310344827s"
                keyTimes="0;1"
                attributeName="fill-opacity"
              ></animate>
            </circle>
          </g>
        </g>
        <g></g>
      </g>
    </svg>
  );
};

export function SettingsSvg({ open }) {
  const fillColor = useCSSVariable("--background");
  const strokeColor = useCSSVariable("--less-white");

  return (
    <svg width="105" height="106" viewBox="0 0 105 106" fill="none">
      <g id={open ? "open" : "closed"}>
        <rect width="105" height="106" />
        <rect
          id="left"
          x="25"
          y="16"
          width="4"
          height="73"
          rx="2"
          fill={strokeColor}
        />
        <rect
          id="middle"
          x="51"
          y="16"
          width="4"
          height="73"
          rx="2"
          fill={strokeColor}
        />
        <rect
          id="right"
          x="77"
          y="16"
          width="4"
          height="73"
          rx="2"
          fill={strokeColor}
        />
        <circle
          id="left-circle"
          cx="27"
          cy={open ? "33" : "50"}
          r="7"
          fill={fillColor}
          stroke={strokeColor}
          strokeWidth="4"
          className="animated-circle"
        />
        <circle
          id="middle-circle"
          cx="53"
          cy={open ? "71" : "36"}
          r="7"
          fill={fillColor}
          stroke={strokeColor}
          strokeWidth="4"
          className="animated-circle"
        />
        <circle
          id="right-circle"
          cx="79"
          cy={open ? "42" : "71"}
          r="7"
          fill={fillColor}
          stroke={strokeColor}
          strokeWidth="4"
          className="animated-circle"
        />
      </g>
    </svg>
  );
}

export function UndoSvg() {
  return (
    <motion.svg
      viewBox="-6.5 -7 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="topbar-svg"
      variants={undoSVGVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <path
        d="M1 4V10H7"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.51 15C4.15839 16.8404 5.38734 18.4202 7.01166 19.5014C8.63598 20.5826 10.5677 21.1066 12.5157 20.9945C14.4637 20.8823 16.3226 20.1402 17.8121 18.8798C19.3017 17.6193 20.3413 15.909 20.7742 14.0064C21.2072 12.1037 21.0101 10.112 20.2126 8.33109C19.4152 6.55024 18.0605 5.07679 16.3528 4.13276C14.6451 3.18873 12.6769 2.82526 10.7447 3.09711C8.81245 3.36896 7.02091 4.26142 5.64 5.63999L1 9.99999"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </motion.svg>
  );
}

export function redoSvg() {
  return (
    <motion.svg
      viewBox="-5 -7 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="topbar-svg"
      variants={redoSVGVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <path
        d="M23 4V10H17"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.4899 15C19.8399 16.8399 18.6094 18.4187 16.984 19.4985C15.3586 20.5783 13.4263 21.1006 11.4783 20.9866C9.53026 20.8726 7.67203 20.1286 6.18363 18.8667C4.69524 17.6047 3.6573 15.8932 3.22625 13.9901C2.79519 12.0869 2.99436 10.0952 3.79374 8.31507C4.59313 6.53495 5.94942 5.06286 7.65823 4.12064C9.36705 3.17841 11.3358 2.8171 13.2678 3.09114C15.1999 3.36518 16.9905 4.25974 18.3699 5.64L22.9999 10"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </motion.svg>
  );
}

export function SmartSortSvg() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Property 1=new-arrival">
        <g id="Group 7">
          <g id="Group 6">
            <path
              id="Stroke 2"
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M19 12C15.41 12 11 17.41 11 21C11 17.41 6.59 12 3 12C6.59 12 11 6.59 11 3C11 6.59 15.41 12 19 12Z"
              stroke="black"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              id="Stroke 4"
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M21 5C19.974 5 19 5.974 19 7C19 5.974 18.026 5 17 5C18.026 5 19 4.026 19 3C19 4.026 19.974 5 21 5Z"
              stroke="black"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </g>
      </g>
    </svg>
  );
}

export function UserSvg() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
        style={{ stroke: "var(--white)" }}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
        style={{ stroke: "var(--white)" }}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function GridSvg() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10 3H3V10H10V3Z"
        style={{ stroke: "var(--white)" }}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 3H14V10H21V3Z"
        style={{ stroke: "var(--white)" }}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 14H14V21H21V14Z"
        style={{ stroke: "var(--white)" }}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 14H3V21H10V14Z"
        style={{ stroke: "var(--white)" }}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PieSvg() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M21.2099 15.89C20.5737 17.3945 19.5787 18.7202 18.3118 19.7513C17.0449 20.7824 15.5447 21.4874 13.9424 21.8048C12.34 22.1221 10.6843 22.0421 9.12006 21.5718C7.55578 21.1015 6.13054 20.2551 4.96893 19.1067C3.80733 17.9582 2.94473 16.5428 2.45655 14.984C1.96837 13.4251 1.86948 11.7705 2.16851 10.1646C2.46755 8.55878 3.15541 7.05063 4.17196 5.77203C5.18851 4.49343 6.5028 3.48332 7.99992 2.83"
        style={{ stroke: "var(--white)" }}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7362 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2V12H22Z"
        style={{ stroke: "var(--white)" }}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function BackArrowSvg() {
  return (
    <svg
      width="27"
      height="30"
      viewBox="7 7 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.09 12H8.93001"
        style={{ stroke: "var(--less-white)" }}
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.91 12L11.37 14.47"
        style={{ stroke: "var(--less-white)" }}
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.91 12L11.37 9.53"
        style={{ stroke: "var(--less-white)" }}
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function leftArrowSvg() {
  return (
    <svg
      width="14"
      height="20"
      viewBox="0 0 8 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7 13L1 7L7 1"
        stroke="#111111"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function rightArrowSvg() {
  return (
    <svg
      width="14"
      height="20"
      viewBox="0 0 8 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 13L7 7L1 1"
        stroke="#111111"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
