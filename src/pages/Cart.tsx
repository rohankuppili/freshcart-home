import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ShoppingBag, CreditCard, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import CartItemComponent from "@/components/CartItem";
import { toast } from "sonner";

const Cart: React.FC = () => {
  const { items, totalPrice, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState("");
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const deliveryFee = totalPrice > 50 ? 0 : 5.99;
  const finalTotal = totalPrice + deliveryFee;

  const handleCheckout = () => {
    if (!isAuthenticated) {
      toast.error("Please sign in to checkout");
      navigate("/auth");
      return;
    }

    setIsCheckingOut(true);
    // Simulate checkout process
    setTimeout(() => {
      toast.success("Order placed successfully! 🎉");
      clearCart();
      setIsCheckingOut(false);
      navigate("/");
    }, 2000);
  };

  if (items.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
          <ShoppingBag className="h-10 w-10 text-muted-foreground" />
        </div>
        <h1 className="font-display text-2xl font-bold text-foreground">
          Your cart is empty
        </h1>
        <p className="mt-2 text-center text-muted-foreground">
          Looks like you haven't added any items yet
        </p>
        <Link to="/categories">
          <Button className="btn-gradient mt-6">Start Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 md:py-12">
      <div className="container mx-auto px-4">
        {/* Back Link */}
        <Link
          to="/categories"
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Continue shopping
        </Link>

        <h1 className="mb-8 font-display text-3xl font-bold text-foreground md:text-4xl">
          Shopping Cart
        </h1>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="space-y-4 lg:col-span-2">
            {items.map((item) => (
              <CartItemComponent key={item.product.id} item={item} />
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="glass-card sticky top-24 p-6">
              <h2 className="font-display text-xl font-semibold text-foreground">
                Order Summary
              </h2>

              {/* Promo Code */}
              <div className="mt-6">
                <div className="flex gap-2">
                  <Input
                    placeholder="Promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1"
                  />
                  <Button variant="outline">Apply</Button>
                </div>
              </div>

              {/* Summary Details */}
              <div className="mt-6 space-y-3 border-t border-border pt-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Delivery</span>
                  <span className="font-medium">
                    {deliveryFee === 0 ? (
                      <span className="text-primary">FREE</span>
                    ) : (
                      `$${deliveryFee.toFixed(2)}`
                    )}
                  </span>
                </div>
                {totalPrice < 50 && (
                  <p className="text-xs text-muted-foreground">
                    Add ${(50 - totalPrice).toFixed(2)} more for free delivery
                  </p>
                )}
              </div>

              {/* Total */}
              <div className="mt-4 flex justify-between border-t border-border pt-4">
                <span className="font-display text-lg font-semibold">Total</span>
                <span className="font-display text-lg font-bold text-foreground">
                  ${finalTotal.toFixed(2)}
                </span>
              </div>

              {/* Checkout Button */}
              <Button
                onClick={handleCheckout}
                className="btn-gradient mt-6 w-full"
                disabled={isCheckingOut}
              >
                {isCheckingOut ? (
                  "Processing..."
                ) : (
                  <>
                    <CreditCard className="mr-2 h-4 w-4" />
                    Checkout
                  </>
                )}
              </Button>

              {/* Delivery Info */}
              <div className="mt-6 flex items-center gap-3 rounded-lg bg-primary/10 p-3">
                <Truck className="h-5 w-5 text-primary" />
                <div className="text-sm">
                  <p className="font-medium text-foreground">Same Day Delivery</p>
                  <p className="text-xs text-muted-foreground">
                    Order before 2pm for same-day delivery
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
