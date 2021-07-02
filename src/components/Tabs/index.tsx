import React, { ReactElement, useState } from 'react';
import TabTitle from './TabTitle';

import { Container, Slider, Indicator } from './styles';

type Props = {
  children: ReactElement[];
};

const Tabs: React.FC<Props> = ({ children }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <Container>
      <div>
        <input type="radio" id="tab1" name="tab-control" checked />
        <input type="radio" id="tab2" name="tab-control" />
        <input type="radio" id="tab3" name="tab-control" />
        <input type="radio" id="tab4" name="tab-control" />
        <ul>
          {children.map((item, index) => (
            <TabTitle
              key={index}
              title={item.props.title}
              index={index}
              setSelectedTab={setSelectedTab}
            />
          ))}
        </ul>
        <Slider>
          <Indicator />
        </Slider>
        {children[selectedTab]}
      </div>
    </Container>
  );
};

export default Tabs;
