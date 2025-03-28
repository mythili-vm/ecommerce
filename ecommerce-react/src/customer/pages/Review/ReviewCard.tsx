import { Delete } from '@mui/icons-material'
import { Avatar, Box, Grid2, IconButton, Rating } from '@mui/material'
import { red } from '@mui/material/colors'
import React from 'react'

const ReviewCard = () => {
  return (
    <div className='flex justify-between'>
        <Grid2 container spacing={9} >
            <Grid2 size={{xs:1}}>
                <Box>
                    <Avatar className='text-white' sx={{width:56,height:56, bgcolor:'#9155FD'}}>
                        M
                    </Avatar>
                </Box>
            </Grid2>
            <Grid2 size={{xs:9}}>
                <div className='space-y-2'>
                    <div>
                        <p className='font-semibold text-lg'>Magizhan</p>
                        <p className='opacity-70'>2025-03-26T07:03:03:478333</p>
                    </div>
                </div>
                <Rating
                readOnly
                value={4}
                precision={1}
                /><p>Value or money product, great product</p>
                <div>
                    <img className='w-24 h-24 object-cover' src="https://wholetex.sgp1.cdn.digitaloceanspaces.com/full/sanskrut-silk-golden-zari-work-saree-868.jpg" alt=""/>
                </div>
            </Grid2>
        </Grid2>
        <div>
        <IconButton>
                <Delete sx={{color:red[700]}}/>
            </IconButton>
        </div>
    </div>
  )
}

export default ReviewCard