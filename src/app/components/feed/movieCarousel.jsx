import React, { useState, useEffect } from 'react'
import { Box, Typography } from '@mui/material'
import classes from '../../styles/feed.module.css'
import Carousel from "react-multi-carousel";
import { ChevronRight, ChevronLeft, } from '@mui/icons-material'
import { motion } from "framer-motion"
import MovieCarouselItem from './movieCarouselItem';
import { responsive } from '@/app/utils/constants';
import { useMobile } from '@/app/hooks/mediaHooks';
import { getCurrentUser, setCurrentUser } from '@/app/services/authService';
import { fetchWatchList } from '@/app/services/movieService';

function MovieCarousel({
    categoryTitle, thumbnails,
    currentCarouselIndex,
    categoryId
}) {
    const isMobile = useMobile()
    const [currentIndex, setCurrentIndex] = useState(-1)
    const user = getCurrentUser()

    useEffect(() => {
        async function getWatchList() {
            const res = await fetchWatchList({ userId: user?.userId })
            res.data && setCurrentUser({ ...res.data, loginSuccessfully: true });
        }
        getWatchList()
    }, [])

    const CustomLeftArrow = ({ onClick, ...rest }) => {
        return <div onClick={() => onClick()} className={classes.leftScrollIcon}>
            <ChevronLeft fontSize="40px" />
        </div>
    }
    const CustomRightArrow = ({ onClick, ...rest }) => {
        return <div onClick={() => onClick()} className={classes.scrollIcon}>
            <ChevronRight fontSize="40px" />
        </div>
    }

    return (
        <Box position="relative" zIndex={currentIndex === currentCarouselIndex ? 9 : 1} py={0.4} height={isMobile ? 170 : 250} >
            <Typography variant='h4' className={classes.carouselTitle} fontWeight={600}>{categoryTitle}</Typography>
            <Box>
                <Carousel
                    slidesToSlide={4}
                    removeArrowOnDeviceType={["tablet", "mobile"]} customRightArrow={<CustomRightArrow />}
                    customLeftArrow={<CustomLeftArrow />}
                    responsive={responsive}
                    containerClass={classes.thumbnailBox}>
                    {thumbnails && thumbnails?.length > 0 && thumbnails.map((thumbnail, index) => {
                        return <motion.div
                            key={index}
                            whileHover={{
                                scale: [1, 1.2, 1],
                            }}
                        >
                            <MovieCarouselItem thumbnail={thumbnail} index={index} setCurrentIndex={setCurrentIndex} currentCarouselIndex={currentCarouselIndex} showDescriptionCard={true} width={250} height={150} categoryId={categoryId} />
                        </motion.div>
                    })}
                </Carousel>
            </Box>
        </Box>
    )
}

export default MovieCarousel