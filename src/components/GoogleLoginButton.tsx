import React from "react";

export function GoogleLoginButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-6 py-2 rounded-lg bg-white border border-gray-300 shadow hover:bg-gray-50 transition font-semibold text-gray-700"
      style={{ minWidth: 220 }}
    >
      <img
        src="https://www.svgrepo.com/show/475656/google-color.svg"
        alt="Google"
        className="w-5 h-5"
      />
      <span>Sign in with Google</span>
    </button>
  );
}
