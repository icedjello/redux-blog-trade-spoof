const countries = ["ABW", "AFG", "AGO", "AIA", "ALA", "ALB", "AND", "ARE", "ARG", "ARM", "ASM", "ATA", "ATF", "ATG", "AUS", "AUT", "AZE", "BDI", "BEL", "BEN", "BES", "BFA", "BGD", "BGR", "BHR", "BHS", "BIH", "BLM", "BLR", "BLZ", "BMU", "BOL", "BRA", "BRB", "BRN", "BTN", "BVT", "BWA", "CAF", "CAN", "CCK", "CHE", "CHL", "CHN", "CIV", "CMR", "COD", "COG", "COK", "COL", "COM", "CPV", "CRI", "CUB", "CUW", "CXR", "CYM", "CYP", "CZE", "DEU", "DJI", "DMA", "DNK", "DOM", "DZA", "ECU", "EGY", "ERI", "ESH", "ESP", "EST", "ETH", "FIN", "FJI", "FLK", "FRA", "FRO", "FSM", "GAB", "GBR", "GEO", "GGY", "GHA", "GIB", "GIN", "GLP", "GMB", "GNB", "GNQ", "GRC", "GRD", "GRL", "GTM", "GUF", "GUM", "GUY", "HKG", "HMD", "HND", "HRV", "HTI", "HUN", "IDN", "IMN", "IND", "IOT", "IRL", "IRN", "IRQ", "ISL", "ISR", "ITA", "JAM", "JEY", "JOR", "JPN", "KAZ", "KEN", "KGZ", "KHM", "KIR", "KNA", "KOR", "KWT", "LAO", "LBN", "LBR", "LBY", "LCA", "LIE", "LKA", "LSO", "LTU", "LUX", "LVA", "MAC", "MAF", "MAR", "MCO", "MDA", "MDG", "MDV", "MEX", "MHL", "MKD", "MLI", "MLT", "MMR", "MNE", "MNG", "MNP", "MOZ", "MRT", "MSR", "MTQ", "MUS", "MWI", "MYS", "MYT", "NAM", "NCL", "NER", "NFK", "NGA", "NIC", "NIU", "NLD", "NOR", "NPL", "NRU", "NZL", "OMN", "PAK", "PAN", "PCN", "PER", "PHL", "PLW", "PNG", "POL", "PRI", "PRK", "PRT", "PRY", "PSE", "PYF", "QAT", "REU", "ROU", "RUS", "RWA", "SAU", "SDN", "SEN", "SGP", "SGS", "SHN", "SJM", "SLB", "SLE", "SLV", "SMR", "SOM", "SPM", "SRB", "SSD", "STP", "SUR", "SVK", "SVN", "SWE", "SWZ", "SXM", "SYC", "SYR", "TCA", "TCD", "TGO", "THA", "TJK", "TKL", "TKM", "TLS", "TON", "TTO", "TUN", "TUR", "TUV", "TWN", "TZA", "UGA", "UKR", "UMI", "URY", "USA", "UZB", "VAT", "VCT", "VEN", "VGB", "VIR", "VNM", "VUT", "WLF", "WSM", "YEM", "ZAF", "ZMB", "ZWE"]
const instruments = ['DHU', 'BR', 'CH', 'GUTI', 'YEDQK', 'ODE', 'LBF', 'WRPA', 'ME', 'STWD', 'SFF', 'OJC', 'IRCAW', 'PV', 'UYH', 'MCP', 'RQH', 'OKN', 'ASLF', 'PCX', 'MRA', 'RXVQ', 'ILJR', 'XJG', 'ERX', 'HFCBC', 'VDU', 'CQIK', 'GPGF', 'MQNK', 'XEO', 'LQWP', 'UUM', 'BKFC', 'DOIK', 'AUX', 'IEUW', 'ENE', 'TY', 'MTY', 'YVSA', 'NHIE', 'IC', 'RPXRX', 'RMAW', 'MXG', 'XBYD', 'STY', 'HPLDS', 'CES', 'OOZRM', 'KX', 'SPSN', 'ASC', 'JEJ', 'MJC', 'KWP', 'PO', 'YSLX', 'LSDD', 'QHK', 'BYM', 'HM', 'SXS', 'PVU', 'EC', 'RYPVK', 'LFX', 'FNRF', 'QBWE', 'HJVB', 'WPL', 'VC', 'ZQFBT', 'RNE', 'GB', 'VSZY', 'VEQ', 'ZVCY', 'XHHK', 'CQ', 'ZS', 'TEU', 'NFK', 'PQI', 'SWTE', 'WBA', 'AW', 'GKK', 'CQWS', 'CTRR', 'NNBP', 'RV', 'UDY', 'PH', 'HTE', 'BUT', 'WBB', 'QC', 'VPS', 'CSDJR', 'DMTC', 'TTK', 'IPGT', 'OQVUB', 'AXUH', 'DBIJR', 'BDH', 'GDV', 'MPOB', 'GCJX', 'TJZH', 'DKK', 'WUR', 'JZ', 'ZCD', 'XYH', 'JUGS', 'PFI', 'XJE', 'SUGDN', 'XW', 'YHFI', 'LHVC', 'NQCWK', 'MCGGI', 'NMYI', 'KQ', 'PTZK', 'OWT', 'RSI', 'CO', 'QFM', 'DQWZ', 'EU', 'IWK', 'GS', 'ZT', 'RP', 'NRYXE', 'SEZ', 'IHKL', 'BGB', 'SPF', 'DE', 'LGU', 'OSKWF', 'XAIO', 'OB', 'OHQSM', 'OIST', 'RBY', 'SPS', 'LKL', 'XH', 'OIC', 'FE', 'BHJ', 'OQJ', 'ZCU', 'FCERT', 'DBM', 'NMNT', 'POBR', 'JSP', 'OJJ', 'KQCW', 'JC', 'SCK', 'BQMM', 'BKT', 'YT', 'SBPBH', 'YZT', 'HJE', 'CVEYJ', 'RH', 'BWOWW', 'CCI', 'FTM', 'AY', 'XTN', 'GJXB', 'LS', 'ZQTS', 'ANT', 'EVM', 'VEHG', 'YUS', 'UDYOP', 'ROX', 'DDL', 'XTH', 'GBX', 'TQ', 'QQ', 'BQQUK', 'DBK', 'DDE', 'BAM']

