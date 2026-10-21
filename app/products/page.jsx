import { Suspense } from "react";
import { PageHeader, Catalogue, CatalogueFromUrl, CtaBand } from "../components/site";

export const metadata = {
  title: "Products",
  description:
    "Full Asmi Enterprises catalogue: hand wash, shower gel, dish wash, toilet & floor cleaners, phenyl, polishes, air fresheners, 50 L concentrates and industrial water-treatment chemicals.",
};

export default function ProductsPage() {
  return (
    <>
      <PageHeader
        crumb="Products"
        eyebrow="Complete catalogue"
        title="Our products"
        sub="Housekeeping cleaners in retail bottles and 5 L cans, 50 L concentrates, and industrial chemicals for boilers, cooling towers and RO plants."
      />
      {/* Pre-rendered with the default tab; switches to ?range=&cat= in the browser. */}
      <Suspense fallback={<Catalogue showHead={false} />}>
        <CatalogueFromUrl />
      </Suspense>
      <CtaBand />
    </>
  );
}
