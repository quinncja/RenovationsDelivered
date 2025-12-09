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

export function downArrowSvg() {
  return (
    <svg
      width="24"
      height="28"
      viewBox="5.5 0 18 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 9L12 15L18 9"
        style={{ stroke: "var(--less-white)" }}
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
      width="24"
      height="24"
      viewBox="0 0 8 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 13L7 7L1 1"
        style={{ stroke: "var(--less-white)" }}
        strokeWidth="1.5"
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
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 4V11C4 12.0609 4.42143 13.0783 5.17157 13.8284C5.92172 14.5786 6.93913 15 8 15H20"
        style={{ stroke: color, filter: "brightness(var(--filter3))" }}
        strokeWidth="1.5"
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

export const calendarSvg = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 2 24 22"
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
  return (
    <svg
      width="10"
      height="15"
      viewBox="0 0 8 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 13L7 7L1 1"
        style={{ stroke: "var(--less-white)" }}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const gridSvg = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.67999 10.36H5.32001C4.39001 10.36 3.64 9.60999 3.64 8.67999V5.32001C3.64 4.39001 4.39001 3.64001 5.32001 3.64001H8.67999C9.60999 3.64001 10.36 4.39001 10.36 5.32001V8.67999C10.36 9.60999 9.60999 10.36 8.67999 10.36Z"
        style={{ stroke: "var(--less-white)" }}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.68 10.36H15.32C14.39 10.36 13.64 9.60999 13.64 8.67999V5.32001C13.64 4.39001 14.39 3.64001 15.32 3.64001H18.68C19.61 3.64001 20.36 4.39001 20.36 5.32001V8.67999C20.36 9.60999 19.61 10.36 18.68 10.36Z"
        style={{ stroke: "var(--less-white)" }}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.67999 20.36H5.32001C4.39001 20.36 3.64 19.61 3.64 18.68V15.32C3.64 14.39 4.39001 13.64 5.32001 13.64H8.67999C9.60999 13.64 10.36 14.39 10.36 15.32V18.68C10.36 19.61 9.60999 20.36 8.67999 20.36Z"
        style={{ stroke: "var(--less-white)" }}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.68 20.36H15.32C14.39 20.36 13.64 19.61 13.64 18.68V15.32C13.64 14.39 14.39 13.64 15.32 13.64H18.68C19.61 13.64 20.36 14.39 20.36 15.32V18.68C20.36 19.61 19.61 20.36 18.68 20.36Z"
        style={{ stroke: "var(--less-white)" }}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const buildingSvg = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="26"
      height="26"
      viewBox="0 0 24 22"
      fill="none"
      style={{ stroke: "var(--less-white)" }}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-building-icon lucide-building"
    >
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" />
      <path d="M16 6h.01" />
      <path d="M12 6h.01" />
      <path d="M12 10h.01" />
      <path d="M12 14h.01" />
      <path d="M16 10h.01" />
      <path d="M16 14h.01" />
      <path d="M8 10h.01" />
      <path d="M8 14h.01" />
    </svg>
  );
};

export const searchSvg = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      style={{ stroke: "var(--less-white)" }}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-search-icon lucide-search"
    >
      <path d="m21 21-4.34-4.34" />
      <circle cx="11" cy="11" r="8" />
    </svg>
  );
};

export const fileSvg = (color) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="-2 0 24 24"
      fill="none"
      style={{ stroke: color ? color : "var(--less-white)" }}
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-file-text-icon lucide-file-text"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10 9H8" />
      <path d="M16 13H8" />
      <path d="M16 17H8" />
    </svg>
  );
};

export const hammerSvg = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      style={{ stroke: "var(--less-white)" }}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-hammer-icon lucide-hammer"
    >
      <path d="m15 12-8.373 8.373a1 1 0 1 1-3-3L12 9" />
      <path d="m18 15 4-4" />
      <path d="m21.5 11.5-1.914-1.914A2 2 0 0 1 19 8.172V7l-2.26-2.26a6 6 0 0 0-4.202-1.756L9 2.96l.92.82A6.18 6.18 0 0 1 12 8.4V10l2 2h1.172a2 2 0 0 1 1.414.586L18.5 14.5" />
    </svg>
  );
};

