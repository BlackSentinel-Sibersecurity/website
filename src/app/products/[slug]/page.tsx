import { getAllProductSlugs } from "@/data/products";
import ProductPageClient from "./ProductPageClient";

export function generateStaticParams() {
  return getAllProductSlugs().map((slug) => ({ slug }));
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  return <ProductPageClient slug={params.slug} />;
}
