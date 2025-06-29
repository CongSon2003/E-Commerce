const icon = [
  {
    id: 1,
    title: "Smartphone",
    image:
      "https://digital-world-2.myshopify.com/cdn/shop/t/26/assets/smartphone.png?v=117726531047959052161628340889",
  },
  {
    id: 2,
    title: "Tablet",
    image:
      "https://digital-world-2.myshopify.com/cdn/shop/t/26/assets/tablet.png?v=130474220186500652041628340891",
  },
  {
    id: 3,
    title: "Laptop",
    image:
      "https://digital-world-2.myshopify.com/cdn/shop/t/26/assets/laptop.png?v=60805008396908785021628340873",
  },
  {
    id: 4,
    title: "Camera",
    image:
      "https://digital-world-2.myshopify.com/cdn/shop/t/26/assets/camera.png?v=45506051278225345681628340856",
  },
  {
    id: 5,
    title: "Printer",
    image:
      "https://digital-world-2.myshopify.com/cdn/shop/t/26/assets/printer.png?v=23285734919403820961628340879",
  },
  {
    id: 6,
    title: "Speaker",
    image:
      "https://digital-world-2.myshopify.com/cdn/shop/t/26/assets/camera.png?v=45506051278225345681628340856",
  },
  {
    id: 7,
    title: "Accessories",
    image:
      "https://digital-world-2.myshopify.com/cdn/shop/t/26/assets/accessories.png?v=67538387381806079151628340853",
  },
  {
    id: 8,
    title: "Television",
    image:
      "https://digital-world-2.myshopify.com/cdn/shop/t/26/assets/television.png?v=181021438730403792141628340895",
  },
];
const handleDataCategory = (data) => {
  const result = [];
  if (!data || !Array.isArray(data)) {
    return result;
  }
  for (let index = 0; index < data.length; index++) {
    const element = data[index];
    const catogy = {
      id : element._id,
      title: element.title,
      image: icon.find((item) => item.title === element.title)?.image || "",
    }
    result.push(catogy);
  }
  return result;
};

export default handleDataCategory;
