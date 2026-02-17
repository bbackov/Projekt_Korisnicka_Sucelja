"use client";

import { ReactNode } from "react";

type ToastProps = {
  message: string;
  type?: "success" | "error" | "info";
  duration?: number;
};

export function showToast({ message, type = "info", duration = 3000 }: ToastProps) {
  const id = Math.random();
  const elem = document.createElement("div");
  elem.id = `toast-${id}`;
  elem.style.cssText = `
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    padding: 1rem;
    background: ${type === "success" ? "#10b981" : type === "error" ? "#ef4444" : "#3b82f6"};
    color: white;
    border-radius: 0.5rem;
    z-index: 50;
    font-weight: 500;
  `;
  elem.textContent = message;
  document.body.appendChild(elem);

  setTimeout(() => {
    elem.remove();
  }, duration);
}
