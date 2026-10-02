import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { BookPage } from "./pages/BookPage";
import { LocationsPage } from "./pages/LocationsPage";
import { AboutPage } from "./pages/AboutPage";
import { AwardsPage } from "./pages/AwardsPage";
import { CmsPage } from "./pages/CmsPage";
import { ContactPage } from "./pages/ContactPage";
import { DermHubPage } from "./pages/dermatology/DermHubPage";
import { DermLayout } from "./pages/dermatology/DermLayout";
import { DermStoriesPage } from "./pages/dermatology/DermStoriesPage";
import { DermTopicPage } from "./pages/dermatology/DermTopicPage";
import { ProcessPage } from "./pages/ProcessPage";
import { SiteMapPage } from "./pages/SiteMapPage";

const baseUrl = import.meta.env.BASE_URL;
const basename = baseUrl === "/" ? undefined : baseUrl.replace(/\/$/, "");

export default function App() {
  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route element={<Layout />} path="/">
          <Route element={<HomePage />} index />
          <Route element={<BookPage />} path="book" />
          <Route element={<LocationsPage />} path="locations" />
          <Route element={<AboutPage />} path="about" />
          <Route element={<AwardsPage />} path="about-us/awards" />
          <Route element={<ContactPage />} path="contact" />
          <Route element={<ProcessPage />} path="process" />
          <Route element={<DermLayout />} path="dermatology">
            <Route element={<DermHubPage />} index />
            <Route element={<DermTopicPage slug="vhi" />} path="process-vhi" />
            <Route element={<DermTopicPage slug="process" />} path="process" />
            <Route element={<DermTopicPage slug="gp" />} path="gp-referral" />
            <Route element={<DermTopicPage slug="surgery" />} path="surgery" />
            <Route element={<DermTopicPage slug="anaesthetic" />} path="surgery/anaesthetic" />
            <Route element={<DermTopicPage slug="skin" />} path="skin" />
            <Route element={<DermTopicPage slug="telederm" />} path="teledermatology" />
            <Route element={<DermStoriesPage />} path="case-studies" />
            <Route element={<Navigate replace to="/book?path=vhi" />} path="vhi-member-booking-platform" />
            <Route element={<Navigate replace to="/book" />} path="app-request" />
            <Route element={<Navigate replace to="/dermatology/surgery" />} path="surgery-vhi" />
            <Route element={<CmsPage />} path="*" />
          </Route>
          <Route element={<SiteMapPage />} path="site-map" />
          <Route element={<CmsPage />} path="*" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
