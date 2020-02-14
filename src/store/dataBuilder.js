const makeData = (rows) => {
  let rowData = [];
  for (var i = 0; i < rows; i++) {
    var row = {
      'id': i + 1,
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

const _instrumentGen = () => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let acronym = '';
  for (let i = 0; i < (_randomNumGenerator(3) + 2); i++) {
    acronym += alphabet[_randomNumGenerator(25)];
  }
  return acronym;
}

const _bskGen = () => _randomNumGenerator(2);

const _quantityGen = () => (_randomNumGenerator(8000) + 1000)

const _priceGen = () => parseFloat(`${_randomNumGenerator(250)}.${_randomNumGenerator(99)}`)

export { makeData };