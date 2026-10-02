import { defineField, defineType } from 'sanity';

export const homePageType = defineType({
  name: 'homePage',
  title: 'Home Page Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Home Page Layout',
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'heroPost',
      title: 'Hero Section Post',
      type: 'reference',
      to: [{ type: 'post' }],
    }),
    defineField({
      name: 'carouselPosts',
      title: 'Carousel Posts',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'post' }] }],
    }),
    defineField({
      name: 'subHeroPosts',
      title: 'Sub-Hero Posts',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'post' }] }],
    }),
    defineField({
      name: 'editorialPosts',
      title: 'Massive Bottom Posts (Editorial)',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'post' }] }],
      validation: (Rule) => Rule.max(2),
    }),
  ],
});
