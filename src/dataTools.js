const countries = ["ABW", "AFG", "AGO", "AIA", "ALA", "ALB", "AND", "ARE", "ARG", "ARM", "ASM", "ATA", "ATF", "ATG", "AUS", "AUT", "AZE", "BDI", "BEL", "BEN", "BES", "BFA", "BGD", "BGR", "BHR", "BHS", "BIH", "BLM", "BLR", "BLZ", "BMU", "BOL", "BRA", "BRB", "BRN", "BTN", "BVT", "BWA", "CAF", "CAN", "CCK", "CHE", "CHL", "CHN", "CIV", "CMR", "COD", "COG", "COK", "COL", "COM", "CPV", "CRI", "CUB", "CUW", "CXR", "CYM", "CYP", "CZE", "DEU", "DJI", "DMA", "DNK", "DOM", "DZA", "ECU", "EGY", "ERI", "ESH", "ESP", "EST", "ETH", "FIN", "FJI", "FLK", "FRA", "FRO", "FSM", "GAB", "GBR", "GEO", "GGY", "GHA", "GIB", "GIN", "GLP", "GMB", "GNB", "GNQ", "GRC", "GRD", "GRL", "GTM", "GUF", "GUM", "GUY", "HKG", "HMD", "HND", "HRV", "HTI", "HUN", "IDN", "IMN", "IND", "IOT", "IRL", "IRN", "IRQ", "ISL", "ISR", "ITA", "JAM", "JEY", "JOR", "JPN", "KAZ", "KEN", "KGZ", "KHM", "KIR", "KNA", "KOR", "KWT", "LAO", "LBN", "LBR", "LBY", "LCA", "LIE", "LKA", "LSO", "LTU", "LUX", "LVA", "MAC", "MAF", "MAR", "MCO", "MDA", "MDG", "MDV", "MEX", "MHL", "MKD", "MLI", "MLT", "MMR", "MNE", "MNG", "MNP", "MOZ", "MRT", "MSR", "MTQ", "MUS", "MWI", "MYS", "MYT", "NAM", "NCL", "NER", "NFK", "NGA", "NIC", "NIU", "NLD", "NOR", "NPL", "NRU", "NZL", "OMN", "PAK", "PAN", "PCN", "PER", "PHL", "PLW", "PNG", "POL", "PRI", "PRK", "PRT", "PRY", "PSE", "PYF", "QAT", "REU", "ROU", "RUS", "RWA", "SAU", "SDN", "SEN", "SGP", "SGS", "SHN", "SJM", "SLB", "SLE", "SLV", "SMR", "SOM", "SPM", "SRB", "SSD", "STP", "SUR", "SVK", "SVN", "SWE", "SWZ", "SXM", "SYC", "SYR", "TCA", "TCD", "TGO", "THA", "TJK", "TKL", "TKM", "TLS", "TON", "TTO", "TUN", "TUR", "TUV", "TWN", "TZA", "UGA", "UKR", "UMI", "URY", "USA", "UZB", "VAT", "VCT", "VEN", "VGB", "VIR", "VNM", "VUT", "WLF", "WSM", "YEM", "ZAF", "ZMB", "ZWE"];
const instruments = ['DHU', 'BR', 'CH', 'GUTI', 'YEDQK', 'ODE', 'LBF', 'WRPA', 'ME', 'STWD', 'SFF', 'OJC', 'IRCAW', 'PV', 'UYH', 'MCP', 'RQH', 'OKN', 'ASLF', 'PCX', 'MRA', 'RXVQ', 'ILJR', 'XJG', 'ERX', 'HFCBC', 'VDU', 'CQIK', 'GPGF', 'MQNK', 'XEO', 'LQWP', 'UUM', 'BKFC', 'DOIK', 'AUX', 'IEUW', 'ENE', 'TY', 'MTY', 'YVSA', 'NHIE', 'IC', 'RPXRX', 'RMAW', 'MXG', 'XBYD', 'STY', 'HPLDS', 'CES', 'OOZRM', 'KX', 'SPSN', 'ASC', 'JEJ', 'MJC', 'KWP', 'PO', 'YSLX', 'LSDD', 'QHK', 'BYM', 'HM', 'SXS', 'PVU', 'EC', 'RYPVK', 'LFX', 'FNRF', 'QBWE', 'HJVB', 'WPL', 'VC', 'ZQFBT', 'RNE', 'GB', 'VSZY', 'VEQ', 'ZVCY', 'XHHK', 'CQ', 'ZS', 'TEU', 'NFK', 'PQI', 'SWTE', 'WBA', 'AW', 'GKK', 'CQWS', 'CTRR', 'NNBP', 'RV', 'UDY', 'PH', 'HTE', 'BUT', 'WBB', 'QC', 'VPS', 'CSDJR', 'ROX', 'DDL', 'XTH', 'GBX', 'TQ', 'QQ', 'BQQUK', 'DBK', 'DDE', 'BAM'];

const _makeData = (rows) => {
  let rowData = [];
  for (let i = 0; i < rows; i++) {
    const row = {
      'id': i + 1,
      'country': _countryGen(),
      'instrument': _instrumentGen(),
      'quantity': _quantityGen(i),
      'price': _priceGen(),
    };
    rowData.push(row)
  }
  return rowData
};




const giveRowsQuantity = () =>{  
let rowsWtihQuantity = [];

  for (let i = 0; i < 100; i++) {
    let rowIndexWithQuantity = Math.round(Math.random() * 50000);
    if (!rowsWtihQuantity.includes(rowIndexWithQuantity)) {
      rowsWtihQuantity.push(rowIndexWithQuantity)
    }
    else {
      while (rowsWtihQuantity.includes(rowIndexWithQuantity)) {
        rowIndexWithQuantity++
        break;
      }
    }
  }
  return rowsWtihQuantity;
}

const rowsWtihQuantity = giveRowsQuantity();

const _randomNumGenerator = (max) => Math.round(Math.random() * max);

const _countryGen = () => countries[_randomNumGenerator(countries.length)];

const _instrumentGen = () => instruments[_randomNumGenerator(110)];

const _quantityGen = (index) => {

  if (rowsWtihQuantity.includes(index)) {
    return _randomNumGenerator(25)
  }
  return 0
};


const _priceGen = () => parseFloat(`${_randomNumGenerator(299) + 200}.${_randomNumGenerator(99)}`);

const rowData = _makeData(50000);

const _calculateNetValue = (rows) => {
  let totalNetValue = 0;
  rows.forEach(row => {
    if (row.quantity > 0) {
      let netOfRow = row.quantity * row.price;
      totalNetValue = Number((netOfRow + totalNetValue).toFixed(4));
    }
  });
  return Number(totalNetValue.toFixed(2));
}

const initialState = {
  rowData: rowData,
  sellAmount: 100,
  buyAmount: 100,
  balance: 100000,
  netValue: _calculateNetValue(rowData),
  timesStoreHasBeenUpdated: 0,
  recordsUpdated: 0,
  timeTakenForTransaction:0
};

const _fluctuation = (prevVal) => _randomNumGenerator(prevVal / 2);

const priceUpdater = (prevPrice) => {
  let price = prevPrice;
  let fluctuation = _fluctuation(prevPrice);
  if (price > 100) {
    if (_randomNumGenerator(1) === 0) {
      price -= fluctuation;
    } else {
      price += fluctuation;
    }
  } else {
    price += 100
  }
  return price;
};


export { initialState, priceUpdater };
