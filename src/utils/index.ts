import _ from 'lodash'

export const getInfoData = ({ fields, object }: { fields: string[], object: object }): object => {
  return _.pick(object, fields)
}
