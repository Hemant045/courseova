import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import AddCartIcon from "../components/AddCartIcon"; 
import {
  Star,
  PlayCircle,
  Layers,
  GraduationCap,
  CheckCircle2,
} from "lucide-react";
import { useCart } from "../context/CartContext"; // assuming this is your cart hook

export default function CourseList() {
  const { addToCart } = useCart();

  const products = {
    fullStack: {
      id: "course-fullstack",
      title: "Full Stack MERN Development",
      price: 199,
      image: "images/MERN.webp",
    },
    dsa: {
      id: "course-dsa",
      title: "Data Structures & Algorithms",
      price: 199,
      image: "images/commingsoon.jpg",
    },
    android: {
      id: "course-android",
      title: "Android App Development",
      price: 199,
      image: "images/commingsoon.jpg",
    },
  };

  return (
    <section>
      {/* Header Section */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 py-16 border-y">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-primary font-medium">LEARN WITH COURSEOVA</span>
            <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
              Premium Courses to Advance Your Career
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of students who have transformed their careers with our industry-ready courses
            </p>
          </div>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="container mx-auto px-4 py-16">
        <div className="overflow-x-auto mb-12">
          <div className="flex space-x-2 min-w-max p-1 mb-8 border rounded-lg bg-muted/20 justify-center mx-auto max-w-xl">
            <Button variant="ghost" className="rounded-md font-medium px-6 py-2 bg-background shadow">All Courses</Button>
            <Button variant="ghost" className="rounded-md font-medium px-6 py-2">Fullstack Development</Button>
            <Button variant="ghost" className="rounded-md font-medium px-6 py-2">Data Structures</Button>
            <Button variant="ghost" className="rounded-md font-medium px-6 py-2">Android App Development</Button>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {/* ===== Course Card 1: Full Stack ===== */}
          <Card className="group relative hover:shadow-xl transition-all rounded-xl overflow-hidden">
            <AddCartIcon
              onClick={() => {
                addToCart(products.fullStack);
                alert("Added Full Stack MERN Development to cart!");
              }}
            />
            <div className="relative">
              <img src={products.fullStack.image} alt={products.fullStack.title} className="w-full aspect-video object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>

            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{products.fullStack.title}</h3>
              <p className="text-muted-foreground mb-4 line-clamp-2">
                Learn to build full-stack web apps using MongoDB, Express, React, and Node.js.
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                <Tag icon={<PlayCircle />} label="40+ lectures" />
                <Tag icon={<Layers />} label="15+ projects" />
                <Tag icon={<GraduationCap />} label="Beginner" />
              </div>

              {/* Highlights */}
              <Highlights features={["Complete Course Material", "Lifetime Access", "Certificate"]} />

              <CourseFooter rating="120+" price={products.fullStack.price} link="/courses/web-development" />
            </div>
          </Card>

          {/* ===== Course Card 2: DSA ===== */}
          <Card className="group relative hover:shadow-xl transition-all rounded-xl overflow-hidden">
            <AddCartIcon
              onClick={() => {
                addToCart(products.dsa);
                alert("Added Data Structures & Algorithms to cart!");
              }}
            />
            <div className="relative">
              <img src={products.dsa.image} alt={products.dsa.title} className="w-full aspect-video object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>

            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{products.dsa.title}</h3>
              <p className="text-muted-foreground mb-4 line-clamp-2">
                Master DSA fundamentals for coding interviews and competitions.
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                <Tag icon={<PlayCircle />} label="50+ lectures" />
                <Tag icon={<Layers />} label="20+ problems" />
                <Tag icon={<GraduationCap />} label="Intermediate" />
              </div>

              <Highlights features={["Practice Sets", "Lifetime Access", "Certificate"]} />

              <CourseFooter rating="90+" price={products.dsa.price} link="/courses/data-structures" />
            </div>
          </Card>

          {/* ===== Course Card 3: Android ===== */}
          <Card className="group relative hover:shadow-xl transition-all rounded-xl overflow-hidden">
            <AddCartIcon
              onClick={() => {
                addToCart(products.android);
                alert("Added Android App Development to cart!");
              }}
            />
            <div className="relative">
              <img src={products.android.image} alt={products.android.title} className="w-full aspect-video object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>

            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{products.android.title}</h3>
              <p className="text-muted-foreground mb-4 line-clamp-2">
                Learn to build modern Android apps using Kotlin and Jetpack Compose.
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                <Tag icon={<PlayCircle />} label="35+ lectures" />
                <Tag icon={<Layers />} label="12+ projects" />
                <Tag icon={<GraduationCap />} label="Beginner" />
              </div>

              <Highlights features={["Hands-on Projects", "Lifetime Access", "Certificate"]} />

              <CourseFooter rating="100+" price={products.android.price} link="/courses/android-dev" />
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}

// Helper components
function Tag({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-1 bg-muted/30 px-3 py-1 rounded-full text-sm">
      {icon}
      <span>{label}</span>
    </div>
  );
}

function Highlights({ features }: { features: string[] }) {
  return (
    <div className="space-y-2 mb-6">
      {features.map((feature, index) => (
        <div className="flex items-center gap-2" key={index}>
          <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
          <span className="text-sm">{feature}</span>
        </div>
      ))}
    </div>
  );
}

function CourseFooter({ rating, price, link }: { rating: string; price: number; link: string }) {
  return (
    <div className="flex items-center justify-between mt-auto">
      <div>
        <div className="flex items-center gap-1 mb-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          ))}
          <span className="text-sm text-muted-foreground ml-1">({rating} reviews)</span>
        </div>
        <p className="text-2xl font-bold">₹{price}<span className="text-sm text-muted-foreground line-through ml-2">₹2999</span></p>
      </div>

      <Button className="h-10" asChild>
        <Link to={link}>View Course</Link>
      </Button>
    </div>
  );
}
