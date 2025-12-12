import React from "react";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Plus, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { recordCategoryUsage } from "@/lib/usage";

const PLACEHOLDER = (import.meta as any).env?.VITE_PLACEHOLDER_IMAGE || "/placeholder.svg";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { items, addToCart } = useCart();
  const isInCart = items.some((item) => item.product.id === product.id);
  const cartItem = items.find((item) => item.product.id === product.id);

  return (
    <div className="glass-card-hover group flex flex-col overflow-hidden">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-secondary/30">
        <img
          src={product.image || PLACEHOLDER}
          alt={product.name}
          onError={(e) => {
            const target = e.currentTarget as HTMLImageElement
            if (target.src.indexOf(PLACEHOLDER) === -1) {
              target.src = PLACEHOLDER
            }
          }}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {!product.inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80">
            <span className="rounded-full bg-muted px-3 py-1 text-sm font-medium text-muted-foreground">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-display text-lg font-medium text-foreground line-clamp-1">
          {product.name}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </p>
        
        <div className="mt-auto pt-4">
          <div className="flex items-end justify-between">
            <div>
              <span className="text-2xl font-bold text-foreground">
                ${product.price.toFixed(2)}
              </span>
              <span className="ml-1 text-sm text-muted-foreground">
                / {product.unit}
              </span>
            </div>
            
            <Button
              onClick={() => {
                addToCart(product);
                // Boost category usage when items are shopped
                if (product.category) recordCategoryUsage(product.category, 3);
              }}
              disabled={!product.inStock}
              size="sm"
              className={cn(
                "transition-all duration-300",
                isInCart 
                  ? "btn-accent" 
                  : "btn-gradient"
              )}
            >
              {isInCart ? (
                <>
                  <Check className="mr-1 h-4 w-4" />
                  {cartItem?.quantity}
                </>
              ) : (
                <>
                  <Plus className="mr-1 h-4 w-4" />
                  Add
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
