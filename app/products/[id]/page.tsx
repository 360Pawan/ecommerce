import { Product } from "@/app/types";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface PageProps {
  params: { id: string };
}

async function getProduct(id: string) {
  const res = await fetch(`https://dummyjson.com/products/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const ProductPage = async ({ params }: PageProps) => {
  const product: Product = await getProduct(params.id);

  console.log(product);

  return (
    <section className="text-gray-700 body-font overflow-hidden bg-white">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <Image
            alt={product.title}
            className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
            src={product.thumbnail}
            width={500}
            height={500}
          />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              {product.brand}
            </h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              {product.title}
            </h1>
            <div className="flex mb-4">
              <span className="flex items-center">
                {Array.from({ length: Math.round(product.rating) }).map(
                  (_, index) => (
                    <svg
                      key={index}
                      fill="currentColor"
                      stroke="currentColor"
                      strokeLinecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      className="w-4 h-4 text-red-500"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                  )
                )}
              </span>
            </div>
            <p className="leading-relaxed">{product.description}</p>
            <div className="flex mt-6 items-center pt-5 border-t-2 border-gray-200 mb-5">
              <span className="title-font font-medium text-2xl text-gray-900">
                ${product.price}
              </span>
              <Button className="flex ml-auto">Add to cart</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductPage;
