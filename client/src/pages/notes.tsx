import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Footer from "@/components/footer";
import { useNavigate } from "react-router-dom";
import AddCartIcon from "../components/AddCartIcon";
import { useCart } from "@/context/CartContext";  // Note: capitalization fix
import { Link } from "react-router-dom";

export default function Notes() {
  const navigate = useNavigate();
  const { addToCart } = useCart();

const fullStackProduct = {
  id: "1",
  title: "Full Stack Development Notes",
  price: 39,
  image: "images/webdnote.png",
  pdf: "/attached_assets/demo-note-dsa-Notes.pdf",  // ✅ PDF path added
};

const dsaProduct = {
  id: "2",
  title: "Data Structures & Algorithms Notes",
  price: 29,
  image: "images/DSA.png",
  pdf: "https://drive.google.com/file/d/1oHAK1RUtG1yzz9EqSVWpLV19opK4K8SS/preview",  // ✅ PDF path
};

const sqlProduct = {
  id: "3",
  title: "Structured Query Language Notes",
  price: 19,
  image: "images/SQL.png",
  pdf: "https://drive.google.com/file/d/1kVNl_mfmNFgg0l4RjJ3qSTPxDb_BYYKT/preview",  // ✅ PDF path
};

  return (
    <main className="container mx-auto px-4 py-8">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">📒 Handwritten Study Notes</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          High-quality study materials created by experts to help you learn better and faster.
        </p>
      </section>

      <div className="grid md:grid-cols-3 gap-10 px-4 md:px-10">

        {/* Note Card 1 - Full Stack */}
<Card className="group relative hover:shadow-xl transition-all rounded-xl overflow-hidden">
  <AddCartIcon onClick={() => {
    addToCart(fullStackProduct);
    alert("Added Full Stack Notes to cart!"); 
  }} />

  <CardContent className="p-0">
    <div className="aspect-[3/4] relative">
      <img
        src={fullStackProduct.image}
        alt={fullStackProduct.title}
        className="h-full w-full object-cover group-hover:scale-105 transition-transform"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
        <h3 className="text-xl font-semibold text-white">{fullStackProduct.title}</h3>
        <span className="text-sm text-white/70">150 pages</span>
      </div>
    </div>
    <div className="p-4 flex justify-between items-center">
      <Link to="https://payments.cashfree.com/forms/MERN-Notes" target="_blank">
        <Button size="sm" className="text-sm font-semibold">Buy ₹{fullStackProduct.price}</Button>
      </Link>
      <div className="text-sm text-muted-foreground line-through -ml-20">₹499</div>
      <Button
        size="sm"
        variant="outline"
        onClick={() => window.open("/notes/demo-note/webdev", "_blank")}
      >
        Demo Notes
      </Button>
    </div>
  </CardContent>
</Card>

{/* Note Card 2 - DSA */}
<Card className="group relative hover:shadow-xl transition-all rounded-xl overflow-hidden">
  <AddCartIcon onClick={() => {
    addToCart(dsaProduct);
    alert("Added DSA Notes to cart!");
  }} />

  <CardContent className="p-0">
    <div className="aspect-[3/4] relative">
      <img
        src={dsaProduct.image}
        alt={dsaProduct.title}
        className="h-full w-full object-cover group-hover:scale-105 transition-transform"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
        <h3 className="text-xl font-semibold text-white">{dsaProduct.title}</h3>
        <span className="text-sm text-white/70">110 pages</span>
      </div>
    </div>
    <div className="p-4 flex justify-between items-center">
      <Link to="https://payments.cashfree.com/forms?code=DSA-Notes" target="_blank">
        <Button size="sm" className="text-sm font-semibold">Buy ₹{dsaProduct.price}</Button>
      </Link>
      <div className="text-sm text-muted-foreground line-through -ml-20">₹449</div>
      <Button
        size="sm"
        variant="outline"
        onClick={() => window.open("/notes/demo-note/dsa", "_blank")}
      >
        Demo Notes
      </Button>
    </div>
  </CardContent>
</Card>

{/* Note Card 3 - SQL */}
<Card className="group relative hover:shadow-xl transition-all rounded-xl overflow-hidden">
  <AddCartIcon onClick={() => {
    addToCart(sqlProduct);
    alert("Added SQL Notes to cart!");
  }} />

  <CardContent className="p-0">
    <div className="aspect-[3/4] relative">
      <img
        src={sqlProduct.image}
        alt={sqlProduct.title}
        className="h-full w-full object-cover group-hover:scale-105 transition-transform"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
        <h3 className="text-xl font-semibold text-white">{sqlProduct.title}</h3>
        <span className="text-sm text-white/70">50 pages</span>
      </div>
    </div>
    <div className="p-4 flex justify-between items-center">
      <Link to="https://payments.cashfree.com/forms/SQL-Notes" target="_blank">
        <Button size="sm" className="text-sm font-semibold">Buy ₹{sqlProduct.price}</Button>
      </Link>
      <div className="text-sm text-muted-foreground line-through -ml-20">₹399</div>
      <Button
        size="sm"
        variant="outline"
        onClick={() => window.open("/notes/demo-note/sql", "_blank")}
      >
        Demo Notes
      </Button>
    </div>
  </CardContent>
</Card>

      </div>

      <section className="mt-20 text-center">
        <h2 className="text-3xl font-bold mb-4">Why Choose Our Notes?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-12">
          Notes tayar ki gayi hain experts ke dwara — handwritten, diagrams ke sath, aur interview crack karne ke liye perfect!
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="p-6 text-center hover:shadow-lg transition">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-xl font-semibold mb-2">Expert-Created Content</h3>
            <p className="text-muted-foreground">Har note experts dwara banaya gaya hai — clear, precise aur reliable content ke sath.</p>
          </Card>
          <Card className="p-6 text-center hover:shadow-lg transition">
            <div className="text-4xl mb-4">🧠</div>
            <h3 className="text-xl font-semibold mb-2">Visually Rich & Organized</h3>
            <p className="text-muted-foreground">Khoobsurat handwritten format mein — diagrams aur summary ke sath jo yaad rakhne mein madad karein.</p>
          </Card>
          <Card className="p-6 text-center hover:shadow-lg transition">
            <div className="text-4xl mb-4">⏳</div>
            <h3 className="text-xl font-semibold mb-2">Instant Lifetime Access</h3>
            <p className="text-muted-foreground">Ek baar kharidiye aur hamesha ke liye download kijiye — kabhi bhi, kahin bhi.</p>
          </Card>
        </div>
      </section>

      <Footer />
    </main>
  );
}
