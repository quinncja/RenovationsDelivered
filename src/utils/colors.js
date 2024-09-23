export const colorPalettes = {
  Vibrant: [
    {
      color: "hsl(347, 81%, 60%)",
      lighter: true,
      darker: true,
    },
    {
      color: "hsl(17, 86%, 60%)",
      lighter: true,
      darker: true,
    },
    {
      color: "hsl(272, 88%, 60%)",
      lighter: true,
      darker: true,
    },
    {
      color: "hsl(48, 89%, 48%)",
      lighter: true,
      darker: false,
    },
    {
      color: "hsl(247, 90%, 68%)",
      lighter: true,
      darker: true,
    },
  ],

  Contrast: [
    {
      color: "hsl(254, 65%, 52%)",
      lighter: true,
      darker: true,
    },
    {
      color: "hsl(146, 81%, 48%)",
      lighter: true,
      darker: false,
    },
    {
      color: "hsl(33, 93%, 52%)",
      lighter: true,
      darker: false,
    },
    {
      color: "hsl(258, 83%, 64%)",
      lighter: true,
      darker: true,
    },
    {
      color: "hsl(348, 100%, 64%)",
      lighter: true,
      darker: true,
    },
    {
      color: "hsl(168, 94%, 46%)",
      lighter: true,
      darker: true,
    },
  ],

  Construction: [
    {
      color: "hsl(210, 50%, 40%)",
      lighter: true,
      darker: true,
    },
    {
      color: "hsl(25, 70%, 45%)",
      lighter: true,
      darker: false,
    },
    {
      color: "hsl(220, 34%, 30%)",
      lighter: true,
      darker: true,
    },
    {
      color: "hsl(0, 0%, 25%)",
      lighter: true,
      darker: true,
    },
    {
      color: "hsl(120, 15%, 55%)",
      lighter: true,
      darker: true,
    },
  ],

  Calm: [
    {
      color: "hsl(222, 64%, 47%)",
      lighter: true,
      darker: true,
    },
    {
      color: "hsl(262, 54%, 78%)",
      lighter: true,
      darker: true,
    },
    {
      color: "hsl(354, 71%, 48%)",
      lighter: true,
      darker: true,
    },
    {
      color: "hsl(222, 65%, 64%)",
      lighter: true,
      darker: true,
    },
    {
      color: "hsl(269, 64%, 38%)",
      lighter: true,
      darker: true,
    },
  ],

  Rust: [
    {
      color: "hsl(193, 34%, 30%)",
      lighter: true,
      darker: true,
    },
    {
      color: "hsl(92, 14%, 60%)",
      lighter: true,
      darker: true,
    },
    {
      color: "hsl(36, 72%, 56%)",
      lighter: true,
      darker: true,
    },
    {
      color: "hsl(358, 77%, 19%)",
      lighter: true,
      darker: true,
    },
  ],

  Earth: [
    {
      color: "hsl(12, 51%, 37%)",
      lighter: true,
      darker: true,
    },
    {
      color: "hsl(19, 44%, 52%)",
      lighter: true,
      darker: true,
    },
    {
      color: "hsl(26, 46%, 82%)",
      lighter: true,
      darker: true,
    },
    {
      color: "hsl(58, 15%, 57%)",
      lighter: true,
      darker: true,
    },
    {
      color: "hsl(84, 12%, 40%)",
      lighter: true,
      darker: true,
    },
  ],
};


function murmurhash3_32_gc(key, seed = 0) {
  let remainder = key.length & 3;
  let bytes = key.length - remainder;
  let h1 = seed;
  let c1 = 0xcc9e2d51;
  let c2 = 0x1b873593;
  let i = 0;

  while (i < bytes) {
    let k1 =
      (key.charCodeAt(i) & 0xff) |
      ((key.charCodeAt(++i) & 0xff) << 8) |
      ((key.charCodeAt(++i) & 0xff) << 16) |
      ((key.charCodeAt(++i) & 0xff) << 24);
    ++i;

    k1 = Math.imul(k1, c1);
    k1 = (k1 << 15) | (k1 >>> 17);
    k1 = Math.imul(k1, c2);

    h1 ^= k1;
    h1 = (h1 << 13) | (h1 >>> 19);
    h1 = (Math.imul(h1, 5) + 0xe6546b64) | 0;
  }

  let k1 = 0;

  switch (remainder) {
    case 3:
      k1 ^= (key.charCodeAt(i + 2) & 0xff) << 16;
      break
    case 2:
      k1 ^= (key.charCodeAt(i + 1) & 0xff) << 8;
      break
    case 1:
      k1 ^= key.charCodeAt(i) & 0xff;
      k1 = Math.imul(k1, c1);
      k1 = (k1 << 15) | (k1 >>> 17);
      k1 = Math.imul(k1, c2);
      h1 ^= k1;
      break
    default:
  }

  h1 ^= key.length;

  h1 ^= h1 >>> 16;
  h1 = Math.imul(h1, 0x85ebca6b);
  h1 ^= h1 >>> 13;
  h1 = Math.imul(h1, 0xc2b2ae35);
  h1 ^= h1 >>> 16;

  return h1 >>> 0;
}

function parseHSL(hslString) {
  const hslRegex = /hsl\(\s*(\d+),\s*(\d+)%\s*,\s*(\d+)%\s*\)/i;
  const match = hslString.match(hslRegex);
  return {
    h: parseInt(match[1], 10),
    s: parseInt(match[2], 10),
    l: parseInt(match[3], 10),
  };
}

function adjustColor(colorObj, id) {
  const color = colorObj.color;
  const { h, s, l } = parseHSL(color);
  const idHash = murmurhash3_32_gc("colorhash-str" + id);

  const adjustDecision = idHash % 100;

  let hueAdjustment = 0;
  let lightnessAdjustment = 0;

  if (adjustDecision < 30) {
    hueAdjustment = (idHash % 16) - 12; 
  } else if (adjustDecision < 60) {
    if (colorObj.lighter && colorObj.darker) {
      const lighten = ((idHash >> 1) % 2) === 0;
      lightnessAdjustment = lighten
        ? Math.floor((idHash % 21)) 
        : -Math.floor((idHash % 21)); 
    } else if (colorObj.lighter) {
      lightnessAdjustment = Math.floor(idHash % 21); 
    } else if (colorObj.darker) {
      lightnessAdjustment = -Math.floor(idHash % 21); 
    }
  } else if (adjustDecision < 80) {
    return color;
  } else {
    hueAdjustment = (idHash % 40) - 12; 
    if (colorObj.lighter && colorObj.darker) {
      const lighten = ((idHash >> 1) % 2) === 0;
      lightnessAdjustment = lighten
        ? Math.floor((idHash % 21)) 
        : -Math.floor((idHash % 21));
    } else if (colorObj.lighter) {
      lightnessAdjustment = Math.floor(idHash % 21); 
    } else if (colorObj.darker) {
      lightnessAdjustment = -Math.floor(idHash % 21);
    }
  }

  const newH = (h + hueAdjustment + 360) % 360; 
  const newL = Math.max(0, Math.min(100, l + lightnessAdjustment)); 

  return `hsl(${newH}, ${s}%, ${newL}%)`;
}


export function getColorByID(id, palette) {
  const hash = murmurhash3_32_gc(id);
  const fraction = hash / 4294967295;
  const index = Math.floor(fraction * palette.length);
  return palette[index];
}

export function hashData(data, palette) {
  const colorObj = getColorByID(data.id, palette);
  const color = adjustColor(colorObj, data.id);
  return {
    ...data,
    color,
  };
}
