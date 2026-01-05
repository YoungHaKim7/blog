import { d as defineCollection, o as objectType, e as stringType, f as dateType, h as booleanType, j as arrayType } from './content-utils_LccCArHN.mjs';

const postsCollection = defineCollection({
  schema: objectType({
    title: stringType(),
    published: dateType(),
    updated: dateType().optional(),
    draft: booleanType().optional().default(false),
    description: stringType().optional().default(""),
    image: stringType().optional().default(""),
    tags: arrayType(stringType()).optional().default([]),
    category: stringType().optional().default(""),
    lang: stringType().optional().default(""),
    /* For internal use */
    prevTitle: stringType().default(""),
    prevSlug: stringType().default(""),
    nextTitle: stringType().default(""),
    nextSlug: stringType().default("")
  })
});
const collections = {
  posts: postsCollection
};

export { collections };
