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
              fillRule="evenodd"
              clip-rule="evenodd"
              d="M19 12C15.41 12 11 17.41 11 21C11 17.41 6.59 12 3 12C6.59 12 11 6.59 11 3C11 6.59 15.41 12 19 12Z"
              style={{ stroke: "var(--less-white)" }}
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              id="Stroke 4"
              fillRule="evenodd"
              clip-rule="evenodd"
              d="M21 5C19.974 5 19 5.974 19 7C19 5.974 18.026 5 17 5C18.026 5 19 4.026 19 3C19 4.026 19.974 5 21 5Z"
              style={{ stroke: "var(--less-white)" }}
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

export const tableArrow = (color) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15 10L20 15L15 20"
        style={{ stroke: color, filter: "brightness(var(--filter3))" }}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 4V11C4 12.0609 4.42143 13.0783 5.17157 13.8284C5.92172 14.5786 6.93913 15 8 15H20"
        style={{ stroke: color, filter: "brightness(var(--filter3))" }}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const sortSvg = (state) => {
  switch (state) {
    case "asc":
      return (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13 17.9929H3"
            style={{ stroke: "var(--less-white)" }}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10 13.9929H3"
            style={{ stroke: "var(--less-white)" }}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7 9.99292H3"
            style={{ stroke: "var(--less-white)" }}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5 5.99292H3"
            style={{ stroke: "var(--less-white)" }}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M21 14.9929L18 17.9929L15 14.9929"
            style={{ stroke: "var(--less-white)" }}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M18 17.9929V5.99292"
            style={{ stroke: "var(--less-white)" }}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "desc":
      return (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="Property 1=sort-high-to-low">
            <g id="Group 14">
              <path
                id="Stroke 2"
                d="M3 5.99292H13"
                style={{ stroke: "var(--less-white)" }}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                id="Stroke 4"
                d="M3 9.99292H10"
                style={{ stroke: "var(--less-white)" }}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                id="Stroke 6"
                d="M3 13.9929H7"
                style={{ stroke: "var(--less-white)" }}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                id="Stroke 8"
                d="M3 17.9929H5"
                style={{ stroke: "var(--less-white)" }}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                id="Stroke 10"
                d="M21 14.9929L18 17.9929L15 14.9929"
                style={{ stroke: "var(--less-white)" }}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                id="Stroke 13"
                d="M18 17.9929V5.99292"
                style={{ stroke: "var(--less-white)" }}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </g>
        </svg>
      );
    default:
      return (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clip-rule="evenodd"
            d="M21.707 14.2862C21.316 13.8952 20.684 13.8952 20.293 14.2862L19 15.5792V5.99316C19 5.44016 18.553 4.99316 18 4.99316C17.447 4.99316 17 5.44016 17 5.99316V15.5792L15.707 14.2862C15.316 13.8952 14.684 13.8952 14.293 14.2862C13.902 14.6772 13.902 15.3092 14.293 15.7002L17.292 18.6992C17.384 18.7922 17.495 18.8652 17.618 18.9162C17.74 18.9672 17.87 18.9932 18 18.9932C18.13 18.9932 18.26 18.9672 18.382 18.9162C18.505 18.8652 18.616 18.7922 18.708 18.6992L21.707 15.7002C22.098 15.3092 22.098 14.6772 21.707 14.2862"
            style={{ fill: "var(--less-white)", opacity: ".3" }}
          />
          <path
            fillRule="evenodd"
            clip-rule="evenodd"
            d="M4.29325 9.707C4.68425 10.098 5.31625 10.098 5.70725 9.707L7.00025 8.414L7.00025 18C7.00025 18.553 7.44725 19 8.00025 19C8.55325 19 9.00025 18.553 9.00025 18L9.00025 8.414L10.2933 9.707C10.6843 10.098 11.3163 10.098 11.7073 9.707C12.0983 9.316 12.0983 8.684 11.7073 8.293L8.70825 5.294C8.61625 5.201 8.50525 5.128 8.38225 5.077C8.26025 5.026 8.13025 5 8.00025 5C7.87025 5 7.74025 5.026 7.61825 5.077C7.49525 5.128 7.38425 5.201 7.29225 5.294L4.29325 8.293C3.90225 8.684 3.90225 9.316 4.29325 9.707"
            style={{ fill: "var(--less-white)", opacity: ".3" }}
          />
        </svg>
      );
  }
};

export const switchSvg = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Property 1=compare-1">
        <g id="Group 11">
          <g id="Group 10">
            <path
              id="Stroke 2"
              d="M16 12.0071L19.75 15.2931C20.141 15.6831 20.141 16.3161 19.75 16.7071L16 20.0071"
              style={{ stroke: "var(--less-white)" }}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              id="Stroke 4"
              d="M20.0429 15.9927H11.9999"
              style={{ stroke: "var(--less-white)" }}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              id="Stroke 6"
              d="M8.0429 12.0071L4.2929 8.72108C3.9019 8.33108 3.9019 7.69808 4.2929 7.30708L8.0429 4.00708"
              style={{ stroke: "var(--less-white)" }}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              id="Stroke 8"
              d="M4 7.99268H12"
              style={{ stroke: "var(--less-white)" }}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </g>
      </g>
    </svg>
  );
};

