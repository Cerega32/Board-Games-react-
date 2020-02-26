import React, { Component } from "react"
import { Checkbox } from "antd"
import Sort from "../sort-by/sort"
import Checkboxes from "../checkboxes"
import Range from "../range/range"
import './filter.css'

class Filter extends Component {
  state = {
    sortBy: this.props.sortBy,
    orderBy: this.props.orderBy,
    manufacturer: this.props.manufacturer,
    type: this.props.type,
    value: this.props.value,
    min: 0,
    max: 10000,
    currentPage: 1
  }
  // отправляет текущее состояние фильтров
  handeFiltersChange = () => {
    const filtersState = { ...this.state }
    this.props.onChange(filtersState)
  }
  // manufacturer в local state и дергает handleFilterChange
  onChangeManufacturer = manufacturer => {
    this.setState({ manufacturer }, () => this.handeFiltersChange())
  }
  onChangeType = type => {
    this.setState({ type }, () => this.handeFiltersChange())
  }
  onChangeMinValue = min => {
    this.setState({ 
      min,
      value: [min, this.state.value[1]] 
    }, () => this.handeFiltersChange())
  }
  onChangeMaxValue = max => {
    this.setState({ 
      max,
      value: [this.state.value[0], max] 
    }, () => this.handeFiltersChange())
  }
  onAfterChangeRange = value => {
    const [min, max] = value;
    this.setState({
      min,
      max,
      value
    }, () => this.handeFiltersChange())
  }
  onChangeRange = value => {
    const [min, max] = value;
    this.setState({
      min,
      max,
      value
    })
  }
  // sortBy: orderby в local state и дергает handleFilterChange
  handleSortChange = event => {
    this.setState({ [event.target.name]: event.target.value }, () => this.handeFiltersChange())
  }


  /* 
    Как делать любые фильтры
    функция обработчик, которая при изменении заносит текущую страницу, (цену) в local state
    и дергает handleFilterChange
  */
  
  // onChangeManufacturer = (manufacturer) => {
  //   
  //   gamesUpdated(manufacturer);
  // };

  render() {
    return (
      <div className="filters col-lg-3">
        <div>
          <Sort
            title="Сортировка"
            name="sortBy"
            btns={[
              { value: "price", placeholder: "Цена" },
              { value: "createdAt", placeholder: "Дата выхода" }
            ]}
            handleChange={this.handleSortChange}
            value={this.state.sortBy}
          />{" "}
          <Sort
            title="Направление"
            name="orderBy"
            btns={[
              { value: "asc", placeholder: "Возрастание" },
              { value: "desc", placeholder: "Убывание" }
            ]}
            handleChange={this.handleSortChange}
            value={this.state.orderBy}
          />{" "}
          <Checkboxes onChange={this.onChangeManufacturer}>
            <strong>Производитель</strong>
            {[
              <Checkbox value="Hobby World" key='Hobby-world'>Hobby World</Checkbox>,
              <Checkbox value="13 Рентген" key='13-rentgen'>13 Рентген</Checkbox>,
              <Checkbox value="2x2tv" key='2x2tv'>2x2tv</Checkbox>
            ]}
          </Checkboxes>
          <Checkboxes onChange={this.onChangeType}>
          <strong>Категория</strong>
            {[
              <Checkbox value='Игры и журналы' key='games-and-magazines'>Игры и журналы</Checkbox>,
              <Checkbox value='ККИ' key='CCG'>ККИ</Checkbox>,
              <Checkbox value='Настольные игры' key='board-games'>Настольные игры</Checkbox>
            ]}
          </Checkboxes>
          <Range onChangeRange={this.onChangeRange}
           onAfterChangeRange={this.onAfterChangeRange} 
           onChangeMin={this.onChangeMinValue}
           onChangeMax={this.onChangeMaxValue}
           value={this.state.value}
           minPrice={Math.floor(this.props.minPrice)}
           maxPrice={Math.floor(this.props.maxPrice)}/>
        </div>
      </div>
    )
  }
}

export default Filter
