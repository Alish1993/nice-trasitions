import React from 'react';
import './../styles/MainPage.css';
import image1 from './../assets/600x600bb.jpg';
import image2 from './../assets/de587a945dddbf1daaf18523b9055f7a.jpg';
import image3 from './../assets/ffeaa8c83b1604854930.webp';
import image4 from './../assets/i (2).webp';
import image5 from './../assets/landscape-minimal-panaromic-8k-97-1680x1050.jpg';
import image6 from './../assets/m1000x1000.jpeg';

export default function MainPage() {


    
  return (
    <div className="image-gallery">
      <img src={image1} alt="Image 1" />
      <img src={image2} alt="Image 2" />
      <img src={image3} alt="Image 3" />
      <img src={image4} alt="Image 4" />
      <img src={image5} alt="Image 5" />
      <img src={image6} alt="Image 6" />
    </div>
  );
}
