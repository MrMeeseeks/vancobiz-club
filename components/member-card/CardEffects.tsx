"use client";

import { useEffect } from "react";
import { vbcCardTilt } from "./member-card-tilt.js";

/** Attaches the tilt + light script to every .vbc-card on the page. Renders nothing. */
export default function CardEffects() {
  useEffect(() => vbcCardTilt(), []);
  return null;
}
