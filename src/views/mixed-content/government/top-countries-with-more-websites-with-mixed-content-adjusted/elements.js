import Card from '@material-ui/core/Card';
import styled from 'styled-components';

const ChartContainer = styled.div`
  align-items: center;
  display: flex;
  height: 300px;
  justify-content: center;
`;

const CustomCard = styled(Card)`
  margin: 20px 0px;
`;

const SkeletonContainer = styled.div`
  padding: 20px;
  width: 100%;
`;

export {ChartContainer, CustomCard, SkeletonContainer};
