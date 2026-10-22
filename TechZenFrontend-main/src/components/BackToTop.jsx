import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const fn = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", fn, { passive: true });
    fn();
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return <button className={`back-top ${visible ? "visible":""}`} onClick={()=>window.scrollTo({top:0,behavior:"smooth"})} aria-label="Back to top"><ArrowUp size={18}/></button>;
}