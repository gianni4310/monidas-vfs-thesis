import { Schema, FieldSchema, TypeSchema, Meta } from '@colombalink/based-db-schema'

export type ExtendedSchema = Omit<Schema, 'types'> & {
  types: Record<string, ExtendedTypeSchema>
}

export type ExtendedTypeSchema = Omit<TypeSchema, 'fields' | 'meta'> & {
  fields: Record<string, ExtendedField>
  meta: ExtendedMeta
}

export type ExtendedMeta = Meta & {
  root?: { label: string }
}

export type ExtendedField = FieldSchema & {
  constraints?: FieldConstraint[]
}

export type FieldConstraint =
  | { type: 'notNull' }
  | { type: 'bidirektional' }
  | { type: 'denyCreation' }
  | { type: 'allowReference', path: string }

export function withConstraints<T extends FieldSchema>(
  schema: T,
  ...constraints: FieldConstraint[]
): T & { constraints: FieldConstraint[] } {
  return { ...schema, constraints }
}