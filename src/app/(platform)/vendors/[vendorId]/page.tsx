import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { vendors } from "@/lib/mock-data/core";
import { VendorDdPanel } from "@/components/vendors/vendor-dd-panel";

type Props = { params: Promise<{ vendorId: string }> };

export default async function VendorProfilePage({ params }: Props) {
  const { vendorId } = await params;
  const vendor = vendors.find((v) => v.id === vendorId);

  if (!vendor) return notFound();

  return (
    <div className="space-y-4">
      <Link
        href="/vendors"
        className="inline-flex items-center gap-1 text-sm font-medium text-blue-700 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        Back to vendors
      </Link>

      <div className="kona-card p-4 md:p-5">
        <h2 className="text-xl font-semibold text-slate-900">{vendor.name}</h2>
        <p className="mt-2 text-sm text-slate-600">
          Tier <strong>{vendor.tier}</strong> · Risk score <strong>{vendor.riskScore}</strong> · Pending invoices{" "}
          <strong>{vendor.pendingInvoices}</strong> · Last reviewed <strong>{vendor.lastReviewed}</strong>
        </p>
      </div>

      <VendorDdPanel vendor={vendor} />
    </div>
  );
}
