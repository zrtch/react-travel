import React from 'react'
import styles from './Carousel.module.css'
import { Image, Carousel as AntCarousel } from 'antd'

import Img1 from '../../assets/images/carousel_1.jpg'
import Img2 from '../../assets/images/carousel_2.jpg'
import Img3 from '../../assets/images/carousel_3.jpg'

export const Carousel: React.FC = () => {
  return (
    <AntCarousel autoplay className={styles.slider}>
      <Image src={Img1} />
      <Image src={Img2} />
      <Image src={Img3} />
    </AntCarousel>
  )
}
