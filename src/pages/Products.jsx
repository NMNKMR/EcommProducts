import React, { useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import {ProductCard, Pagination, Select, Filters} from '../components/comp.index';
import styled from 'styled-components';
import {FaFilter} from 'react-icons/fa6';

const PaginationDiv = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;    
`
const SortNFilterDiv = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`
const HorizRule = styled.hr`
    width: 100%;
    margin-top: 1rem;
`
const pageSize = 8;
function Products() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState(false);
    const [sortOption, setSortOption] = useState("");
    const [showFilters, setShowFilters] = useState(false);
    
    const {firstPageIndex, lastPageIndex} = useMemo(()=> {
        return {firstPageIndex: (currentPage - 1) * pageSize, lastPageIndex: (currentPage * pageSize)}
    }, [currentPage])

    useEffect(()=> {
        ;(async ()=> {
            try {
                setLoader(true);
                setError(false);
                const response = await axios.get('https://dummyjson.com/products?limit=100');
                const productsData = response.data.products;
                if(productsData && productsData.length > 0) {
                    setProducts(productsData)
                    setFilteredProducts(productsData);
                };
            } catch (error) {
                setError(true);
            } finally {
                setLoader(false);
            }
        })()
    }, [])

    useEffect(()=> {
        if(sortOption === "Price: Low to High") {
            setFilteredProducts((prev) => prev.slice().sort((a,b)=> a.price - b.price));
        } else if(sortOption === "Price: High to Low"){
            setFilteredProducts((prev)=> prev.slice().sort((a,b)=> b.price - a.price));
        }
    }, [sortOption])

    const applyFilters = (selectedPriceRange, selectedCategories)=> {
        const filtered = products.filter(item => {
            const priceInRange = selectedPriceRange.length === 0 || selectedPriceRange.includes(getPriceRange(item.price));
            const categoryIncluded = selectedCategories.length === 0 || selectedCategories.includes(item.category);
            return priceInRange && categoryIncluded;
        });
        
        setFilteredProducts(filtered);
        setSortOption("");
    }

    const clearFilters = ()=> {
        setSortOption("");
        setFilteredProducts(products);
        setShowFilters(false);
    }

    const getPriceRange = (price)=> {
        if(price < 50) return "Under $50";
        else if(50<= price && price < 200) return "$50 - $200";
        else if(200<= price && price <500) return "$200 - $500";
        else return "Over $500"
    }

    if(loader) {
        return <div>Loading...</div>
    }

    if(error) {
        return <div>Error Occured in fetching products.</div>
    }
  return (
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <SortNFilterDiv>
            <Select 
            options={["Price: Low to High", "Price: High to Low"]}
            sortValue={sortOption}
            onOptionChange={(option) => setSortOption(option)}
            />
            <h3 className=' cursor-pointer ' onClick={()=> setShowFilters(!showFilters)}>
                Filter <FaFilter className='text-black inline'/>
            </h3>
          </SortNFilterDiv>
          <HorizRule/>
          <div>
            {showFilters && <Filters applyFilters={applyFilters} clearFilters={clearFilters}/>}
          </div>
          <div className="mt-6 px-6 grid grid-cols-1 leading-tight gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {filteredProducts.slice(firstPageIndex, lastPageIndex).map((product) => (
                  <div key={product.id} className='group relative'>
                      <ProductCard
                          src={product.thumbnail}
                          price={product.price}
                          title={product.title}
                          description={product.description}
                      />
                  </div>
              ))}
          </div>
          <PaginationDiv>
              <Pagination
                  currentPage={currentPage}
                  totalCount={filteredProducts.length}
                  pageSize={pageSize}
                  onPageChange={page => setCurrentPage(page)} />
          </PaginationDiv>
      </div>
  )
}

export default Products