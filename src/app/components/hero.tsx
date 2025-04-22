"use client";
import React from "react";
import { HeroParallax } from "../components/ui/hero-parallax";

const products = [
  {
    title: "I Stopped Using Kubernetes",
    link: "https://medium.com/stackademic/i-stopped-using-kubernetes-our-devops-team-is-happier-than-ever-a5519f916ec0",
    thumbnail:
      "https://miro.medium.com/v2/resize:fit:1100/format:webp/1*t5dwn8IabnCdEpoO-6Toog.png",
  },
  {
    title: "System Design For Beginners: @shivambhadani_",
    link: "https://medium.com/@shivambhadani_/system-design-for-beginners-everything-you-need-in-one-article-c74eb702540b",
    thumbnail:
      "https://miro.medium.com/v2/resize:fit:1100/format:webp/1*NZqp4-jhGa1ZY_-HX95reQ.png",
  },
  {
    title: "AWS",
    link: "https://medium.com/@shivambhadani_/aws-part-1-introduction-to-cloud-and-ec2-f06cdc80a1fc",
    thumbnail:
      "https://miro.medium.com/v2/resize:fit:1100/format:webp/1*-j67_EIOJ7EE3qAoC3WqZA.png",
  },
  {
    title: "Zomato Interview Experience for SDE 1 : @shivambhadani_",
    link: "https://medium.com/@shivambhadani_/zomato-interview-experience-for-sde-1-c0eed08e9d57",
    thumbnail:
      "https://miro.medium.com/v2/resize:fit:1100/format:webp/1*Cq_JznDWgUC9tZT-5qpwrA.png",
  },

  {
    title: "Editrix AI",
    link: "",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/editrix.png",
  },
  {
    title: "Pixel Perfect",
    link: "",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/pixelperfect.png",
  },
  {
    title: "SQLite ",
    link: "https://medium.com/@mendes.develop/quick-comparison-of-two-powerfull-frameworks-for-sqlite-when-creating-tables-active-record-and-af286d9c7906",
    thumbnail:
      "https://miro.medium.com/v2/resize:fit:1100/format:webp/1*EXCUSOPPN7A9i6NCEtLNtA.png",
  },
  {
    title: "Joining tables in MongoDB with Mongoose",
    link: "https://medium.com/@mendes.develop/joining-tables-in-mongodb-with-mongoose-489d72c84b60",
    thumbnail:
      "https://miro.medium.com/v2/resize:fit:1100/format:webp/1*CZWfLjbKwAeZDiDoxx_IGw.png",
  },
  {
    title: "Introducing Hooks",
    link: "https://medium.com/@mendes.develop/introducing-hooks-and-adding-state-to-function-components-6f8e291a348b",
    thumbnail:
      "https://miro.medium.com/v2/resize:fit:1100/format:webp/0*5cm9C1p2-PV2LL0D.png",
  },
  {
    title: "SmartBridge",
    link: "",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/smartbridge.png",
  },
  {
    title: "Renderwork Studio",
    link: "",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/renderwork.png",
  },
  {
    title: "Creme Digital",
    link: "",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/cremedigital.png",
  },
  {
    title: "Golden Bells Academy",
    link: "",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/goldenbellsacademy.png",
  },
  {
    title: "Invoker Labs",
    link: "",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/invoker.png",
  },
  {
    title: "E Free Invoice",
    link: "",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/efreeinvoice.png",
  },
];

export default function HeroParallaxDemo() {
  return <HeroParallax products={products} />;
}
