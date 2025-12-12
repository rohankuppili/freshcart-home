import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

const API_URL = (import.meta as any).env?.VITE_API_URL || "http://localhost:4000";

interface PlanMealDialogProps {
  trigger?: React.ReactNode;
}

const PlanMealDialog: React.FC<PlanMealDialogProps> = ({ trigger }) => {
  const [open, setOpen] = useState(false);
  const [dish, setDish] = useState("");
  const [servings, setServings] = useState<number>(2);
  const [appetite, setAppetite] = useState<string>("normal");
  const { addToCart } = useCart();

  const planMutation = useMutation({
    mutationKey: ["plan-meal"],
    mutationFn: async () => {
      const res = await fetch(`${API_URL}/api/ai/plan-meal`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dish, servings, appetite })
      });
      if (!res.ok) {
        const msg = await res.text().catch(() => "");
        throw new Error(msg || "AI planning failed");
      }
      return res.json();
    },
    onSuccess: async (data) => {
      try {
        const items: Array<{ productId: string; quantity: number }> = data?.items || [];
        if (!items.length) {
          toast.info("No matching items were found for this dish.");
          return;
        }
        // Fetch each product and add to cart in the requested quantity
        for (const it of items) {
          const resp = await fetch(`${API_URL}/api/products/${it.productId}`);
          if (!resp.ok) {
            console.warn("Product not found", it.productId);
            continue;
          }
          const product = await resp.json();
          // Add multiple times to reach desired quantity
          for (let i = 0; i < Math.max(1, it.quantity || 1); i++) {
            addToCart(product);
          }
        }
        toast.success("Items added to cart");
        setOpen(false);
      } catch (e) {
        console.error(e);
        toast.error("Failed to add items to cart");
      }
    },
    onError: (err: any) => {
      console.error(err);
      toast.error(typeof err?.message === "string" ? err.message : "AI planning failed");
    }
  });

  const canSubmit = dish.trim().length > 0 && servings > 0;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="btn-accent">Plan with AI</Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Plan a dish with AI</DialogTitle>
          <DialogDescription>
            Tell Gemini your dish and serving preferences. We’ll select matching items and add them to your cart.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="dish" className="text-right">Dish</Label>
            <Input id="dish" className="col-span-3" placeholder="Paneer butter masala" value={dish} onChange={(e) => setDish(e.target.value)} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="servings" className="text-right">Servings</Label>
            <Input id="servings" type="number" min={1} className="col-span-3" value={servings} onChange={(e) => setServings(parseInt(e.target.value || "1", 10))} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Appetite</Label>
            <div className="col-span-3">
              <Select value={appetite} onValueChange={setAppetite}>
                <SelectTrigger className="w-full"><SelectValue placeholder="normal" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="heavy">Heavy</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button className="btn-gradient" disabled={!canSubmit || planMutation.isPending} onClick={() => planMutation.mutate()}>
            {planMutation.isPending ? "Planning..." : "Add to Cart"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PlanMealDialog;
