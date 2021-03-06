import protobuf  from 'protobufjs'
import descriptor from 'protobufjs/ext/descriptor'
import _ from 'lodash'

function protobuilder (form) {
  // console.log(form)
  let sorted = []
  for (let uid in form) {
    if (form.hasOwnProperty(uid)) {
      sorted.push([uid, form[uid].index])
    }
  }
  sorted.sort((a, b) => {
    return a[1] - b[1]
  })
  
  const P = new protobuf.Type('P')
  let counter = 1
  for (let item of sorted) {
    let id = item[0]
    let rowData = form[id]
    let type = rowData.fieldType
    let name = _.camelCase(rowData.fieldName)
    if (!name || name === '') {
      throw new Error(`Missing field name at position: ${counter} for id: ${id}`)
    }
    let rule = rowData.fieldRule === 'repeated' ? 'repeated' : undefined
    
    let index = counter
    counter += 1
    P.add(new protobuf.Field(name, index, type, rule))
  }

  let root = new protobuf.Root()
  root.define('oip5.record.templates').add(P)
  let descriptorFromRoot = root.toDescriptor('proto3')
  let buffer = descriptor.FileDescriptorSet.encode(descriptorFromRoot).finish()
  
  return buffer
}

export default protobuilder
