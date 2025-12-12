import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Leaf, Truck, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import CategoryTile from "@/components/CategoryTile";
import { categories } from "@/data/mockData";

const Index: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient relative overflow-hidden py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="animate-fade-in font-display text-4xl font-bold leading-tight text-foreground md:text-6xl">
              Fresh Groceries,{" "}
              <span className="gradient-text">Delivered Fresh</span>
            </h1>
            <p className="mt-6 animate-fade-in text-lg text-muted-foreground [animation-delay:100ms] md:text-xl">
              Shop from thousands of organic and locally sourced products. 
              Quality ingredients for your kitchen, delivered to your door.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link to="/categories">
                <Button size="lg" className="btn-gradient animate-fade-in [animation-delay:200ms]">
                  Start Shopping
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/auth">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="animate-fade-in [animation-delay:300ms]"
                >
                  Create Account
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="pointer-events-none absolute -right-20 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 top-1/4 h-48 w-48 rounded-full bg-accent/10 blur-3xl" />
      </section>

      {/* Features */}
      <section className="border-y border-border bg-card py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="flex items-center gap-4 animate-fade-in">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Leaf className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-foreground">100% Organic</h3>
                <p className="text-sm text-muted-foreground">Certified organic products</p>
              </div>
            </div>
            <div className="flex items-center gap-4 animate-fade-in [animation-delay:100ms]">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Truck className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-foreground">Fast Delivery</h3>
                <p className="text-sm text-muted-foreground">Same-day delivery available</p>
              </div>
            </div>
            <div className="flex items-center gap-4 animate-fade-in [animation-delay:200ms]">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Shield className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-foreground">Quality Guarantee</h3>
                <p className="text-sm text-muted-foreground">Freshness guaranteed</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
                Shop by Category
              </h2>
              <p className="mt-2 text-muted-foreground">
                Browse our wide selection of fresh groceries
              </p>
            </div>
            <Link
              to="/categories"
              className="hidden items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80 md:flex"
            >
              View All
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Modular Grid - Using CSS Grid with different spans */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {categories.slice(0, 6).map((category, index) => (
              <CategoryTile
                key={category.id}
                category={category}
                className={
                  index === 0
                    ? "col-span-2 row-span-2 min-h-[300px] md:min-h-[400px]"
                    : "min-h-[180px] md:min-h-[200px]"
                }
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              />
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link to="/categories">
              <Button variant="outline">
                View All Categories
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl font-bold text-primary-foreground md:text-4xl">
            Ready to Start Shopping?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-primary-foreground/80">
            Join thousands of happy customers who trust FreshMart for their grocery needs.
          </p>
          <Link to="/auth">
            <Button size="lg" className="btn-accent mt-8">
              Sign Up Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <span className="text-sm">🥬</span>
              </div>
              <span className="font-display font-bold text-foreground">FreshMart</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 FreshMart. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
