import React from "react";
import { Link } from "react-router-dom";
import { Category } from "@/types";
import { cn } from "@/lib/utils";
import { recordCategoryUsage } from "@/lib/usage";

const PLACEHOLDER = (import.meta as any).env?.VITE_PLACEHOLDER_IMAGE || "/placeholder.svg";

interface CategoryTileProps {
  category: Category;
  className?: string;
  style?: React.CSSProperties;
}

const CategoryTile: React.FC<CategoryTileProps> = ({ category, className, style }) => {
  return (
    <Link
      to={`/category/${category.id}`}
      className={cn(
        "group relative overflow-hidden rounded-2xl",
        "transition-all duration-500 ease-out",
        "hover:scale-[1.02] hover:shadow-2xl",
        className
      )}
      style={style}
      onClick={() => recordCategoryUsage(category.id, 1)}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={category.image || PLACEHOLDER}
          alt={category.name}
          onError={(e) => {
            const target = e.currentTarget as HTMLImageElement
            if (target.src.indexOf(PLACEHOLDER) === -1) {
              target.src = PLACEHOLDER
            }
          }}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
      </div>

      {/* Glass Card Overlay */}
      <div className="glass-card absolute inset-x-4 bottom-4 p-4 transition-all duration-300 group-hover:inset-x-3 group-hover:bottom-3">
        <h3 className="font-display text-xl font-semibold text-foreground">
          {category.name}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          {category.description}
        </p>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-xs font-medium text-primary">
            {category.productCount} products
          </span>
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </div>
      </div>
    </Link>
  );
};

export default CategoryTile;
