export const HOMEPAGE_QUERY = `
*[_type == "homepage"][0]{
  heroTitle,
  heroSubtitle,
  heroBadge,
  heroCtaText,
  heroCtaHref,

  nextStepsTitle,
  nextStepsIntro,
  primaryCtaText,
  primaryCtaHref,
  secondaryCtaText,
  secondaryCtaHref,
  tipLabel,
  tipText,

  newsTitle,
  newsItems[]{
    title,
    excerpt,
    href,
    date,
    tag,
    image{
      asset->{url}
    }
  }
}
`;