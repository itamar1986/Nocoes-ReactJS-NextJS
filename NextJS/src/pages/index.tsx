import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { Title } from '@/styles/pages/Home';
import React from 'react';
import SEO from '@/components/SEO';
import { client } from '@/lib/prismic';
import Prismic from 'prismic-javascript';
import PrismicDOM from 'prismic-dom';
import { Document } from 'prismic-javascript/types/documents';

/*interface IProduct {
  id: string;
  title: string;
}*/

interface HomeProps {
  //recommendedProducts: IProduct[];
  recommendedProducts: Document[];
}

export default function Home( { recommendedProducts }:HomeProps) {
  return (
    <div>
      <SEO
        title="DevCommerce, your best e-commerce!" 
        image="boost.png"
        shouldExcludeTitleSuffix 
      />

      <section>
        <Title>Products</Title>

        <ul>
          {recommendedProducts.map(recommendedProduct => {
            return (
              <li key={recommendedProduct.id}>
                <Link href={`/catalog/products/${recommendedProduct.uid}`}>
                  <a>
                    {PrismicDOM.RichText.asText(recommendedProduct.data.title)}
                    </a>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  /*const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recommended`);
  const recommendedProducts = await response.json();*/

  const recommendedProducts = await client().query([
    Prismic.Predicates.at('document.type', 'product')
  ]);

  console.log(recommendedProducts.results[0].data.title);

  return {
    props: {
      recommendedProducts: recommendedProducts.results,
    }
  }
}