export const boxSvg = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 1 24 24"
      fill="none"
      style={{ stroke: "var(--less-white)" }}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-box-icon lucide-box"
    >
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  );
};

export const hardHatSvg = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      style={{ stroke: "var(--less-white)" }}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-hard-hat-icon lucide-hard-hat"
    >
      <path d="M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5" />
      <path d="M14 6a6 6 0 0 1 6 6v3" />
      <path d="M4 15v-3a6 6 0 0 1 6-6" />
      <rect x="2" y="15" width="20" height="4" rx="1" />
    </svg>
  );
};

export const piggyBankSvg = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      style={{ stroke: "var(--less-white)" }}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-piggy-bank-icon lucide-piggy-bank"
    >
      <path d="M11 17h3v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3a3.16 3.16 0 0 0 2-2h1a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1h-1a5 5 0 0 0-2-4V3a4 4 0 0 0-3.2 1.6l-.3.4H11a6 6 0 0 0-6 6v1a5 5 0 0 0 2 4v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1z" />
      <path d="M16 10h.01" />
      <path d="M2 8v1a2 2 0 0 0 2 2h1" />
    </svg>
  );
};

export const clockSvg = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="44"
      height="30"
      viewBox="0 0 24 24"
      fill="none"
      style={{ stroke: "var(--less-white)" }}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-clock-icon lucide-clock"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
};

export const pieSvg = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      style={{ stroke: "var(--less-white)" }}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-chart-pie-icon lucide-chart-pie"
    >
      <path d="M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z" />
      <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
    </svg>
  );
};

export const listSvg = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      style={{ stroke: "var(--less-white)" }}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-rows3-icon lucide-rows-3"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M21 9H3" />
      <path d="M21 15H3" />
    </svg>
  );
};

export const underConstructionSvg = () => {
  return (
    <svg version="1.1" x="0px" y="0px" viewBox="0 0 122.88 98.02">
      <g>
        <path d="M63.44,5.11c-0.17-0.27-0.38-0.46-0.64-0.59c-0.34-0.16-0.79-0.24-1.36-0.24c-0.57,0-1.02,0.08-1.36,0.24 c-0.26,0.13-0.48,0.33-0.64,0.59c-0.02,0.02-0.03,0.05-0.05,0.07L5.73,89.36l0,0c-0.3,0.49-0.57,1.06-0.79,1.7 c-0.24,0.69-0.44,1.47-0.6,2.32c-0.02,0.13-0.04,0.25-0.05,0.36l114.31,0c-0.01-0.12-0.03-0.24-0.05-0.36 c-0.16-0.86-0.36-1.63-0.6-2.32c-0.23-0.65-0.49-1.22-0.79-1.7l-0.01-0.02L63.46,5.14L63.44,5.11L63.44,5.11L63.44,5.11L63.44,5.11 z M60.88,69.82c0.84,1.13,1.58,2.34,2.06,3.75l-0.4,11.88h-5.89l0.34-10.1c0.04-1.05,0.04-0.9-0.45-1.83L52.7,66.2L60.88,69.82 L60.88,69.82z M62.99,31.76c3.35,0,6.06,2.71,6.06,6.06c0,3.35-2.71,6.06-6.06,6.06c-3.35,0-6.06-2.71-6.06-6.06 C56.92,34.47,59.64,31.76,62.99,31.76L62.99,31.76z M70.46,82.85c1.86-3.4,3.4-6.2,6.23-9.35L34.4,54.79l1.86-4.22l2.65,1.17 l3.12-5.51c0.45-0.8,1.22-1.3,2.06-1.45l0,0l8.72-1.5c0.63-0.11,1.24-0.01,1.77,0.25l10.71,4.56c0.91,0.39,1.53,1.19,1.72,2.09l0,0 l3.21,14.75c0.05,0.23,0.07,0.47,0.07,0.7l9.61,4.25l-0.2,0.45l6.53-6.84l11.91,17.47c3.52,5.17,1.31,4.85-4.91,4.92 c-6.58,0.07-14.28-0.02-20.37-0.31C68.83,85.37,68.67,86.13,70.46,82.85L70.46,82.85z M44.31,54.14l4.17,1.85l3.12-6.51l-5.16,0.89 L44.31,54.14L44.31,54.14z M59.35,60.79l4.37,1.93l-1.85-8.51L59.35,60.79L59.35,60.79z M51.15,65.51l-4.31,19.81l-5.74,0.06 l4.55-22.24l0.3,0.07L51.15,65.51L51.15,65.51z M64.65,0.68c1.01,0.49,1.81,1.22,2.41,2.2l0,0l53.66,84.18 c0.02,0.02,0.03,0.05,0.05,0.07c0.47,0.76,0.87,1.6,1.2,2.54c0.31,0.89,0.57,1.88,0.77,2.96c0.1,0.52,0.14,0.98,0.14,1.38 c0,0.98-0.24,1.81-0.72,2.49c-0.55,0.78-1.33,1.26-2.33,1.45c-0.3,0.06-0.59,0.08-0.87,0.08H3.92c-0.28,0-0.57-0.03-0.87-0.08 c-1-0.19-1.78-0.67-2.33-1.45C0.24,95.81,0,94.98,0,94c0-0.4,0.05-0.87,0.15-1.38c0.2-1.08,0.45-2.06,0.77-2.96 c0.33-0.94,0.73-1.78,1.2-2.54l0,0l0.02-0.03l53.68-84.2l0.01-0.02c0.6-0.98,1.41-1.71,2.41-2.2c0.93-0.45,2-0.68,3.21-0.68 C62.65,0,63.72,0.23,64.65,0.68L64.65,0.68L64.65,0.68z" />
      </g>
    </svg>
  );
};

