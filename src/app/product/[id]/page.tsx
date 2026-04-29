import { notFound } from 'next/navigation';
import { mockProducts } from '@/lib/mock-data';
import { ImageGallery } from '@/components/product/ImageGallery';
import { ProductInfo } from '@/components/product/ProductInfo';
import { ReviewSection } from '@/components/product/ReviewSection';
import { RelatedProducts } from '@/components/product/RelatedProducts';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const product = mockProducts.find(p => p.id === id);
  if (!product) return { title: 'Product Not Found' };
  return {
    title: product.seoTitle ?? product.name,
    description: product.seoDesc ?? product.description.slice(0, 160),
    openGraph: {
      title: product.name,
      description: product.description.slice(0, 160),
      images: [{ url: product.images[0] }],
    },
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = mockProducts.find(p => p.id === id);
  if (!product) notFound();

  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        <div className="container-custom">
          {/* Breadcrumb */}
          <nav className="text-xs text-text-muted mb-8 flex items-center gap-2">
            <a href="/" className="hover:text-primary-600 transition-colors">Home</a>
            <span>/</span>
            <a href="/shop" className="hover:text-primary-600 transition-colors">Shop</a>
            <span>/</span>
            <a href={`/shop?category=${product.category}`} className="hover:text-primary-600 transition-colors capitalize">{product.category}</a>
            <span>/</span>
            <span className="text-text-primary truncate max-w-40">{product.name}</span>
          </nav>

          {/* Product layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16">
            <ImageGallery images={product.images} name={product.name} />
            <ProductInfo product={product} />
          </div>

          {/* Reviews */}
          <div className="mt-16 pt-10 border-t border-border">
            <ReviewSection productId={product.id} />
          </div>

          {/* Related */}
          <RelatedProducts currentId={product.id} category={product.category} />
        </div>
      </main>
      <Footer />
    </>
  );
}
