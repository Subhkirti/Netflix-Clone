import React from 'react'
import classes from '../../styles/feed.module.css'
import Image from 'next/image'
import { Box, Typography, Button } from '@mui/material'
import { ellipSize, movieDetailUrl } from '@/app/utils/commonUtil'
import { ErrorOutline, PlayArrow } from '@mui/icons-material';
import { useMobile, useTablet } from '@/app/hooks/mediaHooks';
import { useRouter } from "next/navigation";

function ThumbnailMedia({ homeBanner }) {
  const isTablet = useTablet()
  const isMobile = useMobile()
  const router = useRouter()

  return (
    <Box>
      <Box className={classes.bannerBox}>
        {homeBanner && <Image src={`https://image.tmdb.org/t/p/w500${homeBanner.backdrop_path || homeBanner.poster_path
          }`} alt="" width={1000} height={isMobile ? 400 : 700} style={{ zIndex: -1, width: "100%", position: "absolute", inset: "0px" }}></Image>}
        <Box className={classes.shadowBox}></Box>

        {!isMobile && <Box className={classes.bannerDescription}>
          <Typography className={classes.bannerTitle}>{homeBanner?.title || homeBanner?.original_title}</Typography >
          <Typography className={classes.bannerSubTitle}>{ellipSize(homeBanner?.overview, isTablet ? 250 : 400)}</Typography>
          <Box mt={2}>
            <Button onClick={() => router.push(movieDetailUrl(homeBanner?.id))} className={classes.bannerPlayIcon} variant='contained' startIcon={<PlayArrow style={{ fontSize: "30px" }} />}>Play</Button>

            <Button onClick={() => router.push(movieDetailUrl(homeBanner?.id))} className={classes.infoIcon} variant='contained' startIcon={<ErrorOutline />}>More Info</Button>
          </Box>
        </Box>}
      </Box>

      {isMobile &&
        <Box className={classes.bannerDescription}>
          <Typography className={classes.bannerTitle}>{homeBanner?.title || homeBanner?.original_title}</Typography >
          <Typography className={classes.bannerSubTitle}>{ellipSize(homeBanner?.overview, isTablet ? 250 : 400)}</Typography>
          <Box mt={2}>
            <Button className={classes.bannerPlayIcon} variant='contained' startIcon={<PlayArrow style={{ fontSize: "30px" }} />}>Play</Button>
            <Button className={classes.infoIcon} variant='contained' startIcon={<ErrorOutline />}>More Info</Button>
          </Box>
        </Box>}
    </Box>

  )
}

export default ThumbnailMedia
