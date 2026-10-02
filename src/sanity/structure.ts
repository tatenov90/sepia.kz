import type { StructureResolver } from 'sanity/structure';

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Singleton: Home Page Settings
      S.listItem()
        .title('Home Page Settings')
        .child(
          S.document()
            .schemaType('homePage')
            .documentId('homePage')
        ),

      S.divider(),

      // All other document types, excluding the singleton
      ...S.documentTypeListItems().filter(
        (item) => item.getId() !== 'homePage'
      ),
    ]);
