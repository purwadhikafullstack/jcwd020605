import NavbarHome from "../components/navbarHome";
import Filter from "../components/filter";
import Slideshow from "../components/slideShow";
import BannerPromo from "../components/bannerPromo";
import ProductSuggest from "../components/productSuggest";
import FooterLandingPage from "../components/footerLandingPage";
import FilterDekstop from "../components/filterDekstop";
import { Box } from "@chakra-ui/react";

export default function LandingPages() {
  return (
    <>
      <Box>
        <NavbarHome />
        <Slideshow />
        <FilterDekstop />
        <BannerPromo />
        <ProductSuggest />
        <FooterLandingPage />
      </Box>
    </>
  );
}
