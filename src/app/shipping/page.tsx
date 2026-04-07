export default function ShippingPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">Shipping Information</h1>
      
      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-4">Delivery Coverage</h2>
          <p className="text-gray-600">We deliver to all 27 EU countries including Austria, Belgium, Bulgaria, Croatia, Cyprus, Czech Republic, Denmark, Estonia, Finland, France, Germany, Greece, Hungary, Ireland, Italy, Latvia, Lithuania, Luxembourg, Malta, Netherlands, Poland, Portugal, Romania, Slovakia, Slovenia, Spain, and Sweden.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Production & Delivery Times</h2>
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-medium">Standard Production</h3>
              <p className="text-gray-600">5-7 business days for production, followed by 2-5 business days for delivery depending on destination.</p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-medium">Express Production (24-48h)</h3>
              <p className="text-gray-600">Get your order produced within 24-48 hours. Additional express delivery available for urgent needs.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Shipping Costs</h2>
          <p className="text-gray-600">Shipping costs are calculated based on order weight, dimensions, and destination. Free shipping is available for orders over €500 within mainland EU.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Tracking Your Order</h2>
          <p className="text-gray-600">Once your order ships, you will receive a tracking number via email. You can track your shipment in real-time through our partner carriers.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Packaging</h2>
          <p className="text-gray-600">All products are carefully packaged to ensure safe delivery. Custom packaging options available for corporate orders upon request.</p>
        </section>
      </div>
    </main>
  )
}