const makeData = (rows) => {
  let rowData = [];
  for (var i = 0; i < rows; i++) {
    var row = {
      'id': i + 1,
      'country': _countryGen(),
      'instrument': _instrumentGen(),
      'bsk': _bskGen(),
      'quantity': _quantityGen(),
      'price': _priceGen(),
    }
    rowData.push(row)
  }
  return rowData
}

const _randomNumGenerator = (max) => Math.round(Math.random() * max);

const _countryGen = () => countries[_randomNumGenerator(countries.length)]

const _instrumentGen = () => instruments[_randomNumGenerator(200)]

const _bskGen = () => _randomNumGenerator(2);

const _quantityGen = () => (_randomNumGenerator(8000) + 1000)

const _priceGen = () => parseFloat(`${_randomNumGenerator(250)}.${_randomNumGenerator(99)}`)


const initialState = {
  rowData: makeData(50000)
}

const _fluctuation = (prevVal) => _randomNumGenerator(prevVal / 10)

const priceUpdater = (prevPrice) => {
  let price = prevPrice;
  let fluctuation = _fluctuation(prevPrice);

  if (_randomNumGenerator(1) === 0) {
    price -= fluctuation;
  } else {
    price += fluctuation;
  }
  return price;
}

const quantityUpdater = (prevQuantity) => {
  let amount = prevQuantity
  if (_randomNumGenerator(1) === 0) {
    amount -= _fluctuation(prevQuantity)
  } else {
    amount += _fluctuation(prevQuantity)
  }
  return amount;
}

const bskUpdater = () => _randomNumGenerator(2)

export { initialState, bskUpdater, priceUpdater, quantityUpdater };
