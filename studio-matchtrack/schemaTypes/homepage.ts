// project/sanity/schemaTypes/homepage.ts
import { defineField, defineType } from "sanity";

export default defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  fields: [
    defineField({
      name: "recommendedTitle",
      title: "Recommended title",
      type: "string",
      initialValue: "Preporuceno za tebe",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "nextStepsTitle",
      title: "Next steps title",
      type: "string",
      initialValue: "Sljedeci koraci",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "nextStepsIntro",
      title: "Next steps intro",
      type: "text",
      rows: 3,
      initialValue: "Popuni tjedan aktivnostima i pronadi ekipu za trening.",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "primaryCtaText",
      title: "Primary CTA text",
      type: "string",
      initialValue: "Pregledaj sve termine",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "primaryCtaHref",
      title: "Primary CTA link (href)",
      type: "string",
      initialValue: "/termini",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "secondaryCtaText",
      title: "Secondary CTA text",
      type: "string",
      initialValue: "Pronadi lokacije blizu sebe",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "secondaryCtaHref",
      title: "Secondary CTA link (href)",
      type: "string",
      initialValue: "/venues",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "tipLabel",
      title: "Tip label",
      type: "string",
      initialValue: "Brzi savjet",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tipText",
      title: "Tip text",
      type: "text",
      rows: 3,
      initialValue:
        "Aktivnosti s manjim brojem prijavljenih se najbrze popune tijekom veceri.",
      validation: (Rule) => Rule.required(),
    }),
  ],
});