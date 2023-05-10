export type IValidOption = string | { name: string; args?: any }
export type IFieldValidFn = () => Promise<unknown>
export interface IValidator {
    validField: (value: unknown, validMeta: Array<IValidOption>) => Promise<unknown>
    validForm: () => Promise<unknown>
    registerField: (id: string, field: IFieldValidFn) => void
    ungisterField: (id: string) => void
}