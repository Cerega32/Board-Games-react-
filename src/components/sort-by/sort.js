import React from "react"
import { Radio, Typography } from "antd"
const { Paragraph } = Typography

const Sort = props => {
  const { title, name, btns, value } = props
  return (
    <div style={{ marginBottom: 10 }}>
      <Paragraph strong>{title}</Paragraph>
      <Radio.Group onChange={props.handleChange} value={value} name={name}>
        {btns.map(btn => {
          return <Radio.Button value={btn.value} key={btn.value}>{btn.placeholder}</Radio.Button>
        })}
      </Radio.Group>
    </div>
  )
}

export default Sort
