"use client";

import { useEffect } from "react";

export default function CodeBlockInjector() {
  useEffect(() => {
    // Find all pre > code blocks in the article
    const codeBlocks = document.querySelectorAll("article.prose pre code");
    
    codeBlocks.forEach((codeElement) => {
      const preElement = codeElement.parentElement as HTMLPreElement;
      
      // Skip if already processed
      if (preElement.dataset.copyButtonAdded === "true") {
        return;
      }
      
      // Mark as processed
      preElement.dataset.copyButtonAdded = "true";
      
      // Get the code text
      const codeText = codeElement.textContent || "";
      
      // Create copy button
      const button = document.createElement("button");
      button.className = "absolute right-2 top-2 z-10 px-3 py-1.5 text-xs font-medium rounded-md bg-gray-800 dark:bg-gray-700 text-white hover:bg-gray-700 dark:hover:bg-gray-600 transition-all duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100 shadow-lg";
      button.setAttribute("aria-label", "Copy code");
      
      const copyIcon = `
        <svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      `;
      
      const checkIcon = `
        <svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
      `;
      
      button.innerHTML = `${copyIcon}Copy`;
      
      let copied = false;
      
      button.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(codeText);
          copied = true;
          button.innerHTML = `${checkIcon}Copied!`;
          button.classList.add("bg-green-600", "hover:bg-green-700");
          
          setTimeout(() => {
            copied = false;
            button.innerHTML = `${copyIcon}Copy`;
            button.classList.remove("bg-green-600", "hover:bg-green-700");
          }, 2000);
        } catch (err) {
          console.error("Failed to copy code:", err);
        }
      });
      
      // Make pre element relative and add group class
      preElement.style.position = "relative";
      preElement.classList.add("group");
      
      // Insert button
      preElement.insertBefore(button, codeElement);
    });
  }, []);

  return null;
}

