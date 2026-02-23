// project/src/sanity/queries.ts
export const HOMEPAGE_QUERY = `
*[_type == "homepage"][0]{
  recommendedTitle,
  nextStepsTitle,
  nextStepsIntro,
  primaryCtaText,
  primaryCtaHref,
  secondaryCtaText,
  secondaryCtaHref,
  tipLabel,
  tipText
}
`;