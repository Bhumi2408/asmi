import { notFound } from "next/navigation";
import { Catalogue, CtaBand, PageHeader } from "../../../components/site";
import { CATALOG } from "../../../components/catalog-data";

const getCategory = (groupId, categoryId) => {
  const group = CATALOG.find((entry) => entry.id === groupId);
  const category = group?.cats.find((entry) => entry.id === categoryId);
  return group && category ? { group, category } : null;
};

export function generateStaticParams() {
  return CATALOG.flatMap((group) => group.cats.map((category) => ({
    slug: group.id,
    category: category.id,
  })));
}

export async function generateMetadata({ params }) {
  const { slug: groupId, category: categoryId } = await params;
  const found = getCategory(groupId, categoryId);
  if (!found) return {};
  const { group, category } = found;
  return {
    title: `${category.label} Products | ${group.label}`,
    description: `${category.label} products from Asmi Enterprises. Browse available products, pack sizes and bulk options.`,
  };
}

export default async function ProductCategoryPage({ params }) {
  const { slug: groupId, category: categoryId } = await params;
  const found = getCategory(groupId, categoryId);
  if (!found) notFound();
  const { group, category } = found;

  return (
    <>
      <PageHeader
        crumb={`Products / ${group.label}`}
        eyebrow={group.label}
        title={category.label}
        sub={`${category.items.length} products in the ${category.label.toLowerCase()} range.`}
      />
      <Catalogue showHead={false} initialGroup={groupId} initialCat={categoryId} />
      <CtaBand />
    </>
  );
}
