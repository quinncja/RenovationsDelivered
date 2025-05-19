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
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 5.91L18 18.09"
        style={{ stroke: "var(--less-white)" }}
        strokeWidth="1.5"
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
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z"
        stroke="#ff7b00"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const userReviewSvg = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 21.25C16.5398 21.25 20.22 17.5698 20.22 13.03C20.22 8.49022 16.5398 4.81 12 4.81C7.46022 4.81 3.78 8.49022 3.78 13.03C3.78 17.5698 7.46022 21.25 12 21.25Z"
        stroke="#ff7b00"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 2.75V4.81"
        stroke="#ff7b00"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.73001 5.75999L5.82999 6.86"
        stroke="#ff7b00"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.27 5.75999L18.17 6.86"
        stroke="#ff7b00"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 14.06C12.5689 14.06 13.03 13.5989 13.03 13.03C13.03 12.4611 12.5689 12 12 12C11.4311 12 10.97 12.4611 10.97 13.03C10.97 13.5989 11.4311 14.06 12 14.06Z"
        stroke="#ff7b00"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 13.03L14.57 10.46"
        stroke="#ff7b00"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.97 2.75H13.03"
        stroke="#ff7b00"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const confirmedSvg = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 21.25C6.89 21.25 2.75 17.11 2.75 12C2.75 6.89 6.89 2.75 12 2.75C17.11 2.75 21.25 6.89 21.25 12C21.25 17.11 17.11 21.25 12 21.25Z"
        stroke="#2cf21e"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.54 13.58L9.78 11.82"
        stroke="#2cf21e"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.06 10.06L11.54 13.58"
        stroke="#2cf21e"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const rejectedSvg = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 21.25C6.89 21.25 2.75 17.11 2.75 12C2.75 6.89 6.89 2.75 12 2.75C17.11 2.75 21.25 6.89 21.25 12C21.25 17.11 17.11 21.25 12 21.25Z"
        stroke="#ff2049"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.89 10.08L10.11 13.92"
        stroke="#ff2049"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.11 10.08L13.89 13.92"
        stroke="#ff2049"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const cogSvg = () => {
  return (
    <svg
      style={{ fill: "var(--less-white)" }}
      height="800px"
      width="800px"
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 397.516 397.516"
    >
      <g>
        <g id="Layer_5_36_">
          <g>
            <path
              d="M126.32,156.454c-37.993,0-68.901,30.911-68.901,68.905c0,37.991,30.909,68.9,68.901,68.9s68.9-30.909,68.9-68.9
				C195.22,187.365,164.311,156.454,126.32,156.454z M126.32,279.641c-29.932,0-54.283-24.351-54.283-54.281
				c0-29.934,24.352-54.286,54.283-54.286s54.282,24.353,54.282,54.286C180.602,255.29,156.251,279.641,126.32,279.641z"
            />
            <path
              d="M241.133,193.697l-9.568-2.638c-1.085-0.299-2.955-2.038-3.333-3.102l-2.717-6.683l-0.152-0.346
				c-0.483-1.028-0.382-3.607,0.179-4.597l4.819-8.491c3.36-5.921,2.264-14.015-2.549-18.824l-23.776-23.779
				c-2.852-2.848-6.952-4.482-11.248-4.482c-2.723,0-5.341,0.669-7.57,1.935l-8.038,4.561c-0.324,0.184-1.251,0.458-2.478,0.458
				c-1.061,0-1.766-0.207-1.991-0.316l-8.275-3.484l-0.348-0.136c-1.068-0.385-2.818-2.276-3.121-3.375l-2.719-9.851
				c-1.81-6.563-8.307-11.511-15.113-11.511h-33.629c-6.807,0-13.303,4.949-15.11,11.508l-2.723,9.855
				c-0.303,1.101-2.06,3.003-3.132,3.393l-8.905,3.768l-0.378,0.173c-0.223,0.11-0.926,0.318-1.988,0.318
				c-1.202,0.001-2.109-0.267-2.429-0.448l-7.565-4.295c-2.231-1.266-4.851-1.936-7.575-1.936c-4.3,0-8.4,1.636-11.247,4.484
				l-23.782,23.778c-4.812,4.813-5.906,12.904-2.546,18.822l4.736,8.343c0.565,0.998,0.677,3.584,0.198,4.613
				c-1.323,2.844-4.967,8.298-6.713,9.848l-8.841,2.438C4.946,195.509,0,202.006,0,208.812v33.626c0,6.803,4.946,13.3,11.506,15.112
				l9.568,2.641c1.088,0.3,2.96,2.038,3.338,3.101l2.945,7.17l0.149,0.338c0.484,1.024,0.39,3.586-0.169,4.568l-4.362,7.68
				c-3.356,5.916-2.261,14.006,2.55,18.822l23.78,23.777c2.85,2.85,6.95,4.484,11.248,4.484l0,0c2.723,0,5.342-0.669,7.576-1.936
				l7.361-4.177c0.327-0.186,1.26-0.461,2.492-0.461c1.062,0,1.769,0.206,1.995,0.315l8.39,3.522l0.357,0.139
				c1.065,0.382,2.81,2.264,3.112,3.358l2.56,9.276c1.808,6.561,8.305,11.511,15.111,11.511h33.629
				c6.806,0,13.303-4.948,15.113-11.511l2.558-9.279c0.3-1.087,2.038-2.957,3.099-3.335l7.735-3.188l0.355-0.158
				c0.225-0.107,0.931-0.311,1.99-0.311c1.259,0,2.214,0.282,2.548,0.472l7.823,4.443c2.232,1.267,4.851,1.936,7.576,1.936
				c4.3,0,8.4-1.636,11.248-4.485l23.778-23.777c4.814-4.812,5.91-12.904,2.549-18.825l-4.441-7.82
				c-0.556-0.979-0.647-3.525-0.163-4.541l3.188-7.659l0.134-0.347c0.379-1.064,2.253-2.805,3.343-3.105l9.57-2.64
				c6.559-1.812,11.505-8.309,11.505-15.112v-33.623C252.641,202.006,247.695,195.508,241.133,193.697z M237.247,243.459
				l-9.568,2.64c-5.615,1.549-11.11,6.61-13.151,12.086l-2.914,7.023c-2.439,5.314-2.139,12.778,0.738,17.851l4.422,7.782
				c0.124,0.31,0.021,1.075-0.152,1.31L192.875,315.9c-0.096,0.073-0.467,0.233-0.944,0.233c-0.22,0-0.366-0.046-0.357-0.03
				l-7.824-4.443c-2.702-1.534-6.17-2.379-9.766-2.379c-2.072,0-5.137,0.288-8.082,1.641l-7.098,2.934
				c-5.479,2.037-10.544,7.533-12.093,13.151l-2.544,9.234c-0.13,0.305-0.73,0.766-1.066,0.82l-33.553,0.002
				c-0.331-0.045-0.946-0.513-1.064-0.78l-2.56-9.276c-1.546-5.609-6.598-11.106-12.064-13.157l-7.725-3.232
				c-2.97-1.383-6.063-1.678-8.155-1.678c-3.572,0-7.02,0.841-9.707,2.366l-7.32,4.155c-0.036,0.015-0.178,0.053-0.402,0.053
				c-0.478,0-0.85-0.161-0.913-0.204l-23.747-23.741c-0.204-0.268-0.309-1.036-0.206-1.304l4.36-7.676
				c2.873-5.058,3.185-12.52,0.766-17.839l-2.701-6.555c-2.037-5.48-7.535-10.548-13.153-12.097l-9.521-2.625
				c-0.309-0.132-0.778-0.748-0.822-1.035l-0.002-33.581c0.045-0.333,0.514-0.949,0.777-1.067l9.563-2.637
				c8.015-2.207,15.287-17.422,15.357-17.572c2.473-5.313,2.164-12.878-0.737-17.994l-4.718-8.307
				c-0.124-0.312-0.021-1.076,0.15-1.309l23.749-23.748c0.096-0.073,0.467-0.232,0.943-0.232c0.222,0,0.363,0.041,0.359,0.03
				l7.562,4.292c2.674,1.52,6.101,2.357,9.649,2.357c2.116,0,5.241-0.303,8.236-1.722l8.238-3.494
				c5.445-2.071,10.479-7.573,12.021-13.166l2.709-9.813c0.131-0.308,0.746-0.776,1.032-0.819l33.584-0.002
				c0.333,0.045,0.948,0.514,1.066,0.781l2.719,9.85c1.545,5.604,6.591,11.105,12.048,13.164l7.61,3.193
				c2.975,1.39,6.073,1.686,8.17,1.686c3.568,0,7.012-0.84,9.694-2.363l7.995-4.538c0.036-0.015,0.176-0.051,0.396-0.051
				c0.48,0,0.853,0.161,0.914,0.202l23.744,23.744c0.203,0.267,0.306,1.032,0.201,1.304l-4.819,8.493
				c-2.868,5.056-3.189,12.511-0.79,17.823l2.489,6.102c2.034,5.487,7.535,10.562,13.154,12.11l9.523,2.623
				c0.309,0.132,0.777,0.748,0.82,1.036l0.002,33.581C237.98,242.726,237.511,243.342,237.247,243.459z"
            />
            <path
              d="M393.377,112.81l-6.573-1.953c-2.321-0.688-4.846-3.132-5.611-5.428l-1.713-4.439c-0.983-2.211-0.778-5.725,0.459-7.805
				l3.443-5.806c1.236-2.08,0.875-5.212-0.8-6.958L366.48,63.675c-1.679-1.746-4.794-2.232-6.922-1.076l-5.609,3.038
				c-2.13,1.154-5.636,1.198-7.793,0.097l-5.418-2.399c-2.262-0.866-4.599-3.496-5.199-5.843l-1.745-6.844
				c-0.598-2.345-3.066-4.304-5.487-4.352l-23.232-0.457c-2.42-0.048-4.965,1.814-5.654,4.133l-2.013,6.77
				c-0.691,2.321-3.129,4.861-5.42,5.645l-5.954,2.389c-2.19,1.027-5.692,0.856-7.772-0.38l-5.166-3.07
				c-2.083-1.237-5.215-0.876-6.96,0.805l-16.751,16.1c-1.742,1.676-2.226,4.793-1.073,6.921l3.159,5.831
				c1.153,2.13,1.23,5.645,0.169,7.813c-1.061,2.167-5.21,8.66-7.557,9.256l-6.643,1.693c-2.345,0.599-4.305,3.07-4.353,5.49
				l-0.456,23.228c-0.047,2.422,1.814,4.965,4.134,5.655l6.573,1.954c2.322,0.688,4.849,3.132,5.616,5.43l1.852,4.759
				c0.992,2.211,0.795,5.721-0.444,7.802l-3.113,5.241c-1.238,2.084-0.875,5.215,0.803,6.961l16.104,16.746
				c1.678,1.747,4.793,2.232,6.924,1.078l5.14-2.785c2.128-1.155,5.638-1.197,7.796-0.101l5.501,2.428
				c2.261,0.864,4.605,3.488,5.2,5.837l1.642,6.442c0.598,2.348,3.067,4.307,5.488,4.354l23.231,0.455
				c2.422,0.049,4.964-1.811,5.654-4.133l1.894-6.373c0.687-2.323,3.131-4.851,5.43-5.617l5.146-2.013
				c2.207-0.997,5.719-0.802,7.798,0.436l5.342,3.172c2.082,1.238,5.215,0.876,6.958-0.804l16.751-16.1
				c1.744-1.68,2.229-4.794,1.074-6.921l-2.962-5.467c-1.152-2.129-1.21-5.644-0.123-7.808l2.192-5.01
				c0.86-2.266,3.482-4.609,5.829-5.206l6.645-1.693c2.343-0.599,4.305-3.066,4.352-5.488l0.457-23.229
				C397.557,116.047,395.695,113.5,393.377,112.81z M314.236,170.826c-23.495-0.462-42.171-19.886-41.709-43.381
				c0.462-23.5,19.886-42.176,43.381-41.715c23.497,0.463,42.172,19.889,41.71,43.387
				C357.156,152.614,337.733,171.288,314.236,170.826z"
            />
          </g>
        </g>
      </g>
    </svg>
  );
};

