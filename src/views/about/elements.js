import Avatar from '@material-ui/core/Avatar';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const TitleContainer = styled.div`
  align-items: center;
  display: flex;
  margin-bottom: 20px;
`;

const Logo = styled.img`
  height: 80px;
  margin-right: 20px;
  width: 80px;
`;

const TitleTextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const AccordionTextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Icon = styled.img`
  height: 200px;
  margin-left: 20px;
  width: 200px;
`;

const ContributorAvatar = styled(Avatar)`
  height: 120px;
  margin: 10px auto;
  width: 120px;
`;

export {
  Container,
  Icon,
  Logo,
  TitleContainer,
  TitleTextContainer,
  AccordionTextContainer,
  ContributorAvatar,
};