export const handshakeSvg = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 -1 24 24"
      fill="none"
      style={{ stroke: "var(--less-white)" }}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-handshake-icon lucide-handshake"
    >
      <path d="m11 17 2 2a1 1 0 1 0 3-3" />
      <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" />
      <path d="m21 3 1 11h-2" />
      <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3" />
      <path d="M3 4h8" />
    </svg>
  );
};

export const lockSvg = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 1 24 24"
      fill="none"
      style={{ stroke: "var(--less-white)" }}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-lock-icon lucide-lock"
    >
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
};

export const invoiceSvg2 = () => {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.14 21.2H6.85999C5.71999 21.2 4.79999 20.28 4.79999 19.14V4.75C4.79999 3.61 5.71999 2.69 6.85999 2.69H17.14C18.28 2.69 19.2 3.61 19.2 4.75V19.14C19.19 20.28 18.27 21.2 17.14 21.2Z"
        style={{ stroke: "var(--less-white)" }}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M8 14H16.22"
        style={{ stroke: "var(--less-white)" }}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M7.89001 17.14H16.11"
        style={{ stroke: "var(--less-white)" }}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M13.969 9.59299C13.969 9.83566 13.906 10.0643 13.78 10.279C13.6587 10.489 13.4767 10.664 13.234 10.804C12.996 10.9393 12.7137 11.0187 12.387 11.042V11.609H11.939V11.035C11.4723 10.993 11.0967 10.853 10.812 10.615C10.5273 10.3723 10.3803 10.0457 10.371 9.63499H11.421C11.449 9.97099 11.6217 10.174 11.939 10.244V8.90699C11.603 8.82299 11.3323 8.73899 11.127 8.65499C10.9217 8.57099 10.7443 8.43566 10.595 8.24899C10.4457 8.06233 10.371 7.80799 10.371 7.48599C10.371 7.07999 10.5157 6.74866 10.805 6.49199C11.099 6.23533 11.477 6.08833 11.939 6.05099V5.48399H12.387V6.05099C12.835 6.08833 13.192 6.22366 13.458 6.45699C13.7287 6.69033 13.8803 7.01233 13.913 7.42299H12.856C12.842 7.28766 12.793 7.17099 12.709 7.07299C12.6297 6.97033 12.5223 6.89799 12.387 6.85599V8.17899C12.737 8.26766 13.0123 8.35399 13.213 8.43799C13.4183 8.51733 13.5957 8.65033 13.745 8.83699C13.8943 9.01899 13.969 9.27099 13.969 9.59299ZM11.393 7.43699C11.393 7.59099 11.4397 7.71699 11.533 7.81499C11.6263 7.90833 11.7617 7.98533 11.939 8.04599V6.83499C11.771 6.85833 11.638 6.92133 11.54 7.02399C11.442 7.12666 11.393 7.26433 11.393 7.43699ZM12.387 10.258C12.5643 10.2253 12.702 10.153 12.8 10.041C12.9027 9.92899 12.954 9.79366 12.954 9.63499C12.954 9.48099 12.905 9.35733 12.807 9.26399C12.709 9.17066 12.569 9.09366 12.387 9.03299V10.258Z"
        style={{ fill: "var(--less-white)" }}
      />
    </svg>
  );
};

