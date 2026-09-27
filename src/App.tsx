import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { ScrollToTop } from "./components/ScrollToTop";
import { Home } from "./pages/Home";

// Home loads with the site; every other page is its own file, fetched only when a visitor
// opens it. Saves mobile data for the many visitors who only ever see Home.
const Story = lazy(() => import("./pages/Story").then((module) => ({ default: module.Story })));
const Projects = lazy(() => import("./pages/Projects").then((module) => ({ default: module.Projects })));
const About = lazy(() => import("./pages/About").then((module) => ({ default: module.About })));
const NotFound = lazy(() => import("./pages/NotFound").then((module) => ({ default: module.NotFound })));
const Contact = lazy(() => import("./pages/Contact").then((module) => ({ default: module.Contact })));

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">
          <Suspense fallback={<div className="min-h-[100svh]" />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/story" element={<Story />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
