export default interface ErrorProps {
  code: number | string,
  message: string,
  arrowIcon: SVGAElement,
  withoutReturn?: boolean,
}