export const homeSvg = () => {
  return (
    <svg
      width="800px"
      height="800px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 21.0002V13.6002C9 13.0402 9 12.7601 9.10899 12.5462C9.20487 12.3581 9.35785 12.2051 9.54601 12.1092C9.75992 12.0002 10.0399 12.0002 10.6 12.0002H13.4C13.9601 12.0002 14.2401 12.0002 14.454 12.1092C14.6422 12.2051 14.7951 12.3581 14.891 12.5462C15 12.7601 15 13.0402 15 13.6002V21.0002M11.0177 2.76424L4.23539 8.03937C3.78202 8.39199 3.55534 8.5683 3.39203 8.7891C3.24737 8.98469 3.1396 9.20503 3.07403 9.4393C3 9.70376 3 9.99094 3 10.5653V17.8002C3 18.9203 3 19.4804 3.21799 19.9082C3.40973 20.2845 3.71569 20.5905 4.09202 20.7822C4.51984 21.0002 5.07989 21.0002 6.2 21.0002H17.8C18.9201 21.0002 19.4802 21.0002 19.908 20.7822C20.2843 20.5905 20.5903 20.2845 20.782 19.9082C21 19.4804 21 18.9203 21 17.8002V10.5653C21 9.99094 21 9.70376 20.926 9.4393C20.8604 9.20503 20.7526 8.98469 20.608 8.7891C20.4447 8.5683 20.218 8.39199 19.7646 8.03937L12.9823 2.76424C12.631 2.49099 12.4553 2.35436 12.2613 2.30184C12.0902 2.2555 11.9098 2.2555 11.7387 2.30184C11.5447 2.35436 11.369 2.49099 11.0177 2.76424Z"
        style={{ stroke: "var(--less-white)" }}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const jobcostSvg = () => {
  return (
    <svg
      width="800px"
      height="800px"
      viewBox="-0.5 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 22.9199C17.5228 22.9199 22 18.4428 22 12.9199C22 7.39707 17.5228 2.91992 12 2.91992C6.47715 2.91992 2 7.39707 2 12.9199C2 18.4428 6.47715 22.9199 12 22.9199Z"
        style={{ stroke: "var(--less-white)" }}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.7002 17.1099V18.21C12.7002 18.3877 12.6296 18.5582 12.504 18.6838C12.3783 18.8095 12.2079 18.8799 12.0302 18.8799C11.8525 18.8799 11.6821 18.8095 11.5565 18.6838C11.4308 18.5582 11.3602 18.3877 11.3602 18.21V17.0801C10.9165 17.0072 10.4917 16.8468 10.1106 16.6082C9.72943 16.3695 9.39958 16.0573 9.14023 15.6899C9.04577 15.57 8.99311 15.4226 8.99023 15.27C8.99014 15.1834 9.00762 15.0975 9.04164 15.0178C9.07566 14.9382 9.12551 14.8662 9.18816 14.8064C9.2508 14.7466 9.32494 14.7 9.40608 14.6697C9.48723 14.6393 9.5737 14.6258 9.66023 14.6299C9.74611 14.6294 9.83102 14.648 9.90884 14.6843C9.98667 14.7206 10.0554 14.774 10.1102 14.8401C10.4301 15.258 10.8643 15.574 11.3602 15.75V13.21C10.0302 12.69 9.36023 11.9099 9.36023 10.8999C9.38027 10.3592 9.59279 9.84343 9.95949 9.44556C10.3262 9.04769 10.8229 8.79397 11.3602 8.72998V7.62988C11.3602 7.45219 11.4308 7.2819 11.5565 7.15625C11.6821 7.0306 11.8525 6.95996 12.0302 6.95996C12.2079 6.95996 12.3783 7.0306 12.504 7.15625C12.6296 7.2819 12.7002 7.45219 12.7002 7.62988V8.71997C13.0723 8.77828 13.4289 8.91103 13.7485 9.11035C14.0681 9.30967 14.3442 9.57137 14.5602 9.87988C14.6555 9.99235 14.7117 10.1329 14.7202 10.28C14.7229 10.3657 14.7083 10.451 14.6774 10.531C14.6464 10.611 14.5997 10.684 14.54 10.7456C14.4803 10.8072 14.4088 10.856 14.3298 10.8894C14.2509 10.9228 14.166 10.94 14.0802 10.9399C13.9906 10.9394 13.9022 10.9196 13.8211 10.8816C13.74 10.8436 13.668 10.7884 13.6102 10.72C13.3718 10.4221 13.0574 10.1942 12.7002 10.0601V12.3101L12.9502 12.4099C14.2202 12.9099 15.0102 13.63 15.0102 14.77C14.9954 15.3808 14.7481 15.9629 14.3189 16.3977C13.8897 16.8325 13.3108 17.0871 12.7002 17.1099ZM11.3602 11.73V10.0999C11.1988 10.1584 11.0599 10.2662 10.963 10.408C10.8662 10.5497 10.8162 10.7183 10.8202 10.8899C10.8185 11.0673 10.8688 11.2414 10.9647 11.3906C11.0607 11.5399 11.1981 11.6579 11.3602 11.73ZM13.5502 14.8C13.5502 14.32 13.2202 14.03 12.7002 13.8V15.8C12.9387 15.7639 13.156 15.6427 13.3122 15.459C13.4684 15.2752 13.553 15.0412 13.5502 14.8Z"
        style={{ fill: "var(--less-white)" }}
      />
    </svg>
  );
};

export const usersSvg = () => {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path
          d="M22 21V19C22 17.1362 20.7252 15.5701 19 15.126M15.5 3.29076C16.9659 3.88415 18 5.32131 18 7C18 8.67869 16.9659 10.1159 15.5 10.7092M17 21C17 19.1362 17 18.2044 16.6955 17.4693C16.2895 16.4892 15.5108 15.7105 14.5307 15.3045C13.7956 15 12.8638 15 11 15H8C6.13623 15 5.20435 15 4.46927 15.3045C3.48915 15.7105 2.71046 16.4892 2.30448 17.4693C2 18.2044 2 19.1362 2 21M13.5 7C13.5 9.20914 11.7091 11 9.5 11C7.29086 11 5.5 9.20914 5.5 7C5.5 4.79086 7.29086 3 9.5 3C11.7091 3 13.5 4.79086 13.5 7Z"
          style={{ stroke: "var(--less-white)" }}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>{" "}
      </g>
    </svg>
  );
};

export const infoSvg = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      style={{ stroke: "var(--less-white)" }}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  );
};

export const barChartSvg = () => {
  return(
    <svg width="80px" height="80px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 4H14V20H10V4Z" stroke="var(--less-white)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 9H18V20H14V9Z" stroke="var(--less-white)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 13H10V20H6V13Z" stroke="var(--less-white)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 20H21" stroke="var(--less-white)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}