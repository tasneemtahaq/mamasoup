import { createClient } from 'next-sanity'

//import { apiVersion, dataset, projectId } from '../env'
import imageUrlBuilder from "@sanity/image-url";


export const client = createClient({
  projectId:'yoyq3wyc',
  dataset:'production',
  apiVersion:'2025-02-10',
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})
const builder = imageUrlBuilder(client);
// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
function urlFor(source: any) {
  return builder.image(source);
}

export async function getStaticProps() {
  const dishes = await client.fetch(`*[_type == "menuDish"]`);

  return {
    props: { dishes },
    revalidate: 10,
  };
}