export const runSvg = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="-1 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 3L19 12L5 21V3Z"
        style={{ stroke: "var(--green)" }}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const validationSvg = () => {
  return (
    <svg
      style={{ stroke: "var(--less-white)" }}
      width="31"
      height="28"
      fill="none"
      viewBox="-3 02 34 28"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.6694 8.80169V23.1983"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.8235 12.395C17.4315 12.395 21.9776 10.7862 21.9776 8.80169C21.9776 6.81715 17.4315 5.20834 11.8235 5.20834C6.21556 5.20834 1.6694 6.81715 1.6694 8.80169C1.6694 10.7862 6.21556 12.395 11.8235 12.395Z"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21.9776 13.5967C21.9776 15.58 17.4318 17.19 11.8235 17.19C6.21529 17.19 1.6694 15.58 1.6694 13.5967"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21.9776 18.4033C21.9776 20.3867 17.4318 21.9967 11.8235 21.9967C6.21529 21.9967 1.6694 20.3867 1.6694 18.4033"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21.9776 23.1983C21.9776 25.1817 17.4318 26.7917 11.8235 26.7917C6.21529 26.7917 1.6694 25.1817 1.6694 23.1983"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21.9777 8.80169V23.1983"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 15C16.1338 15 13 11.8662 13 8C13 4.13382 16.1338 1 20 1C23.8662 1 27 4.13382 27 8C27 11.8662 23.8662 15 20 15Z"
        style={{ fill: "var(--dark)" }}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M29.5 17.5L25.39 13.39"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const wrongSvg = () => {
  return (
    <svg
      fill="#ff2049"
      height="600px"
      width="600px"
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -120 700 700"
    >
      <path
        d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55
   c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55
   c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505
   c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55
   l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719
   c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z"
      />
    </svg>
  );
};

export const openSvg = () => {
  return (
    <svg
      width="800px"
      height="800px"
      viewBox="60 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="img"
      class="iconify iconify--fxemoji"
      preserveAspectRatio="xMidYMid meet"
    >
      <path
        fill="#ff7b00"
        d="M225.023 406.129c0 26.571-21.257 48.36-48.36 48.36s-48.36-21.789-48.36-48.36s21.257-48.36 48.36-48.36s48.36 21.789 48.36 48.36zm-35.491-96.721H163.31c-11.857 0-21.617-9.324-22.159-21.168l-8.598-187.871c-.578-12.636 9.51-23.197 22.159-23.197h43.849c12.669 0 22.765 10.593 22.157 23.247L211.69 288.29c-.569 11.824-10.321 21.118-22.158 21.118z"
      ></path>
      <path
        fill="#ff7b00"
        d="M379.135 406.129c0 26.571-21.258 48.36-48.361 48.36c-27.103 0-48.36-21.789-48.36-48.36s21.258-48.36 48.36-48.36c27.103 0 48.361 21.789 48.361 48.36zm-35.492-96.721h-26.222c-11.857 0-21.617-9.324-22.159-21.168l-8.598-187.871c-.578-12.636 9.51-23.196 22.159-23.196h43.848c12.669 0 22.765 10.593 22.157 23.247L365.8 288.291c-.568 11.823-10.32 21.117-22.157 21.117z"
      ></path>
    </svg>
  );
};

export const missingSvg = () => {
  return (
    <svg
      height="800px"
      width="800px"
      version="1.1"
      id="_x32_"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 650 650"
      fill="#ffcf20"
    >
      <g>
        <path
          class="st0"
          d="M396.138,85.295c-13.172-25.037-33.795-45.898-59.342-61.03C311.26,9.2,280.435,0.001,246.98,0.001
        c-41.238-0.102-75.5,10.642-101.359,25.521c-25.962,14.826-37.156,32.088-37.156,32.088c-4.363,3.786-6.824,9.294-6.721,15.056
        c0.118,5.77,2.775,11.186,7.273,14.784l35.933,28.78c7.324,5.864,17.806,5.644,24.875-0.518c0,0,4.414-7.978,18.247-15.88
        c13.91-7.85,31.945-14.173,58.908-14.258c23.517-0.051,44.022,8.725,58.016,20.717c6.952,5.941,12.145,12.594,15.328,18.68
        c3.208,6.136,4.379,11.5,4.363,15.574c-0.068,13.766-2.742,22.77-6.603,30.442c-2.945,5.729-6.789,10.813-11.738,15.744
        c-7.384,7.384-17.398,14.207-28.634,20.479c-11.245,6.348-23.365,11.932-35.612,18.68c-13.978,7.74-28.77,18.858-39.701,35.544
        c-5.449,8.249-9.71,17.686-12.416,27.641c-2.742,9.964-3.98,20.412-3.98,31.071c0,11.372,0,20.708,0,20.708
        c0,10.719,8.69,19.41,19.41,19.41h46.762c10.719,0,19.41-8.691,19.41-19.41c0,0,0-9.336,0-20.708c0-4.107,0.467-6.755,0.917-8.436
        c0.773-2.512,1.206-3.14,2.47-4.668c1.29-1.452,3.895-3.674,8.698-6.331c7.019-3.946,18.298-9.276,31.07-16.176
        c19.121-10.456,42.367-24.646,61.972-48.062c9.752-11.686,18.374-25.758,24.323-41.968c6.001-16.21,9.242-34.431,9.226-53.96
        C410.243,120.761,404.879,101.971,396.138,85.295z"
        />
        <path
          class="st0"
          d="M228.809,406.44c-29.152,0-52.788,23.644-52.788,52.788c0,29.136,23.637,52.772,52.788,52.772
        c29.136,0,52.763-23.636,52.763-52.772C281.572,430.084,257.945,406.44,228.809,406.44z"
        />
      </g>
    </svg>
  );
};

export const invoiceSvg = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox=".5 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.78 19.19V4.79999C3.78 3.65999 4.7 2.73999 5.84 2.73999H18.17C19.31 2.73999 20.23 3.65999 20.23 4.79999V15.08C20.23 16.22 19.31 17.14 18.17 17.14H5.84C4.7 17.14 3.78 18.06 3.78 19.19ZM3.78 19.19C3.78 20.33 4.7 21.25 5.84 21.25H18.17C19.31 21.25 20.23 20.33 20.23 19.19V15.08"
        style={{ stroke: "var(--less-white)" }}
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.92001 5.83002H15.08"
        style={{ stroke: "var(--less-white)" }}
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.06 8.91998H9.94"
        style={{ stroke: "var(--less-white)" }}
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const submissionSvg = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.17 8.85999L10.4 13.75C10.05 14.11 9.49998 14.19 9.05998 13.95L3.29997 10.8C2.44997 10.34 2.55 9.09999 3.45 8.76999L19.76 2.81999C20.65 2.49999 21.52 3.35999 21.2 4.24999L15.39 20.51C15.07 21.4 13.87 21.52 13.38 20.72L11.21 17.17"
        style={{ stroke: "var(--less-white)" }}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const chevronRight = () => {
  return(
    <svg width="10" height="15" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 13L7 7L1 1" style={{ stroke: "var(--less-white)" }}  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export const gridSvg = () => {
  return(
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.67999 10.36H5.32001C4.39001 10.36 3.64 9.60999 3.64 8.67999V5.32001C3.64 4.39001 4.39001 3.64001 5.32001 3.64001H8.67999C9.60999 3.64001 10.36 4.39001 10.36 5.32001V8.67999C10.36 9.60999 9.60999 10.36 8.67999 10.36Z" style={{ stroke: "var(--less-white)" }}  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M18.68 10.36H15.32C14.39 10.36 13.64 9.60999 13.64 8.67999V5.32001C13.64 4.39001 14.39 3.64001 15.32 3.64001H18.68C19.61 3.64001 20.36 4.39001 20.36 5.32001V8.67999C20.36 9.60999 19.61 10.36 18.68 10.36Z" style={{ stroke: "var(--less-white)" }}  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8.67999 20.36H5.32001C4.39001 20.36 3.64 19.61 3.64 18.68V15.32C3.64 14.39 4.39001 13.64 5.32001 13.64H8.67999C9.60999 13.64 10.36 14.39 10.36 15.32V18.68C10.36 19.61 9.60999 20.36 8.67999 20.36Z" style={{ stroke: "var(--less-white)" }} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M18.68 20.36H15.32C14.39 20.36 13.64 19.61 13.64 18.68V15.32C13.64 14.39 14.39 13.64 15.32 13.64H18.68C19.61 13.64 20.36 14.39 20.36 15.32V18.68C20.36 19.61 19.61 20.36 18.68 20.36Z" style={{ stroke: "var(--less-white)" }}  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}