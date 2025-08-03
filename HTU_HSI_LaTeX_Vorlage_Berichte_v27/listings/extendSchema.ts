import { ExtendedField, ExtendedSchema } from '../types/types.js'

export const extendSchema = (schema: ExtendedSchema) => {

  const visitedNodes: string[] = [];

  const traverse = (type: string) => {
    if (visitedNodes.includes(type)) return

    visitedNodes.push(type)
    const fields = schema.types[type]?.fields ?? {}

    for (const fieldDef of Object.values(fields)) {

      if (fieldDef.type === 'reference' || fieldDef.type === 'references') {
        const refTypes = fieldDef.meta?.refTypes ?? []
        const refType = refTypes[0]
        if (!schema.types[refType]) continue

        const hasFurtherRefs = Object.values(schema.types[refType].fields ?? {}).some(
          (field: ExtendedField) =>
            field.type === 'reference' || field.type === 'references'
        )

        fieldDef.isLeaf = !hasFurtherRefs

        if (visitedNodes.includes(refType)) {

          fieldDef.hasPossibleCycle = true
          continue
        }

        if (!fieldDef.isLeaf) {
          traverse(refType)
        }
      }
    }
  }

  const roots: string[] = [];
  
    for (const [name, values] of Object.entries(schema.types)) {
        const root = values.meta.root;
        if(root){
            roots.push(name)
        }
    }

  for (const type of roots) {
    traverse(type)
  }
}

export default extendSchema