import Card from '@material-ui/core/Card';
import styled from 'styled-components';

const ChartContainer = styled.div`
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CustomCard = styled(Card)`
  margin: 20px 0px;
`;

const SkeletonContainer = styled.div`
  width: 100%;
  padding: 20px;
`;

export {ChartContainer, CustomCard, SkeletonContainer};
