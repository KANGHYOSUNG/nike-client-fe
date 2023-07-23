import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Route, Routes, } from "react-router-dom";
import Pages from "pages";

export default function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Pages.MainPage />} />
        <Route path="/menu" element={<Pages.MenuPage />} />
        <Route path="/price" element={<Pages.PricePage />} />

        {/* type : QR/print/embroidery/laser  */}
        <Route path="/QR" element={<Pages.QrPage />} />
        <Route path="/:type/item" element={<Pages.SelectItemPage />} />
        <Route path="/:type/color" element={<Pages.SelectColorPage />} />
        <Route path="/:type/size" element={<Pages.SelectSizePage />} />
        <Route path="/:type/custom" element={<Pages.CustomPage />} />
        <Route path="/:type/drawing" element={<Pages.DrawingPage />} />
        <Route path="/:type/design" element={<Pages.DesignPage />} />
        <Route path="/laser/menu" element={<Pages.LaserMenuPage />} />

        
        <Route path="/:type/drawfinish" element={<Pages.DrawingFinishPage />} />
        <Route path="/:type/laserfinish" element={<Pages.LaserFinishPage />} />
        <Route path="/:type/finish" element={<Pages.FinishPage />} />
        <Route path="/:type/orderDetail" element={<Pages.OrderDetailPage />} />

        <Route path="/privacy" element={<Pages.PrivacyPage />} />
        <Route path="/agreement" element={<Pages.AgreementPage />} />
      </Routes>
    </>
  );
}
