import React from "react";
import CategoryTile from "@/components/CategoryTile";
import { categories } from "@/data/mockData";

const Categories: React.FC = () => {
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
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 md:gap-6">
          {categories.map((category, index) => (
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
      </div>
    </div>
  );
};

export default Categories;
