"use client";

import { useEffect, useState } from "react";

const PHRASES = [
  "MERN Stack Developer",
  "Full Stack Engineer",
  "React Developer",
  "Open Source Learner",
  "DSA Enthusiast",
];

const TYPE_SPEED = 80;
const DELETE_SPEED = 40;
const PAUSE_AFTER_TYPE = 2000;
const PAUSE_AFTER_DELETE = 400;

export function Typewriter() {
  const [text, setText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = PHRASES[phraseIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          // Typing
          setText(current.slice(0, text.length + 1));

          if (text.length + 1 === current.length) {
            // Finished typing — pause then start deleting
            setTimeout(() => setIsDeleting(true), PAUSE_AFTER_TYPE);
          }
        } else {
          // Deleting
          setText(current.slice(0, text.length - 1));

          if (text.length - 1 === 0) {
            setIsDeleting(false);
            setPhraseIndex((prev) => (prev + 1) % PHRASES.length);
          }
        }
      },
      isDeleting ? DELETE_SPEED : TYPE_SPEED,
    );

    return () => clearTimeout(timeout);
  }, [text, isDeleting, phraseIndex]);

  return (
    <span className="typewriter-text">
      {text}
      <span className="typewriter-cursor" aria-hidden="true">
        |
      </span>
    </span>
  );
}
