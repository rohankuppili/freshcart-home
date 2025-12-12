import React from "react";
import CategoryTile from "@/components/CategoryTile";
import { useQuery } from "@tanstack/react-query";

const API_URL = (import.meta as any).env?.VITE_API_URL || "http://localhost:4000";

const Categories: React.FC = () => {
  const { data: categories = [], isLoading, error } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/api/categories`);
      if (!res.ok) throw new Error("Failed to load categories");
      return res.json();
    },
  });

  return (
    <div className="min-h-screen py-8 md:py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8 md:mb-12">
          <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl">
            All Categories
          </h1>
          <p className="mt-2 text-muted-foreground">
            Explore our wide selection of fresh groceries
          </p>
        </div>

        {/* Modular Grid */}
        {isLoading && <p className="text-muted-foreground">Loading categories...</p>}
        {error && <p className="text-destructive">Failed to load categories</p>}
        {!isLoading && !error && (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 md:gap-6">
            {categories.map((category: any, index: number) => (
              <CategoryTile
                key={category.id}
                category={category}
                className="min-h-[200px] md:min-h-[250px] animate-fade-in"
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;
