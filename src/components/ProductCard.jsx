import React from 'react'
import styled from 'styled-components';
import { Button } from './comp.index';

const Card = styled.div`
    height: 350px;
    width: 200px;
    padding: 1rem;
    margin: 2rem;

    div {
        display: flex;
        flex-direction: row;
        justify-content: space-between;    
    }

    p {
        margin-top: 0;
    }
`

function ProductCard({
    src, title, price, 
    description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, voluptas."
}) {
    
  return (
      <>
          <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:h-80">
              <img
                  src={src}
                  alt={title}
                  className="h-full w-full  lg:h-full lg:w-full"
              />
          </div>
          <div className="mt-4 flex justify-between">
              <div>
                  <h3 className="text-sm font-semibold text-gray-700">
                      <a href={""}>
                          <span aria-hidden="true" className="absolute inset-0" />
                          {title}
                      </a>
                  </h3>
                  <p className="mt-1 text-base text-gray-500">
                    {description.length > 50? description.substring(0,51)+"..." : description }
                  </p>
              </div>
              <p className="text-sm font-medium text-gray-900">${price}</p>
          </div>
            <Button className='mt-2 bg-black text-white rounded-md'>Add to Cart</Button>
      </>
  )
}

export default ProductCard