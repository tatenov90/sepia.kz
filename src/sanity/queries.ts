import { groq } from "next-sanity";

export const postsQuery = groq`*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  publishedAt,
  mainImage
}`;

export const postBySlugQuery = groq`*[_type == "post" && slug.current == $slug][0] {
  title,
  excerpt,
  publishedAt,
  mainImage,
  body
}`;

export const MAQALALAR_PAGE_QUERY = groq`*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  publishedAt,
  mainImage,
  category->{title}
}`;

export const HOME_PAGE_QUERY = groq`*[_type == "homePage"][0] {
  heroPost->{
    title,
    slug,
    mainImage,
    excerpt,
    category->{title, slug}
  },
  carouselPosts[]->{
    title,
    slug,
    mainImage,
    excerpt,
    category->{title, slug}
  },
  subHeroPosts[]->{
    title,
    slug,
    mainImage,
    excerpt,
    publishedAt,
    category->{title, slug}
  },
  editorialPosts[]->{
    title,
    slug,
    mainImage,
    excerpt,
    category->{title, slug}
  }
}`;
