import React from "react";

const User = ({ color }) => {
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16 20C20.4183 20 24 16.4183 24 12C24 7.58172 20.4183 4 16 4C11.5817 4 8 7.58172 8 12C8 16.4183 11.5817 20 16 20Z"
      stroke={color}
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M3.875 27C5.10367 24.8714 6.87104 23.1038 8.99944 21.8749C11.1278 20.6459 13.5423 19.9989 16 19.9989C18.4577 19.9989 20.8722 20.6459 23.0006 21.8749C25.129 23.1038 26.8963 24.8714 28.125 27"
      stroke="#0095FF"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>;
};

export default User;