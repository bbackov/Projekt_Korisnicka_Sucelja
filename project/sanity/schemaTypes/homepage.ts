import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  fields: [
    // HERO
    defineField({
      name: "heroTitle",
      title: "Hero title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero subtitle",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroBadge",
      title: "Hero badge (optional)",
      type: "string",
    }),
    defineField({
      name: "heroCtaText",
      title: "Hero CTA text (optional)",
      type: "string",
    }),
    defineField({
      name: "heroCtaHref",
      title: "Hero CTA link (optional)",
      type: "string",
    }),

    // NEXT STEPS
    defineField({
      name: "nextStepsTitle",
      title: "Next steps title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "nextStepsIntro",
      title: "Next steps intro",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "primaryCtaText",
      title: "Primary CTA text",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "primaryCtaHref",
      title: "Primary CTA link (href)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "secondaryCtaText",
      title: "Secondary CTA text",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "secondaryCtaHref",
      title: "Secondary CTA link (href)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tipLabel",
      title: "Tip label",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tipText",
      title: "Tip text",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),

    // NEWS
    defineField({
      name: "newsTitle",
      title: "News section title",
      type: "string",
      initialValue: "Novosti",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "newsItems",
      title: "News items",
      type: "array",
      of: [
        defineArrayMember({
          name: "newsItem",
          title: "News item",
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "excerpt",
              title: "Short text",
              type: "text",
              rows: 3,
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
            }),
            defineField({
              name: "href",
              title: "Link (optional)",
              type: "string",
            }),
            defineField({
              name: "date",
              title: "Date",
              type: "date",
            }),
            defineField({
              name: "tag",
              title: "Tag (optional)",
              type: "string",
            }),
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "excerpt",
              media: "image",
            },
          },
        }),
      ],
    }),
  ],
});
