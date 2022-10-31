import React from 'react';
import Tab from '@material/react-tab';
import TabBar from '@material/react-tab-bar';
import MaterialIcon from '@material/react-material-icon';

class MyTabBar extends React.Component {
  state = {activeIndex: 0};

  handleActiveIndexUpdate = (activeIndex) => this.setState({activeIndex});

  render() {
    return (
      <div>
        <TabBar
          activeIndex={this.state.activeIndex}
          handleActiveIndexUpdate={this.handleActiveIndexUpdate}
        >
          <Tab>
            <MaterialIcon className='mdc-tab__icon' icon='face_retouching_natural' />
            <span className='mdc-tab__text-label'>Influencers</span>
          </Tab>
        </TabBar>
      </div>
    );
  }
}

export default MyTabBar;