import React from 'react'
import styles from './HomePage.module.css'
import {
  Header,
  Footer,
  Carousel,
  SideMenu,
  ProductCollection,
  BusinessPartners,
} from '../../components' //整个组件库 components 成为一个整体，把整个组价库拆分出来，以独立项目依赖的形式，提供别人使用
import { Row, Col, Typography } from 'antd'
import { productList1, productList2, productList3 } from './mockups'
import sideImage from '../../assets/images/sider_2019_12-09.png'
import sideImage2 from '../../assets/images/sider_2019_02-04.png'
import sideImage3 from '../../assets/images/sider_2019_02-04-2.png'
import { withTranslation, WithTranslation } from 'react-i18next'
import { MainLayout } from '../../layouts/mainLayout'

class HomePageComponent extends React.Component<WithTranslation> {
  render() {
    const { t } = this.props
    return (
      <>
        <MainLayout>
          <Row style={{ marginTop: 20 }}>
            <Col span={6}>
              <SideMenu />
            </Col>
            <Col span={18}>
              <Carousel />
            </Col>
          </Row>
          <ProductCollection
            title={
              <Typography.Title level={3} type="warning">
                {t('home_page.hot_recommended')}
              </Typography.Title>
            }
            sideImage={sideImage}
            products={productList1}
          />
          <ProductCollection
            title={
              <Typography.Title level={3} type="danger">
                {t('home_page.new_arrival')}
              </Typography.Title>
            }
            sideImage={sideImage2}
            products={productList2}
          />
          <ProductCollection
            title={
              <Typography.Title level={3} type="danger">
                {t('home_page.domestic_travel')}
              </Typography.Title>
            }
            sideImage={sideImage3}
            products={productList3}
          />
          <BusinessPartners />
        </MainLayout>
      </>
    )
  }
}

// 第一个小括号代表是语言所使用的命名空间
export const HomePage = withTranslation()(HomePageComponent)
