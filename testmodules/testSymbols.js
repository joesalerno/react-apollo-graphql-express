const validOdbSymbol = require("./modules/validOdbSymbol");

const invalidSymbols = [
  undefined,
  null,
  true,
  {},
  [],
  0,
  1,
  "cat",
  "rectangle",
  "r1.0.0",
  "r5_a",
  "ra",
  "r05",
  "r 10",
  "a",
  "b",
  "r",
  "s",
  "rect10",
  "rect10x10.2xr23x9",
  "rect10x10.2xc23x9",
  "oval10x0",
  "di10x0",
  "oct10x0x3",
  "donut_s10x0x3",
  "donut_r10x0x3",
  "r10_523"
];

const validSymbols = [
  "r10",
  "s10",
  "rect10x10",
  "rect10x10.2",
  "rect10x10.2xr23x5",
  "rect10x10.2xr23",
  "rect10x10.2xc23x5",
  "rect10x10.2xc23",
  "oval10x10.2",
  "di10x10.2",
  "oct10x10.2x5",
  "donut_s10x10.2",
  "donut_r10x10.2",
  "donut_sr10x10.2",
  "donut_s10x10.2x5",
  "donut_rc10x10.2x5",
  "donut_rc10x10.2x5x3",
  "donut_rc10x10.2x5x3x6",
  "donut_o10x10.2x5",
  "hex_l10x10.2x5",
  "hex_s10x10.2x5",
  "bfr10",
  "bfs10.3",
  "tri10.3x3",
  "oval_h10.3x3",
  "thr10.3x3x3x3x5",
  "ths10.3x3x3x3x5",
  "s_ths10.3x3x3x3x5",
  "s_tho10.3x3x3x3x5",
  "sr_ths10.3x3x3x3x5",
  "rc_ths10.3x3x45x3x5x3",
  "rc_tho10.3x3x3x3x5x4",
  "s_ths10.3x3x3x3x5xr6x6",
  "rc_ths10.3x3x3x3x4xr3x3",
  "o_ths5x8x8x8x8x3",
  "el10.3x3",
  "moire4x8x3x8x9x45",
  "hole8xpx3x5",
  "null3"
];

for (const symbol of validSymbols) {
  if (!validOdbSymbol(symbol)) console.log(`Error: symbol ${symbol} is invalid`);
  if (!symbol.match(/null/) && !validOdbSymbol(`${symbol}_15`))
    console.log(`Error: symbol ${symbol}_15 is invalid`);
  if (!symbol.match(/^null|r0$/) && validOdbSymbol(symbol.replace(/[1-9]/g, "0")))
    console.log(`Error: symbol ${symbol.replace(/[1-9]/g, "0")} is valid`);
  else console.log(`validated ${validOdbSymbol(symbol)}`);
}
for (const symbol of invalidSymbols) {
  if (validOdbSymbol(symbol)) console.log(`Error: symbol ${symbol} is valid`);
}