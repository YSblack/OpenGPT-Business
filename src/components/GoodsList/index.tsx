import { ProductInfo } from '@/types'
import styles from './index.module.less'
import { useEffect, useState } from 'react'
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Popover } from 'antd';

function GoodsList(props: { list: Array<ProductInfo>; onChange: (item: ProductInfo) => void }) {
  const [selectItem, setSelectItem] = useState<ProductInfo>()

  useEffect(() => {
    if (selectItem && selectItem.id) {
      props.onChange?.(selectItem)
    }
  }, [selectItem])

  return (
    <div className={styles.goodsList}>
      {props.list.map((item) => {
        const className =
          selectItem?.id === item.id
            ? `${styles.goodsList_item} ${styles.goodsList_item_select}`
            : styles.goodsList_item
        return (
          <div
            key={item.id}
            className={className}
            onClick={() => {
              setSelectItem(item)
            }}
          >
			<h3 className={styles.goodsList_item_level}>{ item.title } </h3>

              <div
                  dangerouslySetInnerHTML={{
                    __html: item.describe
                  }}
                />

            {item.type === 'integral' ? <h4>{item.value}积分</h4> : <h4>{item.value}天</h4>}
			<div className={styles.goodsList_item_price}>
				<p className={styles.sales_price}>{(item.price / 100).toFixed(2)}<span>元</span></p>
				{item.original_price && <p className={styles.original_price}>¥{(item.original_price / 100).toFixed(2)}</p>}
			</div>
            <span className={styles.goodsList_item_tag}>{item.badge}</span>
          </div>
        )
      })}
    </div>
  )
}

export default GoodsList
