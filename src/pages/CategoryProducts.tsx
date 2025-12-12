import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { categories, products } from "@/data/mockData";
import { recordCategoryUsage } from "@/lib/usage";

const CategoryProducts: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  
  const category = categories.find((c) => c.id === categoryId);
  const categoryProducts = products.filter((p) => p.category === categoryId);

  // Record a visit to this category page to boost its prominence on home
  useEffect(() => {
    if (categoryId) recordCategoryUsage(categoryId, 2);
  }, [categoryId]);

  if (!category) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center">
        <h1 className="font-display text-2xl font-bold text-foreground">
          Category not found
        </h1>
        <Link
          to="/categories"
          className="mt-4 flex items-center gap-2 text-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to categories
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 md:py-12">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <Link
          to="/categories"
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to categories
        </Link>

        {/* Header with Category Image */}
        <div className="relative mb-8 overflow-hidden rounded-2xl md:mb-12">
          <div className="absolute inset-0">
            <img
              src={category.image}
              alt={category.name}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/60 to-transparent" />
          </div>
          <div className="relative px-6 py-12 md:px-12 md:py-16">
            <h1 className="font-display text-3xl font-bold text-background md:text-5xl">
              {category.name}
            </h1>
            <p className="mt-2 text-lg text-background/80 md:text-xl">
              {category.description}
            </p>
            <p className="mt-4 text-sm text-background/70">
              {categoryProducts.length} products available
            </p>
          </div>
        </div>

        {/* Products Grid */}
        {categoryProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-4">
            {categoryProducts.map((product, index) => (
              <div
                key={product.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="py-16 text-center">
            <p className="text-lg text-muted-foreground">
              No products available in this category yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryProducts;
