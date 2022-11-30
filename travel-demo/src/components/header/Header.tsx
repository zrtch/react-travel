import React from 'react'
import styles from './Header.module.css'
import logo from '../../assets/logo.svg'
import { Layout, Typography, Input, Menu, Button, Dropdown } from 'antd'
import { GlobalOutlined } from '@ant-design/icons'
import {
  useNavigate,
  useLocation,
  useParams,
  useSearchParams,
} from 'react-router-dom'
import store from '../../redux/store'
import { useTranslation } from 'react-i18next'
import {
  changeLanguageActionCreator,
  addLanguageActionCreator,
} from '../../redux/language/languageActions'

export const Header: React.FC = () => {
  const { t } = useTranslation()

  const storeState = store.getState()
  const state = {
    language: storeState.language,
    languageList: storeState.languageList,
  }
  const handleStoreChange = () => {
    const storestate = store.getState()
    state.language = storestate.language
    state.languageList = storestate.languageList
  }
  // 订阅函数
  store.subscribe(handleStoreChange)

  // 导航操作，可以取得history的数据
  const navigate = useNavigate()
  // 当前路径的信息，可以获得location的数据
  const location = useLocation()
  // 获取动态路由的值
  const params = useParams()
  // 可以获得url匹配的数据
  const match = useSearchParams()

  const menuClickHandler = (e) => {
    if (e.key === 'new') {
      // 处理新语言添加action
      const action = addLanguageActionCreator('新语言', 'new_lang')
      store.dispatch(action)
    } else {
      // 消息分发
      const action = changeLanguageActionCreator(e.key)
      store.dispatch(action)
    }
  }

  return (
    <div className={styles.App}>
      <div className={styles['app-header']}>
        {/* top-header */}
        <div className={styles['top-header']}>
          <div className={styles.inner}>
            <Typography.Text>{t('header.slogan')}</Typography.Text>
            <Dropdown.Button
              style={{ marginLeft: 15, display: 'inline' }}
              overlay={
                <Menu onClick={menuClickHandler}>
                  {state.languageList.map((l) => {
                    return <Menu.Item key={l.code}>{l.name}</Menu.Item>
                  })}
                  <Menu.Item key={'new'}>添加新语言</Menu.Item>
                </Menu>
              }
              icon={<GlobalOutlined />}
            >
              {state.language === 'zh' ? '中文' : 'English'}
            </Dropdown.Button>
            <Button.Group className={styles['button-group']}>
              <Button onClick={() => navigate('register')}>
                {t('header.register')}
              </Button>
              <Button onClick={() => navigate('signIn')}>
                {t('header.signin')}
              </Button>
            </Button.Group>
          </div>
        </div>
        <Layout.Header className={styles['main-header']}>
          <span onClick={() => navigate('/')}>
            <img src={logo} alt="logo" className={styles['App-logo']} />
            <Typography.Title level={3} className={styles.title}>
              {t('header.title')}
            </Typography.Title>
          </span>
          <Input.Search
            placeholder={'请输入旅游目的地、主题、或关键字'}
            className={styles['search-input']}
          />
        </Layout.Header>
        <Menu mode={'horizontal'} className={styles['main-menu']}>
          <Menu.Item key={1}>{t('header.home_page')}</Menu.Item>
          <Menu.Item key={2}>{t('header.weekend')}</Menu.Item>
          <Menu.Item key={3}>{t('header.group')}</Menu.Item>
          <Menu.Item key="4"> {t('header.backpack')} </Menu.Item>
          <Menu.Item key="5"> {t('header.private')} </Menu.Item>
          <Menu.Item key="6"> {t('header.cruise')} </Menu.Item>
          <Menu.Item key="7"> {t('header.hotel')} </Menu.Item>
          <Menu.Item key="8"> {t('header.local')} </Menu.Item>
          <Menu.Item key="9"> {t('header.theme')} </Menu.Item>
          <Menu.Item key="10"> {t('header.custom')} </Menu.Item>
          <Menu.Item key="11"> {t('header.study')} </Menu.Item>
          <Menu.Item key="12"> {t('header.visa')} </Menu.Item>
          <Menu.Item key="13"> {t('header.enterprise')} </Menu.Item>
          <Menu.Item key="14"> {t('header.high_end')} </Menu.Item>
          <Menu.Item key="15"> {t('header.outdoor')} </Menu.Item>
          <Menu.Item key="16"> {t('header.insurance')} </Menu.Item>
        </Menu>
      </div>
    </div>
  )
}
