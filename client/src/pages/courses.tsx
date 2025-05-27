import CourseList from "@/components/course-list";
import Footer from "@/components/footer";

export default function Courses() {
  return (
    <>
      <main className="container mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold mb-8 text-center">Explore Our Courses</h1>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          Dive into expert-led courses tailored to boost your skills in Web Development, Data Structures, and more.
        </p>

        <CourseList />
      </main>
      <Footer />
    </>
  );
}
