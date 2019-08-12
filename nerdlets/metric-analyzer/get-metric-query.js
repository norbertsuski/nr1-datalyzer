import quote from '../common/quote';

export function getWhere(props, state) {
  const {filters, dimension} = props
  
  const clauses = Object.keys(filters).
    filter(k => k !== dimension).
    map(attr => {
      const values = filters[attr]
      if (values.length == 1) {
        return `${quote(attr)} = '${values[0]}'`
      }
      else {
        return `${quote(attr)} IN (${values.map(v => `'${v}'`).join(',')})`
      }
    })

  if (clauses.length > 0) {
    return clauses.join(" AND ")
  }
  else {
    return null
  }
}

export default function getQuery(props, state) {
  const { dimension, fn, metricName, filters } = props;
  const { timeseries, limit } = state || {};
  const where = getWhere(props)

  let query = `SELECT ${fn}(${quote(metricName)}) FROM Metric`;

  if (dimension) query = query.concat(` FACET ${quote(dimension)}`);
  if (timeseries) query = query.concat(` TIMESERIES`);
  if (limit) query = query.concat(` LIMIT ${limit}`);
  if (where) query = query.concat(` WHERE ${where}`);
  return query;
}
