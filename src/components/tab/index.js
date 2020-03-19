import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function TabPane(props) {
  return (
    <div className="tabs-contents-wrap">
      <div className="tabs-contents" style={{transform: `translate3d(${0 - props.activeIndex*100}%, 0px, 0px)`}}>
        {React.Children.map(props.children, (elem) => {
          return <div className="tabs-tab-pane">{elem.props.children}</div>
        })}
      </div>
    </div>
  )
}
TabPane.propTypes = {
  activeIndex: PropTypes.number
}

export {TabPane};

class TabsNav extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      activeIndex: props.defaultIndex || 0,
      inkWidth: 0,
      inkLeft: 0
    }
    this.myRef = React.createRef();
  }

  componentDidMount() {
    let {left, width} = this.getInkPosition(this.state.activeIndex);
    this.setState({
      inkWidth: width,
      inkLeft: left
    });
  }

  handleClick(index) {
    let {onActiveChange} = this.props;
    let {left, width} = this.getInkPosition(index);
    if(onActiveChange) {
      onActiveChange(index, this.state.activeIndex);
    }
    this.setState({
      activeIndex: index,
      inkWidth: width,
      inkLeft: left
    });
  }

  getInkPosition(index) {
    let left = 0;
    const refs = this.myRef.current.getElementsByClassName("tabs-tab");
    for(let i=0; i<index; i++) {
      left += refs[i].clientWidth + 32;
    }
    return {
      left,
      width: refs[index].clientWidth
    };
  }

  render() {
    return (
      <div className="tabs-nav-container">
        <div className="tabs-nav-wrap">
          <div className="tabs-nav" ref={this.myRef}>
            {
              React.Children.map(this.props.children, (elem, index) => {
                 return (
                  <div key={elem.props.key} className={"tabs-tab" + (this.state.activeIndex === index ? " tab-active" : "")} 
                    onClick={() => {this.handleClick(index)}}>{elem.props.children}</div>
                 )
              })
            }
            <div className="tabs-ink-bar" style={{width: `${this.state.inkWidth}px`, transform: `translate3d(${this.state.inkLeft}px, 0px, 0px)`}}></div>
          </div>
        </div>
      </div>
    )
  }
}
TabsNav.propTypes = {
  defaultIndex: PropTypes.number
}

export default class Tabs extends React.Component {

  constructor(props) {
    super(props);
    let defaultKeyIndex = 0;
    if(props.children instanceof Array) {
      for(let i=0;i<props.children.length;i++){
        if(props.defaultActiveKey === props.children[i].key) {
          defaultKeyIndex = i;
          return ;
        }
      }
    }
    this.state = {
      activeIndex: defaultKeyIndex
    }
    this.handleTabChange = this.handleTabChange.bind(this);
  }
  
  handleTabChange(index) {
    let {onTabChange} = this.props;
    if(onTabChange) {
      onTabChange(index, this.state.activeIndex);
    }

    this.setState({
      activeIndex: index
    });
  }

  renderTabs() {
    let tabs = React.Children.map(this.props.children, (elem) => {
      return (<div key={elem.props.key}>{elem.props.tab}</div>);
    });

    return (tabs);
  }

  render() {
    return (
      <div className="tabs">
        <TabsNav defaultIndex={this.state.activeIndex} onActiveChange={this.handleTabChange}>
          {this.renderTabs()}
        </TabsNav>
        <TabPane activeIndex={this.state.activeIndex}>
          {this.props.children}
        </TabPane>
      </div>
    )
  }
}