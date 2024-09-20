function getVenderLabel(datum) {
  const venderMap = {
    "Home Depot": "HMD",
    "Kitchen Cubes LLC": "KC",
    "Sherwin Williams": "SHW",
    Ferguson: "FRG",
    "Novak & Parker": "N&P",
    "The Carpet Group, Inc": "TCG",
    "KitchenArt, LLC": "KA",
    "HD Supply": "HDS",
    "A Messe Supply, Corp": "AMS",
    "MFS Supply": "MFS",
    "Cinch Kit, LLC": "QWK",
    "Lowes 3094": "LOW",
    "Kitchen Cabinets Deal": "KCD",
    "AAA Distributor, LLC": "AAA",
    Daltile: "DAL",
  };

  return venderMap[datum.id];
}

export default getVenderLabel;
