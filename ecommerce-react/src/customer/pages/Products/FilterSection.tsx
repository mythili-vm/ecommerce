import { Button, Divider, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import { teal } from "@mui/material/colors";
import React, { useState } from "react";
import { color } from "../../../data/Filter/color";
import { price } from "../../../data/Filter/price";
import { discount } from "../../../data/Filter/discount";
import { brand } from "../../../data/Filter/brand";
import { useSearchParams } from "react-router-dom";


const FilterSection = () => {
    const[expandColor,setExpandColor]=useState(false);
    const[expandBrand,setExpandBrand]=useState(false);
    const[searchParams,setSearchParams]=useSearchParams();

const handleExpandBrand=()=>{
    setExpandBrand(!expandBrand);
}

const handleExpandColor=()=>{
    setExpandColor(!expandColor);
}

const updateFilterParams=(e:any)=>{
    const {name,value}=e.target;
    if(value){
        searchParams.set(name,value);
    }else{
        searchParams.delete(name);
    }
    setSearchParams(searchParams);
}

const clearAllFilters=()=>{
    console.log("clear all filters",searchParams);
    searchParams.forEach((value:any,key:any)=>{
        searchParams.delete(key);
    });
    setSearchParams(searchParams);
    setExpandColor(false);
    setExpandBrand(false);    
}

  return (
    <div className="-z-50 spacy-y-5 bg-white">
        <div className=" flex items-center justify-between h-[40px] px-9 lg:border-r">
          <p className="text-lg font-semibold">Filters</p>
          <Button onClick={clearAllFilters}
            size="small"
            className="text-teal-600 cursor pointer front-semibold"
          >
            clear all
          </Button>
        </div>
      <Divider/>
      <div className="px-9 space-y-6">
      <section>
        <FormControl>
          <FormLabel sx={{fontSize:"16px",fontWeight:"bold",color:teal[500],pb:"14px"}} 
            className="text-2xl font-semibold" id="color">Color</FormLabel>
          <RadioGroup
            onChange={updateFilterParams}
            aria-labelledby="color"
            defaultValue=""
            name="color"
          >
           {color.slice(0,expandColor?color.length:5).map((item)=><FormControlLabel key={item.name} control={<Radio />} value={item.name}
            label={<div className="flex items-center gap-3">
                <p>{item.name}</p>
                <p style={{background:item.hex}} 
                className={`h-5 w-5 rounded-full ${item.name}==="White"?"border":""}`}>
                
                </p>
                
            </div>}
       /> )}
          </RadioGroup>
        </FormControl>
        <div>
            <button onClick={handleExpandColor}
            className="text-primary-color cursor-pointer hover:text-teal-900 flex items-center">
                {expandColor?"hide":`+${color.length-5} more`}
            </button>
        </div>
      </section>
      <Divider/>
      <section>
        <FormControl>
          <FormLabel sx={{fontSize:"16px",fontWeight:"bold",color:teal[500],pb:"14px"}} 
            className="text-2xl font-semibold" id="color">Price</FormLabel>
          <RadioGroup
            onChange={updateFilterParams}
            aria-labelledby="price"
            defaultValue=""
            name="price"
          >
           {price.map((item)=><FormControlLabel key={item.name} control={<Radio />} value={item.value}
            label={<div className="flex items-center gap-3">
                <p>{item.name}</p>
                <p style={{background:item.name}} 
                className={`h-5 w-5 rounded-full}`}>
                
                </p>
                
            </div>}
       /> )}
          </RadioGroup>
        </FormControl>
      </section>
      <Divider/>
      <section>
        <FormControl>
          <FormLabel sx={{fontSize:"16px",fontWeight:"bold",color:teal[500],pb:"14px"}} 
            className="text-2xl font-semibold" id="discount">Discount</FormLabel>
          <RadioGroup
            onChange={updateFilterParams}
            aria-labelledby="discount"
            defaultValue=""
            name="discount"
          >
           {discount.map((item)=><FormControlLabel key={item.name} control={<Radio />} value={item.name}
            label={<div className="flex items-center gap-3">
                <p>{item.name}</p>
                <p style={{background:item.name}} 
                className={`h-5 w-5 rounded-full}`}>    
                </p>                
            </div>}
       /> )}
          </RadioGroup>
        </FormControl>
      </section>
      <Divider/>
      <section>
        <FormControl>
          <FormLabel sx={{fontSize:"16px",fontWeight:"bold",color:teal[500],pb:"14px"}} 
            className="text-2xl font-semibold" id="brand">Brand</FormLabel>
          <RadioGroup
            onChange={updateFilterParams}
            aria-labelledby="brand"
            defaultValue=""
            name="brand"
          >
           {brand.slice(0,expandBrand?brand.length:5).map((item)=><FormControlLabel key={item.name} control={<Radio />} value={item.name}
            label={<div className="flex items-center gap-3">
                <p>{item.name}</p>
                <p style={{background:item.name}} 
                className={`h-5 w-5 rounded-full}`}>    
                </p>                
            </div>}
       /> )}
          </RadioGroup>
        </FormControl>
        <div>
            <button
            onClick={handleExpandBrand}
            className="text-primary-color cursor-pointer hover:text-teal-900 flex items-center">
                {expandBrand?"hide":`+${brand.length-5} more`}
            </button>
        </div>
      </section>
      </div>
    </div>
  );
};

export default FilterSection;
