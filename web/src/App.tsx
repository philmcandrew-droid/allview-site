import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { BookPage } from "./pages/BookPage";
import { LocationsPage } from "./pages/LocationsPage";
import { AboutPage, ContactPage, NotFoundPage, ProcessPage } from "./pages/InfoPages";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />} path="/">
          <Route element={<HomePage />} index />
          <Route element={<BookPage />} path="book" />
          <Route element={<LocationsPage />} path="locations" />
          <Route element={<AboutPage />} path="about" />
          <Route element={<ContactPage />} path="contact" />
          <Route element={<ProcessPage />} path="process" />
          <Route element={<NotFoundPage />} path="*" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