export const calendarSvg = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z"
        style={{ stroke: "var(--less-white)" }}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 2V6"
        style={{ stroke: "var(--less-white)" }}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 2V6"
        style={{ stroke: "var(--less-white)" }}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 10H21"
        style={{ stroke: "var(--less-white)" }}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const personSvg = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.8 12.46C13.1641 12.46 14.27 11.3541 14.27 9.98999C14.27 8.62585 13.1641 7.51999 11.8 7.51999C10.4359 7.51999 9.33 8.62585 9.33 9.98999C9.33 11.3541 10.4359 12.46 11.8 12.46Z"
        style={{ stroke: "var(--less-white)" }}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.82001 19.29V17.88C6.82001 16.24 8.15 14.92 9.78 14.92H14.21C15.85 14.92 17.17 16.25 17.17 17.88V19.29"
        style={{ stroke: "var(--less-white)" }}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 21.25C17.1086 21.25 21.25 17.1086 21.25 12C21.25 6.89137 17.1086 2.75 12 2.75C6.89137 2.75 2.75 6.89137 2.75 12C2.75 17.1086 6.89137 21.25 12 21.25Z"
        style={{ stroke: "var(--less-white)" }}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const adminSvg = () => {
  return(
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="#ff7b00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export const userReviewSvg = () => {
  return(

    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 21.25C16.5398 21.25 20.22 17.5698 20.22 13.03C20.22 8.49022 16.5398 4.81 12 4.81C7.46022 4.81 3.78 8.49022 3.78 13.03C3.78 17.5698 7.46022 21.25 12 21.25Z" stroke="#ff7b00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 2.75V4.81" stroke="#ff7b00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M4.73001 5.75999L5.82999 6.86" stroke="#ff7b00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M19.27 5.75999L18.17 6.86" stroke="#ff7b00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 14.06C12.5689 14.06 13.03 13.5989 13.03 13.03C13.03 12.4611 12.5689 12 12 12C11.4311 12 10.97 12.4611 10.97 13.03C10.97 13.5989 11.4311 14.06 12 14.06Z" stroke="#ff7b00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 13.03L14.57 10.46" stroke="#ff7b00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10.97 2.75H13.03" stroke="#ff7b00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export const confirmedSvg = () => {
  return(
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 21.25C6.89 21.25 2.75 17.11 2.75 12C2.75 6.89 6.89 2.75 12 2.75C17.11 2.75 21.25 6.89 21.25 12C21.25 17.11 17.11 21.25 12 21.25Z" stroke="#2cf21e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M11.54 13.58L9.78 11.82" stroke="#2cf21e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M15.06 10.06L11.54 13.58" stroke="#2cf21e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export const rejectedSvg = () => {
  return(
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 21.25C6.89 21.25 2.75 17.11 2.75 12C2.75 6.89 6.89 2.75 12 2.75C17.11 2.75 21.25 6.89 21.25 12C21.25 17.11 17.11 21.25 12 21.25Z" stroke="#ff2049" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M13.89 10.08L10.11 13.92" stroke="#ff2049" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10.11 10.08L13.89 13.92" stroke="#ff2049" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}