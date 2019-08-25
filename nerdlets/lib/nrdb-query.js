import {NerdGraphQuery} from 'nr1'

export default async function nrdbQuery(accountId, nrql) {
  const gql = `{
    actor {
      account(id: ${accountId}) {
        nrql(query: "${nrql}") {
          results
        }
      }
    }
  }`

  console.log(gql)
  const {data, error} = await NerdGraphQuery.query({query: gql})
  if(error) {
    throw "Bad NRQL Query: " + nrql + ": " + errror
  }
  return data.actor.account.nrql.results
}