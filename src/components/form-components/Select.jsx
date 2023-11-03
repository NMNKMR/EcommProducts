import React from 'react'
import styled from 'styled-components';

const CustomSelect = styled.select`
    border-radius: 10px;
    border: 1px solid black;
    padding: 1px;
`

function Select({
    label,
    options=[],
    onOptionChange,
    sortValue,
}) {
  return (
    <div>
        {label && 
        <label>{label}</label>}
        <CustomSelect
        defaultValue={sortValue || "placeholder"}
        onChange={(e)=> onOptionChange && onOptionChange(e.target.value)}>
            <option value={"placeholder"} disabled hidden>
                Sort
            </option>
            {
                options.map((option)=> (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))
            }
        </CustomSelect>
    </div>
  )
}

export default Select