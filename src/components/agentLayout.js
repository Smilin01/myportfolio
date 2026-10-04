import { useState, useEffect } from "react";

export const meta = {
  brain: ["Main Brain", "orchestrates"],
  explorer: ["Explorer", "reads the repo"],
  planner: ["Planner", "plans the steps"],
  fe: ["Frontend Builder", "writes UI"],
  be: ["Backend Builder", "writes APIs"],
  verifier: ["Verifier", "runs checks"],
};

export const layouts = {
  wide: {
    w: 820, h: 450, nw: 140, nh: 56,
    pos: { brain: [90, 225], explorer: [270, 105], planner: [270, 345], fe: [490, 150], be: [490, 340], verifier: [720, 245] },
    back: "M720 273 C 720 440, 90 440, 90 253",
  },
  tall: {
    w: 430, h: 600, nw: 140, nh: 56,
    pos: { brain: [150, 50], explorer: [150, 160], planner: [150, 270], fe: [80, 390], be: [250, 390], verifier: [150, 520] },
    back: "M220 520 C 425 520, 425 50, 220 50",
  },
};

export const edgeDefs = [["brain", "explorer"], ["explorer", "planner"], ["planner", "fe"], ["planner", "be"], ["fe", "verifier"], ["be", "verifier"]];

export function link(L, a, b) {
  const [x1, y1] = L.pos[a];
  const [x2, y2] = L.pos[b];
  if (Math.abs(x2 - x1) >= Math.abs(y2 - y1) && L === layouts.wide) {
    const sx = x1 + L.nw / 2, ex = x2 - L.nw / 2, mx = (sx + ex) / 2;
    return `M${sx} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${ex} ${y2}`;
  }
  const sy = y1 + L.nh / 2, ey = y2 - L.nh / 2, my = (sy + ey) / 2;
  return `M${x1} ${sy} C ${x1} ${my}, ${x2} ${my}, ${x2} ${ey}`;
}

export function useIsWide() {
  const [wide, setWide] = useState(() => (typeof window === "undefined" ? true : window.matchMedia("(min-width: 640px)").matches));
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)");
    const on = () => setWide(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return wide;
}

