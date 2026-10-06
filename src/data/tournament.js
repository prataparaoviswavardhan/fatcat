// Everything you edit during the competition lives in this file.

// ---------- 1. Settings ----------

// The Instagram page where people vote. TODO: put the real link here.
export const instagramUrl = "https://www.instagram.com/_thundryn_?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw==";

// When the competition starts, in this exact format: "YYYY-MM-DDTHH:MM:SS+05:30".
// The countdown counts down to this moment. TODO: put the real start time here.
// If you leave it empty, the page says "Start date to be announced".
export const startDate = "";

// ---------- 2. Matches ----------
//
// One object per match:
//   round   "Round of 32", "Round of 16", "Quarterfinals", "Semifinals" or "Final"
//   cat1    number of the first cat   (the id from cats.js)
//   cat2    number of the second cat
//   winner  number of the winning cat, or null while we wait for the result
//
// After a match is decided, change  winner: null  to the winning cat's number.
// To add a new round, add new objects below the earlier ones.
//
// Example:
//   { round: "Round of 32", cat1: 1, cat2: 8, winner: null },   waiting for results
//   { round: "Round of 32", cat1: 2, cat2: 10, winner: 10 },    cat 10 won

const matches = [
  // Add the real matches here, one per line.
];

export default matches;
