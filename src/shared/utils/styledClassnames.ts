export const styledClassnames = (
  classname: string,
  styles: { readonly [key: string]: string },
) =>
  classname
    ?.split(' ')
    ?.map((_class) => styles?.[_class])
    ?.join(' ')
