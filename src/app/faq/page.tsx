export default function FAQPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">Frequently Asked Questions</h1>
      <div className="space-y-6">
        <details className="group border rounded-lg p-4">
          <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
            What is the minimum order quantity?
            <span className="transition-transform group-open:rotate-180">▼</span>
          </summary>
          <p className="mt-3 text-gray-600">Most products have a minimum order of 25 pieces. Some items may have higher minimums depending on customization options.</p>
        </details>

        <details className="group border rounded-lg p-4">
          <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
            Can I get a sample before bulk order?
            <span className="transition-transform group-open:rotate-180">▼</span>
          </summary>
          <p className="mt-3 text-gray-600">Yes, we offer sample orders for most products. Contact our sales team for pricing and availability.</p>
        </details>

        <details className="group border rounded-lg p-4">
          <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
            What branding methods do you offer?
            <span className="transition-transform group-open:rotate-180">▼</span>
          </summary>
          <p className="mt-3 text-gray-600">We offer Screen Printing, Digital Printing, Embroidery, Laser Engraving, and UV Printing. The available methods depend on the product material and design complexity.</p>
        </details>

        <details className="group border rounded-lg p-4">
          <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
            How long does production take?
            <span className="transition-transform group-open:rotate-180">▼</span>
          </summary>
          <p className="mt-3 text-gray-600">Standard production is 5-7 business days. Express production (24-48 hours) is available for urgent orders at an additional cost.</p>
        </details>

        <details className="group border rounded-lg p-4">
          <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
            Do you ship to all EU countries?
            <span className="transition-transform group-open:rotate-180">▼</span>
          </summary>
          <p className="mt-3 text-gray-600">Yes, we deliver to all 27 EU member states. Delivery times vary from 2-5 business days depending on the destination.</p>
        </details>

        <details className="group border rounded-lg p-4">
          <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
            What file formats do you accept for branding?
            <span className="transition-transform group-open:rotate-180">▼</span>
          </summary>
          <p className="mt-3 text-gray-600">We accept AI, EPS, PDF, and high-resolution PNG/JPG files. Vector formats are preferred for best print quality.</p>
        </details>

        <details className="group border rounded-lg p-4">
          <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
            Can I reorder the same product?
            <span className="transition-transform group-open:rotate-180">▼</span>
          </summary>
          <p className="mt-3 text-gray-600">Yes, reorders are easy. Your artwork and settings are saved in our system for quick reprocessing.</p>
        </details>

        <details className="group border rounded-lg p-4">
          <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
            What payment methods do you accept?
            <span className="transition-transform group-open:rotate-180">▼</span>
          </summary>
          <p className="mt-3 text-gray-600">We accept bank transfer, credit card, and PayPal. Net-30 terms available for approved business accounts.</p>
        </details>
      </div>
    </main>
  )
}
