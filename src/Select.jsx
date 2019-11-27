import React, {Component} from 'react';

class Select extends Component {
  constructor(props) {
    super(props);

    let selectedValues = (props.isMultiSelect) ? 
            Array.isArray(props.selectedValues) ? props.selectedValues : [] 
            : props.selectedValues || "";
    this.state = {data : props.data, showSelect: false, selectedValues : selectedValues};
  }

  /**
   * To handle field change
   */
  handleChange = (value) => {
    let selectedValues = JSON.parse(JSON.stringify(this.state.selectedValues));
    if(this.props.isMultiSelect) {
      (selectedValues.indexOf(value) !== -1) ? selectedValues.splice(selectedValues.indexOf(value),1) : selectedValues.push(value)
    } else {
      selectedValues =  value
    }
    this.setState({
      selectedValues: selectedValues,
      showSelect: (!this.props.isMultiSelect) ? false : true
    })
  }

  /**
   * To open and hide the dropdown
   */
  showHideDropdown = () => {
    this.setState({showSelect: !this.state.showSelect}, () => {
      try {
        let ele = document.getElementsByClassName("selected-data");
        if(ele.length > 0) {
          ele[0].scrollIntoView({block: "center", inline: "nearest"});
        }
      }catch(e){}
    });
  }

  /**
   * To check whether the value is selected or not
   */
  isChecked = (value) => {
    return (this.props.isMultiSelect) ? this.state.selectedValues.indexOf(value) !== -1 : value === this.state.selectedValues;
  }

  showSelected = () => {
    let {selectedValues} = this.state;
    if(this.props.isMultiSelect && Array.isArray(selectedValues) && selectedValues.length > 0) {
      return selectedValues.map((value,index) => <span className="selected-labels" key={index}>{this.getLabelBasedOnValue(value)}</span>)
    }else if(!Array.isArray(selectedValues) && selectedValues){
      return selectedValues;
    }else {
      return "Please select";
    }
  }

  getLabelBasedOnValue = (value) => {
    return this.state.data.find((v) => v.value === value).label
  }

  render () {
    const {className = "", isMultiSelect = false} = this.props;
    const {data = [], showSelect = false,selectedValues = (isMultiSelect) ? [] : ""} = this.state;
    return (
      <div className={`react-select-dropdown main-container ${className}`} tabIndex="0" 
      onBlur={() => {this.setState({showSelect: false})}}
      >
        <div className="selected-label" onClick={() => this.showHideDropdown()}>
          <span className="label">{this.showSelected()}</span>
          <span className="icon"><i className="downarrow"></i></span>
        </div>
        <div className={showSelect ? "selectable-content open" : "selectable-content"}>
          <ul>
            {data.map((value,key) => 
                <li key={key} className={this.isChecked(value.value) && "selected-data"} onClick={() => this.handleChange(value.value)} data-is-checked={this.isChecked(value.value)}>{value.label}</li>
            )}
          </ul>
        </div>
      </div>
    )
  }
}

export default Select;
