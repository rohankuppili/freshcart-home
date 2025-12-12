import React from "react";
import { CartItem as CartItemType } from "@/types";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";

interface CartItemProps {
  item: CartItemType;
}

const CartItemComponent: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity } = item;

  return (
    <div className="glass-card flex gap-4 p-4 animate-fade-in">
      {/* Image */}
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-secondary/30">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-display font-medium text-foreground">
              {product.name}
            </h3>
            <p className="text-sm text-muted-foreground">
              ${product.price.toFixed(2)} / {product.unit}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-destructive"
            onClick={() => removeFromCart(product.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>

        {/* Quantity Controls */}
        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => updateQuantity(product.id, quantity - 1)}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-8 text-center font-medium">{quantity}</span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => updateQuantity(product.id, quantity + 1)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <span className="font-bold text-foreground">
            ${(product.price * quantity).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartItemComponent;
