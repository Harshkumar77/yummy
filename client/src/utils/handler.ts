export function onValueChangeHandlerRecipie(
  setUserInput: any,
  property: string
) {
  return ({ currentTarget: { value } }: any) =>
    setUserInput((initial: any) => ({ ...initial, [property]: value }))
}
