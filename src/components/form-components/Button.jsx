import React from 'react'
import styled from 'styled-components';

const CustomButton = styled.button`
    width: 100%;
    padding: 0.8rem 0;
    font-size: 1.2rem;
    cursor: pointer;
`

function Button({
    children,
    type='button',
    className='',
    ...props
}) {
  return (
    <CustomButton type={type} className={` ${className}`} {...props}>
        {children}
    </CustomButton>
  )
}

export default Button