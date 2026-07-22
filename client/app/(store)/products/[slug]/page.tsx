type ProductPageProps = {
	params: Promise<{ slug: string }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
	const { slug } = await params;

	return (
		<main className="mx-auto max-w-7xl px-6 py-12">
			<h1 className="text-3xl font-bold">Product Details</h1>
			<p className="mt-4 text-gray-600">Product slug: {slug}</p>
		</main>
	);
}
